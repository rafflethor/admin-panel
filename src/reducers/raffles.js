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
        }
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    raffles: List()
})

/**
 */
const rafflesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RAFFLES.LIST.REQUEST:
            return state.set('isLoading', true)

        case actionTypes.RAFFLES.LIST.SUCCESS:
            return state
                .set('isLoading', false)
                .set('raffles', action.raffles)

        case actionTypes.RAFFLES.LIST.FAILURE:
            return state
                .set('isLoading', false)
                .set('error', action.error)

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
    }
}

export const selectors = {
    getRaffles: (state) => {
        return state.raffles.getIn(['raffles'])
    }
}

export default rafflesReducer
