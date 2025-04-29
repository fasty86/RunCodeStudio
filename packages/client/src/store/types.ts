import { createStore } from './utils/createStore'

export type RootState = ReturnType<typeof createStore>['getState']
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type AppStore = ReturnType<typeof createStore>

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
} 