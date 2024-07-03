import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createPerson = async (data) => {
  const request = await axios.post(baseUrl, data)
  return request.data
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const updatePerson = async (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data)
  return request.then((response) => response.data)
}

export default { getPersons, createPerson, deletePerson, updatePerson }
