import dotenv from 'dotenv'
import path from 'path'
import App from './app'
import { ClientsController } from './controllers/clients.controller'
import { TasksController } from './controllers/tasks.controller'
import { ExpensesController } from './controllers/expenses.controller'
import { TransfersController } from './controllers/transfers.controller'
import { AdminController } from './controllers/admin.controller'

dotenv.config({ path: path.join(__dirname, '../..', '.env') })

const app = new App(
  [
    new ClientsController(),
    new TasksController(),
    new ExpensesController(),
    new TransfersController(),
    new AdminController()
  ],
  process.env.PORT
)

app.listen()