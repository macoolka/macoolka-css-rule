---
title: StandRule.ts
nav_order: 6
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [RuleValue (type alias)](#rulevalue-type-alias)
- [RuleValueFunction (type alias)](#rulevaluefunction-type-alias)
- [StandRule (type alias)](#standrule-type-alias)
- [parse (function)](#parse-function)

---

# RuleValue (type alias)

Rule Param

**Signature**

```ts
export type RuleValue<S extends CssProperties, K extends keyof S, T extends CssTheme> = {
  value: NonNullable<S[K]>
  name: K
  theme: T
  source: S
}
```

**Example**

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

Added in v0.2.0

# RuleValueFunction (type alias)

Rule Map Function

**Signature**

```ts
export type RuleValueFunction<
  I extends CssProperties,
  K extends keyof I,
  T extends CssTheme,
  O extends CssProperties
> = (a: RuleValue<I, K, T>) => CssNode<O>
```

**Example**

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

Added in v0.2.0

# StandRule (type alias)

Stand Rule
Define a map rule that map A To B

**Signature**

```ts
export type StandRule<S extends CssProperties, O extends CssProperties, T extends CssTheme> = {
  [K in keyof S]: RuleValueFunction<S, K, T, O> | CssNode<O>
}
```

**Example**

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

Added in v0.2.0

# parse (function)

Parse Stand Rule,repalce input's property name with define property

**Signature**

```ts

export const parse = <T extends CssTheme>(
    themeDefaultValue: T, nameMonoid: Monoid<string> = monoidString
) => <S extends CssProperties, O extends CssProperties>
        (rule: StandRule<S, O, T>) =>
        ({ data, theme }: ThemeNode<Input<S, O>, T>): ThemeNode<O, T> => ...

```

Added in v0.2.0
