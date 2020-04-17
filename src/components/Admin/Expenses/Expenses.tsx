import React, { useEffect } from 'react'
import ExpenseCard from './ExpenseCard'
import { useExpensesStore } from '../../../context/Expenses.context'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

const Expenses: React.FC = observer((props) => {
  const ExpensesStore = useExpensesStore()
  const { clientId } = useParams()

  useEffect(() => {
    ExpensesStore.getExpensesFromDB(clientId)
  })
  return (
    <div>
      {ExpensesStore.expenses.map(expense => (
        <ExpenseCard expense={expense} />
      ))}
    </div>
  )
})

export default Expenses