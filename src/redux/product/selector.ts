import { createSelector } from 'reselect'

import { RootState } from 'redux/store'
import { InitialState } from './types'

const selectProduct = (state: RootState) => state.product

export const selectProducts = createSelector([selectProduct], (product: InitialState) => product.products)
export const selectProductQuery = createSelector([selectProduct], (product: InitialState) => product.productQuery)
