import { parseError } from './utils'

export default (client) => ({
    list () {
        const query = `
          query ListAllEvents($max: Int!, $offset: Int!) {
            listAllEvents(max: $max, offset: $offset) {
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
            .post('', data)
            .then(resp => resp.data.getIn(['data', 'listAllEvents']))
            .catch(parseError)
    }
})
