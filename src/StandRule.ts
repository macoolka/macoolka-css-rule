/**
 * @file
 */

import { chainNode,Node,ThemeNode,CssProperties,CssTheme } from './Node';
import { CssNode, cssNodeToNode,  Input } from './CssNode';
import { get, pick, omit, merge, cloneDeep,getFold,getMonoid } from 'macoolka-object';
import {record} from 'fp-ts/lib/Record'
import { Monoid, monoidString, fold as _fold } from 'fp-ts/lib/Monoid';
import { array as A } from 'macoolka-collection';
import { isFunction, } from 'macoolka-predicate';
import { arrayCompare } from 'macoolka-compare';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

/**
 * Rule Param
 * @desczh
 * 规则参数
 * @example
 * type Input = {
 *    A?: number,
 *    B?: string
 * }
 * type Theme = {
 *    color: string
 * }
 * type RuleParam=RuleValue<Input,'A',Theme>
 * //output type
 * type RuleParam = {
 *   value: number;
 *   name: "A";
 *   theme: Theme;
 *   source: Input;
 * }
 */
export type RuleValue<S extends CssProperties, K extends keyof S, T extends CssTheme> = {
    value: NonNullable<S[K]>,
    name: K,
    theme: T,
    source: S,
};
/**
 * Rule Map Function
 * @desczh
 * 规则映射函数
 * @example
type Input = {
    A?: number,
    B?: string
}
type Theme = {
    color: string
}
type RuleParam = RuleValue<Input, 'A', Theme>
type RuleParam = {
    value: number;
    name: "A";
    theme: Theme;
    source: Input;
}
type Output = {
    width?: string | number,
    color?: string;
    padding?: string | number,
}
type RuleValueFunctionA=RuleValueFunction<Input,'A',Theme,Output>
//output type
type RuleValueFunctionA = (a: RuleValue<Input, "A", Theme>) => SNode<Output>
 */
export type RuleValueFunction<I extends CssProperties,
    K extends keyof I, T extends CssTheme, O extends CssProperties> =
    (a: RuleValue<I, K, T>) => CssNode<O>;
/**
 * Stand Rule 
 * Define a map rule that map A To B 
 * @desczh
 * 标准规则
 * 定义一个映射规则(A=>B)
 * @example
 * 
 type Input = {
    A?: number,
    B?: string
}
type Theme = {
    color: string
}
type RuleParam = RuleValue<Input, 'A', Theme>
type RuleParam = {
    value: number;
    name: "A";
    theme: Theme;
    source: Input;
}
type Output = {
    width?: string | number,
    color?: string;
    padding?: string | number,
}
type StandRuleI = StandRule<Input,Output, Theme>
type StandRuleI = {
    A?: CssNode<Output> | RuleValueFunction<Input, "A", Theme, Output> | undefined;
    B?: CssNode<Output> | RuleValueFunction<Input, "B", Theme, Output> | undefined;
}
 */
export type StandRule<S extends CssProperties, O extends CssProperties, T extends CssTheme> = {
    [K in keyof S]: RuleValueFunction<S, K, T, O> | CssNode<O>
};
/**
 * Parse Stand Rule,repalce input's property name with define property 
 * @desczh
 * 解析标准规则,用规则中的属性值替换规则中的属性名
 * @since 0.2.0
 */
export const parse = <T extends CssTheme>(
    themeDefaultValue: T, nameMonoid: Monoid<string> = monoidString
) => <S extends CssProperties, O extends CssProperties>
        (rule: StandRule<S, O, T>) =>
        ({ data, theme }: ThemeNode<Input<S, O>, T>): ThemeNode<O, T> => {
            //calculate theme
            theme = merge({}, cloneDeep(themeDefaultValue), cloneDeep(theme))
            const ruleKeys = Object.keys(rule);
            /**
             * split to rule keys and original keys
             */
            const leftRight = record.partition(data, a => {
                return arrayCompare().contains_some(Object.keys(a))(ruleKeys)
            })
            const left = leftRight.left as Node<O>;
            const monoidNodeO = getMonoid<Node<O>>();
            const foldO = getFold<Node<O>>();
            const leftMap: Node<O>[] = [];
            const rightResult = pipe(
                leftRight.right,
                chainNode<O>()((tag, a) => {
                    const ruleValues = pick(a, ruleKeys);
                    const orginalValue = omit(a, ruleKeys);
                    const orginMap = { [tag]: orginalValue } as Node<O>;
                    leftMap.push(orginMap);
                    return pipe(
                        Object.entries(ruleValues),
                        A.map(([key, value]) => {
                            return pipe(
                                O.fromNullable(value),
                                O.map(_ => {
                                    return pipe(
                                        //get ruleFunction or Node<B>
                                        get(rule, key),
                                        //get Node<B>
                                        ruleValue => isFunction(ruleValue)
                                            ? ruleValue({
                                                value,
                                                name,
                                                theme,
                                                source: data,
                                            })
                                            : ruleValue,
                                        O.fromNullable,
                                        O.map(ruleValue => pipe(
                                            cssNodeToNode(ruleValue),
                                            Object.entries,
                                            A.map(([sKey, sValue]) => ({
                                                [nameMonoid.concat(tag, sKey)]: sValue,
                                            })),
                                            foldO
                                            //_=>as.push(addNameNode)

                                        )),
                                        O.getOrElse(() => monoidNodeO.empty)
                                    )

                                }),
                                O.getOrElse(() => monoidNodeO.empty)
                            )
                        }),
                        foldO
                    )

                }))

            return {
                data: foldO([rightResult, foldO(leftMap), left]),
                theme,
            };
        };


