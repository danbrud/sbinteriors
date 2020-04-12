import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AddClient from './Clients/AddClient'
import '../../styles/AddItem.css'


const AddItem: React.FC = () => {
  const { item } = useParams()
  const location = useLocation()

  return (
    item === 'client'
      ? <AddClient />
      : <div>show something else</div>
  )
}

export default AddItem