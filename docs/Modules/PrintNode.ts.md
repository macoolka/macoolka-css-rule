---
title: PrintNode.ts
nav_order: 4
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [PrintNode (type alias)](#printnode-type-alias)
- [printNodeToString (constant)](#printnodetostring-constant)
- [cssNodeToPrintNode (function)](#cssnodetoprintnode-function)

---

# PrintNode (type alias)

The Print Css Node

**Signature**

```ts
export type PrintNode<T extends object> = T & {
  selector?: [string, CssNode<T>][]
  media?: [string, [string, CssNode<T>][]][]
}
```

**Example**

```ts
import { printNodeToString, PrintNode } from '../PrintNode'
const node: PrintNode<any> = {
  color: 'red',
  marginTop: '12px',
  marginLeft: '1px',
  selector: [
    [
      '$:hover',
      {
        color: 'green',
        marginTop: '20px',
        marginLeft: '21px'
      }
    ],
    [
      '$:focus',
      {
        color: 'blue',
        marginTop: '2px',
        marginLeft: '3px'
      }
    ]
  ],
  media: [
    [
      '@media screen and (max-width: 120em)',
      [
        [
          '$:hover',
          {
            color: 'red',
            marginTop: '20px',
            marginLeft: '21px'
          }
        ],
        [
          '$:focus',
          {
            color: 'blue',
            marginTop: '2px',
            marginLeft: '3px'
          }
        ]
      ]
    ]
  ]
}
```

Added in v0.2.0

# printNodeToString (constant)

PrintNode to string

**Signature**

```ts

export const printNodeToString: (a: PrintNode<object>) => string = ...

```

Added in v0.2.0

# cssNodeToPrintNode (function)

CssNode to PrintNode

**Signature**

```ts

export const cssNodeToPrintNode = <T extends object>(a: CssNode<T>): PrintNode<T> => ...

```

Added in v0.2.0
