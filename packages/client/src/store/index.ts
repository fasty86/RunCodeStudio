import { createStore, RootState, AppStore } from './utils/createStore'

export type { RootState, AppStore }
export { createStore }

export const store = createStore(typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE)

export type PageInitArgs = {
  dispatch: ReturnType<typeof createStore>['dispatch']
  state: RootState
} 