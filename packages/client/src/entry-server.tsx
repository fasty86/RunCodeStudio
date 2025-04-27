import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import { createFetchRequest } from './entry-server.utils'
import { routConfig } from './AppRoutes'
import './index.css'

import { AuthProvider } from './components/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store/store'
import { leaderBoardApiSlice } from './store/features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from './store/features/user/userApiSlice'
import { createStore } from './store/utils/createStore'
import { preloadData } from './store/utils/preloadData'

export const render = async (req: ExpressRequest) => {
  const store = createStore()
  const { query, dataRoutes } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  // Предварительная загрузка данных
  const initialState = await preloadData(store)

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <StaticRouterProvider router={router} context={context} />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    ),
    initialState,
  }
}
