import { envs } from "./envs.plugins"




describe('envs.plugins.ts', () => {


    it('should return env options', () => {


        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'francostoll@gmail.com',
            MAILER_SECRET_KEY: 'tfdlstilhoxgttuw',
            PROD: false,
            MONGO_URL: 'mongodb://franco:1234567@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'franco',
            MONGO_PASS: '1234567'
        })

    })

    it('should return error if not found env', async () => {


        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugins');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    })

})