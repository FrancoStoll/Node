import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {


    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) {

    }

    private callLogs(log: LogEntity) {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log);
        })
    }

    public async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} working`,
                origin: `check-service.ts.${url}`
            })
            this.callLogs(log)
            this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `the ${url} is not ok. ${error}`
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: `chech-service.ts.${url}`
            })
            this.callLogs(log)
            this.errorCallback(errorMessage)
            return false;
        }

    }
}