import express from 'express'
import { envs } from './config'
import { GithubController } from './presentation/github/controller'
import { GitHubService } from './presentation/services/github.service'





(() => {
    main()
})()





async function main() {

    const app = express()
    app.use(express.json());

 
    const controller = new GithubController()
    app.post('/api/github', controller.webhookHandler)


    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`)
    })
}