import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter, routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

import './index.css'
import App from './App'
import rootSaga from './sagas'
import rootReducer from './reducers'

/**
 * Sagas middleware
 */
const sagaMiddleware = createSagaMiddleware()

/**
 * Router middleware
 */
const history = createHistory()
const routerMiddleware = createRouterMiddleware(history)

/**
 * Create store
 */
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, routerMiddleware)
)

/**
 * Init sagas BEFORE! rendering app
 */
sagaMiddleware.run(rootSaga)

/**
 * Bootstrap app
 */
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

/**
 * For development purposes
 */
registerServiceWorker()
