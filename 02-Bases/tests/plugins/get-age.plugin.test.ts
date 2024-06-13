import { getAge } from '../../src/plugins/get-age.plugin';



describe("get-age.plugin", () => {


    it("getAge() should return the age of a person", () => {


        const birthdate = "1998-09-29"
        const age = getAge(birthdate)

        expect(typeof age).toBe("number")

    })

    it("getAge should return current age", () => {


        const birthdate = "1998-09-29";
        const age = getAge(birthdate)

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

        expect(age).toBe(calculatedAge)

    })


    it("getAge should return 0 years", () => {

        const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1995);

        const birthdate = "1998-09-29";

        const age = getAge(birthdate)

        expect(age).toBe(0)
        expect(spy).toHaveBeenCalled();
    })

})