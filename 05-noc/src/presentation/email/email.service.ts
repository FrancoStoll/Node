import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}

export interface Attachments {
    filename: string;
    path: string
}

export class EmailService {



    constructor(


    ) { }

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    public async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments } = options

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            return true
        } catch (error) {

            return false
        }

    }

    public async sendEmailWithFileSystemLogs(to: string | string[]) {

        const subject = "Logs del servidor";
        const htmlBody = `
                <h3>Logs de sistema - NOC<h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p>Ver logs adjuntos</p>
            `
        const attachments: Attachments[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ]

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }

}