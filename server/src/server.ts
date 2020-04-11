import dotenv from 'dotenv'
import path from 'path'
import App from './app'
import { ClientsController } from './controllers/clients.controller'
import { ProjectsController } from './controllers/projects.controller'
import { TasksController } from './controllers/tasks.controller'
import { ExpensesController } from './controllers/expenses.controller'
import { TransfersController } from './controllers/transfers.controller'

const config = dotenv.config({ path: path.join(__dirname, '../..', '.env') })

const app = new App(
  [
    new ClientsController(),
    new ProjectsController(),
    new TasksController(),
    new ExpensesController(),
    new TransfersController()
  ],
  config.parsed.PORT
)

app.listen()