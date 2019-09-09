---
title: Node.ts
nav_order: 3
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [CssProperties (type alias)](#cssproperties-type-alias)
- [CssTheme (type alias)](#csstheme-type-alias)
- [Node (type alias)](#node-type-alias)
- [ThemeNode (type alias)](#themenode-type-alias)
- [chainNode (function)](#chainnode-function)
- [map (export)](#map-export)
- [mapWithIndex (export)](#mapwithindex-export)
- [record (export)](#record-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)
- [reduceRightWithIndex (export)](#reducerightwithindex-export)
- [reduceWithIndex (export)](#reducewithindex-export)

---

# CssProperties (type alias)

Css Property Basic type

All Property will extend it

**Signature**

```ts
export type CssProperties = object
```

Added in v0.2.0

# CssTheme (type alias)

Theme Basic type

All Theme will extend it

**Signature**

```ts
export type CssTheme = object
```

Added in v0.2.0

# Node (type alias)

The base Node
Key is css selector
Value is css value

**Signature**

```ts
export type Node<T extends CssProperties> = Record<string, T>
```

**Example**

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

Added in v0.2.0

# ThemeNode (type alias)

The Type contains Node and Theme

**Signature**

```ts
export type ThemeNode<O extends CssProperties, T extends CssTheme> = { data: Node<O>; theme?: T }
```

Added in v0.2.0

# chainNode (function)

chain Node<A> to Node<B>

**Signature**

```ts

export const chainNode = <B extends CssProperties>(m: Monoid<Node<B>> = getMonoid()) =>
    <A extends CssProperties>
        (f: (key: string, value: A) => Node<B>) => (a: Node<A>): Node<B> => ...

```

Added in v0.2.0

# map (export)

**Signature**

```ts
typeof R.map
```

Added in v0.2.0

# mapWithIndex (export)

**Signature**

```ts
typeof R.mapWithIndex
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
typeof R.reduceRightWithIndex
```

Added in v0.2.0

# reduceWithIndex (export)

**Signature**

```ts
typeof R.reduceWithIndex
```

Added in v0.2.0
