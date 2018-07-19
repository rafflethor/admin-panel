import { put, take, fork, call } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/raffles'
import http from '../client/http'

export function* getRaffleDetails() {
    while(true) {
        const { id } = yield take(actionTypes.RAFFLES.DETAIL.REQUEST)

        if (id) {
            try {
                const raffle = yield call(http.raffles.detail, id)
                yield put(actionCreators.getRaffleDetailsSuccess(raffle))
            } catch (err) {
                const error = err.code || err
                yield put(actionCreators.getRaffleDetailsFailure(error))
            }
        }
    }
}

export function* startRaffle() {
    while(true) {
        try {
            const { id } = yield take(actionTypes.RAFFLES.START.REQUEST)

            if (id) {

                yield call(http.raffles.start, id)
                yield put(actionCreators.startRaffleSuccess())

            }
        } catch (e) {
            yield put(actionCreators.startRaffleFailure(e))
        }
    }

}

export default [
    fork(getRaffleDetails),
    fork(startRaffle)
]
