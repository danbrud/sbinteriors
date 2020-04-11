import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Button, ExpansionPanelActions } from '@material-ui/core'
import { useExpensesStore } from '../../../context/Expenses.context'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '65%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    // marginRight: '20px' //Need if I add more than one secondary heading
  },
}))

interface ExpensePanelsProps {
  projectId: string
}

const ExpensePanels: React.FC<ExpensePanelsProps> = observer((props) => {
  const ExpensesStore = useExpensesStore()
  const classes = useStyles()
  const [expanded, setExpanded] = useState<number | boolean>(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {ExpensesStore.expenses.map(expense => (
        <ExpansionPanel key={expense.id} expanded={expanded === expense.id} onChange={handleChange(expense.id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>{expense.name}</Typography>
            {/* <Typography className={classes.secondaryHeading}>{task.duration} h</Typography>
            <Typography className={classes.secondaryHeading}>s{task.price}</Typography> */}
            <Typography className={classes.secondaryHeading}>{expense.amount}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {moment(expense.date).format('MMM Do YY')}{expense.isPaid ? ` | Paid via: ${expense.paymentMethod}` : null}
            </Typography>
          </ExpansionPanelDetails>
            {/* <ExpansionPanelActions>
              <Link to={``}>
                <Button size="small" color="primary" variant="outlined">
                  Select
              </Button>
              </Link>
            </ExpansionPanelActions> */}
        </ExpansionPanel>
      ))}
    </div>
  )
})

export default ExpensePanels