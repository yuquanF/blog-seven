---
title: tf.keras搭建神经网络分类模型 (一)

meta:
  - name: description
    content: tf.keras搭建神经网络分类模型 (一)
  - name: keywords
    content: tf.keras，keras，tensorflow，CNN，神经网络，分类

created: 2021/01/20

updated: 2021/01/20

tags:
  - Keras
  - Tensorflow
  - CNN
  - Classification
---

**&emsp;概述： 本文主要使用`tf.keras`来搭建基本的、用于分类任务的神经网络。**

<br>

## 🔥1 导入库

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

## 🔥2 从 Keras 加载 Fashion-MNIST 数据集

&emsp; Fashion-MNIST 是一个替代 MNIST 手写数字集的图像数据集。 其涵盖了来自 10 种类别的共 7 万个不同商品的正面图片。Fashion-MNIST 的大小、格式和训练集/测试集划分与原始的 MNIST 完全一致。60000/10000 的训练测试数据划分，28x28 的灰度图片。

&emsp; 这个数据集的样子大致如下（每个类别占三行）：

<img src="https://blog-1256893237.cos.ap-beijing.myqcloud.com/12517b03-0e09-4e06-9bbb-25542a56d705.png" alt="fashion-mnist-sprite" style="zoom:50%;" /><br>

每个训练和测试样本都按照以下类别进行了标注：

| **标注编号** |      **描述**       | **标注编号** |      **描述**      |
| :----------: | :-----------------: | :----------: | :----------------: |
|      0       | T-shirt/top（T 恤） |      5       |   Sandal（凉鞋）   |
|      1       |   Trouser（裤子）   |      6       |   Shirt（汗衫）    |
|      2       |  Pullover（套衫）   |      7       | Sneaker（运动鞋）  |
|      3       |    Dress（裙子）    |      8       |     Bag（包）      |
|      4       |    Coat（外套）     |      9       | Ankle boot（踝靴） |

### 2.1 加载数据集

```python
fashion_mnist = keras.datasets.fashion_mnist
(x_train_all, y_train_all), (x_test, y_test) = fashion_mnist.load_data()

x_test = x_test/255.0
x_valid, x_train = x_train_all[:5000]/255.0, x_train_all[5000:]/255.0
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

### 2.2 定义函数，显示单张图片

```python
 def show_single_image(img_arr):
        plt.imshow(img_arr, cmap="binary")
        plt.show()

 show_single_image(x_train[0])
```

![output_3_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/38921f5e-66dc-4bfc-a307-86a7e2a57097.png)

### 2.3 定义函数，显示多张图片

```python
def show_imgs(n_rows, n_cols, x_data, y_data, class_names):
    assert len(x_data) == len(y_data)
    assert n_rows * n_cols < len(x_data)
    plt.figure(figsize=(n_cols*1.4, n_rows*1.6))
    for row in range(n_rows):
        for col in range(n_cols):
>
>  idx = n_cols * row + col
            plt.subplot(n_rows, n_cols, idx+1)
            plt.imshow(x_data[idx], cmap="binary", interpolation="nearest")
            plt.axis("off")
            plt.title(class_names[y_data[idx]])
    plt.show()

class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat', 'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']
show_imgs(3, 7, x_train, y_train, class_names)
```

![output_4_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/3a5b5a03-2843-4b45-9a28-288a525edbdf.png)

<br>

## 🔥3 使用 Sequential API 搭建 model

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

## 🔥4 训练和评估 model

### 4.1 fit

```python
history = model.fit(x_train, y_train, epochs=10, validation_data=(x_valid, y_valid))
```

> **_out:_**
>
>
> Epoch 1/10
>
> 1719/1719 [==============================] - 8s 5ms/step - loss: 0.7131 - accuracy: 0.7650 - val_loss: 0.5365 - val_accuracy: 0.8132
>
> Epoch 2/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.4887 - accuracy: 0.8296 - val_loss: 0.4329 - val_accuracy: 0.8578
>
> Epoch 3/10
>
> 1719/1719 [==============================] - 8s 5ms/step - loss: 0.4428 - accuracy: 0.8445 - val_loss: 0.4426 - val_accuracy: 0.8458
>
> Epoch 4/10
>
> 1719/1719 [==============================] - 8s 5ms/step - loss: 0.4190 - accuracy: 0.8537 - val_loss: 0.3913 - val_accuracy: 0.8692
>
> Epoch 5/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.3978 - accuracy: 0.8590 - val_loss: 0.3810 - val_accuracy: 0.8700
>
> Epoch 6/10
>
> 1719/1719 [==============================] - 8s 5ms/step - loss: 0.3809 - accuracy: 0.8670 - val_loss: 0.4044 - val_accuracy: 0.8608
>
> Epoch 7/10
>
> 1719/1719 [==============================] - 8s 4ms/step - loss: 0.3676 - accuracy: 0.8699 - val_loss: 0.3579 - val_accuracy: 0.8762
>
> Epoch 8/10
>
> 1719/1719 [==============================] - 7s 4ms/step - loss: 0.3570 - accuracy: 0.8731 - val_loss: 0.3661 - val_accuracy: 0.8710
>
> Epoch 9/10
>
> 1719/1719 [==============================] - 8s 5ms/step - loss: 0.3468 - accuracy: 0.8765 - val_loss: 0.3636 - val_accuracy: 0.8724
>
> Epoch 10/10
>
> 1719/1719 [==============================] - 8s 5ms/step - loss: 0.3367 - accuracy: 0.8802 - val_loss: 0.3558 - val_accuracy: 0.8728

```python
type(history)
```

> **_out:_**
>
> tensorflow.python.keras.callbacks.History

```python
history.history
```

> **_out:_**
>
> {'loss': [0.7130764126777649,
      0.48872268199920654,
      0.44282111525535583,
      0.4190373718738556,
      0.39778217673301697,
      0.3808560371398926,
      0.3676328957080841,
      0.35700348019599915,
      0.34684714674949646,
      0.3367474377155304],
>
> 'accuracy': [0.7650363445281982,
      0.8296363353729248,
      0.8445090651512146,
      0.8536545634269714,
      0.859036386013031,
      0.8669999837875366,
      0.8699091076850891,
      0.873090922832489,
      0.8764727115631104,
      0.8802363872528076],
>
> 'val_loss': [0.5364899039268494,
      0.43288588523864746,
      0.442623496055603,
      0.39128780364990234,
      0.38099995255470276,
      0.4044341444969177,
      0.3579285442829132,
      0.3660832643508911,
      0.36357906460762024,
      0.35584887862205505],
>
> 'val_accuracy': [0.8131999969482422,
      0.8578000068664551,
      0.84579998254776,
      0.8691999912261963,
      0.8700000047683716,
      0.86080002784729,
      0.8762000203132629,
      0.8709999918937683,
      0.8723999857902527,
      0.8727999925613403]}

### 4.2 展示训练图像

```python
def plot_learning_curves(history):
    pd.DataFrame(history.history).plot(figsize=(8, 5))
    plt.grid(True)
    plt.gca().set_ylim(0, 1)
    plt.show()

plot_learning_curves(history)
```

![output_17_0](https://blog-1256893237.cos.ap-beijing.myqcloud.com/26a135c1-7782-4d39-a605-a7c5ce071fea.png)

### 4.3 评估 model

```python
model.evaluate(x_test, y_test)
```

> **_out:_**
>
> 313/313 [==============================] - 1s 3ms/step - loss: 0.3891 - accuracy: 0.8618
>
> [0.3891453146934509, 0.8618000149726868]

## 🔥5 使用 model 预测数据

```python
x_new = x_test[:3]
y_proba = model.predict(x_new)
y_proba.round(2)
```

> **_out:_**
>
> array([[0.  , 0.  , 0.  , 0.  , 0.  , 0.04, 0.  , 0.08, 0.  , 0.88],
>
> [0.  , 0.  , 0.97, 0.  , 0.02, 0.  , 0.01, 0.  , 0.  , 0.  ],
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
