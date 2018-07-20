import { put, call, take, fork, takeLatest } from 'redux-saga/effects'
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

export function* watchSaveRaffle() {
    while (true) {
        try {
            const { raffle } = yield take(actionTypes.RAFFLES.SAVE.REQUEST)

            if (raffle) {
                const saved = yield call(http.raffles.save, raffle)
                const event = saved.getIn(['organization', 'id'])

                yield put(actionCreators.saveRaffleSuccess(event))
            }
        } catch (e) {
            yield put(actionCreators.saveRaffleFailure(e))
        }
    }

}

export default [
    takeLatest(actionTypes.RAFFLES.LIST.REQUEST, raffles),
    fork(watchSaveRaffle)
]
