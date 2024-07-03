// import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
// import { PostgresLogDatasource } from "./postgres-log.datasource";



// describe('postgres-log.datasource.test.ts', () => { 


//     test('should create a log', async () => { 

//         const logDatasource = new PostgresLogDatasource();


//         const newLog = new LogEntity({
//             level: LogSeverityLevel.low,
//             message: 'a message',
//             origin: 'postgres-log.datasource.test.ts'
//         });

//         const log = LogEntity.fromObject(newLog);

//         console.log(log)
//         await logDatasource.saveLog(log);


//         const logSpy = jest.spyOn(console, 'log');

//         expect(logSpy).toHaveBeenCalled();
//         expect(logSpy).toHaveBeenCalledWith("Postgres saved!")

//      });



//  })