import { Map } from 'immutable'

/**
 * Possible types of action
 */
export const actionTypes = {
    EVENT: {
        NEW: {
            REQUEST: '@rafflethor/EVENT/NEW/REQUEST',
            SUCCESS: '@rafflethor/EVENT/NEW/SUCCESS',
            FAILURE: '@rafflethor/EVENT/NEW/FAILURE'
        }
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    event: Map()
})

/**
 */
const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.EVENT.NEW.REQUEST:
            return state
                .set('isLoading', true)
                .set('events', action.event)

        case actionTypes.EVENT.NEW.SUCCESS:
            return state
                .set('isLoading', false)

        case actionTypes.EVENT.NEW.FAILURE:
            return state
                .set('isLoading', false)
                .set('events', action.error)

        default:
            return state
    }
}

export const actionCreators = {
    newEventRequest: (event) => {
        return { type: actionTypes.EVENT.NEW.REQUEST, event }
    },
    newEventSuccess: () => {
        return { type: actionTypes.EVENT.NEW.SUCCESS}
    },
    newEventFailure: (error) => {
        return { type: actionTypes.EVENT.NEW.FAILURE, error }
    }
}

export const selectors = {
    getEvents: (state) => {
        return state.event.getIn(['event'])
    }
}

export default eventReducer
