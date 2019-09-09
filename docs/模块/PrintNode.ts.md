---
title: PrintNode.ts
nav_order: 4
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [PrintNode (类型)](#printnode-%E7%B1%BB%E5%9E%8B)
- [printNodeToString (常量)](#printnodetostring-%E5%B8%B8%E9%87%8F)
- [cssNodeToPrintNode (函数)](#cssnodetoprintnode-%E5%87%BD%E6%95%B0)

---

# PrintNode (类型)

打印 Css 节点

**签名**

```ts
export type PrintNode<T extends object> = T & {
  selector?: [string, CssNode<T>][]
  media?: [string, [string, CssNode<T>][]][]
}
```

**示例**

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

v0.2.0 中添加

# printNodeToString (常量)

PrintNode 输出到文本

**签名**

```ts

export const printNodeToString: (a: PrintNode<object>) => string = ...

```

v0.2.0 中添加

# cssNodeToPrintNode (函数)

CssNode to PrintNode

**签名**

```ts

export const cssNodeToPrintNode = <T extends object>(a: CssNode<T>): PrintNode<T> => ...

```

v0.2.0 中添加
