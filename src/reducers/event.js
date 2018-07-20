import { List, Map } from 'immutable'

/**
 * Possible types of action
 */
export const actionTypes = {
    EVENT: {
        NEW: {
            REQUEST: '@rafflethor/EVENT/NEW/REQUEST',
            SUCCESS: '@rafflethor/EVENT/NEW/SUCCESS',
            FAILURE: '@rafflethor/EVENT/NEW/FAILURE'
        },
        SHOW: {
            REQUEST: '@rafflethor/EVENT/SHOW/REQUEST',
            SUCCESS: '@rafflethor/EVENT/SHOW/SUCCESS',
            FAILURE: '@rafflethor/EVENT/SHOW/FAILURE'
        },
        DETAIL: {
            REQUEST: '@rafflethor/EVENT/DETAIL/REQUEST',
            SUCCESS: '@rafflethor/EVENT/DETAIL/SUCCESS',
            FAILURE: '@rafflethor/EVENT/DETAIL/FAILURE'
        },
        UPDATE: {
            REQUEST: '@rafflethor/EVENT/UPDATE/REQUEST',
            SUCCESS: '@rafflethor/EVENT/UPDATE/SUCCESS',
            FAILURE: '@rafflethor/EVENT/UPDATE/FAILURE'
        }
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    event: Map({raffles: List()})
})

/**
 */
const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.EVENT.NEW.REQUEST:
        case actionTypes.EVENT.SHOW.REQUEST:
        case actionTypes.EVENT.DETAIL.REQUEST:
        case actionTypes.EVENT.UPDATE.REQUEST:
            return state
                .set('isLoading', true)

        case actionTypes.EVENT.NEW.SUCCESS:
        case actionTypes.EVENT.SHOW.SUCCESS:
        case actionTypes.EVENT.DETAIL.SUCCESS:
        case actionTypes.EVENT.UPDATE.SUCCESS:
            return state
                .set('isLoading', false)
                .set('event', action.event)

        case actionTypes.EVENT.NEW.FAILURE:
        case actionTypes.EVENT.SHOW.FAILURE:
        case actionTypes.EVENT.DETAIL.FAILURE:
        case actionTypes.EVENT.UPDATE.FAILURE:
            return state
                .set('isLoading', false)
                .set('error', action.error)

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
    },
    getDetailInfoRequest: (eventId) => {
        return { type: actionTypes.EVENT.DETAIL.REQUEST, eventId }
    },
    getDetailInfoSuccess: (event) => {
        return { type: actionTypes.EVENT.DETAIL.SUCCESS, event }
    },
    getDetailInfoFailure: (eventId) => {
        return { type: actionTypes.EVENT.DETAIL.FAILURE, eventId }
    },
    showEventRequest: (eventId) => {
        return { type: actionTypes.EVENT.SHOW.REQUEST, eventId }
    },
    showEventSuccess: () => {
        return { type: actionTypes.EVENT.SHOW.SUCCESS}
    },
    showEventFailure: (error) => {
        return { type: actionTypes.EVENT.SHOW.FAILURE, error }
    },
    updateEventRequest: (event) => {
        return { type: actionTypes.EVENT.UPDATE.REQUEST, event }
    },
    updateEventSuccess: () => {
        return { type: actionTypes.EVENT.UPDATE.SUCCESS}
    },
    updateEventFailure: (error) => {
        return { type: actionTypes.EVENT.UPDATE.FAILURE, error }
    }
}

export const selectors = {
    getEvents: (state) => {
        return state.event.getIn(['event'])
    }
}

export default eventReducer
