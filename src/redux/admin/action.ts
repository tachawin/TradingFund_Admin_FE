import { AdminInterface } from 'common/apis/admin'
import {
  AdminActionTypes,
  ADD_ADMIN,
  STORE_ADMINS
} from 'redux/admin/types'

export const addAdmin = (admin: AdminInterface): AdminActionTypes => ({
  type: ADD_ADMIN,
  payload: admin,
})

export const storeAdmins = (admins: AdminInterface[]): AdminActionTypes => ({
  type: STORE_ADMINS,
  payload: admins,
})
