import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';



describe('check-service-test-ts', () => {


    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const succesCallback = jest.fn()
    const errorCallback = jest.fn()
    const checkService = new CheckService(
        mockRepository,
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


        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));



    });

    test('should call errorCallback when fetch return false', async () => {



        const wasOk = await checkService.execute('https://googlasdassxxxzzzasde.com')

        expect(wasOk).toBe(false)

        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));

    });

});