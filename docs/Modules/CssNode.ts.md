---
title: CssNode.ts
nav_order: 1
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [CssNode (type alias)](#cssnode-type-alias)
- [CssThemeNode (type alias)](#cssthemenode-type-alias)
- [Input (type alias)](#input-type-alias)
- [cssNodeToNode (function)](#cssnodetonode-function)
- [cssThemeNodeToThemeNode (function)](#cssthemenodetothemenode-function)
- [themeNodeToCssThemeNode (function)](#themenodetocssthemenode-function)
- [map (export)](#map-export)
- [mapWithIndex (export)](#mapwithindex-export)
- [record (export)](#record-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)
- [reduceRightWithIndex (export)](#reducerightwithindex-export)
- [reduceWithIndex (export)](#reducewithindex-export)

---

# CssNode (type alias)

The Css Node

**Signature**

```ts
export type CssNode<T extends CssProperties> = T & {
  selector?: Record<string, CssNode<T>>
}
```

**Example**

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

Added in v0.2.0

# CssThemeNode (type alias)

Add Theme Property in CssNode

**Signature**

```ts
export type CssThemeNode<P extends CssProperties, T extends CssTheme> = CssNode<P> & { theme?: T }
```

Added in v0.2.0

# Input (type alias)

Input Type overwrite Output Type

**Signature**

```ts
export type Input<I extends CssProperties, O extends CssProperties> = O & I
```

Added in v0.2.0

# cssNodeToNode (function)

CssNode to Node

**Signature**

```ts

export const cssNodeToNode = <T extends CssProperties>(a: CssNode<T>): Node<T> => ...

```

Added in v0.2.0

# cssThemeNodeToThemeNode (function)

CssThemeNode to ThemeNode

**Signature**

```ts

export const cssThemeNodeToThemeNode = <P extends CssProperties, T extends CssTheme>(a: CssThemeNode<P, T>): ThemeNode<P, T> => ...

```

Added in v0.2.0

# themeNodeToCssThemeNode (function)

ThemeNode to CssThemeNode

**Signature**

```ts

export const themeNodeToCssThemeNode = <O extends CssProperties, T extends CssTheme>
    (input: ThemeNode<O, T>): CssThemeNode<O, T> => ...

```

Added in v0.2.0

# map (export)

**Signature**

```ts
typeof map
```

Added in v0.2.0

# mapWithIndex (export)

**Signature**

```ts
typeof mapWithIndex
```

Added in v0.2.0

# record (export)

**Signature**

```ts

FunctorWithIndex1<"Record", string> & Foldable1<"Record"> & TraversableWithIndex1<"Record", string> & Compactable1<"Record"> & FilterableWithIndex1<"Record", string> & Witherable1<"Record"> & FoldableWithIndex1<"Record", string>

```

Added in v0.2.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
```

Added in v0.2.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
```

Added in v0.2.0

# reduceRightWithIndex (export)

**Signature**

```ts
typeof reduceRightWithIndex
```

Added in v0.2.0

# reduceWithIndex (export)

**Signature**

```ts
typeof reduceWithIndex
```

Added in v0.2.0
