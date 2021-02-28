---
title: Matplotlib 简要介绍

meta:
  - name: description
    content: Matplotlib 简要介绍
  - name: keywords
    content: Matplotlib

created: 2021/01/19

updated: 2021/01/19

tags:
  - Matplotlib
  - Numpy
  - Python
---

## 一 matplotlib 概要

**1. Matplotlib 是什么？**

&emsp; Matplotlib 是一个 Python 的 2D 绘图库，它以各种硬拷贝格式和跨平台的交互式环境生成出版质量级别的图形。

**2. Matplotlib 能帮你？**

&emsp; 绘制线图、散点图、等高线图、条形图、柱状图、3D 图形，甚至是图形动画等等。

**3. 一些基本概念**

&emsp; 1. axis 轴: 指的是 x 或者 y 这种坐标轴

&emsp; 2. 画布层(Figure): plt.figure()

&emsp; 3. 绘图区: plt.plot()

&emsp; 4. 坐标区: plt.xticks()

**4. 简单使用**

```shell
# 1、安装包
$ pip install matplotlib
```

```python
# 使用 matplotlib 的 scatter 方法绘制散点图
import matplotlib.pyplot as plt # 导入pyplot
plt.figure(figsize=(3,3), dpi=200) # 创建画布
# 生成数据
x = [1, 2, 3, 4, 5]
y = [2.3, 3.4, 1.2, 6.6, 7.0]
plt.scatter(x, y, color='r', marker='+') # 绘制散点图
plt.show() # 显示图像
```

![image-1](https://blog-1256893237.cos.ap-beijing.myqcloud.com/72891e46-aa69-4cbb-9a31-01febd2a4da6.png)

## 二 常见 api

### ✨plt.figure()

**创建画布**

```python
plt.figure(
    num=None,
    figsize=None,
    dpi=None,
    facecolor=None,
    edgecolor=None,
    frameon=True,
    FigureClass=<class 'matplotlib.figure.Figure'>,
    clear=False,
    **kwargs,
)
```

> - `num: int or str, optional, default: None。`
>   - 可以将该 num 理解为窗口的属性 id,即该窗口的身份标识。如果不提供该参数，则创建窗口的时候该参数会自增，如果提供的话则该窗口会以该 num 为 Id 存在。
>   - 如果 num 是一个字符串，窗口标题将被设置为这个值。
> - `figsize: (float, float), optional, default: None。`
>   - 提供 float 元组则会以该元组为长宽，单位英寸。如（4，4）即以 长 4 英寸 宽 4 英寸的大小创建一个窗口。
> - `dpi：integer, optional, default: None。`
>   - 表示该窗口的分辨率。
> - facecolor：可选参数，表示窗口的背景颜色。值是 16 进制，如\#FF0000 红色。
> - edgecolor:可选参数，表示窗口的边框颜色。
> - frameon:可选参数，表示是否绘制窗口的图框，默认是。
> - FigureClass : subclass of `~matplotlib.figure.Figure`
>   Optionally use a custom `.Figure` instance.
> - clear:可选参数，默认是 false,如果提供参数为 ture，并且该窗口存在的话 则该窗口内容会被清除。

### ✨plt.savefig()

**保存图片**

```python
 savefig(fname, dpi=None, facecolor='w', edgecolor='w',
          orientation='portrait', papertype=None, format=None,
          transparent=False, bbox_inches=None, pad_inches=0.1,
          frameon=None, metadata=None)
```

> - fname: str 类型，保存的文件名。
>   - 可以仅仅指定文件名，保存在当前目录下。如 ‘xxx.png’
>   - 可以指定包含路径的文件名，‘./images/xxx.png’

### ✨plt.xticks() \ plt.yticks()

**调整 X 或者 Y 轴上的刻度**

```python
plt.xticks(ticks=None, labels=None, **kwargs)
plt.yticks(ticks=None, labels=None, **kwargs)
```

> - `ticks : array-like, optional`
>   - xtick 位置列表。传递一个空列表将删除所有 xticks。
> - `labels : array-like, optional`
>   - 将标签放置在对应给定的*ticks*位置。只有当*ticks*也被传递时，这个参数才能被传递。
> - `rotation: int，optional`
>   - 将刻度值按照逆时针旋转指定数值的度数。

```python
# examples
xticks(np.arange(0, 1, step=0.2))  # Set label locations.
xticks(np.arange(3), ['Tom', 'Dick', 'Sue'])  # Set text labels.
xticks([0, 1, 2], ['January', 'February', 'March'], rotation=20)  # Set text labels and rotation.
```

### ✨plt.xlabel() \ plt.ylabel() \ plt.title()

**给图像添加描述信息**

```python
plt.xlabel(xlabel, fontdict=None, labelpad=None, **kwargs)
plt.ylabel(ylabel, fontdict=None, labelpad=None, **kwargs)
```

> - `xlabel : str`。The label text.
> - fontdict: 指定字体。
> - `labelpad : scalar, optional, default: None`
>   - 从坐标轴包围框开始的点间距，包括刻度和刻度标签。

```python
plt.title(label, fontdict=None, loc=None, pad=None, **kwargs)
```

> Set a title for the axes.
>
> - `label : str`。The label text.

### ✨plt.plot()

**将 y 与 x 绘制成直线和/或标记。**

```python
plt.plot(*args, scalex=True, scaley=True, data=None, **kwargs)
```

| **参数**  | **接收值**     | **说明**                       | **默认值** |
| --------- | -------------- | ------------------------------ | ---------- |
| x，y      | array          | 表示 x 轴与 y 轴对应的数据；   | 无         |
| color     | string         | 表示折线的颜色；               | None       |
| marker    | string         | 表示折线上数据点处的类型；     | None       |
| linestyle | string         | 表示折线的类型；               | -          |
| linewidth | 数值           | 线条粗细：linewidth=1.=5.=0.3  | 1          |
| alpha     | 0~1 之间的小数 | 表示点的透明度；               | None       |
| label     | string         | 数据图例内容：label=‘实际数据’ | None       |

注：设置 label 后，需要在 plt.show()之前调用 `plt.legend()`。

### ✨plt.legend()

**设置图例**

```python
plt.legend(*args, **kwargs)
```

> - loc: string，设置图例位置。
>
>   - 0: ‘best'
>   - 1: ‘upper right'
>   - 2: ‘upper left'
>   - 3: ‘lower left'
>   - 4: ‘lower right'
>   - 5: ‘right'
>   - 6: ‘center left'
>   - 7: ‘center right'
>   - 8: ‘lower center'
>   - 9: ‘upper center'
>   - 10: ‘center'
> - fontsize : int or float or {‘xx-small’, ‘x-small’, ‘small’, ‘medium’, ‘large’, ‘x-large’, ‘xx-large’}。 设置图例字体大小。

### ✨plt.subplots()

**用于在一个 Figure 对象里画多个子图(Axes)。**

&emsp; 其调用格式：subplot(numRows, numCols, plotNum)，即（行、列、序号）。

&emsp; 图表的整个绘图区域被分成 numRows 行和 numCols 列，plotNum 参数指定创建的 Axes 对象所在的区域（左上角序号为 1）

&emsp; 如果行数、列数和序号都是个位数可以简写成一个整数，否则需要用逗号隔开。

```python
import numpy as np
import matplotlib.pyplot as plt

X = np.linspace(0, 2*np.pi, 32, endpoint=True)
C,S = np.cos(X), np.sin(X)

plt.subplot(221) # 两行两列，第一个位置
plt.plot(X,C)

plt.subplot(2,2,2) #可以隔开，也可以不隔开。 两行两列，第二个位置
plt.plot(X,S)

plt.subplot(212)# 两行一列，第二个位置
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])

plt.show()
```

![image-2](https://blog-1256893237.cos.ap-beijing.myqcloud.com/bb333cbe-cd4b-471d-a78d-ee56f479e9c6.png)

```python
fig, ax = plt.subplots()
```

**figure 和 axes**

- **figure 是作图的画布** : [matplotlib.figure.Figure](https://matplotlib.org/api/_as_gen/matplotlib.figure.Figure.html#matplotlib.figure.Figure)
- **你可以在 figure 上面铺展 axes, 事实上, 你画的图其实都是画在 axes 上的** : [matplotlib.pyplot.axes](https://matplotlib.org/api/_as_gen/matplotlib.pyplot.axes.html)

### ✨plt.bar()

**绘制柱形图**

```python
ax.bar(
    x,
    height,
    width=0.8,
    bottom=None,
    *,
    align='center',
    data=None,
    **kwargs,
)
```

> - x: x 轴的位置序列
> - height：y 轴的数值序列，也就是柱形图的高度，一般就是我们需要展示的数据。
> - width：为柱形图的宽度，一般为 0.8 即可。
> - color 或 facecolor：柱形图填充的颜色。
> - edgecolor：图形边缘颜色。
> - label：解释每个图像代表的含义，这个参数是为 legend()函数做铺垫的。
> - alpha：透明度，值越小越透明。

## 三 例子

### ✨绘制折线图

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5, 6, 7]
y = [17, 17, 18, 15, 11, 11, 13]

# 创建画布
plt.figure()

# 绘制图像
plt.plot(x, y)

# 保存图像
plt.savefig("1.png", dpi=200) # 用于导出图片

# 显示图像
plt.show()
```

![image-3](https://blog-1256893237.cos.ap-beijing.myqcloud.com/362cd5c7-b95f-4bdb-8ea7-0caa6884a5b0.png)

**设置 xy 轴、添加网格**

```python
import matplotlib.pyplot as plt
import random

x = range(60) # 60个点
y = [random.uniform(15, 18) for i in x]

plt.figure(figsize=(20, 8), dpi=200)
plt.plot(x, y)

# 设置X和Y轴
plt.xticks(x) # x轴每分钟显示一次

# 添加网格显示
plt.grid(True, linestyle="--", alpha=0.5)

plt.show()
```

![image-4](https://blog-1256893237.cos.ap-beijing.myqcloud.com/2226b484-c323-4388-a4bd-d1229fdbbc3f.png)

**当点比较多的时候，图像趋于顺滑**

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
siny = np.sin(x)
cosy = np.cos(x)

plt.plot(x, siny)
plt.plot(x, cosy)

plt.show()
```

![image-5](https://blog-1256893237.cos.ap-beijing.myqcloud.com/9c2fef87-4089-4bb7-9d62-29fb5b77a2e2.png)

### ✨绘制散点图

```python
import matplotlib.pyplot as plt

#  准备数据
x = range(10)
y = [2*i + 1 for i in x]

#  创建画布
plt.figure(figsize=(10, 4), dpi=200)

#  绘制散点图
plt.scatter(x, y)

#  显示图像
plt.show()
```

![image-6](https://blog-1256893237.cos.ap-beijing.myqcloud.com/820e2a28-17ad-412a-8532-48b12efb93ab.png)

**添加连线**

```python
import matplotlib.pyplot as plt

#  准备数据
x = range(10)
y = [2*i + 1 for i in x]

#  创建画布
plt.figure(figsize=(10, 4), dpi=200)

#  绘制散点图
plt.scatter(x, y)

# 添加连线
plt.plot(x, y, color='r')

#  显示图像
plt.show()
```

![image-7](https://blog-1256893237.cos.ap-beijing.myqcloud.com/6bbf02c5-e1ed-4ce6-a0d2-c2ce17ba5bb3.png)

**大量的点**

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.random.normal(0, 1, 10000)
y = np.random.normal(0, 1, 10000)

plt.scatter(x, y, alpha=0.1)
plt.show()
```

![image-8](https://blog-1256893237.cos.ap-beijing.myqcloud.com/c0fdb55a-7b7e-4674-a055-d56ca0989216.png)

### ✨堆叠式条形图（Stacked bar chart）

> 这是一个使用 bar 创建带有错误条的堆叠条形图的示例。请注意 yerr 用于误差杆的参数，并且 bottom 表示将女子杆堆叠在男子杆的顶部。

**绘制竖直条形图`plt.bar()`**

```python
import matplotlib.pyplot as plt

labels = ['G1', 'G2', 'G3', 'G4', 'G5'] # 用于设置x轴上的标签值
men_means = [20, 35, 30, 35, 27]
women_means = [25, 32, 34, 20, 25]
men_std = [2, 3, 4, 1, 2]
women_std = [3, 5, 2, 3, 3]
width = 0.35       # the width of the bars: can also be len(x) sequence

# 创建画图
fig, ax = plt.subplots()

# 绘制条形图
ax.bar(labels, men_means, width, yerr=men_std, label='Men') # yerr 垂直型误差
ax.bar(labels, women_means, width, yerr=women_std, bottom=men_means,
       label='Women') # bottom 将当前bar放在men_means上

# 设置图像描述信息
ax.set_ylabel('Scores')
ax.set_title('Scores by group and gender')
ax.legend() # 绘制图例

# 显示图像
plt.show()
```

![image-9](https://blog-1256893237.cos.ap-beijing.myqcloud.com/4d09b33f-7952-4199-bd57-9600b88a56b4.png)

**绘制水平条形图`plt.barh()`**

```python
import matplotlib.pyplot as plt

labels = ['G1', 'G2', 'G3', 'G4', 'G5'] # 用于设置y轴上的标签值
men_means = [20, 35, 30, 35, 27]
women_means = [25, 32, 34, 20, 25]
men_std = [2, 3, 4, 1, 2]
women_std = [3, 5, 2, 3, 3]
width = 0.35       # the width of the bars: can also be len(x) sequence

# 创建画图
fig, ax = plt.subplots()

# 绘制条形图
ax.barh(labels, men_means, width, xerr=men_std, label='Men') # xerr 水平型误差
ax.barh(labels, women_means, width, xerr=women_std, left=men_means,
       label='Women') # left 将当前bar放在men_means右边

# 设置图像描述信息
ax.set_xlabel('Scores')
ax.set_title('Scores by group and gender')
ax.legend() # 绘制图例

# 显示图像
plt.show()
```

![image-10](https://blog-1256893237.cos.ap-beijing.myqcloud.com/ca63091d-a53c-48e2-9062-0673306be532.png)

**绘制水平条形图`plt.barh()` ，并在图像上添加文字标注**

```python
import matplotlib.pyplot as plt
import numpy as np

labels = ['G1', 'G2', 'G3', 'G4', 'G5'] # 用于设置x轴上的标签值
men_means = [20, 35, 30, 35, 27]
women_means = [25, 32, 34, 20, 25]
men_std = [2, 3, 4, 1, 2]
women_std = [3, 5, 2, 3, 3]
width = 0.35       # the width of the bars: can also be len(x) sequence

# 创建画图
fig, ax = plt.subplots()

# 绘制条形图
ax.barh(labels, men_means, width, xerr=men_std, label='Men') # xerr 水平型误差
ax.barh(labels, women_means, width, xerr=women_std, left=men_means,
       label='Women') # left 将当前bar放在men_means右边

# 给条形图添加数据标注
numbers = np.array(men_means) + np.array(women_means)
for idx, value in enumerate(women_means):
    plt.text(value+men_means[idx], idx-width, "%s" %value)
for idx, value in enumerate(men_means):
    if value != numbers[idx]:
        plt.text(value-0, idx-width, "%s" %value)

# 设置图像描述信息
ax.set_xlabel('Scores')
ax.set_title('Scores by group and gender')
ax.legend() # 绘制图例

# 显示图像
plt.show()
```

![image-11](https://blog-1256893237.cos.ap-beijing.myqcloud.com/38def58f-e233-4811-a5ae-31ffdcad6709.png)
