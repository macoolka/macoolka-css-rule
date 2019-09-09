import {
    CssNode,
    cssThemeNodeToThemeNode,
    Input,
} from '../CssNode';
import {
    StandRule,
    parse,
} from '../StandRule';
import * as R from 'fp-ts/lib/Reader'
import { pipe } from 'fp-ts/lib/pipeable'

type P2 = { colorM?: string };
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
export const c1: CssNode<Input<P, P1>> = {

    color1: 'red',
    margin: 0,
    selector: {
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

}

const rule: StandRule<P, P1, {}> = {

    color1: ({ value }) => ({

        color: value + 1,

    })

};
const rule1: StandRule<P2, Input<P, P1>, {}> = {

    colorM: ({ value }) => ({

        color1: value + 1

    })

};
export const p2: CssNode<Input<P2, Input<P, P1>>> = {

    colorM: 'red',
    selector: {
        ':focus': {
            colorM: '1',
        },
        ':focus:active': {
            margin: 5,
        },
        ':focus:disable': {
            margin: 5,
        },
        ':focus:active:disable': {
            colorM: 'blue'
        },
        ':disable': {
            colorM: 'yellow',
            margin: 7
        }
    }

}
export {
    pipe
}
describe('FunctionRule', () => {
    it('parse', () => {
        const beginMap = cssThemeNodeToThemeNode(c)
        const parseRule = parse({})(rule);
        const result = pipe(
            beginMap,
            parseRule,
        )//parseRule.get(beginMap);
        expect(result.data).toEqual({
            '': { color: 'red1' },
            ':focus': { color: '11' },
            ':focus:active': { margin: 5 },
            ':focus:disable': { margin: 5 },
            ':focus:active:disable': { color: 'blue1' },
            ':disable': { margin: 7, color: 'yellow1' }
        })

    })
    it('parse compose rule', () => {
        const beginMap = cssThemeNodeToThemeNode(p2)
        const parseRule1 = parse({})(rule1);
        const parseRule = parse({})(rule);
        const composeRule = pipe(
            parseRule1,
            R.map(parseRule)
        )
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'red11' },
            ':focus': { color: '111' },
            ':focus:active': { margin: 5 },
            ':focus:disable': { margin: 5 },
            ':focus:active:disable': { color: 'blue11' },
            ':disable': { margin: 7, color: 'yellow11' }
        })
    })
    it('parse rule by input order', () => {
        const i: CssNode<Input<P2, Input<P, P1>>> = {

            color: 'yellow',
            color1: 'green',
            colorM: 'red',
            selector: {
                ':focus': {
                    color: 'yellow',
                    color1: 'green',
                    colorM: 'red',
                },
            }


        }
        const i1: CssNode<Input<P2, Input<P, P1>>> = {

            color1: 'green',
            colorM: 'red',
            selector: {
                ':focus': {
                    color1: 'green',
                    colorM: 'red',
                },
            }

        }
        const i2: CssNode<Input<P2, Input<P, P1>>> = {

            colorM: 'red',
            selector: {
                ':focus': {
                    colorM: 'red',
                },
            }
        }
        const beginMap = cssThemeNodeToThemeNode(i)
        const parseRule1 = parse({})(rule1);
        const parseRule = parse({})(rule);
        const composeRule = pipe(
            parseRule1,
            R.map(parseRule)
        )

        //const result=parseRule(parseRule1(beginMap));
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'yellow' },
            ':focus': { color: 'yellow' },
        })
        const result1 = composeRule(cssThemeNodeToThemeNode(i1))
        expect(result1.data).toEqual({
            '': { color: 'green1' },
            ':focus': { color: 'green1' },
        })
        expect(composeRule(cssThemeNodeToThemeNode(i2)).data).toEqual({
            '': { color: 'red11' },
            ':focus': { color: 'red11' },
        })
    })
    it('parse rule by rule order', () => {
        const ruleA: StandRule<P, P1, {}> = {

            color1: ({ value }) => ({

                color: value + 1,
                margin: 1,
                selector: {
                    ':hover': {
                        margin: 2,
                    }
                }

            })

        };
        const ruleB: StandRule<P2, Input<P, P1>, {}> = {

            colorM: ({ value }) => ({

                color1: value + 1,
                margin: 3,
                selector: {
                    ':hover': {
                        margin: 4,
                    }
                }

            })

        };
        const i: CssNode<Input<P2, Input<P, P1>>> = {

            color: 'yellow',
            color1: 'green',
            colorM: 'red',
            selector: {
                ':focus': {
                    color: 'yellow',
                    color1: 'green',
                    colorM: 'red',
                },
            }

        }
        const i1: CssNode<Input<P2, Input<P, P1>>> = {

            color1: 'green',
            colorM: 'red',
            selector: {
                ':focus': {
                    color1: 'green',
                    colorM: 'red',
                },
            }

        }
        const i2: CssNode<Input<P2, Input<P, P1>>> = {

            color1: 'red',
            selector: {
                ':focus': {
                    color1: 'red',
                },
            }
        }
        const beginMap = cssThemeNodeToThemeNode(i)
        const parseRule1 = parse({})(ruleB);
        const parseRule = parse({})(ruleA);
        const composeRule = pipe(
            parseRule1,
            R.map(parseRule)
        )

        //const result=parseRule(parseRule1(beginMap));
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'yellow', margin: 3, },
            ':focus': { color: 'yellow', margin: 3, },
            ":focus:hover": { "margin": 4 },
            ":hover": { "margin": 4 }

        })
        const result1 = composeRule(cssThemeNodeToThemeNode(i1))
        expect(result1.data).toEqual({
            '': { color: 'green1', margin: 3, },
            ':focus': { color: 'green1', margin: 3, },
            ":focus:hover": { "margin": 4 },
            ":hover": { "margin": 4 }
        })
        expect(composeRule(cssThemeNodeToThemeNode(i2)).data).toEqual({
            '': { color: 'red1', margin: 1, },
            ':focus': { color: 'red1', margin: 1, },
            ":focus:hover": { "margin": 2 },
            ":hover": { "margin": 2 }
        })
    })
    it('parse rule (object) by rule order', () => {
        const ruleA: StandRule<P, P1, {}> = {
            color1: {

                color: '1',
                margin: 1,
                selector: {
                    ':hover': {
                        margin: 2,
                    }
                }
            }

        };
        const ruleB: StandRule<P2, Input<P, P1>, {}> = {

            colorM: {

                color: '2',
                margin: 3,
                selector: {
                    ':hover': {
                        margin: 4,
                    }
                }
            }

        };
        const i: CssNode<Input<P2, Input<P, P1>>> = {

            color: 'yellow',
            color1: 'green',
            colorM: 'red',
            selector: {
                ':focus': {
                    color: 'yellow',
                    color1: 'green',
                    colorM: 'red',
                },
            }

        }
        const i1: CssNode<Input<P2, Input<P, P1>>> = {

            color1: 'green',
            colorM: 'red',
            selector: {
                ':focus': {
                    color1: 'green',
                    colorM: 'red',
                },
            }


        }
        const i2: CssNode<Input<P2, Input<P, P1>>> = {

            color1: 'green',
            selector: {
                ':focus': {
                    color1: 'green',
                },
            }
        }
        const beginMap = cssThemeNodeToThemeNode(i)
        const parseRule1 = parse({})(ruleB);
        const parseRule = parse({})(ruleA);
        const composeRule = pipe(
            parseRule1,
            R.map(parseRule)
        )

        //const result=parseRule(parseRule1(beginMap));
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'yellow', margin: 3, },
            ':focus': { color: 'yellow', margin: 3, },
            ":focus:hover": { "margin": 4 },
            ":hover": { "margin": 4 }

        })
        const result1 = composeRule(cssThemeNodeToThemeNode(i1))
        expect(result1.data).toEqual({
            '': { color: '2', margin: 3, },
            ':focus': { color: '2', margin: 3, },
            ":focus:hover": { "margin": 4 },
            ":hover": { "margin": 4 }
        })
        expect(composeRule(cssThemeNodeToThemeNode(i2)).data).toEqual({
            '': { color: '1', margin: 1, },
            ':focus': { color: '1', margin: 1, },
            ":focus:hover": { "margin": 2 },
            ":hover": { "margin": 2 }
        })
    })
    it('theme', () => {
        type Input = {
            A?: number,
            B?: number
        }
        type OutPut = {
            width?: string | number,
            color?: string;
            padding?: string | number,
        }
        type Theme = {
            color: string
        }
        const ruleA: StandRule<Input, OutPut, Theme> = {
            A: ({ value, theme }) => {
                return ({ width: value + 1, color: theme.color })
            },
            B: ({ value, theme }) => {
                return ({ width: value + 2 })
            },
        };
        const parseRule1 = parse({ color: 'red' })(ruleA);
        expect(parseRule1(cssThemeNodeToThemeNode({ A: 1 })).data).toEqual({
            '': { color: 'red', "width": 2 },
        })
    })

})
