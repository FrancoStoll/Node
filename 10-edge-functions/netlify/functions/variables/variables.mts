


import { Context } from "@netlify/functions";

export const handler = async (req: Request, context: Context) => {

    const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

    if(!myImportantVariable) {
        throw 'Missig myImportantVariable'
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ myImportantVariable }),
        headers: {
            'Content-Type': 'application/json',
        }
    }

};
