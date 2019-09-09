---
title: EnumRule.ts
nav_order: 2
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [EnumRule (type alias)](#enumrule-type-alias)
- [enumRuleToStandRule (function)](#enumruletostandrule-function)
- [parse (function)](#parse-function)

---

# EnumRule (type alias)

Define a Enum Rule

**Signature**

```ts
export type EnumRule<E extends object, O extends object, T extends object> = {
  [K in keyof E]: {
    [name in NonNullable<E[K] extends string ? E[K] : never>]:
      | ((a: { value: NonNullable<E[K]>; name: K; theme: T; source: E }) => CssNode<O>)
      | CssNode<O>
  }
}
```

Added in v0.2.0

# enumRuleToStandRule (function)

**Signature**

```ts

export const enumRuleToStandRule =
    <E extends object, O extends object, T extends object>
        (ruleEnum: EnumRule<E, O, T>) =>
        mapValues(ruleEnum, a => ...

```

Added in v0.2.0

# parse (function)

Parse Enum Rule,repalce input's property name with define property

**Signature**

```ts

export const parse = <T extends object>(
    themeDefaultValue: T, nameMonoid: Monoid<string> = monoidString
) => <I extends object, O extends object>
        (rule: EnumRule<I, O, T>) => ...

```

Added in v0.2.0
