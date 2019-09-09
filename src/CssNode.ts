/**
 * @file
 */
import { omit,  get, set, getFold } from 'macoolka-object';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold as _fold } from 'fp-ts/lib/Monoid';
import { isEmpty } from 'macoolka-predicate';
export { map, mapWithIndex, record, reduce, reduceRight, reduceWithIndex, reduceRightWithIndex } from 'fp-ts/lib/Record'
import {Node,ThemeNode,CssTheme,CssProperties} from './Node'



/**
 * The Css Node
 * @example
import {CssNode} from 'macoolka-css-rule' 
type P = { color1?: string };
type P1 = { color?: string, margin?: number };

export const c: CssNode<Input<P, P1>> = {
    color1: 'red',
    selector: {
        ':focus': {
            color1: '1',
        },
        ':focus:active': {
            margin: 5,
        },
        ':focus:disable': {
            margin: 5,
        },
        ':focus:active:disable': {
            color1: 'blue'
        },
        ':disable': {
            color1: 'yellow',
            margin: 7
        }
    }
}
 */
export type CssNode<T extends CssProperties> = T & {
    selector?: Record<string, CssNode<T>>
};
/**
 * Add Theme Property in CssNode 
 * @desczh
 * CssNode中加theme属性
 * @since 0.2.0
 */
export type CssThemeNode<P extends CssProperties, T extends CssTheme> = CssNode<P> & { theme?: T };


/**
 * Input Type overwrite Output Type
 * @desczh
 * 输入类型覆盖输出类型
 * @since 0.2.0
 */
export type Input<I extends CssProperties, O extends CssProperties> =O & I;// Partial<Overwrite<O, I>>;
/**
 * CssNode to Node
 * @desczh
 * 转换CssNode到Node
 * @since 0.2.0
 */

export const cssNodeToNode = <T extends CssProperties>(a: CssNode<T>): Node<T> => {

    const toNode = (leaf: string, as: CssNode<T>): Node<T> => ({
        [leaf]: omit(as, 'selector'),
    } as Node<T>);
    const results: Node<T>[] = [];
    const go = (fa: CssNode<T>, leafName: string): void => {
        results.push(toNode(leafName, fa));
        pipe(
            O.fromNullable(fa.selector),
            O.map(sel => {
                Object.entries(sel).map(([k, v]) => {
                    go(v, leafName + k)
                })
            })
        )

    };
    go(a, '');
    return getFold<Node<T>>()(results);
};


/**
 * CssThemeNode to ThemeNode
 * @desczh
 * 转换CssThemeNode到ThemeNode
 * @since 0.2.0
 */

export const cssThemeNodeToThemeNode = <P extends CssProperties, T extends CssTheme>(a: CssThemeNode<P, T>): ThemeNode<P, T> => ({
    theme: a.theme,
    data: cssNodeToNode(omit(a, 'theme') as any)
})

/**
 * ThemeNode to CssThemeNode
 * @desczh
 * 转换ThemeNode到CssThemeNode
 * @since 0.2.0
 */
export const themeNodeToCssThemeNode = <O extends CssProperties, T extends CssTheme>
    (input: ThemeNode<O, T>): CssThemeNode<O, T> => {
    const selector = omit(input.data, '');
    const result = get(input.data, '');
    if (!isEmpty(selector)) {
        return set(result, 'selector', selector);
    }
    return result;
};
