
import axios from 'axios'
import { fromJS } from 'immutable'

import security from './security'
import storage from '../storage'
import dashboard from './dashboard'
import events from './events'
import event from './event'
import raffles from './raffles'

/**
 * Default http client. Authorization header is calling
 * getToken(). That will only work if the user was already
 * successfully authenticated and there is still the login information,
 * in the local storage.
 */

export const client = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    baseURL: 'http://localhost:5050',
    transformResponse: [ (data) => {
        const payload = fromJS(JSON.parse(data))
        const errors = payload.getIn(['errors'])

        if (errors && errors.size) {
            throw new Error(payload)
        }

        return payload
    }]
})

const ok = (config) => {
    const login = storage.get('login')
    let token

    if (login) {
        token = login.token
    }

    return {
        ...config,
        headers: {
            Authorization: `JWT ${token}`
        }
    }
}

const ko = (err) => {
    return Promise.reject(err)
}

client.interceptors.request.use(ok, ko)

/**
 * Exports all available http clients
 */
export default {
    security: security(client),
    dashboard: dashboard(client),
    events: events(client),
    event: event(client),
    raffles: raffles(client)
}
