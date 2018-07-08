import { put, call, takeLatest } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/events'
import http from '../client/http'

/**
 * Lists all events
 *
 * @since 0.1.0
 */
export function* events() {
    try {
        const data = yield call(http.events.list)
        yield put(actionCreators.listEventsSuccess(data))
    } catch (err) {
        const error = err.code || err
        yield put(actionCreators.listEventsFailure(error))
    }
}

export default [
    takeLatest(actionTypes.EVENTS.LIST.REQUEST, events)
]
