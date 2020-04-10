import React from 'react'
import { observer } from 'mobx-react'

interface ClientDetailsProps {
  match: { params: { id: string } }
}

const ClientDetails: React.FC<ClientDetailsProps> = observer((props) => {
  

  return (
    <div>
      {props.match.params.id}
    </div>
  )
})

export default ClientDetails