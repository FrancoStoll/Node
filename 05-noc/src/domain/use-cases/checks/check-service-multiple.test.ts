import { LogEntity } from "../../entities/log.entity";

import { CheckServiceMultiple } from "./check-service-multiple";

describe('check-service-multiple.test.ts', () => {


    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const succesCallback = jest.fn()
    const errorCallback = jest.fn()
    const checkService = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        succesCallback,
        errorCallback
    );
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call succesCallback when fetch return true', async () => {



        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true)

        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();


        expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity));



    });
    test('should call errorCallback when fetch return false', async () => {



        const wasOk = await checkService.execute('https://googlasdassxxxzzzasde.com')

        expect(wasOk).toBe(false)

        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity));


    });


});