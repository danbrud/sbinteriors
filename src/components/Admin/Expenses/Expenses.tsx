import React, { useEffect, useState } from 'react'
import ExpenseCard from './ExpenseCard'
import { useExpensesStore } from '../../../context/Expenses.context'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import Loader from '../../Loader'
import NoData from '../NoData'

const Expenses: React.FC = observer((props) => {
  const ExpensesStore = useExpensesStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(ExpensesStore.isPopulated ? false : true)

  useEffect(() => {
    if (!ExpensesStore.isPopulated) {
      ExpensesStore.getExpensesFromDB(clientId)
        .then(() => {
          setIsLoading(false)
        })
    }
  })

  return (
    isLoading
      ? <Loader />
      : ExpensesStore.isPopulated
        ? <div>
          {ExpensesStore.expenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
        : <NoData type='expenses' />
  )
})

export default Expenses