import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export type RootState = ReturnType<typeof store.getState>

const middlewares = []
middlewares.push(thunk)

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares
})
export default store