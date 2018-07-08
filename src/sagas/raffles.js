import { put, call, takeLatest } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/raffles'
import http from '../client/http'

/**
 * Lists all raffles
 *
 * @since 0.1.0
 */
export function* raffles() {
    try {
        const data = yield call(http.raffles.list)
        yield put(actionCreators.listRafflesSuccess(data))
    } catch (err) {
        const error = err.code || err
        yield put(actionCreators.listRafflesFailure(error))
    }
}

export default [
    takeLatest(actionTypes.RAFFLES.LIST.REQUEST, raffles)
]
