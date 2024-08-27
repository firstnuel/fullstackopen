import axios from 'axios'

const BaseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(BaseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(BaseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${BaseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    const request = axios.delete(`${BaseUrl}/${id}`)
    return request.then(response => response.data)
}


export default { getAll, create, deleteContact, update }