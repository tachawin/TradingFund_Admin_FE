import {
  InitialState,
  UserActionTypes,
  STORE_USER
} from 'redux/user/types'

const INITIAL_STATE: InitialState = {
  features: {
    report: '0000',
    customer: '0000',
    deposit: '0000',
    withdraw: '0000',
    bank: '0110',
    reward: '0000',
    credit: '0000',
    chat: '0000',
    product: '1000',
    adminManage: '1111',
    level: '0000',
  }
}

const userReducer = (state = INITIAL_STATE, action: UserActionTypes): InitialState => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default userReducer
