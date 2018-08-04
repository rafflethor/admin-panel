import { Map } from 'immutable'

/**
 * Possible types of action
 */
export const actionTypes = {
    LOGIN: {
        REQUEST: '@rafflethor/LOGIN/REQUEST',
        SUCCESS: '@rafflethor/LOGIN/SUCCESS',
        FAILURE: '@rafflethor/LOGIN/FAILURE',
        BAD_CREDENTIALS: '@rafflethor/LOGIN/BAD_CREDENTIALS'
    },
    LOGOUT: {
        REQUEST: '@rafflethor/LOGOUT/REQUEST',
        SUCCESS: '@rafflethor/LOGOUT/SUCCESS',
        FAILURE: '@rafflethor/LOGOUT/FAILURE',
    }
}

/**
 * Initial login reducer state
 */
export const initialState = Map({
  isLoading: false,
  error: null,
  login: Map()
})

/**
 * Reducers related to login management
 */
const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGOUT.REQUEST:
        case actionTypes.LOGIN.REQUEST:
            return state
                .set('isLoading', true)

        case actionTypes.LOGOUT.SUCCESS:
            return state
                .set('isLoading', false)

        case actionTypes.LOGIN.SUCCESS:
            return state
                .set('isLoading', false)
                .set('login', action.login)

        case actionTypes.LOGOUT.FAILURE:
        case actionTypes.LOGIN.FAILURE:
            return state
                .set('isLoading', false)
                .set('error', action.error)

        case actionTypes.LOGIN.BAD_CREDENTIALS:
            return state
                .set('isLoading', false)
                .set('error', 'Bad credentials!')

        default:
            return state
    }
}

/**
 * Possible actions used throughout the application
 */
export const actionCreators = {
    login: (credentials) => {
        return {
            type: actionTypes.LOGIN.REQUEST,
            credentials
        }
    },
    loginSuccess: (login) => {
        return {
            type: actionTypes.LOGIN.SUCCESS,
            login
        }
    },
    badCredentials: () => {
        return {
            type: actionTypes.LOGIN.BAD_CREDENTIALS
        }
    },
    loginFailure: (error) => {
        return {
            type: actionTypes.LOGIN.FAILURE,
            error
        }
    },
    logout: () => {
        return {
            type: actionTypes.LOGOUT.REQUEST
        }
    },
    logoutSuccess: () => {
        return {
            type: actionTypes.LOGOUT.SUCCESS
        }
    },
    logoutFailure: () => {
        return {
            type: actionTypes.LOGOUT.FAILURE
        }
    }
}

export default loginReducer
