import { List, Map } from 'immutable'
import { push } from 'react-router-redux'

/**
 * Possible types of action
 */
export const actionTypes = {
    RAFFLES: {
        LIST: {
            REQUEST: '@rafflethor/RAFFLES/LIST/REQUEST',
            SUCCESS: '@rafflethor/RAFFLES/LIST/SUCCESS',
            FAILURE: '@rafflethor/RAFFLES/LIST/FAILURE'
        },
        DETAIL: {
            REQUEST: '@rafflethor/RAFFLES/DETAIL/REQUEST',
            SUCCESS: '@rafflethor/RAFFLES/DETAIL/SUCCESS',
            FAILURE: '@rafflethor/RAFFLES/DETAIL/FAILURE'
        },
        START: {
            REQUEST: '@rafflethor/RAFFLES/START/REQUEST',
            SUCCESS: '@rafflethor/RAFFLES/START/SUCCESS',
            FAILURE: '@rafflethor/RAFFLES/START/FAILURE'
        }
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    raffle: Map(),
    raffles: List()
})

/**
 */
const rafflesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RAFFLES.LIST.REQUEST:
        case actionTypes.RAFFLES.DETAIL.REQUEST:
            return state.set('isLoading', true)

        case actionTypes.RAFFLES.LIST.SUCCESS:
            return state
                .set('isLoading', false)
                .set('raffles', action.raffles)

        case actionTypes.RAFFLES.DETAIL.FAILURE:
        case actionTypes.RAFFLES.LIST.FAILURE:
            return state
                .set('isLoading', false)
                .set('error', action.error)

        case actionTypes.RAFFLES.DETAIL.SUCCESS:
            return state
                .set('isLoading', false)
                .set('raffle', action.raffle)

        default:
            return state
    }
}

export const actionCreators = {
    newRaffleForm: () => {
        return push('/raffles/new')
    },
    listRaffles: () => {
        return { type: actionTypes.RAFFLES.LIST.REQUEST }
    },
    listRafflesSuccess: (raffles) => {
        return { type: actionTypes.RAFFLES.LIST.SUCCESS, raffles }
    },
    listRafflesFailure: (error) => {
        return { type: actionTypes.RAFFLES.LIST.FAILURE, error }
    },
    showRaffleRequest: (id) => {
        return push(`/raffles/${id}`)
    },
    getRaffleDetails: (id) => {
        return { type: actionTypes.RAFFLES.DETAIL.REQUEST, id }
    },
    getRaffleDetailsSuccess: (raffle) => {
        return { type: actionTypes.RAFFLES.DETAIL.SUCCESS, raffle }
    },
    getRaffleDetailsFailure: (error) => {
        return { type: actionTypes.RAFFLES.DETAIL.FAILURE, error }
    },
    startRaffleRequest: (id) => {
        return { type: actionTypes.RAFFLES.START.REQUEST, id }
    },
    startRaffleSuccess: (id) => {
        return { type: actionTypes.RAFFLES.START.SUCCESS, id }
    },
    startRaffleFailure: (error) => {
        return { type: actionTypes.RAFFLES.START.FAILURE, error }
    }
}

export const selectors = {
    getRaffles: (state) => {
        return state.raffles.getIn(['raffles'])
    },
    getRaffleDetail: (state) => {
        return state.raffles.getIn(['raffle'])
    }
}

export default rafflesReducer
