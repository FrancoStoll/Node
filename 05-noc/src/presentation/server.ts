import { envs } from "../config/plugins/envs.plugins";
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log,datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)

export class Server {

    public static async start() {
        console.log("Server started....")




        // Postgress

        // const newEntity = new LogEntity({
        //     level: LogSeverityLevel.high,
        //     message: "Task Change",
        //     origin: "server.ts"
        // })

        // const newLog = await logRepository.saveLog(newEntity);
        // const getLogs = await logRepository.getLogs(LogSeverityLevel.low)

        // console.log(getLogs)





        // Send Mail
        // const emailService = new EmailService();

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
        //     'francostoll2@gmail.com', 'francostoll3@gmail.com'
        // ]);

        // emailService.sendEmail({
        //     to: 'francostoll3@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC<h3>
        //         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        //         <p>Ver logs adjuntos</p>
        //     `
        // })

        // emailService.sendEmailWithFileSystemLogs([
        //   'francostoll2@gmail.com', 'francostoll3@gmail.com'  
        // ]);

        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckServiceMultiple(
        //             [
        //                 fsLogRepository,
        //                 mongoLogRepository,
        //                 postgresLogRepository
        //             ],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error),
        //         ).execute(url)

        //     }
        // );
    }

}
