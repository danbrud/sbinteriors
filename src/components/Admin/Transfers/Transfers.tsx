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
  const [isLoading, setIsLoading] = useState(TransfersStore.isPopulated ? false : true)

  useEffect(() => {
    if (!TransfersStore.isPopulated) {
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
      : TransfersStore.isPopulated
        ? <TransferTabs />
        : <NoData type='transfers' />
  )
})

export default Transfers