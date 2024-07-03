import mongoose from "mongoose";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log,datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import exp from "constants";
import { LogDatasource } from "../../domain/datasources/log.datasource";


describe('mongo-log.datasource.test.ts', () => {

    const logDataSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: "test message",
        origin: "mongo-log.datasource.test.ts"
    })
    beforeAll(async () => {

        await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        })

    });

    afterEach(async () => {
        await LogModel.deleteMany();

    });
    afterAll(async () => {

        mongoose.connection.close();
    });

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');
        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
    });

    test('should get logs', async () => {

        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium)

    });

});