import { buildMakePerson } from '../../src/js-foundation/05-factory';

describe('05-factory', () => {

    const getUUID = () => "1234"
    const getAge = () => 25;


    it("buildMakePerson should return a function", () => {

        const makePerson = buildMakePerson({ getUUID, getAge });

        expect(typeof makePerson).toBe('function')

    })

    it("makePerson should return a person", () => {

        const makePerson = buildMakePerson({ getUUID, getAge });
        const johnDoe = makePerson({ name: "John Doe", birthdate: '1998-09-29' })

        expect(johnDoe).toEqual({ id: '1234', name: 'John Doe', birthdate: '1998-09-29', age: 25 })

    })

})