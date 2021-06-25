import React from 'react'
import {
  TransactionWrap,
  TransactionWrapContainer,
  TransactionRow,
  Column1,
  TextWrapper,
  TopLine,
  Subtitle
} from './TransactionsElements'

const Transaction = ({ id, lightBg, darkText, description }) => {
  return (
    <>
        <TransactionWrapContainer id={id} lightBg={lightBg}>
          <TransactionWrap>
            <TransactionRow >
              <Column1>
                <TextWrapper>
                  <TopLine>Latest Transactions</TopLine>
                  <Subtitle darkText={darkText}>{description}</Subtitle>
                </TextWrapper>
              </Column1>
            </TransactionRow>
          </TransactionWrap>
        </TransactionWrapContainer>
    </>
  )
}

export default Transaction;
