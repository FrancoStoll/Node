import { send } from "process";
import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';



describe('email.service.test.ts', () => {
    const mockSendMail = jest.fn();

    // Mock al crearTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });
    const emailService = new EmailService();

    test('should send email', async () => {


        const options: SendMailOptions = {
            to: 'francostoll2@gmail.com',
            subject: "test",
            htmlBody: '<h1>Test</h1>'
        }
        await emailService.sendEmail(options)

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: undefined,
            html: "<h1>Test</h1>",
            subject: "test",
            to: "francostoll2@gmail.com",
        });
    })

    test('should send email with attachments', async () => {

        await emailService.sendEmailWithFileSystemLogs('francostoll2@gmail.com');

        expect(mockSendMail).toHaveBeenCalledWith({
            to: 'francostoll2@gmail.com',
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });

    })


});