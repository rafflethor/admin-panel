import { takeLatest, call, put } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/security'
import { actionCreators as uiActionCreators } from '../reducers/ui'
import http from '../client/http'
import storage from '../client/storage'
import { push } from 'react-router-redux'

/**
 * Handles action involved on login
 *
 * @param credentials required credentials to login
 */
export function* login(action) {
    try {
        const apiLogin = yield call(http.security.login, action.credentials)
        const storedLogin = yield call(storage.set, 'login', apiLogin)

        if (apiLogin) {
            yield put(actionCreators.loginSuccess(storedLogin))
            yield put(push('/'))
        } else {
            yield put(actionCreators.badCredentials())
            yield put(push('/login'))
        }

    } catch (err) {
        const error = err.code || err
        yield put(actionCreators.loginFailure(error))
    }
}

export function* logout() {
    try {
        yield call(storage.remove, 'login')
        yield put(push('/login'))
    } catch (err) {
        const error = err.code || err
        yield put(actionCreators.logoutFailure(error))
    } finally {
        yield put(uiActionCreators.showUserMenu(false))
    }
}

export default [
    takeLatest(actionTypes.LOGIN.REQUEST, login),
    takeLatest(actionTypes.LOGOUT.REQUEST, logout)
]
