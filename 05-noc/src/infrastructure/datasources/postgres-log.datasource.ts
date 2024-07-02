import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();


const postgresLevel = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {


    public async saveLog(log: LogEntity): Promise<void> {

        const { message, origin } = log
        const level = postgresLevel[log.level]

        const newLog = await prismaClient.logModel.create({
            data: {
                level: level,
                message: message,
                origin: origin,
            }
        });
        console.log("Postgres saved!")
    }
    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = postgresLevel[severityLevel];


        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        });

        return logs.map(log => LogEntity.fromObject(log))
    }
}