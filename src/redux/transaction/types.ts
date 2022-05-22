import { TransactionInterface } from 'common/apis/transaction'

export const STORE_TRANSACTIONS = 'STORE_TRANSACTIONS'
export const STORE_TRANSACTION_QUERY = 'STORE_TRANSACTION_QUERY'

export interface InitialState {
  transactions: TransactionInterface[]
  transactionQuery: { [key: string] : string }
}

interface StoreTransactions {
  type: typeof STORE_TRANSACTIONS
  payload: TransactionInterface[]
}

interface StoreTransactionQuery {
  type: typeof STORE_TRANSACTION_QUERY
  payload: { [key: string] : string }
}

export type TransactionActionTypes = StoreTransactions | StoreTransactionQuery
