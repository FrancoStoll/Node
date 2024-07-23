import { Context, HandlerEvent } from "@netlify/functions";



async function notify(message: string) {

    const body = {
        content: message,
    };

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })

    if (!response.ok) {
        console.log('Error sending message to discord');
        return false
    }

    return true
}

function onStar(payload: any): string {
    const { action, sender, repository } = payload;

    return `User ${sender.login} ${action} star on ${repository.full_name}`
}

function onIssue(payalod: any): string {
    const { action, issue } = payalod;

    if (action === 'opened') {
        const message = `An issue was opened with this title ${issue.title}`;
        return message;
    }
    if (action === 'closed') {
        const message = `An issue was closed by ${issue.user.login}`;
        return message;
    }

    if (action === 'reopened') {
        const message = `An issue was reopened by ${issue.user.login}`;
        return message;
    }

    return `Unhandled action for the issue event ${action}`;


}


export const handler = async (event: HandlerEvent, context: Context) => {


    const githubEvent = event.headers['x-github-event'] ?? 'unknown';

    const payload = JSON.parse(event.body ?? '{}');

    let message: string;

    switch (githubEvent) {

        case 'star':
            message = onStar(payload);
            break

        case 'issues':
            message = onIssue(payload);
            break;

        default:
            message = `Unknown event ${githubEvent}`;

    }

    await notify(message);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hola mundo' }),
        headers: {
            'Content-Type': 'application/json',
        }
    }

};




