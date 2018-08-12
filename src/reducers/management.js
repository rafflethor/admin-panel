import { List, Map } from 'immutable'
import storage from '../client/storage'

/**
 * Possible types of action
 */
export const actionTypes = {
    MANAGEMENT: {
        WINNERS: {
            REQUEST: '@rafflethor/MANAGEMENT/WINNERS/REQUEST',
            SUCCESS: '@rafflethor/MANAGEMENT/WINNERS/SUCCESS',
            FAILURE: '@rafflethor/MANAGEMENT/WINNERS/FAILURE'
        },
        MARK_NON_VALID: {
            REQUEST: '@rafflethor/MANAGEMENT/MARK_NON_VALID/REQUEST',
            SUCCESS: '@rafflethor/MANAGEMENT/MARK_NON_VALID/SUCCESS',
            FAILURE: '@rafflethor/MANAGEMENT/MARK_NON_VALID/FAILURE'
        },
        START: {
            REQUEST: '@rafflethor/MANAGEMENT/START/REQUEST',
            SUCCESS: '@rafflethor/MANAGEMENT/START/SUCCESS',
            FAILURE: '@rafflethor/MANAGEMENT/START/FAILURE'
        }
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    winners: List()
})

/**
 */
const managementReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MANAGEMENT.START.REQUEST:
        case actionTypes.MANAGEMENT.MARK_NON_VALID.REQUEST:
        case actionTypes.MANAGEMENT.WINNERS.REQUEST:
            return state.set('raffleLoading', true)

        case actionTypes.MANAGEMENT.MARK_NON_VALID.SUCCESS:
        case actionTypes.MANAGEMENT.WINNERS.SUCCESS:
            return state
                .set('winners', action.winners)
                .set('raffleLoading', false)

        case actionTypes.MANAGEMENT.START.FAILURE:
        case actionTypes.MANAGEMENT.MARK_NON_VALID.FAILURE:
        case actionTypes.MANAGEMENT.WINNERS.FAILURE:
            return state.set('raffleLoading', false)
                        .set('error', action.error)

        default:
            return state
    }
}

export const actionCreators = {
    listAllWinnersRequest: (raffleId) => {
        return {
            type: actionTypes.MANAGEMENT.WINNERS.REQUEST,
            raffleId
        }
    },
    listAllWinnersSuccess: (winners) => {
        return {
            type: actionTypes.MANAGEMENT.WINNERS.SUCCESS,
            winners
        }
    },
    listAllWinnersFailure: (error) => {
        return {
            type: actionTypes.MANAGEMENT.WINNERS.FAILURE,
            error
        }
    },
    markWinnersAsNonValidRequest: (winnersIds, raffleId) => {
        return {
            type: actionTypes.MANAGEMENT.MARK_NON_VALID.REQUEST,
            winnersIds,
            raffleId
        }
    },
    markWinnersAsNonValidSuccess: (winners) => {
        return {
            type: actionTypes.MANAGEMENT.MARK_NON_VALID.SUCCESS,
            winners
        }
    },
    markWinnersAsNonValidFailure: (error) => {
        return {
            type: actionTypes.MANAGEMENT.MARK_NON_VALID.FAILURE,
            error
        }
    },
    startRaffleRequest: (raffleId) => {
        const base = process.env.REACT_APP_API_URL_BASE
        const sse = process.env.REACT_APP_MANAGEMENT_SSE_ENDPOINT
        const token = storage.get('login').token
        const url = `${base}${sse}/${raffleId}?token=${token}`

        return {
            type: actionTypes.MANAGEMENT.START.REQUEST,
            url
        }
    },
    startRaffleSuccess: () => {
        return {
            type: actionTypes.MANAGEMENT.START.SUCCESS
        }
    },
    startRaffleFailure: (error) => {
        return {
            type: actionTypes.MANAGEMENT.START.FAILURE,
            error
        }
    }
}

export default managementReducer
