import {
    CssNode,
    cssThemeNodeToThemeNode,
    Input,
} from '../CssNode';
import {

    EnumRule,
    parse,
  

} from '../EnumRule';

import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Reader'
type P2 = { colorM?: '3' | '4' };
type P = { color1?: '1' | '2' };
type P1 = { color?: string, margin?: number };

export const c: CssNode<Input<P, P1>> = {

    color1: '1',
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
            color1: '1'
        },
        ':disable': {
            color1: '1',
            margin: 7
        }
    }
}
export const c1: CssNode<Input<P, P1>> = {

    color1: '1',
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

const rule: EnumRule<P, P1, {}> = {

    color1: {
        '1': () => ({

            color: '1',

        }),
        '2': () => ({

            color: '2'

        })
    }

};
const rule1: EnumRule<P2, Input<P, P1>, {}> = {

    colorM: {
        '3': () => ({

            color1: '1'

        }),
        '4': () => ({

            color1: '2'

        }),
    }

};
export const p2: CssNode<Input<P2, Input<P, P1>>> = {

    colorM: '3',
    selector: {
        ':focus': {
            colorM: '3',
        },
        ':focus:active': {
            margin: 5,
        },
        ':focus:disable': {
            margin: 5,
        },
        ':focus:active:disable': {
            colorM: '3'
        },
        ':disable': {
            colorM: '3',
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
        const result = parseRule(beginMap);
        expect(result.data).toEqual({
            '': { color: '1' },
            ':focus': { color: '1' },
            ':focus:active': { margin: 5 },
            ':focus:disable': { margin: 5 },
            ':focus:active:disable': { color: '1' },
            ':disable': { margin: 7, color: '1' }
        })

    })
    it('parse with undefined', () => {
        const value: CssNode<Input<P, P1>> = {

            color1: undefined,
        }
        const beginMap = cssThemeNodeToThemeNode(value)
        const parseRule = parse({})(rule);
        const result = parseRule(beginMap);
        expect(result.data).toEqual({
            '': {}
        })

    })
    it('parse compose rule', () => {
        const beginMap = cssThemeNodeToThemeNode(p2)
        const parseRule1 = parse({})(rule1, );
        const parseRule = parse({})(rule);
        const composeRule = pipe(
            parseRule1 ,
            R.map(parseRule)
        )
 
        //const result=parseRule(parseRule1(beginMap));
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: '1' },
            ':focus': { color: '1' },
            ':focus:active': { margin: 5 },
            ':focus:disable': { margin: 5 },
            ':focus:active:disable': { color: '1' },
            ':disable': { margin: 7, color: '1' }
        })
    })
    it('parse rule by input order', () => {
        const i: CssNode<Input<P2, Input<P, P1>>> = {

            color: 'yellow',
            color1: '1',
            colorM: '4',
            selector: {
                ':focus': {
                    color: 'yellow',
                    color1: '1',
                    colorM: '4',
                },
            }

        }
        const i1: CssNode<Input<P2, Input<P, P1>>> = {

            color1: '1',
            colorM: '4',
            selector: {
                ':focus': {
                    color1: '1',
                    colorM: '4',
                },
            }

        }
        const i2: CssNode<Input<P2, Input<P, P1>>> = {

            colorM: '4',
            selector: {
                ':focus': {
                    colorM: '4',

                },
            }
        }
        const beginMap = cssThemeNodeToThemeNode(i)
        const parseRule1 = parse({})(rule1);
        const parseRule = parse({})(rule);
        const composeRule = pipe(
            parseRule1 ,
            R.map(parseRule)
        )
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'yellow' },
            ':focus': { color: 'yellow' },
        })
        const result1 = composeRule(cssThemeNodeToThemeNode(i1))
        expect(result1.data).toEqual({
            '': { color: '1' },
            ':focus': { color: '1' },
        })
        expect(composeRule(cssThemeNodeToThemeNode(i2)).data).toEqual({
            '': { color: '2' },
            ':focus': { color: '2' },
        })
    })
    it('parse rule by rule order', () => {
        const ruleA: EnumRule<P, P1, {}> = {

            color1: {
                '1': ({ value }: { value: '1' | '2' }) => ({

                    color: value + 1,
                    margin: 1,
                    selector: {
                        ':hover': {
                            margin: 2,
                        }
                    }
                }),
                '2': ({ value }: { value: '1' | '2' }) => ({

                    color: value + 1,
                    margin: 1,
                    selector: {
                        ':hover': {
                            margin: 2,
                        }
                    }
                })
            }

        };
        const ruleB: EnumRule<P2, Input<P, P1>, {}> = {
            colorM: {
                '3': ({ value }: { value: '3' | '4' }) => ({

                    color: value + 1,
                    margin: 1,
                    selector: {
                        ':hover': {
                            margin: 2,
                        }
                    }
                }),
                '4': ({ value }: { value: '3' | '4' }) => ({

                    color: value + 1,
                    margin: 1,

                    selector: {
                        ':hover': {
                            margin: 2,
                        }
                    }
                })
            }

        };
        const i: CssNode<Input<P2, Input<P, P1>>> = {

            color: 'yellow',
            color1: '1',
            colorM: '4',
            selector: {
                ':focus': {
                    color: 'yellow',
                    color1: '1',
                    colorM: '4',
                },
            }

        }
        const i1: CssNode<Input<P2, Input<P, P1>>> = {

            color1: '1',
            colorM: '4',
            selector: {
                ':focus': {
                    color1: '1',
                    colorM: '4',
                },
            }

        }
        const i2: CssNode<Input<P2, Input<P, P1>>> = {

            color1: '1',
            selector: {
                ':focus': {
                    color1: '1',
                },
            }
        }
        const beginMap = cssThemeNodeToThemeNode(i)
        const parseRule1 = parse({})(ruleB, );
        const parseRule = parse({})(ruleA);
        const composeRule = pipe(
            parseRule1 ,
            R.map(parseRule)
        )
        //const result=parseRule(parseRule1(beginMap));
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'yellow', margin: 1, },
            ':focus': { color: 'yellow', margin: 1, },
            ":focus:hover": { "margin": 2 },
            ":hover": { "margin": 2 }

        })
        const result1 = composeRule(cssThemeNodeToThemeNode(i1))
        expect(result1.data).toEqual({
            "": { "color": "41", "margin": 1 },
            ":focus": { "color": "41", "margin": 1 },
            ":focus:hover": { "margin": 2 },
            ":hover": { "margin": 2 }
        })
        expect(composeRule(cssThemeNodeToThemeNode(i2)).data).toEqual({
            "": { "color": "11", "margin": 1 },
            ":focus": { "color": "11", "margin": 1 },
            ":focus:hover": { "margin": 2 },
            ":hover": { "margin": 2 }
        })
    })
    it('parse rule (object) by rule order', () => {
        const ruleA: EnumRule<P, P1, {}> = {

            color1: {
                '1': ({ value }: { value: '1' | '2' }) => ({

                    color: value + 1,
                    margin: 1,
                    selector: {
                        ':hover': {
                            margin: 2,
                        }
                    }
                }),
                '2': ({ value }: { value: '1' | '2' }) => ({

                    color: value + 1,
                    margin: 1,
                    selector: {
                        ':hover': {
                            margin: 2,
                        }
                    }
                })
            }

        };
        const ruleB: EnumRule<P2, Input<P, P1>, {}> = {
            colorM: {
                '3': ({ value }: { value: '3' | '4' }) => ({

                    color: value + 1,
                    margin: 3,
                    selector: {
                        ':hover': {
                            margin: 3,
                        }
                    }
                }),
                '4': ({ value }: { value: '3' | '4' }) => ({

                    color: value + 1,
                    margin: 4,
                    selector: {
                        ':hover': {
                            margin: 4,
                        }
                    }
                })
            }

        };
        const i: CssNode<Input<P2, Input<P, P1>>> = {

            color: 'yellow',
            color1: '1',
            colorM: '4',
            selector: {
                ':focus': {
                    color: 'yellow',
                    color1: '1',
                    colorM: '4',
                },
            }

        }
        const i1: CssNode<Input<P2, Input<P, P1>>> = {

            color1: '1',
            colorM: '4',
            selector: {
                ':focus': {
                    color1: '1',
                    colorM: '4',
                },
            }

        }
        const i2: CssNode<Input<P2, Input<P, P1>>> = {

            color1: '1',
            selector: {
                ':focus': {
                    color1: '1',
                },
            }

        }
        const beginMap = cssThemeNodeToThemeNode(i)
        const parseRule1 = parse({})(ruleB);
        const parseRule = parse({})(ruleA);
        const composeRule = pipe(
            parseRule1 ,
            R.map(parseRule)
        )
        const result = composeRule(beginMap)
        expect(result.data).toEqual({
            '': { color: 'yellow', margin: 4, },
            ':focus': { color: 'yellow', margin: 4, },
            ":focus:hover": { "margin": 4 },
            ":hover": { "margin": 4 }

        })
        const result1 = composeRule(cssThemeNodeToThemeNode(i1))
        expect(result1.data).toEqual({
            '': { color: '41', margin: 4, },
            ':focus': { color: '41', margin: 4, },
            ":focus:hover": { "margin": 4 },
            ":hover": { "margin": 4 }
        })
        expect(composeRule(cssThemeNodeToThemeNode(i2)).data).toEqual({
            '': { color: '11', margin: 1, },
            ':focus': { color: '11', margin: 1, },
            ":focus:hover": { "margin": 2 },
            ":hover": { "margin": 2 }
        })
    })
})



