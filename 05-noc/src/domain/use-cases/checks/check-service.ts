import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {


    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) {

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
            this.logRepository.saveLog(log)
            this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `the ${url} is not ok. ${error}`
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: `chech-service.ts.${url}`
            })
            this.logRepository.saveLog(log);
            this.errorCallback(errorMessage)
            return false;
        }

    }
}