import React from 'react'
import { TransactionBody, From, To, Amount } from './TransactionElements'

const Transaction = () => {
  return (
    <TransactionBody>
      <From>Address: LKJFVJKTEU54378942718092876878178182HGDCFHSACFFS</From>
      <To>Address: </To>
      <Amount>$223</Amount>
    </TransactionBody>
  )
}

export default Transaction
