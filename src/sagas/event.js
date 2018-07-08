import { put, call, take, fork } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/event'
import { push } from 'react-router-redux'
import http from '../client/http'

/**
 * Lists all events
 *
 * @since 0.1.0
 */
export function* saveEventRequest() {
    while (true) {
        const { event } = yield take(actionTypes.EVENT.NEW.REQUEST)

        if (event) {
            try {
                yield call(http.event.save, event)
                yield put(actionCreators.newEventSuccess())
                yield put(push('/events'))
            } catch (e) {
                console.error(e)
                yield put(actionCreators.newEventFailure(e))
            }
        }
    }
}

export default [
    fork(saveEventRequest)
]
