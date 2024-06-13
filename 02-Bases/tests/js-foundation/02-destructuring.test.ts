import { characters } from '../../src/js-foundation/02-destructuring';





describe('02-destructuring', () => { 

    it("characted should containt Flash, Superman", () => {


    
       expect(characters).toContain("Flash");
       expect(characters).toContain("Superman");



    })

    it("first characted should be Flash, and second Superman", () => {

        const [flash, superman] = characters



        expect(flash).toBe("Flash")
        expect(superman).toBe("Superman")

    })

 })