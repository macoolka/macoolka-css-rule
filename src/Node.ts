/**
 * @file
 */
import { getMonoid } from 'macoolka-object';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold as _fold, Monoid } from 'fp-ts/lib/Monoid';
import * as R from 'fp-ts/lib/Record'
export { map, mapWithIndex, record, reduce, reduceRight, reduceWithIndex, reduceRightWithIndex } from 'fp-ts/lib/Record'

/**
 * Theme Basic type
 * 
 * All Theme will extend it
 * @desczh
 * Theme的基础类型
 * 
 * 所有的Theme从这里扩展
 * @since 0.2.0
 */
export type CssTheme = object;
/**
 * Css Property Basic type
 * 
 * All Property will extend it
 * 
 * @desczh
 * Property的基础类型
 * 
 * 所有的Property从这里扩展
 * @since 0.2.0
 */
export type CssProperties = object;
/**
 * The base Node
 * Key is css selector
 * Value is css value
 * @desczh
 * 基本节点
 * Key是 css selector
 * 值是css
 * @example
   '': {
        color: 'red',
    },
    ':focus': {
        color: '1',
    },
    ':focus:active': {
        margin: 5,
    },
    ':focus:disable': {
        margin: 5,
    },
    ':focus:active:disable': {
        color: 'blue'
    }
    @since 0.2.0
 */
export type Node<T extends CssProperties> = Record<string, T>
/**
 * chain Node<A> to Node<B> 
 * @since 0.2.0
 */
export const chainNode = <B extends CssProperties>(m: Monoid<Node<B>> = getMonoid()) =>
    <A extends CssProperties>
        (f: (key: string, value: A) => Node<B>) => (a: Node<A>): Node<B> => {
            return pipe(
                a,
                R.reduceWithIndex(m.empty, (k, b, v) => {
                    return _fold(m)([b, f(k, v)])
                })
            )
        };




/**
 * The Type contains Node and Theme
 * @desczh
 * 包含Node和Theme
 * @since 0.2.0
 */
export type ThemeNode<O extends CssProperties, T extends CssTheme> = { data: Node<O>, theme?: T };



