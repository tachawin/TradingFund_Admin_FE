import { DepositCreateInterface, DepositUpdateInterface } from 'common/apis/deposit'
import { TransactionInterface } from '../../common/apis/transaction'

export const ADD_DEPOSIT = 'ADD_DEPOSIT'
export const UPDATE_DEPOSIT = 'UPDATE_DEPOSIT'
export const STORE_DEPOSIT_LIST = 'STORE_DEPOSIT_LIST'
export const STORE_DEPOSIT_LIST_QUERY = 'STORE_DEPOSIT_LIST_QUERY'

export interface InitialState {
  depositList: TransactionInterface[]
  depositQuery: { [key: string] : string }
}

interface AddDeposit {
  type: typeof ADD_DEPOSIT
  payload: DepositCreateInterface & {
    payerBankAccountNumber: string
    recipientBankAccountNumber: string
    recipientBankName: string
  }
}

interface UpdateDeposit {
  type: typeof UPDATE_DEPOSIT
  id: string
  payload: DepositUpdateInterface
}

interface StoreDepositList {
  type: typeof STORE_DEPOSIT_LIST
  payload: TransactionInterface[]
}

interface StoreDepositListQuery {
  type: typeof STORE_DEPOSIT_LIST_QUERY
  payload: { [key: string] : string }
}

export type DepositActionTypes = AddDeposit | UpdateDeposit | StoreDepositList | StoreDepositListQuery
