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
import { NonEmptyArray } from 'macoolka-typescript'
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
export type GetRuleProp<R extends AnyRule> = NonNullable<R['_P']>
/**
 * Get Theme type from Rule.
 * @desczh
 * 得到Rule中的Theme类型.
 * @since 0.2.0
 */
export type GetRuleTheme<R extends AnyRule> = NonNullable<R['_T']>
/**
 * Get Self Theme type from Rule.
 * @desczh
 * 得到Rule中的本身Theme类型.
 * @since 0.2.0
 */
export type GetRuleSTheme<R extends AnyRule> = NonNullable<R['_ST']>
/**
 * Get Parent Theme type from Rule.
 * @desczh
 * 得到Rule中的父Theme类型.
 * @since 0.2.0
 */
export type GetRuleOTheme<R extends AnyRule> = NonNullable<R['_OT']>
/**
 * Get input type from Rule.E & S
 * @desczh
 * 得到Rule中的输入属性.E & S
 * @since 0.2.0
 */
export type GetRuleInput<R extends AnyRule> = NonNullable<R['_I']>
/**
 * Get output type from Rule.
 * @desczh
 * 得到Rule中的输出类型.
 * @since 0.2.0
 */
export type GetRuleOutput<R extends AnyRule> = NonNullable<R['_O']>


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

/**
 * Rule Module include a rule and default theme and next RuleModule.
 * The Parse order is rule > next
 * @desczh
 * Rule Module 包含一个规则和缺省的Theme以及父规则
 * 解析的顺序是 规则>父规则
 * @since 0.2.0
 */
export type RuleModule<R extends AnyRule = AnyRule, N extends AnyRule = AnyRule, T extends CssTheme = GetRuleTheme<R>>= {
    theme: T,
    rule: R
    next?: RuleModule<N>
}
/**
 * Build a RuleModule From other RuleModule
 * @desczh
 * 以一个RuleModule为基础，建立新的RuleModule
 * @.2.0
 */

export interface ExtendRuleModule {
    <RA extends AnyRule>(n: RuleModule<RA>):
        <RB extends AnyRule>(b: RuleModule<RB, never, GetRuleSTheme<RB>>) => RuleModule<RB>
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
 * Fold some RuleModule that extend same RuleModule
 * @desczh
 * 合并以同一个RuleModule为基础的RuleModule数组到RuleModule
 * @since 0.2.0
 */
export const foldRuleModule = <R extends AnyRule = AnyRule>() =>
    <N extends AnyRule>(as: NonEmptyArray<RuleModule<AnyRule, N>>): RuleModule<R, N> => {
        const folds = getFold()(as)
        return {
            rule: folds.rule,
            theme: folds.theme,
            next: as[0].next
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
    <R extends AnyRule = AnyRule>(input: RuleModule<R>):
        (value: ThemeNode<Input<GetRuleInput<R>, GetRuleOutput<R>>, GetRuleTheme<R>>)
            => ThemeNode<GetRuleOutput<R>, GetRuleTheme<R>>
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
    <R extends AnyRule>(rules: RuleModule<R>) =>
        (value: CssThemeNode<GetRuleProp<R>, GetRuleTheme<R>>) => GetRuleOutput<R>

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
    <R extends AnyRule>(rules: RuleModule<R>) =>
        (value: CssThemeNode<Input<GetRuleInput<R>, GetRuleOutput<R>>, GetRuleTheme<R>>) => string

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

