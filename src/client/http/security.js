export default (client) => ({
    login ({username, password}) {
        const data = {
            username,
            password
        }

        return client
            .post('/auth/token', data)
            .then(resp => resp.data)
            .catch(error => {
                console.error(error)
            })
    }
})
