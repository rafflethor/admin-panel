import { parseError } from './utils'

export default (client) => ({
    list () {
        const query = `
          query ListAllRaffles($max: Int!, $offset: Int!) {
            listAllRaffles(max: $max, offset: $offset) {
              id
              name
              noWinners
              type
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
            .then(resp => {
                return resp.data.getIn(['data', 'listAllRaffles'])
            })
            .catch(parseError)
    }
})
