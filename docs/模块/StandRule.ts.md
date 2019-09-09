---
title: StandRule.ts
nav_order: 6
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [RuleValue (类型)](#rulevalue-%E7%B1%BB%E5%9E%8B)
- [RuleValueFunction (类型)](#rulevaluefunction-%E7%B1%BB%E5%9E%8B)
- [StandRule (类型)](#standrule-%E7%B1%BB%E5%9E%8B)
- [parse (函数)](#parse-%E5%87%BD%E6%95%B0)

---

# RuleValue (类型)

规则参数

**签名**

```ts
export type RuleValue<S extends CssProperties, K extends keyof S, T extends CssTheme> = {
  value: NonNullable<S[K]>
  name: K
  theme: T
  source: S
}
```

**示例**

```ts
type Input = {
  A?: number
  B?: string
}
type Theme = {
  color: string
}
type RuleParam = RuleValue<Input, 'A', Theme>
//output type
type RuleParam = {
  value: number
  name: 'A'
  theme: Theme
  source: Input
}
```

v0.2.0 中添加

# RuleValueFunction (类型)

规则映射函数

**签名**

```ts
export type RuleValueFunction<
  I extends CssProperties,
  K extends keyof I,
  T extends CssTheme,
  O extends CssProperties
> = (a: RuleValue<I, K, T>) => CssNode<O>
```

**示例**

```ts
type Input = {
  A?: number
  B?: string
}
type Theme = {
  color: string
}
type RuleParam = RuleValue<Input, 'A', Theme>
type RuleParam = {
  value: number
  name: 'A'
  theme: Theme
  source: Input
}
type Output = {
  width?: string | number
  color?: string
  padding?: string | number
}
type RuleValueFunctionA = RuleValueFunction<Input, 'A', Theme, Output>
//output type
type RuleValueFunctionA = (a: RuleValue<Input, 'A', Theme>) => SNode<Output>
```

v0.2.0 中添加

# StandRule (类型)

标准规则
定义一个映射规则(A=>B)

**签名**

```ts
export type StandRule<S extends CssProperties, O extends CssProperties, T extends CssTheme> = {
  [K in keyof S]: RuleValueFunction<S, K, T, O> | CssNode<O>
}
```

**示例**

```ts
type Input = {
  A?: number
  B?: string
}
type Theme = {
  color: string
}
type RuleParam = RuleValue<Input, 'A', Theme>
type RuleParam = {
  value: number
  name: 'A'
  theme: Theme
  source: Input
}
type Output = {
  width?: string | number
  color?: string
  padding?: string | number
}
type StandRuleI = StandRule<Input, Output, Theme>
type StandRuleI = {
  A?: CssNode<Output> | RuleValueFunction<Input, 'A', Theme, Output> | undefined
  B?: CssNode<Output> | RuleValueFunction<Input, 'B', Theme, Output> | undefined
}
```

v0.2.0 中添加

# parse (函数)

解析标准规则,用规则中的属性值替换规则中的属性名

**签名**

```ts

export const parse = <T extends CssTheme>(
    themeDefaultValue: T, nameMonoid: Monoid<string> = monoidString
) => <S extends CssProperties, O extends CssProperties>
        (rule: StandRule<S, O, T>) =>
        ({ data, theme }: ThemeNode<Input<S, O>, T>): ThemeNode<O, T> => ...

```

v0.2.0 中添加
