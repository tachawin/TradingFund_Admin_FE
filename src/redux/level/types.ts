import { LevelInterface, LevelUpdateBodyInterface } from '../../common/apis/level'

export const STORE_LEVELS = 'STORE_LEVELS'
export const STORE_LEVEL_QUERY = 'STORE_LEVEL_QUERY'
export const ADD_LEVEL = 'ADD_LEVEL'
export const UPDATE_LEVEL = 'UPDATE_LEVEL'
export const DELETE_LEVEL = 'DELETE_LEVEL'

export interface InitialState {
  levels: LevelInterface[]
  levelQuery: { [key: string] : string }
}

interface StoreLevels {
  type: typeof STORE_LEVELS
  payload: LevelInterface[]
}

interface StoreLevelQuery {
  type: typeof STORE_LEVEL_QUERY
  payload: { [key: string] : string }
}

interface AddLevel {
  type: typeof ADD_LEVEL
  payload: LevelInterface
}

interface UpdateLevel {
  type: typeof UPDATE_LEVEL
  id: string
  payload: LevelUpdateBodyInterface
}

interface DeleteLevel {
  type: typeof DELETE_LEVEL
  payload: string
}

export type LevelActionTypes = StoreLevels | StoreLevelQuery | AddLevel | UpdateLevel | DeleteLevel
