import { CronService } from "./cron-service"




describe('cron-service.test.ts', () => {

    const mockTick = jest.fn();

    //jest.clearAllMocks

    test('should create a job', (done) => {

        const job = CronService.createJob('* * * * * *', mockTick)


        setTimeout(() => {
            expect(mockTick).toBeCalledTimes(2);
            job.stop();
            done()
        }, 2000);

    })


})