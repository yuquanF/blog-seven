---
title: Vue组件通信 provide 和 inject

meta:
  - name: description
    content: Vue组件通信 provide 和 inject
  - name: keywords
    content: Vue, provide, inject, 组件通信

created: 2021/01/2

updated: 2021/01/2

tags:
  - Vue
  - 前端
---

## 💞概述

**&emsp; `Vue`中父组件到子组件的通信主要由子组件的`props`属性实现。但是在一些情况下，父组件无法直接向子组件的props传值，比如子组件通过父组件的slot进入父组件，父组件根本不知道子组件是谁；还有的情况就是子组件并不使用该数据，只是子组件的子组件需要使用，此时如果通过多级传递，会显得很麻烦。**

Vue在`2.2.0版本`引入了`provide`与`inject`解决这种问题。

<br>

## 💞官方说明

[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)

> 2.2.0 新增
>
> **类型**：
>
> - **provide**：`Object | () => Object`
> - **inject**：`Array<string> | { [key: string]: string | Symbol | Object }`

>**详细**：
>
> `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

&emsp;这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

<br>

&emsp;`provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。

`inject` 选项应该是：

- 一个字符串数组，或
- 一个对象，对象的 key 是本地的绑定名，value 是：
  - 在可用的注入内容中搜索用的 key (字符串或 Symbol)，或
  - 一个对象，该对象的：
    - `from` property 是在可用的注入内容中搜索用的 key (字符串或 Symbol)
    - `default` property 是降级情况下使用的 value

> 提示：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

示例：

```javascript
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar',
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created() {
    console.log(this.foo) // => "bar"
  },
  // ...
}
```

利用 ES2015 Symbols、函数 `provide` 和对象 `inject`：

```javascript
const s = Symbol()

const Provider = {
  provide() {
    return {
      [s]: 'foo',
    }
  },
}

const Child = {
  inject: { s },
  // ...
}
```

> 接下来 2 个例子只工作在 Vue 2.2.1 或更高版本。**低于这个版本时，注入的值会在 `props` 和 `data` 初始化之后得到。**

使用一个注入的值作为一个 property 的默认值：

```javascript
const Child = {
  inject: ['foo'],
  props: {
    bar: {
      default() {
        return this.foo
      },
    },
  },
}
```

使用一个注入的值作为数据入口：

```javascript
const Child = {
  inject: ['foo'],
  data() {
    return {
      bar: this.foo,
    }
  },
}
```

> 在 2.5.0+ 的注入可以通过设置默认值使其变成可选项：

```javascript
const Child = {
  inject: {
    foo: { default: 'foo' },
  },
}
```

如果它需要从一个不同名字的 property 注入，则使用 `from` 来表示其源 property：

```javascript
const Child = {
  inject: {
    foo: {
      from: 'bar',
      default: 'foo',
    },
  },
}
```

与 prop 的默认值类似，你需要对非原始值使用一个工厂方法：

```javascript
const Child = {
  inject: {
    foo: {
      from: 'bar',
      default: () => [1, 2, 3],
    },
  },
}
```

## 💞传入可监听的对象

> 官方说过，`provide` 和 `inject` 绑定并不是可响应的。而且是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

```javascript
// 父级组件提供 'messageData'
var Provider = {
  data() {
    return {
      message: 'hello world',
    }
  },
  provide() {
    messageData: this.$data
  },
  mounted() {
    setTimeout(() => {
      this.message = 'I have changed!'
    }, 5000)
  },
  // ...
}
```

```vue
<template>
  <div>
    {{ messageData.message }}
  </div>
</template>

<script>
// 子组件注入 'messageData'
var Child = {
  inject: ['messageData'],
  // ...
}
</script>
```

&emsp;原理是因为`this.$data`上有**message 的响应式 getter 与 setter**。所以子组件的视图会被 message 的`dep`收集，在父组件中更新 message 后，所有使用到 message 的视图都会被更新，因此子组件的视图也会被更新。

## 💞总结

&emsp; provide/inject 提供了一种新的组件间通信的方法。它允许父组件向子孙组件间进行跨层级的数据分发。但是 provide/inject 是非响应式的，如果要子孙组件根据父组件的值进行改变，provide/inject 机制不是一个好的选择。此时可以使用`Vuex`来管理状态。
