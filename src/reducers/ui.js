import { Map } from 'immutable'
import { actions as toastrActions, toastr } from 'react-redux-toastr'

/**
 * Possible types of action
 */
export const actionTypes = {
    UI: {
        MENU: {
            USER: {
                SHOW: '@rafflethor/UI/MENU/USER/SHOW'
            },
            SIDE: {
                SHOW: '@rafflethor/UI/MENU/SIDE/SHOW'
            }
        }
    }
}

/**
 * Initial ui reducer state
 */
export const initialState = Map({
    menuVisible: true,
    userMenuVisible: false
})

/**
 * Reducers related to ui management
 */
const uiReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UI.MENU.SIDE.SHOW:
            return state
                .set('menuVisible', action.menuVisible)

        case actionTypes.UI.MENU.USER.SHOW:
            return state
                .set('userMenuVisible', action.userMenuVisible)

        default:
            return state
    }
}

/**
 * Possible actions used throughout the application
 */
export const actionCreators = {
    showMenu: (menuVisible) => {
        return {
            type: actionTypes.UI.MENU.SIDE.SHOW,
            menuVisible
        }
    },
    showUserMenu: (userMenuVisible) => {
        return {
            type: actionTypes.UI.MENU.USER.SHOW,
            userMenuVisible
        }
    },
    successNotification: (title, message) => {
        return toastrActions.add({
            type: 'success',
            title: title,
            message: message,
            position: 'top-right'
        })
    },
    failureNotification: (title, message) => {
        return toastrActions.add({
            type: 'error',
            title: title,
            message: message,
            position: 'top-right'
        })
    }
}

export default uiReducer
