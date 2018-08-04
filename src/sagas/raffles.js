import { put, call, take, fork, race, takeLatest } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/raffles'
import { actionCreators as uiActionCreators } from '../reducers/ui'

import {
    actionTypes as modalActionTypes,
    actionCreators as modalActionCreators
} from '../reducers/modal'
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

export function* watchSaveRaffle() {
    while (true) {
        try {
            const { raffle } = yield take(actionTypes.RAFFLES.SAVE.REQUEST)

            if (raffle) {
                const saved = yield call(http.raffles.save, raffle)
                const event = saved.getIn(['organization', 'id'])

                yield put(actionCreators.saveRaffleSuccess(event))
                yield put(uiActionCreators.successNotification(
                    'Save succeeded',
                    'Raffle has been saved successfully'
                ))
            }
        } catch (e) {
            yield put(actionCreators.saveRaffleFailure(e))
            yield put(uiActionCreators.failureNotification(
                'Save failed',
                'Raffle couldnt be saved'
            ))
        }
    }

}

export function * watchDeleteRaffle () {
    while (true) {
        try {
            const { openModalId } = yield take(actionTypes.RAFFLES.DELETE.MODAL)
            yield put({ type: modalActionTypes.MODAL.OPEN, openModalId })

            const { data } = yield race({
                data: take(actionTypes.RAFFLES.DELETE.REQUEST),
                cancel: take(modalActionTypes.MODAL.CLOSE)
            })

            if (data) {
                const { raffleId, eventId } = data

                yield call(http.raffles.delete, raffleId)
                yield put(actionCreators.deleteRaffleSuccess(eventId))
                yield put(modalActionCreators.closeModal())
                yield put(uiActionCreators.successNotification(
                    'Deletion succeeded',
                    'Raffle has been deleted successfully'
                ))
            }

        } catch (error) {
            yield put(actionCreators.deleteRaffleFailure(error))
            yield put(uiActionCreators.failureNotification(
                'Delete failed',
                'Raffle deletion failed'
            ))
        }
    }
}

export function* watchUpdateRaffle() {
    while (true) {
        try {
            const { raffle, eventId } = yield take(actionTypes.RAFFLES.UPDATE.REQUEST)

            if (raffle) {
                yield call(http.raffles.update, raffle)
                yield put(actionCreators.updateRaffleSuccess(eventId))
                yield put(uiActionCreators.successNotification(
                    'Update succeeded',
                    'Raffle has been updated successfully'
                ))
            }
        } catch (e) {
            yield put(actionCreators.updateRaffleFailure(e))
            yield put(uiActionCreators.failureNotification(
                'Update failed',
                'Raffle couldnt be updated'
            ))
        }
    }

}

export default [
    takeLatest(actionTypes.RAFFLES.LIST.REQUEST, raffles),
    fork(watchSaveRaffle),
    fork(watchDeleteRaffle),
    fork(watchUpdateRaffle)
]
