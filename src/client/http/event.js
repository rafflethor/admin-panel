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
            .post('/graphql', data)
            .then(resp => resp.data.getIn(['data', 'saveEvent']))
            .catch(parseError)
    },
    detail (eventId) {
        const query = `
            query EventDetail($id: String) {
              organization(id: $id) {
                id
                name
                description
                raffles {
                   id
                   name
                   type
                   status
                }
              }
            }
        `
        const data = {
            query,
            variables: {
                id: eventId
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'organization'])
            })
            .catch(parseError)
    },
    delete (eventId) {
        const query = `
            mutation DeleteOrganization($id:String!){
              deleteOrganization(id: $id) {
                deleted
              }
            }
        `
        const data = {
            query,
            variables: {
                id: eventId
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'deleteOrganization'])
            })
            .catch(parseError)
    }
})
