---
title: EnumRule.ts
nav_order: 2
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [EnumRule (类型)](#enumrule-%E7%B1%BB%E5%9E%8B)
- [enumRuleToStandRule (函数)](#enumruletostandrule-%E5%87%BD%E6%95%B0)
- [parse (函数)](#parse-%E5%87%BD%E6%95%B0)

---

# EnumRule (类型)

定义一个规则用枚举结构

**签名**

```ts
export type EnumRule<E extends object, O extends object, T extends object> = {
  [K in keyof E]: {
    [name in NonNullable<E[K] extends string ? E[K] : never>]:
      | ((a: { value: NonNullable<E[K]>; name: K; theme: T; source: E }) => CssNode<O>)
      | CssNode<O>
  }
}
```

v0.2.0 中添加

# enumRuleToStandRule (函数)

**签名**

```ts

export const enumRuleToStandRule =
    <E extends object, O extends object, T extends object>
        (ruleEnum: EnumRule<E, O, T>) =>
        mapValues(ruleEnum, a => ...

```

v0.2.0 中添加

# parse (函数)

解析标准规则,用规则中的属性值替换规则中的属性名

**签名**

```ts

export const parse = <T extends object>(
    themeDefaultValue: T, nameMonoid: Monoid<string> = monoidString
) => <I extends object, O extends object>
        (rule: EnumRule<I, O, T>) => ...

```

v0.2.0 中添加
