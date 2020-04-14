import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader: React.FC = () => {
  
  return (
    <div>
      <CircularProgress color="primary" size={70} />
    </div>
  )
}

export default Loader