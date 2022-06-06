import { UserInterface } from 'common/apis/user'
import {
  UserActionTypes,
  STORE_USER,
} from 'redux/user/types'

export const storeUser = (user: UserInterface): UserActionTypes => ({
  type: STORE_USER,
  payload: user,
})
