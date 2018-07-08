import { put, call, takeLatest } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/dashboard'
import http from '../client/http'

/**
 * Lists all statistics
 *
 * @since 0.1.0
 */
export function* stats() {
    try {
        yield put(actionCreators.statsSuccess({}))
    } catch (err) {
        const error = err.code || err
        yield put(actionCreators.statsFailure(error))
    }
}


export default [
  takeLatest(actionTypes.DASHBOARD.STATS_REQUEST, stats)
]
