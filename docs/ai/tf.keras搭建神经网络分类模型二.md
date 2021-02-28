---
title: (数据归一化) tf.keras搭建神经网络分类模型 (二)

meta:
  - name: description
    content: (数据归一化) tf.keras搭建神经网络分类模型 (二)
  - name: keywords
    content: tf.keras，keras，tensorflow，CNN，神经网络，分类，数据归一化

created: 2021/01/21

updated: 2021/01/21

tags:
  - Keras
  - Tensorflow
  - CNN
  - Classification
  - Sklearn
  - 数据归一化
---

**&emsp;概述： 相比[tf.keras搭建神经网络分类模型 (一)](/program/tf.keras搭建神经网络分类模型一.html)，本文主要改动在于，对`数据归一化`的处理**

<br>

**为什么要进行归一化？**

&emsp;机器学习模型被互联网行业广泛应用，一般做机器学习应用的时候大部分时间是花费在特征处理上，其中很关键的一步就是对特征数据进行归一化，为什么要归一化呢？维基百科给出的解释：

&emsp;&emsp;1 归一化后加快了梯度下降求最优解的速度；

&emsp;&emsp;&emsp;如果机器学习模型使用梯度下降法求最优解时，归一化往往非常有必要，否则很难收敛甚至不能收敛。

&emsp;&emsp;2 归一化有可能提高精度；

&emsp;&emsp;&emsp;一些分类器需要计算样本之间的距离（如欧氏距离），例如KNN。如果一个特征值域范围非常大，那么距离计算就主要取决于这个特征，从而与实际情况相悖（比如这时实际情况是值域范围小的特征更重要）。

<br>

**_sklearn.preprocessing.StandardScaler_**

&emsp;作用：去均值和方差归一化。且是针对每一个特征维度来做的，而不是针对样本。

&emsp;标准差标准化（standardScale）使得经过处理的数据符合标准正态分布，即均值为0，标准差为1，其转化函数为：`x^* = (x - μ) / σ`

&emsp;其中μ为所有样本数据的均值，σ为所有样本数据的标准差。

<br>

## 🥰1 导入库

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
%matplotlib inline
import numpy as np
import sklearn
import pandas as pd
import os
import sys
import time
import tensorflow as tf

from tensorflow import keras

# 打印库的版本号
print(tf.__version__)
print(sys.version_info)
for module in mpl, np , pd, sklearn, tf, keras:
    print(module.__name__, module.__version__)
```

> **_out:_**
>
> 2.3.1
>
> sys.version_info(major=3, minor=6, micro=8, releaselevel='final', serial=0)
>
> matplotlib 3.1.1
>
> numpy 1.17.3
>
> pandas 1.1.5
>
> sklearn 0.24.1
>
> tensorflow 2.3.1
>
> tensorflow.keras 2.4.0

<br>

## 🥰2 从 Keras 加载 Fashion-MNIST 数据集

### 2.1 加载数据集

```python
fashion_mnist = keras.datasets.fashion_mnist
(x_train_all, y_train_all), (x_test, y_test) = fashion_mnist.load_data()

x_valid, x_train = x_train_all[:5000], x_train_all[5000:]
y_valid, y_train = y_train_all[:5000], y_train_all[5000:]

print(x_valid.shape, y_valid.shape)
print(x_train.shape, y_train.shape)
print(x_test.shape, y_test.shape)
```

> **_out:_**
>
> (5000, 28, 28) (5000,)
>
> (55000, 28, 28) (55000,)
>
> (10000, 28, 28) (10000,)

### 2.2 数据归一化

```python
print(np.max(x_train), np.min(x_train))
```

> **_out:_**
>
> 255 0

```python
# x = (x - μ) / σ
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
# x_train: [None, 28, 28] -> [None, 784]
x_train = scaler.fit_transform(
    x_train.astype(np.float32).reshape(-1, 1)).reshape(-1, 28, 28)
x_valid = scaler.transform(
    x_valid.astype(np.float32).reshape(-1, 1)).reshape(-1, 28, 28)
x_test = scaler.transform(
    x_test.astype(np.float32).reshape(-1, 1)).reshape(-1, 28, 28)

print(np.max(x_train), np.min(x_train))
print(x_valid.shape, y_valid.shape)
print(x_train.shape, y_train.shape)
print(x_test.shape, y_test.shape)
```

> **_out:_**
>
>
> 2.0231433 -0.8105136
>
> (5000, 28, 28) (5000,)
>
> (55000, 28, 28) (55000,)
>
> (10000, 28, 28) (10000,)

<br>

## 🥰3 使用 Sequential API 搭建 model

### 3.1 model 结构搭建

```python
model = keras.models.Sequential()
model.add(keras.layers.Flatten(input_shape=[28, 28]))
model.add(keras.layers.Dense(300, activation='relu'))
model.add(keras.layers.Dense(100, activation='relu'))
model.add(keras.layers.Dense(10, activation='softmax'))

# relu: y = max(0, x)
# softmax: Turn vector into a probability distribution.
# softmax:  x = [x1, x2, x3] , y = [e^x1/sum, e^x2/sum, e^x3/sum] , sum = e^x1+e^x2+e^x3
```

### 3.2 编译 model

```python

model.compile(loss='sparse_categorical_crossentropy',
                optimizer='sgd',
                metrics=['accuracy'])

# reason for sparse: y is index, need to y->one_hot -> []
# sgd：stochastic gradient descent
```

### 3.3 查看 model 信息

```python
model.layers
```

> **_out:_**
>
> [<tensorflow.python.keras.layers.core.Flatten at 0x7f74ebe41978>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7f74ebe5f278>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7f74ebe5f7b8>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7f74ebe5fb00>]

```python
model.summary()
```

> **_out:_**
>
> Model: "sequential"

| **Layer (type)**  | **Output Shape** | **Param** |
| :---------------- | :--------------- | :-------- |
| flatten (Flatten) | (None, 784)      | 0         |
| dense (Dense)     | (None, 300)      | 235500    |
| dense_1 (Dense)   | (None, 100)      | 30100     |
| dense_2 (Dense)   | (None, 10)       | 1010      |

| **result**            | **value** |
| :-------------------- | --------- |
| Total params:         | 266,610   |
| Trainable params:     | 266,610   |
| Non-trainable params: | 0         |

参数的计算举例：

```python
# [None, 784] * W + b -> [None, 300], 
# W.shape [784,300], b=[300], 784*300 = 235200,
# total params = 235200+300 = 235500
```

## 🥰4 训练和评估 model

### 4.1 fit

```python
history = model.fit(x_train, y_train, epochs=10, validation_data=(x_valid, y_valid))
```

> **_out:_**
>
>
> Epoch 1/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.5397 - accuracy: 0.8104 - val_loss: 0.4182 - val_accuracy: 0.8534
>
> Epoch 2/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.3940 - accuracy: 0.8599 - val_loss: 0.3939 - val_accuracy: 0.8618
>
> Epoch 3/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.3557 - accuracy: 0.8721 - val_loss: 0.3513 - val_accuracy: 0.8782
>
> Epoch 4/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.3298 - accuracy: 0.8811 - val_loss: 0.3351 - val_accuracy: 0.8742
>
> Epoch 5/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.3116 - accuracy: 0.8873 - val_loss: 0.3272 - val_accuracy: 0.8848
>
> Epoch 6/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.2953 - accuracy: 0.8932 - val_loss: 0.3137 - val_accuracy: 0.8874
>
> Epoch 7/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.2809 - accuracy: 0.8979 - val_loss: 0.3286 - val_accuracy: 0.8802
>
> Epoch 8/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.2692 - accuracy: 0.9017 - val_loss: 0.3304 - val_accuracy: 0.8794
>
> Epoch 9/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.2576 - accuracy: 0.9063 - val_loss: 0.3187 - val_accuracy: 0.8850
>
> Epoch 10/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.2481 - accuracy: 0.9106 - val_loss: 0.3005 - val_accuracy: 0.8918

### 4.2 展示训练图像

```python
def plot_learning_curves(history):
    pd.DataFrame(history.history).plot(figsize=(8, 5))
    plt.grid(True)
    plt.gca().set_ylim(0, 1)
    plt.show()

plot_learning_curves(history)
```

[tf.keras搭建神经网络分类模型 (一)](/program/tf.keras搭建神经网络分类模型一.html)的图像：
![output_17_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/26a135c1-7782-4d39-a605-a7c5ce071fea.png)

使用数据归一化后的图像：
![output_19_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/c186629d-5b6c-4550-b71a-c16dce67e9ed.png)

### 4.3 评估 model

```python
model.evaluate(x_test, y_test)
```

> **_out:_**
>
> 313/313 [==============================] - 1s 3ms/step - loss: 0.3337 - accuracy: 0.8787
>
> [0.33372437953948975, 0.8787000179290771]

## 🥰5 使用 model 预测数据

```python
x_new = x_test[:3]
y_proba = model.predict(x_new)
y_proba.round(2)
```

> **_out:_**
>
> array([[0.  , 0.  , 0.  , 0.  , 0.  , 0.02, 0.  , 0.01, 0.  , 0.97],
>
> [0.  , 0.  , 1.  , 0.  , 0.  , 0.  , 0.  , 0.  , 0.  , 0.  ],
>
> [0.  , 1.  , 0.  , 0.  , 0.  , 0.  , 0.  , 0.  , 0.  , 0.  ]],
>
> dtype=float32)

```python
y_pred = np.argmax(y_proba, axis=-1)
print(y_pred)
print(np.array(class_names)[y_pred])
```

> **_out:_**
>
>
> [9 2 1]
>
> ['Ankle boot' 'Pullover' 'Trouser']
