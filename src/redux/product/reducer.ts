import {
  InitialState,
  ProductActionTypes,
  ADD_PRODUCT,
  STORE_PRODUCTS,
  STORE_PRODUCT_QUERY,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from 'redux/product/types'
import { editItemById, removeItemById } from 'redux/utils'

const INITIAL_STATE: InitialState = {
  products: [],
  productQuery: {
    keyword: '',
    minPoint: '',
    maxPoint: '',
    minQuantity: '',
    maxQuantity: '',
  },
}

const productReducer = (state = INITIAL_STATE, action: ProductActionTypes): InitialState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: editItemById(state.products, action.id, 'productId', action.payload)
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: removeItemById(state.products, action.payload, 'productId')
      }
    case STORE_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case STORE_PRODUCT_QUERY:
      return {
        ...state,
        productQuery: action.payload
      }
    default:
      return state
  }
}

export default productReducer
