import { configureStore, combineReducers } from '@reduxjs/toolkit'
import forumSlice from '../features/forum/forumSlice'
import { leaderBoardApiSlice } from '../features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from '../features/user/userApiSlice'

const rootReducer = combineReducers({
  forum: forumSlice,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [leaderBoardApiSlice.reducerPath]: leaderBoardApiSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

/**
 * Создает Redux store с предустановленным состоянием
 * @param {Partial<RootState>} [preloadedState] - Начальное состояние store
 * @returns {ReturnType<typeof configureStore>} Сконфигурированный Redux store
 */
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