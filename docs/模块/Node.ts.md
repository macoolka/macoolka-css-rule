---
title: Node.ts
nav_order: 3
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [CssProperties (类型)](#cssproperties-%E7%B1%BB%E5%9E%8B)
- [CssTheme (类型)](#csstheme-%E7%B1%BB%E5%9E%8B)
- [Node (类型)](#node-%E7%B1%BB%E5%9E%8B)
- [ThemeNode (类型)](#themenode-%E7%B1%BB%E5%9E%8B)
- [chainNode (函数)](#chainnode-%E5%87%BD%E6%95%B0)
- [map (导出)](#map-%E5%AF%BC%E5%87%BA)
- [mapWithIndex (导出)](#mapwithindex-%E5%AF%BC%E5%87%BA)
- [record (导出)](#record-%E5%AF%BC%E5%87%BA)
- [reduce (导出)](#reduce-%E5%AF%BC%E5%87%BA)
- [reduceRight (导出)](#reduceright-%E5%AF%BC%E5%87%BA)
- [reduceRightWithIndex (导出)](#reducerightwithindex-%E5%AF%BC%E5%87%BA)
- [reduceWithIndex (导出)](#reducewithindex-%E5%AF%BC%E5%87%BA)

---

# CssProperties (类型)

Property 的基础类型

所有的 Property 从这里扩展

**签名**

```ts
export type CssProperties = object
```

v0.2.0 中添加

# CssTheme (类型)

Theme 的基础类型

所有的 Theme 从这里扩展

**签名**

```ts
export type CssTheme = object
```

v0.2.0 中添加

# Node (类型)

基本节点
Key 是 css selector
值是 css

**签名**

```ts
export type Node<T extends CssProperties> = Record<string, T>
```

**示例**

```ts

'': {
color: 'red',
},
':focus': {
color: '1',
},
':focus:active': {
margin: 5,
},
':focus:disable': {
margin: 5,
},
':focus:active:disable': {
color: 'blue'
}

```

v0.2.0 中添加

# ThemeNode (类型)

包含 Node 和 Theme

**签名**

```ts
export type ThemeNode<O extends CssProperties, T extends CssTheme> = { data: Node<O>; theme?: T }
```

v0.2.0 中添加

# chainNode (函数)

chain Node<A> to Node<B>

**签名**

```ts

export const chainNode = <B extends CssProperties>(m: Monoid<Node<B>> = getMonoid()) =>
    <A extends CssProperties>
        (f: (key: string, value: A) => Node<B>) => (a: Node<A>): Node<B> => ...

```

v0.2.0 中添加

# map (导出)

**签名**

```ts
typeof R.map
```

v0.2.0 中添加

# mapWithIndex (导出)

**签名**

```ts
typeof R.mapWithIndex
```

v0.2.0 中添加

# record (导出)

**签名**

```ts

FunctorWithIndex1<"Record", string> & Foldable1<"Record"> & TraversableWithIndex1<"Record", string> & Compactable1<"Record"> & FilterableWithIndex1<"Record", string> & Witherable1<"Record"> & FoldableWithIndex1<"Record", string>

```

v0.2.0 中添加

# reduce (导出)

**签名**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
```

v0.2.0 中添加

# reduceRight (导出)

**签名**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
```

v0.2.0 中添加

# reduceRightWithIndex (导出)

**签名**

```ts
typeof R.reduceRightWithIndex
```

v0.2.0 中添加

# reduceWithIndex (导出)

**签名**

```ts
typeof R.reduceWithIndex
```

v0.2.0 中添加
