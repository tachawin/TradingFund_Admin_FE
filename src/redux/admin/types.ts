import { AdminInterface, AdminUpdateInterface } from '../../common/apis/admin'

export const ADD_ADMIN = 'ADD_ADMIN'
export const STORE_ADMINS = 'STORE_ADMINS'
export const UPDATE_ADMIN = 'UPDATE_ADMIN'
export const DELETE_ADMIN = 'DELETE_ADMIN'

export interface InitialState {
  admins: AdminInterface[]
}

interface AddAdmin {
  type: typeof ADD_ADMIN
  payload: AdminInterface
}

interface StoreAdmins {
  type: typeof STORE_ADMINS
  payload: AdminInterface[]
}

interface UpdateAdmin {
  type: typeof UPDATE_ADMIN
  id: string
  payload: AdminUpdateInterface
}

interface DeleteAdmin {
  type: typeof DELETE_ADMIN
  payload: string
}


export type AdminActionTypes = AddAdmin | StoreAdmins | UpdateAdmin | DeleteAdmin
