---
title: Rule.ts
nav_order: 5
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [ExtendRuleModule (接口)](#extendrulemodule-%E6%8E%A5%E5%8F%A3)
- [ParseRule (接口)](#parserule-%E6%8E%A5%E5%8F%A3)
- [RuleModule (接口)](#rulemodule-%E6%8E%A5%E5%8F%A3)
- [ExtendRule (类型)](#extendrule-%E7%B1%BB%E5%9E%8B)
- [GetRuleInput (类型)](#getruleinput-%E7%B1%BB%E5%9E%8B)
- [GetRuleOTheme (类型)](#getruleotheme-%E7%B1%BB%E5%9E%8B)
- [GetRuleOutput (类型)](#getruleoutput-%E7%B1%BB%E5%9E%8B)
- [GetRuleProp (类型)](#getruleprop-%E7%B1%BB%E5%9E%8B)
- [GetRuleSTheme (类型)](#getrulestheme-%E7%B1%BB%E5%9E%8B)
- [GetRuleTheme (类型)](#getruletheme-%E7%B1%BB%E5%9E%8B)
- [ParseProp (类型)](#parseprop-%E7%B1%BB%E5%9E%8B)
- [ParseString (类型)](#parsestring-%E7%B1%BB%E5%9E%8B)
- [Rule (类型)](#rule-%E7%B1%BB%E5%9E%8B)
- [extendRuleModule (函数)](#extendrulemodule-%E5%87%BD%E6%95%B0)
- [foldRuleModule (函数)](#foldrulemodule-%E5%87%BD%E6%95%B0)
- [parse (函数)](#parse-%E5%87%BD%E6%95%B0)
- [parseProp (函数)](#parseprop-%E5%87%BD%E6%95%B0)
- [parseRule (函数)](#parserule-%E5%87%BD%E6%95%B0)
- [Input (导出)](#input-%E5%AF%BC%E5%87%BA)
- [InputNode (导出)](#inputnode-%E5%AF%BC%E5%87%BA)
- [dataToInputNode (导出)](#datatoinputnode-%E5%AF%BC%E5%87%BA)
- [inputNodeToData (导出)](#inputnodetodata-%E5%AF%BC%E5%87%BA)

---

# ExtendRuleModule (接口)

以一个 RuleModule 为基础，建立新的 RuleModule

**签名**

```ts
interface ExtendRuleModule {}
```

v0.2.0 中添加

# ParseRule (接口)

解析 RuleModule 到 ThemeNode

**签名**

```ts
interface ParseRule {}
```

v0.2.0 中添加

# RuleModule (接口)

Rule Module 包含一个规则和缺省的 Theme 以及父规则
解析的顺序是 规则>父规则

**签名**

```ts
interface RuleModule {
  next?: RuleModule<N>
  rule: R
  theme: T
}
```

v0.2.0 中添加

# ExtendRule (类型)

**签名**

```ts
export type ExtendRule<R extends Rule, S extends CssProperties, E extends object = {}, T extends CssTheme = {}> = Rule<
  S,
  E,
  GetRuleProp<R>,
  T,
  GetRuleTheme<R>
>
```

v0.2.0 中添加

# GetRuleInput (类型)

得到 Rule 中的输入属性.E & S

**签名**

```ts
export type GetRuleInput<R extends Rule> = NonNullable<R['_I']>
```

v0.2.0 中添加

# GetRuleOTheme (类型)

得到 Rule 中的父 Theme 类型.

**签名**

```ts
export type GetRuleOTheme<R extends Rule> = NonNullable<R['_OT']>
```

v0.2.0 中添加

# GetRuleOutput (类型)

得到 Rule 中的输出类型.

**签名**

```ts
export type GetRuleOutput<R extends Rule> = NonNullable<R['_O']>
```

v0.2.0 中添加

# GetRuleProp (类型)

Properties is css properties's type

**签名**

```ts
export type GetRuleProp<R extends Rule> = NonNullable<R['_P']>
```

v0.2.0 中添加

# GetRuleSTheme (类型)

得到 Rule 中的本身 Theme 类型.

**签名**

```ts
export type GetRuleSTheme<R extends Rule> = NonNullable<R['_ST']>
```

v0.2.0 中添加

# GetRuleTheme (类型)

得到 Rule 中的 Theme 类型.

**签名**

```ts
export type GetRuleTheme<R extends Rule> = NonNullable<R['_T']>
```

v0.2.0 中添加

# ParseProp (类型)

解析 RuleModule 到 CssThemeNode

**签名**

```ts
export type ParseProp = <R extends Rule>(
  rules: RuleModule<R>
) => (value: CssThemeNode<GetRuleProp<R>, GetRuleTheme<R>>) => GetRuleOutput<R>
```

v0.2.0 中添加

# ParseString (类型)

解析 RuleModule 到 css 文本

**签名**

```ts
export type ParseString = <R extends Rule>(
  rules: RuleModule<R>
) => (value: CssThemeNode<Input<GetRuleInput<R>, GetRuleOutput<R>>, GetRuleTheme<R>>) => string
```

v0.2.0 中添加

# Rule (类型)

定义了一个规则，转换 A 的全部属性名到 B

**签名**

```ts
export type Rule<
  S extends object = {},
  E extends object = {},
  O extends object = {},
  T extends object = {},
  OT extends object = {}
> = {
  readonly _E?: E
  readonly _S?: S
  readonly _I?: E & S
  readonly _ST?: T
  readonly _T?: OT & T
  readonly _OT?: OT
  readonly _O?: O
  readonly _P?: Input<E & S, O>
  /**
   * stand rule
   */
  rule?: StandRule<S, O, T>
  /**
   * enum rule
   */
  ruleEnum?: EnumRule<E, O, T>
  /**
   * default style
   */
  style?: CssNode<O>
}
```

v0.2.0 中添加

# extendRuleModule (函数)

**签名**

```ts

export const extendRuleModule: ExtendRuleModule = a => b => ...

```

v0.2.0 中添加

# foldRuleModule (函数)

合并以同一个 RuleModule 为基础的 RuleModule 数组到 RuleModule

**签名**

```ts

export const foldRuleModule=<R extends Rule = Rule>()=><N extends Rule>(as:NonEmptyArray<RuleModule<any,N>>):RuleModule<R,N>=>{
   const folds= getFold()(as)
   return{
       rule:folds.rule,
       theme:folds.theme,
       next:as[0].next
   }
} => ...

```

v0.2.0 中添加

# parse (函数)

**签名**

```ts

export const parse: ParseString = rule => value => ...

```

v0.2.0 中添加

# parseProp (函数)

**签名**

```ts

export const parseProp: ParseProp = rule => value => ...

```

v0.2.0 中添加

# parseRule (函数)

**签名**

```ts

export const parseRule: ParseRule = ({ rule, theme = {}, next }) => (value) => ...

```

v0.2.0 中添加

# Input (导出)

**签名**

```ts
any
```

v0.2.0 中添加

# InputNode (导出)

**签名**

```ts
any
```

v0.2.0 中添加

# dataToInputNode (导出)

**签名**

```ts

<O extends object, T extends object>(input: ThemeNode<O, T>) => CssThemeNode<O, T>

```

v0.2.0 中添加

# inputNodeToData (导出)

**签名**

```ts

<P extends object, T extends object>(a: CssThemeNode<P, T>) => ThemeNode<P, T>

```

v0.2.0 中添加
