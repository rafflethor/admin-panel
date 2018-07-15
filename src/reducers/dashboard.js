import { Map } from 'immutable'

/**
 * Possible types of action
 */
export const actionTypes = {
    DASHBOARD: {
        STATS_REQUEST: '@rafflethor/DASHBOARD/STATS_REQUEST',
        STATS_SUCCESS: '@rafflethor/DASHBOARD/STATS_SUCCESS',
        STATS_FAILURE: '@rafflethor/DASHBOARD/STATS_FAILURE'
    }
}

/**
 * Initial reducer state
 */
export const initialState = Map({
  isLoading: false,
  error: null,
  stats: {

  }
})

/**
 */
const dashboardReducers = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.DASHBOARD.STATS_REQUEST:
        return state.set('isLoading', true)

      case actionTypes.DASHBOARD.STATS_SUCCESS:
        return state
            .set('isLoading', false)
            .set('stats', action.stats)

      case actionTypes.DASHBOARD.STATS_FAILURE:
        return state
            .set('isLoading', false)
            .set('stats', action.error)

      default:
        return state
    }
}

export const actionCreators = {
    loadStats: () => {
        return {
            type: actionTypes.DASHBOARD.STATS_REQUEST
        }
    },
    statsSuccess: (stats) => {
        return {
            type: actionTypes.DASHBOARD.STATS_SUCCESS,
            stats: stats
        }
    },
    statsFailure: (error) => {
        return {
            type: actionTypes.DASHBOARD.STATS_FAILURE,
            error: error
        }
    },
}

export const selectors = {
    getStats: (state) => ({

    })
}

export default dashboardReducers
