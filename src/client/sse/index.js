let sse;

/**
 * Types of actions produced/handled by this middleware
 *
 * @since 0.1.0
 */
export const sseActionTypes = {
    CONNECTION: {
        OPEN: {
            REQUEST: '@sse/CONNECTION/OPEN/REQUEST',
            SUCCESS: '@sse/CONNECTION/OPEN/SUCCESS',
            FAILURE: '@sse/CONNECTION/OPEN/FAILURE'
        },
        CLOSE: {
            REQUEST: '@sse/CONNECTION/CLOSE/REQUEST',
            SUCCESS: '@sse/CONNECTION/CLOSE/SUCCESS',
            FAILURE: '@sse/CONNECTION/CLOSE/FAILURE'
        },
        FAILURE: '@sse/CONNECTION/FAILURE'
    },
    ON_MESSAGE: '@sse/ON_MESSAGE'
}

export const sseActionCreators = {
    openConnectionRequest: (url) => {
        return {
            type: sseActionTypes.CONNECTION.OPEN.REQUEST,
            url
        }
    }
}

/**
 * They way this middleware reacts to action types
 *
 * @since 0.1.0
 */
const middlewareActions = {
    handleMessage: (store) => (event) => {
        store.dispatch({type: sseActionTypes.ON_MESSAGE, event: JSON.parse(event.data)})
    },
    handleOpenSuccess: (store) => (event) => {
        store.dispatch({type: sseActionTypes.CONNECTION.OPEN.SUCCESS})
    },
    handleOpenFailure: (store) => (error) => {
        store.dispatch({type: sseActionTypes.CONNECTION.OPEN.FAILURE, error})
    },
    handleCloseSuccess: (store) => {
        store.dispatch({type: sseActionTypes.CONNECTION.CLOSE.SUCCESS})
    },
    handleCloseError: (store) => (error) => {
        store.dispatch({type: sseActionTypes.CONNECTION.CLOSE.FAILURE, error})
    },
    handleError: (store) => (event) => {
        store.dispatch({type: sseActionTypes.CONNECTION.FAILURE})
    }
}

/**
 * Creates a new object of type EventSource
 *
 * @param url sse endpoint to connect to
 * @Param store redux store to be able to dispatch actions
 * @return a new instance of type EventSource
 * @since 0.1.0
 */
const createEventSource = (url, store) => {
    let sse

    try {
        sse = new EventSource(url)
        sse.addEventListener('message', middlewareActions.handleMessage(store))
        sse.addEventListener('open', middlewareActions.handleOpenSuccess(store))
        sse.addEventListener('error', middlewareActions.handleError(store))

        middlewareActions.handleOpenSuccess(store)
    } catch (e) {
        middlewareActions.handleOpenFailure(store)(e)
    }

    return sse
}

/**
 * Closes the EventSource passed as parameter
 *
 * @param store redux store to notify closing events
 * @param sse the EventSource instance we want to close
 * @since 0.1.0
 */
const closeEventSource = (store, sse) => {
    try {
        sse.close()
        middlewareActions.handleCloseSuccess(store)
    } catch (e) {
        middlewareActions.handleCloseError(store)(e)
    }
}

/**
 * Middleware responsible to handle an EventSource connection and
 * dispatch actions from produced events
 *
 * @param url endpoint to connect to
 * @param store redux store
 * @param next next middleware
 * @param action
 * @since 0.1.0
 */
export const sseMiddleware = store => next => action => {
    switch (action.type) {
        case sseActionTypes.CONNECTION.OPEN.REQUEST:
            sse = createEventSource(action.url, store)
            break

        case sseActionTypes.CONNECTION.CLOSE.REQUEST:
            closeEventSource(store, sse)
            break

        default:
            next(action)
            break
    }
}
