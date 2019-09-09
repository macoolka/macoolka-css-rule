import { Rule,parseProp as _parseProp } from '../Rule';
type BaseProps={
    width?:string|number,
    color?:string;
    padding?:string|number,
}
describe('Rule', () => {
    it('should parse rule with defaultValue', () => {
        type RuleA=Rule<{ A?: number }, {B?:'B1'|'B2'}, BaseProps,{color:string}>
        const rule: RuleA = {
            rule: {
                A: ({value,theme}) => {
                    return ({ width: value + 1 ,color:theme.color})
                },
            },
            ruleEnum:{
                B:{
                    B1:()=>({padding:3}),
                    B2:()=>({padding:4})
                }
            }
        };
        const parseProp=_parseProp({rule:rule,theme:{color:'red'}})
        expect(parseProp({ A: 1 })).toEqual({ width: 2,color:'red' });
        expect(parseProp(({ B: 'B1' }))).toEqual({ padding: 3 });
        expect(parseProp(({A:1, B: 'B1' }))).toEqual({ width: 2,padding: 3 ,color:'red'});
        expect(parseProp(({width: 7,padding: 8,A:1, B: 'B1' }))).toEqual({ width: 7,padding: 8,color:'red' });
    });
    it('should parse rule with entity theme value', () => {
        type RuleA=Rule<{ A?: number }, {B?:'B1'|'B2'}, BaseProps,{color:string}>
        const rule: RuleA = {
            rule: {
                A: ({value,theme}) => ({ width: value + 1 ,color:theme.color}),
            },
            ruleEnum:{
                B:{
                    B1:()=>({padding:3}),
                    B2:()=>({padding:4})
                }
            }
        };
        const parseProp=_parseProp({rule:rule,theme:{color:'red'}})
        expect(parseProp(({ A: 1 ,theme:{color:'green'}}))).toEqual({ width: 2,color:'green' });
        expect(parseProp(({ B: 'B1' ,theme:{color:'green'}}))).toEqual({ padding: 3 });
        expect(parseProp(({A:1, B: 'B1' ,theme:{color:'green'}}))).toEqual({ width: 2,padding: 3 ,color:'green'});
        expect(parseProp((
            {width: 7,padding: 8,A:1, B: 'B1',theme:{color:'green'} })))
            .toEqual({ width: 7,padding: 8,color:'green' });
    });
 
});

