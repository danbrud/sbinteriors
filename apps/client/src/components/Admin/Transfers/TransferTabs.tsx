import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTransfersStore } from '../../../context/Transfers.context'
import TransferCard from './TransferCard'
import BalanceTransferCard from './BalanceTransferCard'
import NoData from '../NoData'
import { BalanceTransfer } from '../../../stores/BalanceTransfer.store'
import { Transfer } from '../../../stores/Transfer.store'
import { TransferTabsProps } from './TransferTabsProps.interface'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabContent: {
    padding: '12px 3px'
  }
}))


const TransferTabs: React.FC<TransferTabsProps> = observer((props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { setShowPopup, setTransferToEdit } = props

  const TransfersStore = useTransfersStore()
  const [value, setValue] = useState(0)


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Client Transfers" {...a11yProps(0)} />
          <Tab label="Balance Transfers" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {
            TransfersStore.isTransfersPopulated
              ? TransfersStore.transfers.map(transfer => (
                <TransferCard
                  key={transfer.id}
                  transfer={transfer}
                  setShowPopup={setShowPopup}
                  setTransferToEdit={setTransferToEdit}
                />
              ))
              : <NoData type='transfers' />
          }
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            TransfersStore.isBalanceTransfersPopulated
              ? TransfersStore.balanceTransfers.map(transfer => (
                <BalanceTransferCard
                  key={transfer.id}
                  transfer={transfer}
                  setShowPopup={setShowPopup}
                  setTransferToEdit={setTransferToEdit}
                />
              ))
              : <NoData type='transfers' />
          }
        </TabPanel>
      </SwipeableViews>
    </div>
  )
})

export default TransferTabs

// import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box className={classes.tabContent} p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}