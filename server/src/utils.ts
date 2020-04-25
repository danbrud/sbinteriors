import { Transfer } from "./models/Transfer.model";
import { Expense } from "./models/Expense.model";
import { Task } from "./models/Task.model";

export const getTotal = function (data): number {
  let prop: string
  if (!data[0]) {
    return 0
  } else if (data[0] instanceof Transfer) {
    prop = 'ilsAmount'
  } else if (data[0] instanceof Task) {
    prop = 'price'
  } else if (data[0] instanceof Expense) {
    prop = 'amount'
  }

  const total = data.reduce((acc: number, item) => acc + item[prop], 0)
  return total
}