import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getClient = (email) => api.get('/client')
export const login = (payload) => api.post('/authenticate')


const apis = {
    login,
    getClient,
}

export default apis
