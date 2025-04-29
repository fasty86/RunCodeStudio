import { useStore as useStoreBase, useDispatch as useDispatchBase } from 'react-redux'
import { store } from './index'
import type { PageInitArgs } from './index'
import type { RootState } from './utils/createStore'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export { store }
export type { PageInitArgs }

export const useStore: () => typeof store = useStoreBase
export const useDispatch: () => typeof store.dispatch = useDispatchBase
