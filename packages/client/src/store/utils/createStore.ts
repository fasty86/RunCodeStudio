import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, RootState } from '../store'
import { leaderBoardApiSlice } from '../features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from '../features/user/userApiSlice'

export const createStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(userApiSlice.middleware, leaderBoardApiSlice.middleware),
  })
}

export type AppStore = ReturnType<typeof createStore> 