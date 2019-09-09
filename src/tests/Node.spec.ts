import * as N from '../Node';
import * as R from 'fp-ts/lib/Record'
import {
    pipe
} from 'fp-ts/lib/pipeable';
import {
    omit
} from 'macoolka-object';

type P = { color?: string, margin?: number };
type P1 = { color1?: string, margin?: number };
export const value: N.Node<P>  = {
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
    },
    ':disable': {
        color: 'yellow',
        margin: 7
    }
}
export const value1: N.Node<P> = {
    '': {
        color: 'red',
        margin: 0,
    },
    ':focus': {
        margin: 1,
    },
    ':focus:active': {
        margin: 2,
    },
    ':focus:disable': {
        margin: 3,
    },
    ':focus:active:disable': {
        margin: 4,
    },
    ':disable': {
        margin: 5,
    }
}
const map1 = (a: P): P1 => {
    return a.color ? { ...omit(a, 'color'), color1: a.color + 1 } : a;
}

describe('KeyMap', () => {
    it('map', () => {
        pipe(
            value,
            R.map(map1),
            a => expect(a).toEqual({
                '': { color1: 'red1' },
                ':focus': { color1: '11' },
                ':focus:active': { margin: 5 },
                ':focus:disable': { margin: 5 },
                ':focus:active:disable': { color1: 'blue1' },
                ':disable': { margin: 7, color1: 'yellow1' }
            })
        )


    })
    it('chain with empty key ', () => {
        const map2 = (_: any, value: P): P1 => {
            if (value.color) {
                return { ...omit(value, 'color'), color1: value.color + 1 }
            } else {
                return value
            }
        }
        pipe(
            value,
            R.mapWithIndex(map2),
            a => expect(a).toEqual(
                {
                    '': { color1: 'red1' },
                    ':focus': { color1: '11' },
                    ':focus:active': { margin: 5 },
                    ':focus:disable': { margin: 5 },
                    ':focus:active:disable': { color1: 'blue1' },
                    ':disable': { margin: 7, color1: 'yellow1' }
                }
            )
        )


    })
    it('chain with simply key', () => {
       
        pipe(
            value1,
            N.chainNode<P1>()((k,v)=>{
                return v.color
                ? {
                    [k]: { ...omit(v, 'color'), color1: v.color + 1 },
                    [`${k}:focus`]: {
                        color1: 'blue'
                    },
                }
                : { [k]: v } 
            }),
            a => expect(a).toEqual(
                {
                    '': { margin: 0, color1: 'red1' },
                    ':focus': { color1: 'blue', margin: 1 },
                    ':focus:active': { margin: 2 },
                    ':focus:disable': { margin: 3 },
                    ':focus:active:disable': { margin: 4 },
                    ':disable': { margin: 5 }
                }
            )
        )
        

    })
    it('chain with repeat key', () => {
        pipe(
            value,
            N.chainNode<P1>()((k,v)=>{
                return v.color
                ? {
                    [k]: { ...omit(v, 'color'), color1: v.color + 1 },
                    [`${k}:focus`]: {
                        color1: 'blue'
                    },
                }
                : { [k]: v } 
            }),
         

            a => expect(a).toEqual(
                {
                    '': { color1: 'red1' },
                    ':focus': { color1: '11' },
                    ':focus:focus': { color1: 'blue' },
                    ':focus:active': { margin: 5 },
                    ':focus:disable': { margin: 5 },
                    ':focus:active:disable': { color1: 'blue1' },
                    ':disable': { margin: 7, color1: 'yellow1' },
                    ':focus:active:disable:focus': { color1: 'blue' },
                    ':disable:focus': { color1: 'blue' }
                }
            )
        )

    }) 
})


