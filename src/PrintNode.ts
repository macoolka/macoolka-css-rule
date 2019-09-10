/**
 *
 * @file
 */

import { toPairs, omit } from 'macoolka-object';
import { hyphenate } from 'macoolka-string';
import { fromNullable } from 'fp-ts/lib/Option';
import * as O from 'fp-ts/lib/Option';
import { monoidString,fold } from 'fp-ts/lib/Monoid';
import { pipe } from 'fp-ts/lib/pipeable';
import {format} from 'macoolka-prettier'
import {CssNode} from './CssNode'
/**
 * The Print Css Node
 * @desczh
 * 打印Css节点
 * @example
 import { printNodeToString,PrintNode } from '../PrintNode';
const node: PrintNode<any> = {
    color: 'red',
    marginTop: '12px',
    marginLeft: '1px',
    selector: [['$:hover', {
        color: 'green',
        marginTop: '20px',
        marginLeft: '21px',
    }], [
        '$:focus', {
            color: 'blue',
            marginTop: '2px',
            marginLeft: '3px',
        }
    ]],
    media: [
        [
            '@media screen and (max-width: 120em)',
            [
                [
                    '$:hover', {
                        color: 'red',
                        marginTop: '20px',
                        marginLeft: '21px',
                    }
                ],
                [
                    '$:focus', {
                        color: 'blue',
                        marginTop: '2px',
                        marginLeft: '3px',
                    }
                ]
            ]
        ]
    ]
}
 * @since 0.2.0
 */
export type PrintNode<T extends object> = T & {
    selector?: [string, CssNode<T>][],
    media?: [string, [string, CssNode<T>][]][],
};
/**
 * CssNode to PrintNode
 * @since 0.2.0
 */
export const cssNodeToPrintNode = <T extends object>(a: CssNode<T>): PrintNode<T> => {
    const props = omit(a, 'selector');
    const selector = a.selector ? toPairs(a.selector) : [];
    return {
        ...props,
        selector,
    } as PrintNode<T>

}
const CRLF = '\n';
const SPACE = ' ';
const indent=(i:number)=>{
    return new Array(i).join(`  `)
}

const printValue = (a: string | number) => a;
const printName = (a: string) => {
    return hyphenate()(a)
};

const printProperty = (i: number) => ([name, value]: [string, any]): string =>
    `${indent(i)}${printName(name)}:${SPACE}${printValue(value)};`;

const printSelectorNode = (i: number) =>
    <T>([name, prop]: [string, T]): string =>
        `${indent(i)}${printName(name)}${SPACE}{${CRLF}${printProperties(i + 1)(prop)}${CRLF}${indent(i)}}`;
const printMediaNode = (i: number) =>
    <T extends object>([name, prop]: [string, [string, T][]]): string =>
        `${indent(i)}${printName(name)}${SPACE}{${CRLF}${printSelector(i + 1)(prop)}${CRLF}${indent(i)}}`;
const printProperties = (i: number) => <T>(a: T): string => toPairs(a as {}).map(printProperty(i)).join(CRLF);
const printSelector = (i: number) =>
    <T extends object>(a: [string, T][]): string => a.map(printSelectorNode(i)).join(CRLF);
const printMedia = (i: number) =>
    <T extends object>(a: [string, [string, T][]][]): string => a.map(printMediaNode(i)).join(CRLF);
const printNode = (i: number) => <T extends object>(node: PrintNode<T>) => {
  
    const properties=printProperties(i)(omit(node, ['selector', 'media']));
    const selector=pipe(
        fromNullable(node.selector),
       
        O.map(a => `${CRLF}${printSelector(i)(a)}`),
        O.getOrElse(()=>'')
    )
    const media=pipe(
        fromNullable(node.media),
        O.map(a => `${CRLF}${printMedia(i)(a)}`),
        O.getOrElse(()=>'')
    )
    /*      const prop= omit(node,'selector');
         const selector=node.selector;
         result+=(selector===''||selector!==undefined)?
         printProperties(i)(prop):printProperties(i+1)({[`${selector}`]:prop}) */
    // result+=printProperties(i)(propC):`${CRLF}${printSelector(i)(selector)}`

   /*  return `${}${fromNullable(node.selector).
        map(a => `${CRLF}${printSelector(i)(a)}`).getOrElse('')}${fromNullable(node.media).
            map(a => `${CRLF}${printMedia(i)(a)}`).getOrElse('')}`; */
    const content=fold(monoidString)([properties,selector,media]);
    
    return format({parser:'css', content});
    /*    return `${printProperties(i)(lensA.props.get(node))}${lensA.selector.getOption(node).
        map(a => `${CRLF}${printSelector(i)(a)}`).getOrElse('')}`; */
};

// export const printCss = (i: number = 0) => (css: CommonCss) => toPairs(css).map(printCssNode(i)).join(CRLF);
const _printNodeToString = <T extends object>(i: number = 0) =>(a:PrintNode<T>):string=> printNode(i)(a);
/**
 * PrintNode to string
 * @desczh
 * PrintNode输出到文本
 * @since 0.2.0
 */
export const printNodeToString = _printNodeToString(0);
export default printNodeToString
