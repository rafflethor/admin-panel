import { put, call, take, fork } from 'redux-saga/effects'
import { actionCreators, actionTypes } from '../reducers/management'
import { sseActionCreators, sseActionTypes } from '../client/sse'
import { List } from 'immutable'
import http from '../client/http'

export function* listAllWinners() {
    while(true) {
        try {
            const { raffleId } = yield take(actionTypes.MANAGEMENT.WINNERS.REQUEST)

            if (raffleId) {
                const winners = yield call(http.management.listAllWinners, raffleId)
                yield put(actionCreators.listAllWinnersSuccess(winners))
            }
        } catch(e) {
            yield put(actionCreators.listAllWinnersFailure(e))
        }
    }
}

export function* markWinnersAsNonValid() {
    while(true) {
        try {
            const { winnersIds, raffleId } = yield take(actionTypes.MANAGEMENT.MARK_NON_VALID.REQUEST)

            if (winnersIds && raffleId) {
                const winners = yield call(
                    http.management.markWinnersAsNonValid,
                    winnersIds,
                    raffleId
                )

                yield put(actionCreators.markWinnersAsNonValidSuccess(winners))
            }
        } catch(e) {
            yield put(actionCreators.markWinnersAsNonValidFailure(e))
        }
    }
}

export function* startRaffle() {
    while(true) {
        try {
            const { url } = yield take(actionTypes.MANAGEMENT.START.REQUEST)

            if (url) {
                yield put(sseActionCreators.openConnectionRequest(url))
                yield put(actionCreators.startRaffleSuccess())
            }
        } catch (e) {
            yield put(actionCreators.startRaffleFailure(e))
        }
    }
}

function* handleMessages() {
    while (true) {
        try {
            const { event } = yield take(sseActionTypes.ON_MESSAGE)
            const { type, winners } = event

            if (type === 'winners') {
                yield put(actionCreators.listAllWinnersSuccess(List(winners)))
            } else {

            }
        } catch (e) {

        }
    }
}

export default [
    fork(listAllWinners),
    fork(startRaffle),
    fork(handleMessages),
    fork(markWinnersAsNonValid)
]
