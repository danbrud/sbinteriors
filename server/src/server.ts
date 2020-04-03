import dotenv from 'dotenv'
import path from 'path'
import App from './app'
import { ClientsController } from './controllers/clients.controller'

const config = dotenv.config({ path: path.join(__dirname, '../..', '.env') })

const app = new App(
  [
    new ClientsController()
  ],
  config.parsed.PORT
)

app.listen()