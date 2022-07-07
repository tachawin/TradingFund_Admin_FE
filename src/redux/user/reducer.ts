import {
  InitialState,
  UserActionTypes,
  STORE_USER
} from 'redux/user/types'

const INITIAL_STATE: InitialState = {
  features: {
    report: '1000',
    cashback: '0000',
    customer: '0000',
    deposit: '1111',
    withdraw: '1111',
    bank: '1111',
    reward: '1111',
    credit: '1111',
    chat: '0000',
    product: '1111',
    adminManage: '1111',
    creditCondition: '1111',
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
