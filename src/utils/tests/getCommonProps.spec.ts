import C from '../getCommonProps'

describe('getCommponProps',()=>{
    it('contain common props',()=>{
       const result= C({fontSize:'5px'})
       expect(result).toEqual({fontSize:'5px'})
    })
    it('remove not-common props',()=>{
        const result= C({fontSize1:'5px'})
        expect(result).toEqual({})
     })
     it('remove props',()=>{
        const result= C({fontSize1:'5px',fontSize:'5px'})
        expect(result).toEqual({fontSize:'5px'})
     })
})

