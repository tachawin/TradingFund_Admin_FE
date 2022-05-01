import { LevelInterface } from '../../common/apis/level'

export const STORE_LEVELS = 'STORE_LEVELS'
export const STORE_LEVEL_QUERY = 'STORE_LEVEL_QUERY'

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

export type LevelActionTypes = StoreLevels | StoreLevelQuery
