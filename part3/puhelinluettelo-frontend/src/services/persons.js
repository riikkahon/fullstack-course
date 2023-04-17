import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (id, newPerson) => {
    const request = axios.put(`${url}/${id}`, newPerson)
    return request.then(response => response.data)
}


const exported = {
    getAll, create, deletePerson, updateNumber
}


export default exported