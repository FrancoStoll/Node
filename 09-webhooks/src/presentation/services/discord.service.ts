import { envs } from "../../config";



export class DiscordService {
    private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

    constructor() { }



    async notify(message: string) {

        const body = {
            content: message,
            embeds: [
                {
                    image: { url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmdiZTFsZ3BuZWFvbWRra3QyZWY0dHdpdHMyYTVzam5paWw5c29kMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5VKbvrjxpVJCM/giphy.gif' }
                }
            ]
        };

        const response = await fetch(this.discordWebhookUrl, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })

        if (!response.ok) {
            console.log('Error sending message to discord');
            return false
        }

        return true
    }
}