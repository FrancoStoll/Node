import { LogEntity, LogSeverityLevel } from "./log.entity";



describe('LogEntity', () => {
    const dataObj = {
        level: LogSeverityLevel.medium,
        message: "test-message",
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {



        const newLog = new LogEntity({
            level: LogSeverityLevel.medium,
            message: "test-message",
            origin: 'log.entity.test.ts'
        })


        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(dataObj.message);
        expect(newLog.level).toBe(dataObj.level)
        expect(newLog.origin).toBe(dataObj.origin)
        expect(newLog.createdAt).toBeInstanceOf(Date)
    })

    test('should create a LogEntity instance from json', () => {

        const json = `{"message":"the https://googasdasdle.com is not ok. TypeError: fetch failed","level":"high","createdAt":"2024-07-02T20:31:10.115Z","origin":"chech-service.ts.https://googasdasdle.com"} `

        const log = LogEntity.fromJson(json)


        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("the https://googasdasdle.com is not ok. TypeError: fetch failed");
        expect(log.level).toBe(LogSeverityLevel.high)
        expect(log.origin).toBe("chech-service.ts.https://googasdasdle.com")
        expect(log.createdAt).toBeInstanceOf(Date)

    })


    test('should create a log entity instance from obj', () => {


        const log = LogEntity.fromObject(dataObj)


        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)


    })

});