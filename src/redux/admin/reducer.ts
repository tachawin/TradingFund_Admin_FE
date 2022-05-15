import {
  InitialState,
  AdminActionTypes,
  ADD_ADMIN,
  STORE_ADMINS,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  UPDATE_PERMISSION
} from 'redux/admin/types'
import { editFieldById, editItemById, removeItemById,  } from 'redux/utils'

const INITIAL_STATE: InitialState = {
  admins: []
}

const adminReducer = (state = INITIAL_STATE, action: AdminActionTypes): InitialState => {
  switch (action.type) {
    case ADD_ADMIN:
      return {
        ...state,
        admins: [action.payload, ...state.admins]
      }
    case STORE_ADMINS:
      return {
        ...state,
        admins: action.payload
      }
    case UPDATE_ADMIN:
      return {
        ...state,
        admins: editItemById(state.admins, action.id, 'adminId', action.payload)
      }
    case DELETE_ADMIN:
      return {
        ...state,
        admins: removeItemById(state.admins, action.payload, 'adminId')
      }
    case UPDATE_PERMISSION:
      return {
        ...state,
        admins: editFieldById(state.admins, action.id, 'adminId', 'features', action.payload)
      }
    default:
      return state
  }
}

export default adminReducer
