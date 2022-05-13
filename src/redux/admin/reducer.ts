import {
  InitialState,
  AdminActionTypes,
  ADD_ADMIN,
  STORE_ADMINS
} from 'redux/admin/types'

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
    default:
      return state
  }
}

export default adminReducer
