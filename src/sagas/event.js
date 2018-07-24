import { put, call, race, take, fork } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/event'
import {
    actionTypes as modalActionTypes,
    actionCreators as modalActionCreators
} from '../reducers/modal'
import { push } from 'react-router-redux'
import http from '../client/http'

/**
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

export function* showEventRequest() {
    while (true) {
        const { eventId } = yield take(actionTypes.EVENT.SHOW.REQUEST)

        if (eventId) {
            try {
                yield put(push(`/events/${eventId}`))
            } catch (e) {
                console.error(e)
                yield put(actionCreators.showEventFailure(e))
            }
        }
    }
}

export function* getEventDetailRequest() {
    while (true) {
        const { eventId } = yield take(actionTypes.EVENT.DETAIL.REQUEST)

        if (eventId) {
            try {
                const organization = yield call(http.event.detail, eventId)
                yield put(actionCreators.getDetailInfoSuccess(organization))
            } catch (e) {
                console.error(e)
                yield put(actionCreators.getDetailInfoFailure(e))
            }
        }
    }
}

export function * watchDeleteEvent () {
    while (true) {
        try {
            const { openModalId } = yield take(actionTypes.EVENT.DELETE.MODAL)
            yield put({ type: modalActionTypes.MODAL.OPEN, openModalId })

            const { data } = yield race({
                data: take(actionTypes.EVENT.DELETE.REQUEST),
                cancel: take(modalActionTypes.MODAL.CLOSE)
            })

            if (data) {
                const eventId = data.eventId

                yield call(http.event.delete, eventId)
                yield put(actionCreators.deleteEventSuccess())
                yield put(modalActionCreators.closeModal())
            }

        } catch (error) {
            yield put(actionCreators.deleteEventFailure(error))
        }
    }
}

export default [
    fork(saveEventRequest),
    fork(showEventRequest),
    fork(getEventDetailRequest),
    fork(watchDeleteEvent)
]
