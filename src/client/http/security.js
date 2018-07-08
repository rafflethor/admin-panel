import { parseError } from './utils'

export default (client) => ({
    login ({username, password}) {
        const query = `
        query Login($credentials: Credentials!) {
          login(credentials: $credentials) {
            token
            name
            roles
          }
        }
        `
        const data = {
            query,
            variables: {
                clientMutationId: 'login',
                credentials: {
                    username,
                    password
                }
            }
        }

        return client
            .post('', data)
            .then(resp => resp.data.getIn(['data', 'login']))
            .catch(parseError)
    }
})
