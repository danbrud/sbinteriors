import React, { useEffect, useState } from 'react'
import ExpenseCard from './ExpenseCard'
import { useExpensesStore } from '../../../context/Expenses.context'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import Loader from '../../Loader'
import NoData from '../NoData'
import { Expense } from '../../../stores/Expense.store'
import EditExpensePopup from './EditExpensePopup'
import { Snackbar } from '@material-ui/core'
import { Alert } from '../../Alert'

const Expenses: React.FC = observer((props) => {
  const ExpensesStore = useExpensesStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(ExpensesStore.isPopulated ? false : true)
  const [showPopup, setShowPopup] = useState(false)
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null)
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    severity: ''
  })

  const openSnackbar = (severity, message) => {
    setSnackbar({ message, severity, open: true })
  }

  const handleClose = () => {
    setSnackbar({
      message: '',
      open: false,
      severity: ''
    })
  }

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
            <ExpenseCard
              key={expense.id}
              expense={expense}
              setExpenseToEdit={setExpenseToEdit}
              setShowPopup={setShowPopup}
            />
          ))}
          {
            showPopup
              ? <EditExpensePopup
                open={showPopup}
                setOpen={setShowPopup}
                openSnackbar={openSnackbar}
                expense={expenseToEdit}
              />
              : null
          }
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
        : <NoData type='expenses' />
  )
})

export default Expenses