import { List, Map } from 'immutable'
import { push } from 'react-router-redux'
import { actionCreators as eventActionCreators } from './event'

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
        SAVE: {
            REQUEST: '@rafflethor/RAFFLES/SAVE/REQUEST',
            FAILURE: '@rafflethor/RAFFLES/SAVE/FAILURE'
        },
        DELETE: {
            MODAL: '@rafflethor/RAFFLES/DELETE/MODAL',
            REQUEST: '@rafflethor/RAFFLES/DELETE/REQUEST',
            SUCCESS: '@rafflethor/RAFFLES/DELETE/SUCCESS',
            FAILURE: '@rafflethor/RAFFLES/DELETE/FAILURE'
        },
        UPDATE: {
            REQUEST: '@rafflethor/RAFFLES/UPDATE/REQUEST',
            SUCCESS: '@rafflethor/RAFFLES/UPDATE/SUCCESS',
            FAILURE: '@rafflethor/RAFFLES/UPDATE/FAILURE'
        },
        TAB: '@rafflethor/RAFFLES/TAB'
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    raffle: Map(),
    raffles: List(),
    tab: 'DETAILS'
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

        case actionTypes.RAFFLES.SAVE.FAILURE:
        case actionTypes.RAFFLES.DETAIL.FAILURE:
        case actionTypes.RAFFLES.LIST.FAILURE:
            return state
                .set('isLoading', false)
                .set('error', action.error)

        case actionTypes.RAFFLES.DETAIL.SUCCESS:
            return state
                .set('isLoading', false)
                .set('raffle', action.raffle)

        case actionTypes.RAFFLES.TAB:
            return state
                .set('tab', action.tab)

        default:
            return state
    }
}

export const actionCreators = {
    newRaffleForm: (eventId) => {
        return push(`/raffles/new/${eventId}`)
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
    showEventInfoRequest: (eventId) => {
        return eventActionCreators.showEventRequest(eventId)
    },
    saveRaffleRequest: (raffle) => {
        return { type: actionTypes.RAFFLES.SAVE.REQUEST, raffle }
    },
    saveRaffleSuccess: (eventId) => {
        return push(`/events/${eventId}`)
    },
    saveRaffleFailure: (error) => {
        return { type: actionTypes.RAFFLES.SAVE.FAILURE, error }
    },
    updateRaffleRequest: (raffle, eventId) => {
        return { type: actionTypes.RAFFLES.UPDATE.REQUEST, raffle, eventId }
    },
    updateRaffleSuccess: (eventId) => {
        return push(`/events/${eventId}`)
    },
    updateRaffleFailure: (error) => {
        return { type: actionTypes.RAFFLES.UPDATE.FAILURE, error }
    },
    deleteRaffleModalRequest: (openModalId) => {
        return { type: actionTypes.RAFFLES.DELETE.MODAL, openModalId }
    },
    deleteRaffleRequest: (raffleId, eventId) => {
        return { type: actionTypes.RAFFLES.DELETE.REQUEST, raffleId, eventId }
    },
    deleteRaffleSuccess: (eventId) => {
        return push(`/events/${eventId}`)
    },
    deleteRaffleFailure: (error) => {
        return { type: actionTypes.RAFFLES.DELETE.FAILURE, error }
    },
    changeToDetails: () => {
        return {
            type: actionTypes.RAFFLES.TAB,
            tab: 'DETAILS'
        }
    },
    changeToManagement: () => {
        return {
            type: actionTypes.RAFFLES.TAB,
            tab: 'MANAGEMENT'
        }
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
