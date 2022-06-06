import { TransactionInterface } from 'common/apis/transaction'
import { STORE_TRANSACTIONS, STORE_TRANSACTION_QUERY, TransactionActionTypes } from './types'

export const storeTransaction = (transactions: TransactionInterface[]): TransactionActionTypes => ({
  type: STORE_TRANSACTIONS,
  payload: transactions,
})

export const storeTransactionQuery = (transactionQuery: { [key: string]: string }): TransactionActionTypes => ({
  type: STORE_TRANSACTION_QUERY,
  payload: transactionQuery,
})
