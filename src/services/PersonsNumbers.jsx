import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const add = newPerson => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const del = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { getAll, add, del }