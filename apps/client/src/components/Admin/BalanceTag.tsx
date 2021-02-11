import React from 'react'
import { observer } from 'mobx-react'
import { FormattedNumber } from 'react-intl'
import TagLoader from './TagLoader'

interface BalanceTagProps {
  balance: number
}

const BalanceTag: React.FC<BalanceTagProps> = observer((props) => {
  let { balance } = props
  balance = Math.abs(balance)

  const getBackgroundColor = (balance: number) => (
    isNaN(balance)
      ? '#8EBDC3'
      : balance >= 0
        ? '#208f4e' : '#c0392b'
  )

  return (
    <span
      className='badge'
      style={{ backgroundColor: getBackgroundColor(props.balance) }}
    >
      {
        isNaN(balance)
          ? <TagLoader />
          : (
            <span>
              < i
                className="fas fa-shekel-sign"
                style={{ fontSize: '10px' }}>
              </i> <FormattedNumber value={balance} />
            </span>
          )
      }
    </span >
  )
})

export default BalanceTag