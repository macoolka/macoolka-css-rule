---
title: CssNode.ts
nav_order: 1
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [CssNode (类型)](#cssnode-%E7%B1%BB%E5%9E%8B)
- [CssThemeNode (类型)](#cssthemenode-%E7%B1%BB%E5%9E%8B)
- [Input (类型)](#input-%E7%B1%BB%E5%9E%8B)
- [cssNodeToNode (函数)](#cssnodetonode-%E5%87%BD%E6%95%B0)
- [cssThemeNodeToThemeNode (函数)](#cssthemenodetothemenode-%E5%87%BD%E6%95%B0)
- [themeNodeToCssThemeNode (函数)](#themenodetocssthemenode-%E5%87%BD%E6%95%B0)
- [map (导出)](#map-%E5%AF%BC%E5%87%BA)
- [mapWithIndex (导出)](#mapwithindex-%E5%AF%BC%E5%87%BA)
- [record (导出)](#record-%E5%AF%BC%E5%87%BA)
- [reduce (导出)](#reduce-%E5%AF%BC%E5%87%BA)
- [reduceRight (导出)](#reduceright-%E5%AF%BC%E5%87%BA)
- [reduceRightWithIndex (导出)](#reducerightwithindex-%E5%AF%BC%E5%87%BA)
- [reduceWithIndex (导出)](#reducewithindex-%E5%AF%BC%E5%87%BA)

---

# CssNode (类型)

The Css Node

**签名**

```ts
export type CssNode<T extends CssProperties> = T & {
  selector?: Record<string, CssNode<T>>
}
```

**示例**

```ts
import { CssNode } from 'macoolka-css-rule'
type P = { color1?: string }
type P1 = { color?: string; margin?: number }

export const c: CssNode<Input<P, P1>> = {
  color1: 'red',
  selector: {
    ':focus': {
      color1: '1'
    },
    ':focus:active': {
      margin: 5
    },
    ':focus:disable': {
      margin: 5
    },
    ':focus:active:disable': {
      color1: 'blue'
    },
    ':disable': {
      color1: 'yellow',
      margin: 7
    }
  }
}
```

v0.2.0 中添加

# CssThemeNode (类型)

CssNode 中加 theme 属性

**签名**

```ts
export type CssThemeNode<P extends CssProperties, T extends CssTheme> = CssNode<P> & { theme?: T }
```

v0.2.0 中添加

# Input (类型)

输入类型覆盖输出类型

**签名**

```ts
export type Input<I extends CssProperties, O extends CssProperties> = O & I
```

v0.2.0 中添加

# cssNodeToNode (函数)

转换 CssNode 到 Node

**签名**

```ts

export const cssNodeToNode = <T extends CssProperties>(a: CssNode<T>): Node<T> => ...

```

v0.2.0 中添加

# cssThemeNodeToThemeNode (函数)

转换 CssThemeNode 到 ThemeNode

**签名**

```ts

export const cssThemeNodeToThemeNode = <P extends CssProperties, T extends CssTheme>(a: CssThemeNode<P, T>): ThemeNode<P, T> => ...

```

v0.2.0 中添加

# themeNodeToCssThemeNode (函数)

转换 ThemeNode 到 CssThemeNode

**签名**

```ts

export const themeNodeToCssThemeNode = <O extends CssProperties, T extends CssTheme>
    (input: ThemeNode<O, T>): CssThemeNode<O, T> => ...

```

v0.2.0 中添加

# map (导出)

**签名**

```ts
typeof map
```

v0.2.0 中添加

# mapWithIndex (导出)

**签名**

```ts
typeof mapWithIndex
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
typeof reduceRightWithIndex
```

v0.2.0 中添加

# reduceWithIndex (导出)

**签名**

```ts
typeof reduceWithIndex
```

v0.2.0 中添加
