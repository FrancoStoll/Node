import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";



describe('log.repository.impl.test', () => { 

    const mockDatasource:LogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const logRepository = new LogRepositoryImpl(mockDatasource)


    beforeEach(() => {
        jest.clearAllMocks();
    })
test('saveLog should call the datasource with arguments', async () => { 

    const newLog = new LogEntity({
        message: 'Test',
        level: LogSeverityLevel.low,
        origin: 'log.repository.impl.test.ts'
    });
    await logRepository.saveLog(newLog);

    expect(mockDatasource.saveLog).toHaveBeenCalledWith(newLog);

 });

 test('getLogs should call the datasource with arguments', async () => { 

    await logRepository.getLogs(LogSeverityLevel.low);

    expect(mockDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)


  })

 });