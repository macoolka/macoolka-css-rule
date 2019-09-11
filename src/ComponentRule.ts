/**
 * @file
 */
import {

    Rule,
    RuleModule
} from './Rule';

import { StandardProperties, SvgProperties, VendorLonghandProperties } from 'csstype';

/**
 * The Provide MDN CssProperties
 * @since 0.2.0
 */
export type BaseProps = StandardProperties<string> & SvgProperties<string> & VendorLonghandProperties<string>;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export type RemoveBaseProps<T> = Omit<T, keyof BaseProps>
/**
 * Define a Component Rule
 * @desczh
 * 定义一个组件规则
 * @since 0.2.0
 */
export type ComponentRule<
    S extends object = {},
    E extends object = {},
    Tag extends keyof JSX.IntrinsicElements = 'div',
    O extends object = {},
    T extends object = {},
    OT extends object = {}>
    = Rule<S, E, O, T, OT> & {
        displayName: string,
        tag: Tag,
        defaultProps: S&E,
    }
export type ComponentRuleAny = ComponentRule<any, any, any, any, any, any>
/**
 * Build a Componet Rule from base Component Rule
 * @desczh
 * 从一个组件规则的基础上建立新组件规则
 * @since 0.2.0
 */
/* export type ExtendComponentRule<
    S extends CssProperties = {},
    E extends CssProperties = {},
    TTag extends keyof JSX.IntrinsicElements = 'div',
    R extends ComponentRuleAny = typeof standComponentRule,
    T extends CssTheme = {}>
    = ComponentRule<S, E, TTag, GetRuleProp<R>, T, GetRuleTheme<R>> */
/**
 * Component Module include a ComponentRule and next ComponentModule and Theme
 * @desczh
 * 组件模块包括组件规则和前一个组件规则以及Thmeme
 * @since 0.2.0
 */
export interface ComponentModule<
    S extends object = {},
    E extends object = {},
    Tag extends keyof JSX.IntrinsicElements = 'div',
    O extends object = {},
    T extends object = {},
    OT extends object = {}> {
    theme: OT & T,
    rule: ComponentRule<S, E, Tag, O, T, OT>
    next?: ComponentModuleAny
}
export const fromRuleModule =
    <
        S extends object = {},
        E extends object = {},
        O extends object = {},
        T extends object = {},
        OT extends object = {}>
        (a: RuleModule<S, E, O, T, OT>) =>
        <Tag extends keyof JSX.IntrinsicElements = 'div'>
            (b: {
                displayName: string,
                tag: Tag,
                defaultProps:  E & S
            }): ComponentModule<S, E, Tag, O, T, OT> => ({
                theme: a.theme,
                rule: {
                    ...a.rule,
                    ...b,
                },
                next: {
                    ...a.next,
                } as any
            })
export type ComponentModuleAny = ComponentModule<any, any, any, any, any, any>
export interface ComponentModuleInput<
    S extends object = {},
    E extends object = {},
    Tag extends keyof JSX.IntrinsicElements = 'div',
    O extends object = {},
    T extends object = {},
    OT extends object = {}> {
    theme: T,
    rule: ComponentRule<S, E, Tag, O, T, OT>

}

/**
 * Build a Componet Module from base Component Module
 * @desczh
 * 从一个组建模块的基础上建立新组件模块
 * @since 0.2.0
 */
export interface ExtendComponentModule {
    <S extends object = {},
        E extends object = {},
        Tag extends keyof JSX.IntrinsicElements = 'div',
        O extends object = {},
        T extends object = {},
        OT extends object = {}>(n: ComponentModule<S, E, Tag, O, T, OT>):
        <SB extends object = {},
            EB extends object = {},
            TagB extends keyof JSX.IntrinsicElements = 'div',
            TB extends object = {},
            >(b: ComponentModuleInput<SB, EB, TagB, O & E & S, TB, OT & T>) => ComponentModule<SB, EB, TagB, O & E & S, TB, OT & T>
}
/**
 * Build a Componet Module from base Component Module(Theme is {})
 * @desczh
 * 从一个组建模块的基础上建立新组件模块(Theme is {})
 * @since 0.2.0
 */
export interface ExtendComponentModuleNoTheme {
    <S extends object = {},
        E extends object = {},
        Tag extends keyof JSX.IntrinsicElements = 'div',
        O extends object = {},
        T extends object = {},
        OT extends object = {}>(n: ComponentModule<S, E, Tag, O, T, OT>):
        <SB extends object = {},
            EB extends object = {},
            TagB extends keyof JSX.IntrinsicElements = 'div',
            >(b: ComponentRule<SB, EB, TagB, O & E & S, {}, OT & T>) => ComponentModule<SB, EB, TagB, O & E & S, {}, OT & T>
}
/**
 * 
 * @since 0.2.0
 */
export const extendComponentModule: ExtendComponentModule = a => b =>
    ({
        rule: b.rule,
        theme: {
            ...a.theme,
            ...b.theme,
        },
        next: a
    })
/**
 * 
 * @since 0.2.0
 */
export const extendComponentModuleNoTheme: ExtendComponentModuleNoTheme = a => b =>
    ({
        rule: b,
        theme: {
            ...a.theme,
        },
        next: a
    })





