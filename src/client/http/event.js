import { parseError } from './utils'

export default (client) => ({
    save (event) {
        const query = `
          mutation SaveEvent($event: SaveEventInput!) {
            saveEvent(event: $event) {
              id
              name
              description
            }
          }
        `
        const data = {
            query,
            variables: {
                event: {
                    name: event.name,
                    description: event.description
                }
            }
        }

        return client
            .post('', data)
            .then(resp => resp.data.getIn(['data', 'saveEvent']))
            .catch(parseError)
    }
})
