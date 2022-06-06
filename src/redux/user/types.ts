import { UserInterface } from 'common/apis/user'

export const STORE_USER = 'STORE_USER'

export interface InitialState {
  features: { [key: string]: string }
}

interface StoreUser {
  type: typeof STORE_USER
  payload: UserInterface
}

export type UserActionTypes = StoreUser
