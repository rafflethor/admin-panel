import { parseError } from './utils'

export default (client) => ({
    list () {
        const query = `
          query ListAllOrganizations($max: Int!, $offset: Int!) {
            listAllOrganizations(max: $max, offset: $offset) {
              id
              name
              description
            }
          }
        `
        const data = {
            query,
            variables: {
                max: 100,
                offset: 1
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => resp.data.getIn(['data', 'listAllOrganizations']))
            .catch(parseError)
    }
})
