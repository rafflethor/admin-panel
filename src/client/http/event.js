import { parseError } from './utils'

export default (client) => ({
    save (event) {
        const query = `
          mutation SaveOrganization($organization: SaveOrganizationInput!) {
            saveOrganization(organization: $organization) {
              id
              name
              description
            }
          }
        `
        const data = {
            query,
            variables: {
                organization: {
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
