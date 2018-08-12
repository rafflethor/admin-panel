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

export default [
    fork(getRaffleDetails)
]
