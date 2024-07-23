import express from 'express'
import { envs } from './config'
import { GithubController } from './presentation/github/controller'
import { GitHubService } from './presentation/services/github.service'
import { GithubSha256Middleware } from './presentation/middleware/github.sha256.middleware'





(() => {
    main()
})()





async function main() {

    const app = express()
    app.use(express.json());

 
    app.use(GithubSha256Middleware.verifySignature);

    const controller = new GithubController()
    app.post('/api/github', controller.webhookHandler)


    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`)
    })
}