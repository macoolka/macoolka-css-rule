/**
 * @file
 */
import { CssNode } from './CssNode';
import { mapValues, get } from 'macoolka-object';
import { isFunction, isString, isNumber } from 'macoolka-predicate';
import { RuleValue, StandRule, parse as _parse } from './StandRule';
import { Monoid, monoidString, fold as _fold } from 'fp-ts/lib/Monoid';

/**
 * Define a Enum Rule
 * @desczh
 * 定义一个规则用枚举结构
 * @since 0.2.0
 * 
 */
export type EnumRule<E extends object, O extends object, T extends object> = {
    [K in keyof E]: {
        [name in NonNullable<E[K] extends string ? E[K] : never>]: ((a: {
            value: NonNullable<E[K]>,
            name: K,
            theme: T,
            source: E,
        }) => CssNode<O>) | CssNode<O>;
    };
};
/**
 * 
 * @since 0.2.0
 */
export const enumRuleToStandRule =
    <E extends object, O extends object, T extends object>
        (ruleEnum: EnumRule<E, O, T>) =>
        mapValues(ruleEnum, a => {
            const fn = (b: RuleValue<E, keyof E, T>): CssNode<O> => {
                if (isString(b.value) || isNumber(b.value)) {
                    if (isFunction(get(a, b.value))) {
                        return (get(a, b.value))(b);
                    }

                    return get(a, b.value);
                }
                return ({}) as CssNode<O>
            };
            return fn;
        }) as StandRule<E, O, T>;
/**
 * Parse Enum Rule,repalce input's property name with define property 
 * @desczh
 * 解析标准规则,用规则中的属性值替换规则中的属性名
 * @since 0.2.0
 */
export const parse = <T extends object>(
    themeDefaultValue: T, nameMonoid: Monoid<string> = monoidString
) => <I extends object, O extends object>
        (rule: EnumRule<I, O, T>) =>
        _parse(themeDefaultValue, nameMonoid)(enumRuleToStandRule(rule));
