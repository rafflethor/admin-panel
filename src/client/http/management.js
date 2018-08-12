import { parseError } from './utils'

export default (client) => ({
    listAllWinners (raffleId) {
        const query = `
          query ListAllWinners($id: String) {
            pickWinners(raffleId: $id) {
                id
                ordering
                nick
                social
                createdAt
                isValid
            }
          }
        `
        const data = {
            query,
            variables: {
                id: raffleId
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'pickWinners'])
            })
            .catch(parseError)
    },
    markWinnersAsNonValid (winnersIds, raffleId) {
        const query = `
          mutation MarkWinnersAsNonValid($input: MarkWinnersAsNonValidInput!) {
            markWinnersAsNonValid(input: $input) {
              id
              ordering
              nick
              social
              createdAt
              isValid
            }
          }
        `
        const data = {
            query,
            variables: {
                input: {
                    winnersIds,
                    raffleId
                }
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'markWinnersAsNonValid'])
            })
            .catch(parseError)
    }
})
