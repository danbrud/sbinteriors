import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react'
import { Expense } from '../../../stores/Expense.store'
import moment from 'moment'
import '../../../styles/Expenses.css'
import { FormattedNumber } from 'react-intl'
import { useUserStore } from '../../../context/User.context'



const useStyles = makeStyles((theme) => ({
  heading: {
    // flexBasis: '33.33%',
    // flexShrink: 0,
    fontSize: '20px',
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  root: {
    width: '100%',
    marginBottom: '10px'
  },
  contentContainer: {
    padding: '12px'
  },
  paragraph: {
    padding: '12px 2px 0 2px',
    color: theme.palette.text.secondary
  }
}))

interface ExpenseCardProps {
  expense: Expense
}

const ExpenseCard: React.FC<ExpenseCardProps> = observer((props) => {
  const classes = useStyles()
  const { expense } = props
  const UserStore = useUserStore()


  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentContainer}>
        <div id='expense-card-details'>
          <Typography className={classes.heading}>
            {expense.name}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {moment(expense.date).format('MMM Do YY')}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            <span>
              <i
                className="fas fa-shekel-sign"
                style={{ fontSize: '12px', color: '#757575' }}>
              </i> <FormattedNumber value={expense.amount} />
            </span>
          </Typography>
        </div>
        {
          expense.description
            ? <Typography className={classes.paragraph}>
              {expense.description}
            </Typography>
            : null
        }
      </CardContent>
      {
        UserStore.isAdmin
          ? <CardActions >
            <Button color='primary' size="small">Edit Expense</Button>
          </CardActions>
          : null
      }
    </Card >
  )
})

export default ExpenseCard