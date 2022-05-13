import { ProductInterface } from '../../common/apis/product'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const STORE_PRODUCTS = 'STORE_PRODUCTS'
export const STORE_PRODUCT_QUERY = 'STORE_PRODUCT_QUERY'

export interface InitialState {
  products: ProductInterface[]
  productQuery: { [key: string] : string }
}

interface AddProduct {
  type: typeof ADD_PRODUCT
  payload: ProductInterface
}

interface UpdateProduct {
  type: typeof UPDATE_PRODUCT
  id: string
  payload: ProductInterface
}

interface DeleteProduct {
  type: typeof DELETE_PRODUCT
  payload: string
}

interface StoreProducts {
  type: typeof STORE_PRODUCTS
  payload: ProductInterface[]
}

interface StoreProductQuery {
  type: typeof STORE_PRODUCT_QUERY
  payload: { [key: string] : string }
}

export type ProductActionTypes = AddProduct | UpdateProduct | DeleteProduct | StoreProducts | StoreProductQuery
