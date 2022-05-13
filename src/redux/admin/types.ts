import { AdminInterface } from '../../common/apis/admin'

export const ADD_ADMIN = 'ADD_ADMIN'
export const STORE_ADMINS = 'STORE_ADMINS'

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

export type AdminActionTypes = AddAdmin | StoreAdmins
