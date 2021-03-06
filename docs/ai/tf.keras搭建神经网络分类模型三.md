---
title: (批归一化) tf.keras搭建神经网络分类模型 (三)

meta:
  - name: description
    content: (批归一化) tf.keras搭建神经网络分类模型 (三)
  - name: keywords
    content: tf.keras，keras，tensorflow，CNN，神经网络，分类，数据归一化，批归一化

created: 2021/01/23

updated: 2021/01/23

tags:
  - Keras
  - Tensorflow
  - CNN
  - Classification
  - Sklearn
  - 数据归一化
  - 批归一化
---

> **&emsp; 相比[tf.keras 搭建神经网络分类模型 (二)](/program/tf.keras搭建神经网络分类模型二.html)，本文主要改动在于，对隐藏层数据的批归一化（Batch Normalization）处理。BN 的提出，是要解决在训练过程中，中间层数据分布发生改变的情况。**

## 🥰 概述

**ISC ( Internal Covariate Shift) 现象：**

&emsp; 深度神经网络涉及到很多层的叠加，而每一层的参数更新会导致上层的输入数据分布发生变化，通过层层叠加，高层的输入分布变化会非常剧烈，这就使得高层需要不断去重新适应底层的参数更新。为了训好模型，我们需要非常谨慎地去设定学习率、初始化权重、以及尽可能细致的参数更新策略。<br>
&emsp; Google 将这一现象总结为 Internal Covariate Shift，简称 ICS.

<br>

**为什么要进行批归一化？**

&emsp; 在上一节中，我们对输入层数据进行了归一化处理，却没有在中间层进行归一化处理，那么在训练的过程中，因为后层输入数据是经过 σ ( W X + b ) 这样的矩阵乘法以及非线性运算之后得到的，前面层训练参数的更新将导致后面层输入数据分布发生变化，也就是 ISC 现象。BN 的提出，就是要解决在训练过程中，中间层数据分布发生改变的情况。<br>
&emsp; BN 在深层神经网络的作用非常明显：若神经网络训练时遇到收敛速度较慢，或者“梯度爆炸”等无法训练的情况发生时都可以尝试用 BN 来解决。同时，常规使用情况下同样可以加入 BN 来加速模型训练，甚至提升模型精度。

<br>

对 BN 解释的文章：<br>
[详解深度学习中的 Normalization，不只是 BN（1）](https://yq.aliyun.com/articles/435809?utm_content=m_41853)<br>
[详解深度学习中的 Normalization，不只是 BN（2）](https://yq.aliyun.com/articles/443058?spm=a2c4e.11153940.0.0.1586791fYucMr7)<br>
[深入理解 Batch Normalization 批标准化](https://www.cnblogs.com/guoyaohua/p/8724433.html)

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
> sys.version_info(major=3, minor=6, micro=8, releaselevel='final', serial=0) |
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
> 2.0231433 -0.8105136
>
> (5000, 28, 28) (5000,)
>
> (55000, 28, 28) (55000,)
>
> (10000, 28, 28) (10000,)

<br>

## 🥰3 使用 Sequential API 搭建 model (使用批归一化)

### 3.1 model 结构搭建

```python
model = keras.models.Sequential()
model.add(keras.layers.Flatten(input_shape=[28, 28]))
for _ in range(20) |:
    model.add(keras.layers.Dense(100, activation="relu"))
    model.add(keras.layers.BatchNormalization())
    """
    # 第二种选择：在批归一化后，再使用激活函数
    model.add(keras.layers.Dense(100) |)
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.Activation("relu"))
    """
model.add(keras.layers.Dense(10, activation="softmax"))

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
> [<tensorflow.python.keras.layers.core.Flatten at 0x7fef8a5d2710>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7fef60693438>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7fef1853f9e8>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7fef185f4390>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed875f240>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed875d240>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8744b70>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed8775898>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed87531d0>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed8777e48>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8703828>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed8705588>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8714eb8>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed8716c50>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8732278>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed870a278>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8643ba8>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed86478d0>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8659f60>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed865ef60>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8672860>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed86765c0>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8604668>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed860ac18>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed862a2b0>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed862d2b0>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed85c6390>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed85cb940>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed85ea2b0>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed85ef048>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8586940>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed858c6a0>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed85a5780>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed85abda0>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8547470>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed854d400>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed85634e0>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed8569a90>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8506400>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed850b160>,
>
> <tensorflow.python.keras.layers.normalization_v2.BatchNormalization at 0x7feed8523ac8>,
>
> <tensorflow.python.keras.layers.core.Dense at 0x7feed85297f0>]

```python
model.summary()
```

> **_out:_**
>
> Model: "sequential"

| **Layer (type)**             | **Output Shape** | **Param** |
| :--------------------------- | :--------------- | :-------- |
| flatten (Flatten)            | (None, 784)      | 0         |
| dense (Dense)                | (None, 100)      | 78500     |
| batch_normalization (BatchNo | (None, 100)      | 400       |
| dense_1 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_1 (Batch | (None, 100)      | 400       |
| dense_2 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_2 (Batch | (None, 100)      | 400       |
| dense_3 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_3 (Batch | (None, 100)      | 400       |
| dense_4 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_4 (Batch | (None, 100)      | 400       |
| dense_5 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_5 (Batch | (None, 100)      | 400       |
| dense_6 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_6 (Batch | (None, 100)      | 400       |
| dense_7 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_7 (Batch | (None, 100)      | 400       |
| dense_8 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_8 (Batch | (None, 100)      | 400       |
| dense_9 (Dense)              | (None, 100)      | 10100     |
| batch_normalization_9 (Batch | (None, 100)      | 400       |
| dense_10 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_10 (Batc | (None, 100)      | 400       |
| dense_11 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_11 (Batc | (None, 100)      | 400       |
| dense_12 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_12 (Batc | (None, 100)      | 400       |
| dense_13 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_13 (Batc | (None, 100)      | 400       |
| dense_14 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_14 (Batc | (None, 100)      | 400       |
| dense_15 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_15 (Batc | (None, 100)      | 400       |
| dense_16 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_16 (Batc | (None, 100)      | 400       |
| dense_17 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_17 (Batc | (None, 100)      | 400       |
| dense_18 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_18 (Batc | (None, 100)      | 400       |
| dense_19 (Dense)             | (None, 100)      | 10100     |
| batch_normalization_19 (Batc | (None, 100)      | 400       |
| dense_20 (Dense)             | (None, 10)       | 1010      |

| **result**            | **value** |
| :-------------------- | --------- |
| Total params:         | 279,410   |
| Trainable params:     | 275,410   |
| Non-trainable params: | 4,000     |

## 🥰4 训练和评估 model

### 4.1 fit

```python
history = model.fit(x_train, y_train, epochs=10, validation_data=(x_valid, y_valid))
```

> **_out:_**
>
> Epoch 1/10
>
> 1719/1719 [==============================] - 41s 24ms/step - loss: 1.0780 - accuracy: 0.6203 - val_loss: 0.6909 - val_accuracy: 0.7498
> Epoch 2/10
>
> 1719/1719 [==============================] - 41s 24ms/step - loss: 0.7627 - accuracy: 0.7258 - val_loss: 0.5435 - val_accuracy: 0.8106
> Epoch 3/10
>
> 1719/1719 [==============================] - 39s 23ms/step - loss: 0.6651 - accuracy: 0.7628 - val_loss: 0.4856 - val_accuracy: 0.8250
> Epoch 4/10
>
> 1719/1719 [==============================] - 40s 23ms/step - loss: 0.5907 - accuracy: 0.7914 - val_loss: 0.4578 - val_accuracy: 0.8378
> Epoch 5/10
>
> 1719/1719 [==============================] - 41s 24ms/step - loss: 0.5522 - accuracy: 0.8019 - val_loss: 0.4436 - val_accuracy: 0.8466
> Epoch 6/10
>
> 1719/1719 [==============================] - 40s 23ms/step - loss: 0.5147 - accuracy: 0.8181 - val_loss: 0.4020 - val_accuracy: 0.8572
> Epoch 7/10
>
> 1719/1719 [==============================] - 40s 23ms/step - loss: 0.4926 - accuracy: 0.8254 - val_loss: 0.4000 - val_accuracy: 0.8572
> Epoch 8/10
>
> 1719/1719 [==============================] - 41s 24ms/step - loss: 0.4712 - accuracy: 0.8335 - val_loss: 0.4014 - val_accuracy: 0.8490
> Epoch 9/10
>
> 1719/1719 [==============================] - 40s 23ms/step - loss: 0.4515 - accuracy: 0.8398 - val_loss: 0.3848 - val_accuracy: 0.8634
> Epoch 10/10
>
> 1719/1719 [==============================] - 40s 23ms/step - loss: 0.4446 - accuracy: 0.8434 - val_loss: 0.3806 - val_accuracy: 0.8600

### 4.2 展示训练图像

```python
def plot_learning_curves(history):
    pd.DataFrame(history.history).plot(figsize=(8, 5))
    plt.grid(True)
    plt.gca().set_ylim(0, 1)
    plt.show()

plot_learning_curves(history)
```

[tf.keras 搭建神经网络分类模型 (一)](/program/tf.keras搭建神经网络分类模型一.html)的图像：
![output_17_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/26a135c1-7782-4d39-a605-a7c5ce071fea.png)

使用数据归一化后的[tf.keras 搭建神经网络分类模型 (二)](/program/tf.keras搭建神经网络分类模型二.html)图像：
![output_19_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/c186629d-5b6c-4550-b71a-c16dce67e9ed.png)

使用数据BN后的图像：
![output_18_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/0ae24224-56ad-4f33-ae34-3bf8b1658a93.png)

### 4.3 评估 model

```python
model.evaluate(x_test, y_test)
```

> **_out:_**
>
> 313/313 [==============================] - 2s 7ms/step - loss: 0.4121 - accuracy: 0.8540
>
> [0.4121165871620178, 0.8539999723434448]

## 🥰5 使用 model 预测数据

```python
x_new = x_test[:3]
y_proba = model.predict(x_new)
y_proba.round(2)
```

> **_out:_**
>
> array([[0. , 0. , 0. , 0. , 0. , 0.02, 0. , 0.01, 0. , 0.97],
>
> [0. , 0. , 1. , 0. , 0. , 0. , 0. , 0. , 0. , 0. ],
>
> [0. , 1. , 0. , 0. , 0. , 0. , 0. , 0. , 0. , 0. ]],
>
> dtype=float32)

```python
y_pred = np.argmax(y_proba, axis=-1)
print(y_pred)
print(np.array(class_names)[y_pred])
```

> **_out:_**
>
> [9 2 1]
>
> ['Ankle boot' 'Pullover' 'Trouser']
