import { ProductInterface } from '../../common/apis/product'
import {
  ProductActionTypes,
  ADD_PRODUCT,
  STORE_PRODUCTS,
  STORE_PRODUCT_QUERY,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from 'redux/product/types'

export const addProduct = (product: ProductInterface): ProductActionTypes => ({
  type: ADD_PRODUCT,
  payload: product,
})

export const updateProductById = (productId: string, product: ProductInterface): ProductActionTypes => ({
  type: UPDATE_PRODUCT,
  id: productId,
  payload: product
})

export const deleteProductById = (productId: string): ProductActionTypes => ({
  type: DELETE_PRODUCT,
  payload: productId
})

export const storeProducts = (products: ProductInterface[]): ProductActionTypes => ({
  type: STORE_PRODUCTS,
  payload: products,
})

export const storeProductQuery = (productQuery: { [key: string]: string }): ProductActionTypes => ({
  type: STORE_PRODUCT_QUERY,
  payload: productQuery,
})
