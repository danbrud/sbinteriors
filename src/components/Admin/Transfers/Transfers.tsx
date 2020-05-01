import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { useTransfersStore } from '../../../context/Transfers.context'
import TransferCard from './TransferCard'
import NoData from '../NoData'
import Loader from '../../Loader'
import TransferTabs from './TransferTabs'

const Transfers: React.FC = observer(() => {
  const TransfersStore = useTransfersStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(TransfersStore.isFullyPopulated ? false : true)

  useEffect(() => {
    if (!TransfersStore.isFullyPopulated) {
      const transferPromises = [
        TransfersStore.getTransfersFromDB(clientId),
        TransfersStore.getBalanceTransfersFromDB(clientId)
      ]

      Promise.all(transferPromises).then(() => {
        setIsLoading(false)
      })
    }
  }, [])

  return (
    isLoading
      ? <Loader />
      : <TransferTabs />
        // ? <TransferTabs />
        // : <NoData type='transfers' />
  )
})

export default Transfers