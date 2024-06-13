import { getUUID } from '../../src/plugins/get-id.plugin';


describe('get-id.plugin.ts', () => {

    test("getUUID() should return a UUUID", () => {
        const uuid = getUUID();
        expect(typeof uuid).toBe("string")
        expect(uuid.length).toBe(36)
    })

})