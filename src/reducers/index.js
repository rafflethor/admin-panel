import { combineReducers } from 'redux'
import securityReducers from './security'
import uiReducers from './ui'
import dashboardReducers from './dashboard'
import eventsReducers from './events'
import eventReducers from './event'
import rafflesReducers from './raffles'
import modalReducers from './modal'
import managementReducers from './management'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    security: securityReducers,
    ui: uiReducers,
    dashboard: dashboardReducers,
    events: eventsReducers,
    event: eventReducers,
    raffles: rafflesReducers,
    modal: modalReducers,
    management: managementReducers,
    toastr: toastrReducer
})
