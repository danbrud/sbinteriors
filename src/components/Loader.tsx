import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../App.css'

const Loader: React.FC = () => {

  return (
    <div id='loader'>
      <CircularProgress color="primary" size={70} />
    </div>
  )
}

export default Loader