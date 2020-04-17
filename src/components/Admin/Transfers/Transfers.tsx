import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { useTransfersStore } from '../../../context/Transfers.context'
import TransferCard from './TransferCard'

const Transfers: React.FC = observer(() => {
  const TransfersStore = useTransfersStore()
  const { clientId } = useParams()

  useEffect(() => {
    if (!TransfersStore.isPopulated) {
      TransfersStore.getTransfersFromDB(clientId)
    }
  }, [])

  return (
    <div>
      {TransfersStore.transfers.map(transfer => (
        <TransferCard key={transfer.id} transfer={transfer} />
      ))}
    </div>
  )
})

export default Transfers