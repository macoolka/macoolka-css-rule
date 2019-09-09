---
title: Rule.ts
nav_order: 5
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [ExtendRuleModule (interface)](#extendrulemodule-interface)
- [ParseRule (interface)](#parserule-interface)
- [RuleModule (interface)](#rulemodule-interface)
- [ExtendRule (type alias)](#extendrule-type-alias)
- [GetRuleInput (type alias)](#getruleinput-type-alias)
- [GetRuleOTheme (type alias)](#getruleotheme-type-alias)
- [GetRuleOutput (type alias)](#getruleoutput-type-alias)
- [GetRuleProp (type alias)](#getruleprop-type-alias)
- [GetRuleSTheme (type alias)](#getrulestheme-type-alias)
- [GetRuleTheme (type alias)](#getruletheme-type-alias)
- [ParseProp (type alias)](#parseprop-type-alias)
- [ParseString (type alias)](#parsestring-type-alias)
- [Rule (type alias)](#rule-type-alias)
- [extendRuleModule (function)](#extendrulemodule-function)
- [foldRuleModule (function)](#foldrulemodule-function)
- [parse (function)](#parse-function)
- [parseProp (function)](#parseprop-function)
- [parseRule (function)](#parserule-function)
- [Input (export)](#input-export)
- [InputNode (export)](#inputnode-export)
- [dataToInputNode (export)](#datatoinputnode-export)
- [inputNodeToData (export)](#inputnodetodata-export)

---

# ExtendRuleModule (interface)

Build a RuleModule From other RuleModule

**Signature**

```ts
interface ExtendRuleModule {}
```

Added in v0.2.0

# ParseRule (interface)

Parse RuleModule to ThemeNode

**Signature**

```ts
interface ParseRule {}
```

Added in v0.2.0

# RuleModule (interface)

Rule Module include a rule and default theme and next RuleModule.
The Parse order is rule > next

**Signature**

```ts
interface RuleModule {
  next?: RuleModule<N>
  rule: R
  theme: T
}
```

Added in v0.2.0

# ExtendRule (type alias)

**Signature**

```ts
export type ExtendRule<R extends Rule, S extends CssProperties, E extends object = {}, T extends CssTheme = {}> = Rule<
  S,
  E,
  GetRuleProp<R>,
  T,
  GetRuleTheme<R>
>
```

Added in v0.2.0

# GetRuleInput (type alias)

Get input type from Rule.E & S

**Signature**

```ts
export type GetRuleInput<R extends Rule> = NonNullable<R['_I']>
```

Added in v0.2.0

# GetRuleOTheme (type alias)

Get Parent Theme type from Rule.

**Signature**

```ts
export type GetRuleOTheme<R extends Rule> = NonNullable<R['_OT']>
```

Added in v0.2.0

# GetRuleOutput (type alias)

Get output type from Rule.

**Signature**

```ts
export type GetRuleOutput<R extends Rule> = NonNullable<R['_O']>
```

Added in v0.2.0

# GetRuleProp (type alias)

Properties is css properties's type

**Signature**

```ts
export type GetRuleProp<R extends Rule> = NonNullable<R['_P']>
```

Added in v0.2.0

# GetRuleSTheme (type alias)

Get Self Theme type from Rule.

**Signature**

```ts
export type GetRuleSTheme<R extends Rule> = NonNullable<R['_ST']>
```

Added in v0.2.0

# GetRuleTheme (type alias)

Get Theme type from Rule.

**Signature**

```ts
export type GetRuleTheme<R extends Rule> = NonNullable<R['_T']>
```

Added in v0.2.0

# ParseProp (type alias)

Parse RuleModule to CssThemeNode

**Signature**

```ts
export type ParseProp = <R extends Rule>(
  rules: RuleModule<R>
) => (value: CssThemeNode<GetRuleProp<R>, GetRuleTheme<R>>) => GetRuleOutput<R>
```

Added in v0.2.0

# ParseString (type alias)

Parse RuleModule to css string

**Signature**

```ts
export type ParseString = <R extends Rule>(
  rules: RuleModule<R>
) => (value: CssThemeNode<Input<GetRuleInput<R>, GetRuleOutput<R>>, GetRuleTheme<R>>) => string
```

Added in v0.2.0

# Rule (type alias)

The define rule how covert from a properties type to another properties type

**Signature**

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

Added in v0.2.0

# extendRuleModule (function)

**Signature**

```ts

export const extendRuleModule: ExtendRuleModule = a => b => ...

```

Added in v0.2.0

# foldRuleModule (function)

Fold some RuleModule that extend same RuleModule

**Signature**

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

Added in v0.2.0

# parse (function)

**Signature**

```ts

export const parse: ParseString = rule => value => ...

```

Added in v0.2.0

# parseProp (function)

**Signature**

```ts

export const parseProp: ParseProp = rule => value => ...

```

Added in v0.2.0

# parseRule (function)

**Signature**

```ts

export const parseRule: ParseRule = ({ rule, theme = {}, next }) => (value) => ...

```

Added in v0.2.0

# Input (export)

**Signature**

```ts
any
```

Added in v0.2.0

# InputNode (export)

**Signature**

```ts
any
```

Added in v0.2.0

# dataToInputNode (export)

**Signature**

```ts

<O extends object, T extends object>(input: ThemeNode<O, T>) => CssThemeNode<O, T>

```

Added in v0.2.0

# inputNodeToData (export)

**Signature**

```ts

<P extends object, T extends object>(a: CssThemeNode<P, T>) => ThemeNode<P, T>

```

Added in v0.2.0
