/**
 * @file
 */
import * as O from 'fp-ts/lib/Option';
import {
    StandRule,
    parse as ruleParse,
} from './StandRule';
import { EnumRule, enumRuleToStandRule } from './EnumRule';
import { fold as _fold } from 'fp-ts/lib/Monoid';
import { ThemeNode, CssProperties, CssTheme } from './Node'
import { cssNodeToPrintNode, printNodeToString } from './PrintNode';
import {
    CssNode, cssNodeToNode, CssThemeNode, Input, themeNodeToCssThemeNode,
    cssThemeNodeToThemeNode,
} from './CssNode';
import { pipe } from 'fp-ts/lib/pipeable';
import { mapPrintNode } from './utils/mapPrintNode'
export {
    themeNodeToCssThemeNode as dataToInputNode,
    cssThemeNodeToThemeNode as inputNodeToData,
    Input,
    CssThemeNode as InputNode,

};
import { getFold, getMonoid, merge } from 'macoolka-object'
/**
 * Properties is css properties's type
 * @type
 */
/**
 * Get Property type from Rule.Input<E & S, O>
 * @desczh
 * 得到Rule中的属性类型.Input<E & S, O>
 * @since 0.2.0
 */
export type GetRuleProp<R extends Rule|RuleModule> = Required<R>['_P'] 
/**
 * Get Theme type from Rule.
 * @desczh
 * 得到Rule中的Theme类型.
 * @since 0.2.0
 */
export type GetRuleTheme<R extends Rule|RuleModule> = Required<R>['_T'] 
/**
 * Get Self Theme type from Rule.
 * @desczh
 * 得到Rule中的本身Theme类型.
 * @since 0.2.0
 */
export type GetRuleSTheme<R extends Rule|RuleModule> =  Required<R>['_ST'] 
/**
 * Get Parent Theme type from Rule.
 * @desczh
 * 得到Rule中的父Theme类型.
 * @since 0.2.0
 */
export type GetRuleOTheme<R extends Rule|RuleModule> =Required<R>['_OT']
/**
 * Get input type from Rule.E & S
 * @desczh
 * 得到Rule中的输入属性.E & S
 * @since 0.2.0
 */
export type GetRuleInput<R extends Rule|RuleModule> = Required<R>['_I']
/**
 * Get output type from Rule.
 * @desczh
 * 得到Rule中的输出类型.
 * @since 0.2.0
 */
export type GetRuleOutput<R extends Rule|RuleModule> = Required<R>['_O']
//<R extends Rule<infer S,infer E,infer O,infer T,infer OT>
export type GetRuleInfer<R> = {
    S: R extends Rule<infer U, any> ? U : any
    E: R extends Rule<any, infer U> ? U : any
    O: R extends Rule<any, any, infer U> ? U : any
    T: R extends Rule<any, any, any, infer U> ? U : any
    OT: R extends Rule<any, any, any, any, infer U> ? U : any
}

/**
 * @.2.0
 */
export type ExtendRule<R extends AnyRule,
    S extends CssProperties,
    E extends object = {},
    T extends CssTheme = {}> =
    Rule<S, E, GetRuleProp<R>, T, GetRuleTheme<R>>;



/**
 * The define rule how covert from a properties type to another properties type
 * @desczh
 * 定义了一个规则，转换A的全部属性名到B
 * @since 0.2.0
 */

export type Rule<
    S extends object = {},
    E extends object = {},
    O extends object = {},
    T extends object = {},
    OT extends object = {},> = {
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
        rule?: StandRule<S, O, OT & T>,
        /**
         * enum rule
         */
        ruleEnum?: EnumRule<E, O, OT & T>,
        /**
         * default style
         */
        style?: CssNode<O>
    };
export type AnyRule = Rule<any, any, any, any, any>
const ruleToStandRule = <
    S extends object = {},
    E extends object = {},
    O extends object = {},
    T extends object = {},
    OT extends object = {}>() =>
    (rule: Rule<S, E, O, T, OT>): StandRule<S & E, O, T & OT> => {
        const b = O.fromNullable(rule.rule) as any as O.Option<StandRule<S & E, O, T & OT>>;
        const a = pipe(
            O.fromNullable(rule.ruleEnum),
            O.map(a => enumRuleToStandRule(a))
        ) as any as O.Option<StandRule<S & E, O, T & OT>>
        const m = getMonoid<StandRule<S & E, O, T & OT>>();
        return pipe(
            O.getMonoid(m).concat(a, b),
            O.getOrElse(() => m.empty
            )
        )

    };
export type RuleModule<
    S extends object = {},
    E extends object = {},
    O extends object = {},
    T extends object = {},
    OT extends object = {},

    > = {
        readonly _E?: E
        readonly _S?: S
        readonly _I?: E & S
        readonly _ST?: T
        readonly _T?: OT & T
        readonly _OT?: OT
        readonly _O?: O
        readonly _P?: Input<E & S, O> 
        theme: OT & T,
        rule: Rule<S, E, O, T, OT>
        next?: RuleModule<any, any, any, any, any>
    }
/**
 * Rule Module include a rule and default theme and next RuleModule.
 * The Parse order is rule > next
 * @desczh
 * Rule Module 包含一个规则和缺省的Theme以及父规则
 * 解析的顺序是 规则>父规则
 * @since 0.2.0
 */
export type ERuleModule<
    S extends object = {},
    E extends object = {},
    O extends object = {},
    T extends object = {},
    OT extends object = {},
    SB extends object = {},
    EB extends object = {},
    TB extends object = {},

    > = RuleModule<SB, EB, O & E & S, TB, OT & T>

/**
 * Rule Module include a rule and default theme and next RuleModule.
 * The Parse order is rule > next
 * @desczh
 * Rule Module 包含一个规则和缺省的Theme以及父规则
 * 解析的顺序是 规则>父规则
 * @since 0.2.0
 */
export type InputRuleModule<
    S extends object = {},
    E extends object = {},
    O extends object = {},
    T extends object = {},
    OT extends object = {}> = {
        theme: T
        rule: Rule<S, E, O, T, OT>

    }

/**
 * Build a RuleModule From other RuleModule
 * @desczh
 * 以一个RuleModule为基础，建立新的RuleModule
 * @.2.0
 */

export interface ExtendRuleModule {
    <
        S extends object = {},
        E extends object = {},
        O extends object = {},
        T extends object = {},
        OT extends object = {}>(n: RuleModule<S, E, O, T, OT>):
        <
            SB extends object = {},
            EB extends object = {},
            TB extends object = {},
            >(b: InputRuleModule<SB, EB, O & E & S, TB, OT & T>) =>
            ERuleModule<S, E, O, T, OT, SB, EB, TB>
}
/**
 * 
 * @since 0.2.0
 */
export const extendRuleModule: ExtendRuleModule = a => b => ({
    rule: b.rule,
    theme: {
        ...a.theme,
        ...b.theme,
    },
    next: a
})

/**
 * Build a RuleModule From other RuleModule
 * @desczh
 * 以一个RuleModule为基础，建立新的RuleModule
 * @.2.0
 */

export interface ExtendRuleModules {
    <
        S extends object = {},
        E extends object = {},
        O extends object = {},
        T extends object = {},
        OT extends object = {}>(n: RuleModule<S, E, O, T, OT>):
        <
            SB extends object = {},
            EB extends object = {},
            TB extends object = {},
            >(b: Array<RuleModule>) =>
            ERuleModule<S, E, O, T, OT, SB, EB, TB>
}
/**
 * Fold some RuleModule that extend same RuleModule
 * @desczh
 * 合并以同一个RuleModule为基础的RuleModule数组到RuleModule
 * @since 0.2.0
 */
export const foldRuleModule: ExtendRuleModules = n => as => {
    const folds = getFold()(as)
    return {
        rule: folds.rule,
        theme: folds.theme,
        next: n
    }
}
/**
 * Parse RuleModule to ThemeNode
 * @desczh
 * 解析RuleModule到ThemeNode
 * 
 * @since 0.2.0
 */
export interface ParseRule {
    <
        S extends object,
        E extends object,
        O extends object,
        T extends object,
        OT extends object>(rules: RuleModule<S, E, O, T, OT>):
        (value: ThemeNode<O & S & E, OT & T>)
            => ThemeNode<O, OT & T>
}
/**
 * 
 * @since 0.2.0
 */
export const parseRule: ParseRule = ({ rule, theme = {}, next }) => (value) => {
    let inputInput: ThemeNode<any, any> = pipe(
        O.fromNullable(rule),
        O.map(a => {
            const ruleM = ruleToStandRule()(a);
            const ruleResult = ruleParse(theme)(ruleM)(value).data;
            const b = cssNodeToNode(a.style ? a.style : {});
            return ({
                data: getFold()([b, ruleResult]),
                theme: value.theme,
            }) as ThemeNode<any, any>;
        }),
        O.getOrElse(() => value)
    )
    return next
        ? parseRule({ ...next, theme: merge({}, next.theme, theme) })(inputInput)
        : inputInput
};


/**
 * Parse RuleModule to CssThemeNode
 * @desczh
 * 解析RuleModule到CssThemeNode
 * 
 * @since 0.2.0
 */
export type ParseProp =
    <
        S extends object,
        E extends object,
        O extends object,
        T extends object,
        OT extends object>(rules: RuleModule<S, E, O, T, OT>) =>
        (value: CssThemeNode<O & S & E, OT & T>) => O

/**
 * 
 * @since 0.2.0
 */
export const parseProp: ParseProp = rule => value => pipe(
    value,
    cssThemeNodeToThemeNode,
    parseRule(rule),
    themeNodeToCssThemeNode,


)
/**
 * Parse RuleModule to css string
 * @desczh
 * 解析RuleModule到css文本
 * 
 * @since 0.2.0
 */
export type ParseString =
    <
        S extends object,
        E extends object,
        O extends object,
        T extends object,
        OT extends object>(rules: RuleModule<S, E, O, T, OT>) =>
        (value: CssThemeNode<O & S & E, OT & T>) => string

/**
 * 
 * @since 0.2.0
 */
export const parse: ParseString = rule => value => pipe(
    value,
    cssThemeNodeToThemeNode,
    parseRule(rule),
    themeNodeToCssThemeNode,
    cssNodeToPrintNode,
    mapPrintNode,
    printNodeToString,


)

