import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Content from './components/Content'
import Form from './components/Form'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event, id, number) => {
    event.preventDefault()
    const person = persons.filter(persons => persons.name === newName)
    const changedNumber = person[0]
    const updatedNumber = { ...changedNumber, number: newNumber }

    if(persons.find((person) => person.name === newName)) {
      if(window.confirm(`${newName} is already added, do you want to update number`)){
        personsService
          .updateNumber(updatedNumber.id, updatedNumber)
          .then(returnedNumber => {
            setPersons(persons.map(personItem => personItem.id !== changedNumber.id ? personItem : returnedNumber))
            setNewName('')
            setNewNumber('')
            setMessage(`${newName} number was updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)

      })
      }
    }
    else{
    const nameObject = {
      name: newName,
      number: newNumber
    }

  personsService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`${newName} was added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      setNewName('')
      setNewNumber('')
      setMessage(`error: ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(error.response.data)
    }
  )}
}

  const handleDelete = (id) => {
    const filteredPerson = persons.filter(persons => persons.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id

    if (window.confirm(`Delete ${personName} ?`)) {
      personsService
        .deletePerson(personId)
        console.log(`${personName} successfully deleted`)
        setPersons(persons.filter(person => person.id !== personId))
        setMessage(`${personName} was deleted`)
        setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
   
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Content persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>

    </div>
  )

}

export default App
