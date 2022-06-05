import {
  ADD_LEVEL,
  DELETE_LEVEL,
  InitialState,
  LevelActionTypes,
  STORE_LEVELS,
  STORE_LEVEL_QUERY,
  UPDATE_LEVEL
} from 'redux/level/types'
import { editItemById, removeItemById } from 'redux/utils'

const INITIAL_STATE: InitialState = {
  levels: [],
  levelQuery: {
    keyword: '',
    startCreated: '',
    endCreated: '',
    startUpdated: '',
    endUpdated: '',
    minCredit: '',
    maxCredit: ''
  },
}

const levelReducer = (state = INITIAL_STATE, action: LevelActionTypes): InitialState => {
  switch (action.type) {
    case STORE_LEVELS:
      return {
        ...state,
        levels: action.payload
      }
    case STORE_LEVEL_QUERY:
      return {
        ...state,
        levelQuery: action.payload
      }
    case ADD_LEVEL:
      return {
        ...state,
        levels: [action.payload, ...state.levels]
      }
    case UPDATE_LEVEL:
      return {
        ...state,
        levels: editItemById(state.levels, action.id, 'levelId', action.payload)
      }
    case DELETE_LEVEL:
      return {
        ...state,
        levels: removeItemById(state.levels, action.payload, 'levelId')
      }
    default:
      return state
  }
}

export default levelReducer
