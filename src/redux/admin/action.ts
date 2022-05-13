import { AdminInterface, AdminUpdateInterface } from 'common/apis/admin'
import {
  AdminActionTypes,
  ADD_ADMIN,
  STORE_ADMINS,
  UPDATE_ADMIN,
  DELETE_ADMIN
} from 'redux/admin/types'

export const addAdmin = (admin: AdminInterface): AdminActionTypes => ({
  type: ADD_ADMIN,
  payload: admin,
})

export const storeAdmins = (admins: AdminInterface[]): AdminActionTypes => ({
  type: STORE_ADMINS,
  payload: admins,
})

export const updateAdminById = (adminId: string, admin: AdminUpdateInterface): AdminActionTypes => ({
  type: UPDATE_ADMIN,
  id: adminId,
  payload: admin
})

export const deleteAdminById = (adminId: string): AdminActionTypes => ({
  type: DELETE_ADMIN,
  payload: adminId
})