import { parseError } from './utils'

export default (client) => ({
    list () {
        const query = `
          query ListAllRaffles($max: Int!, $offset: Int!) {
            listAllRaffles(max: $max, offset: $offset) {
              id
              name
              status
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
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'listAllRaffles'])
            })
            .catch(parseError)
    },
    detail (id) {
        const query = `
         query GetRaffle($id: String!) {
            raffle(id: $id) {
                id
                name
                type
                status
                noWinners
                preventPreviousWinners
                ... on TwitterRaffle {
                  hashtag
                  since
                  until
                  organization {
                    id
                    name
                  }
                }
                ... on RandomListRaffle {
                  organization {
                    id
                    name
                  }
                }
                winners {
                  id
                  nick
                  ordering
                  social
                  createdAt
                  isValid
                }
            }
         }
        `

        const data = {
            query,
            variables: {
                id: id
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'raffle'])
            }).catch(parseError)
    },
    start (id) {
        const query = `
           mutation StartRaffle($id:String!) {
             startRaffle(id: $id) {
               id
               name
               type
             }
           }
        `

        const data = {
            query,
            variables: {
                id: id
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'startRaffle'])
            }).catch(parseError)
    },
    save (raffle) {
        const query = `
          mutation CreateRaffle($input: SaveRaffleInput!) {
              saveRaffle(input: $input) {
                id
                name
                ... on TwitterRaffle {
                  organization {
                    id
                    name
                  }
                }
                ... on RandomListRaffle {
                  organization {
                    id
                    name
                  }
                }
              }
          }
        `

        const data = {
            query,
            variables: {
                input: {
                    name: raffle.name,
                    organizationId: raffle.organizationId,
                    type: raffle.type,
                    noWinners: raffle.noWinners,
                    preventPreviousWinners: raffle.cangoon,
                    since: raffle.since,
                    until: raffle.until,
                    payload: {
                        hashtag: raffle.hashtag
                    }
                }
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'saveRaffle'])
            }).catch(parseError)
    },
    delete (id) {
        const query = `
          mutation DeleteRaffle($id: String!) {
              deleteRaffle(id: $id) {
                deleted
              }
          }
        `

        const data = {
            query,
            variables: {
                id: id
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'deleteRaffle'])
            }).catch(parseError)
    },
    update (raffle) {
        const query = `
          mutation UpdateRaffle($input: SaveRaffleInput!) {
              updateRaffle(input: $input) {
                id
                name
                ... on TwitterRaffle {
                  organization {
                    id
                    name
                  }
                }
                ... on RandomListRaffle {
                  organization {
                    id
                    name
                  }
                }
              }
          }
        `

        const data = {
            query,
            variables: {
                input: {
                    id: raffle.id,
                    name: raffle.name,
                    organizationId: raffle.organizationId,
                    type: raffle.type,
                    noWinners: raffle.noWinners,
                    preventPreviousWinners: raffle.preventPreviousWinners,
                    since: raffle.since,
                    until: raffle.until,
                    payload: {
                        hashtag: raffle.hashtag
                    }
                }
            }
        }

        return client
            .post('/graphql', data)
            .then(resp => {
                return resp.data.getIn(['data', 'updateRaffle'])
            }).catch(parseError)
    }
})
