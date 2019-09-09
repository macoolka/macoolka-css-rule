import { ordString, ordNumber } from 'fp-ts/lib/Ord';
import * as A from 'fp-ts/lib/Array';
import { isNumber, isEmpty, isObject } from 'macoolka-predicate';
import { left, right } from 'fp-ts/lib/Either'
import getCommonProps from './getCommonProps';
import { mapValues, omit, cloneDeep } from 'macoolka-object'
import { pipe } from 'fp-ts/lib/pipeable'
import {
    CssNode
} from '../CssNode';
import {
    PrintNode
} from '../PrintNode';

/**
 * sort sNode for @media correct order
 * @param a 
 * @param b 
 */
export const sort = <T extends object = any>(a: [string, PrintNode<T>], b: [string, PrintNode<T>]) => {
    const a1 = getMediaInfoOrder(a[0]);
    const b1 = getMediaInfoOrder(b[0]);
    if (isNumber(a1) && isNumber(b1)) {
        return -ordNumber.compare(a1, b1)
    } else if (isNumber(a1)) {
        return 1;
    } else if (isNumber(b1)) {
        return -1;
    } else {
        return ordString.compare(a[0], b[0]);
    }
};
/**
 * remove other properties that not in base properties
 * @param a 
 */
const commonNode = <T extends object>(a: CssNode<T>): CssNode<T> => {

    const result = getCommonProps(omit(a, 'selector')) as CssNode<T>

    const selector = a.selector ? mapValues(a.selector, b => {

        return commonNode(b)
    }) : a.selector;
    if (selector) {
        result.selector = selector
    }

    return result;
}

export const mapPrintNode = <T extends object>(input: PrintNode<T>) => {
    const result = cloneDeep(input)
    const selector = result.selector;
    if (selector) {
        selector.map(a => (a[0]))
        // result=Object.assign({},omit(a,'selector'),{selector:orderSelector(selector)});
        const sortedA = selector.sort(sort);
        const mapA = pipe(
            sortedA,
            A.partitionMap(b => {
                const info = getMediaInfo(b[0]);
                return isObject(info) ? right([`@media screen and (max-width: ${info.value}em)`, [[info.name, b[1]]]]) : left(b)
            })
        )
        result.selector = mapA.left as [string, CssNode<T>][]
        result.media = mapA.right as [string, [string, CssNode<T>][]][]
    }
    return result
}
export default mapPrintNode
const mediaSelector = /^@media screen and \(max-width: (\d*)em\)([\s\S]*)/i;
export const getMediaInfo = (a: string): string | number | { value: number, name: string } => {
    const result = a.trim().match(mediaSelector);
    if (result && result.length >= 3 && result[1].length > 0) {
        const name = result[2].trim();
        if (isEmpty(name)) {
            return new Number(result[1]).valueOf()
        }
        return ({
            value: new Number(result[1]).valueOf(),
            name: result[2].trim()
        })
    }

    else if (result && result.length >= 2 && result[1].length > 0) {
        return new Number(result[1]).valueOf()
    }
    return a;
}
export const getMediaInfoOrder = (a: string): string | number | { value: number, name: string } => {
    const result = a.trim().match(mediaSelector);
    if (result && result.length >= 2 && result[1].length > 0) {
        return new Number(result[1]).valueOf()
    }
    return a;
}

