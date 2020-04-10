import dotenv from 'dotenv'
import path from 'path'
import App from './app'
import { ClientsController } from './controllers/clients.controller'
import { ProjectsController } from './controllers/projects.controller'

const config = dotenv.config({ path: path.join(__dirname, '../..', '.env') })

const app = new App(
  [
    new ClientsController(),
    new ProjectsController()
  ],
  config.parsed.PORT
)

app.listen()