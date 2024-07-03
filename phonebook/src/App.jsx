import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phone from './services/phone'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await phone.getPersons()
      setPersons(data)
    }

    fetchData()
  }, [])

  const handleSumbit = async (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    const numbers = persons.map((person) => person.number)
    if (names.includes(newName) & numbers.includes(newNumber)) {
      alert(`${newName} is already added to phonebook`)
    } else if (names.includes(newName) & !numbers.includes(newNumber)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleUpdate(newName)
      }
    } else {
      try {
        const data = { name: newName, number: newNumber }
        const request = await phone.createPerson(data)
        setNotification(`Added ${newName}`)
        setMsgType('success')
        setTimeout(() => {
          setNotification('')
        }, 5000)
        setPersons([...persons, request])
        setNewName('')
        setNewNumber('')
      } catch (error) {
        console.log(error.response.data.error.split(': ')[2])
        setNotification(error.response.data.error.split(': ')[2])
        setMsgType('error')
        setTimeout(() => {
          setNotification('')
        }, 5000)
      }
    }
  }

  const handleUpdate = async (newName) => {
    const person = persons.find((person) => person.name === newName)
    const updatedPerson = { ...person, number: newNumber }

    try {
      const request = phone.updatePerson(person.id, updatedPerson)

      const data = await request
      const newPersons = persons.map((person) =>
        person.name === newName ? data : person
      )

      setNotification(`Successfully changed ${newName}'s number`)
      setMsgType('success')
      setTimeout(() => setNotification(''), 5000)
      setPersons(newPersons)
    } catch (error) {
      setNotification(error.response.data.error.split(': ')[2])
      setMsgType('error')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleName = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNumber = (event) => {
    const name = event.target.value
    setNewNumber(name)
  }

  const handlefilter = (event) => {
    const filter = event.target.value
    setFilter(filter.toLowerCase())
  }
  const handleDelete = async (person) => {
    const id = person.id
    if (window.confirm(`delete ${person.name} ?`)) {
      phone.deletePerson(id).catch(() => {
        setNotification(
          `Information of ${person.name} has already been removed from the server`
        )
        setMsgType('error')
        setTimeout(() => setNotification(''), 5000)
        setPersons(persons.filter((person) => person.id !== id))
      })
      const newPersons = persons.filter((person) => person.id !== id)
      setNotification(`Successfully deleted ${person.name}`)
      setMsgType('success')
      setTimeout(() => {
        setNotification('')
      }, 5000)
      setPersons(newPersons)
    }
  }
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  )

  let style = {
    height: '1rem',
    border: '3px solid green',
    borderRadius: '5px',
    marginBottom: '1rem',
    lineHeight: '1rem',
    padding: '1rem',
    backgroundColor: 'ash',
  }

  if (!notification) {
    style = { ...style, display: 'none' }
  }

  if (msgType === 'success') {
    style = { ...style, color: 'green', borderColor: 'green' }
  } else {
    style = { ...style, color: 'red', borderColor: 'red' }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div style={style}>{notification}</div>

      <Filter handlefilter={handlefilter} />

      <h2>Add a new</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        handleSumbit={handleSumbit}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
