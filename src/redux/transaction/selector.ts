import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectTransactions = (state: RootState) => state.transaction

export const selectTransactionsList = createSelector([selectTransactions], (transaction: InitialState) => transaction.transactions)
export const selectTransactionQuery = createSelector([selectTransactions], (transaction: InitialState) => transaction.transactionQuery)
