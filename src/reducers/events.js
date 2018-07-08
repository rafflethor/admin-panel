import { List, Map } from 'immutable'
import { push } from 'react-router-redux'

/**
 * Possible types of action
 */
export const actionTypes = {
    EVENTS: {
        LIST: {
            REQUEST: '@rafflethor/EVENTS/LIST/REQUEST',
            SUCCESS: '@rafflethor/EVENTS/LIST/SUCCESS',
            FAILURE: '@rafflethor/EVENTS/LIST/FAILURE'
        }
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    events: List()
})

/**
 */
const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.EVENTS.LIST.REQUEST:
            return state.set('isLoading', true)

        case actionTypes.EVENTS.LIST.SUCCESS:
            return state
                .set('isLoading', false)
                .set('events', action.events)

        case actionTypes.EVENTS.LIST.FAILURE:
            return state
                .set('isLoading', false)
                .set('error', action.error)

        default:
            return state
    }
}

export const actionCreators = {
    newEventForm: () => {
        return push('/events/new')
    },
    listEvents: () => {
        return { type: actionTypes.EVENTS.LIST.REQUEST }
    },
    listEventsSuccess: (events) => {
        return { type: actionTypes.EVENTS.LIST.SUCCESS, events }
    },
    listEventsFailure: (error) => {
        return { type: actionTypes.EVENTS.LIST.FAILURE, error }
    }
}

export const selectors = {
    getEvents: (state) => {
        return state.events.getIn(['events'])
    }
}

export default eventsReducer
