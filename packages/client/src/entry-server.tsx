import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import { createStaticHandler, StaticRouter } from 'react-router-dom/server'

import { createFetchRequest, createUrl } from './entry-server.utils'
import AppRouter, { routConfig } from './AppRoutes'
import './index.css'

import { ThemeProvider } from './context/ThemeContext'

import { matchRoutes } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import { NotificationProvider } from './components/Notification/NotificationContext'
import { createStore } from './store/utils/createStore'
import { preloadData } from './store/utils/preloadData'

export const render = async (req: ExpressRequest) => {
  const store = createStore()

  const { query } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }
  const url = createUrl(req)
  const foundRoutes = matchRoutes(routConfig, url)
  if (!foundRoutes) {
    throw new Error(`Страница не найдена: ${url}`)
  }
  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  await preloadData(store)

  if (fetchData)
    try {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
      })
    } catch (e) {
      console.error('Ошибка инициализации страницы:', e)
    }

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <AuthProvider>
          <NotificationProvider>
            <ThemeProvider>
              <StaticRouter location={req.url}>
                <AppRouter />
              </StaticRouter>
            </ThemeProvider>
          </NotificationProvider>
        </AuthProvider>
      </Provider>
    ),
    initialState: store.getState(),
  }
}
