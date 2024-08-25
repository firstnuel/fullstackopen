import { useState, useEffect } from 'react'
import phonebook from '../services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    phonebook
    .getAll()
    .then(contacts => setPersons(contacts))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState({message: "", success: false})

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearch(event.target.value)

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const notify = (msg, stats) => {
    setStatus({message: msg, success: stats})
    setTimeout(() => setStatus({message: "", success: false}), 3000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let newContact = {
      name: newName.trim(), 
      number: newNumber,
      id: String(persons.length + 1)
    }
    const personExists = persons.some(person => person.name.trim() === newContact.name)
    if (personExists){
       if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number`)) {
        let person = persons.find(person => person.name === newContact.name)
        phonebook
          .update(person.id, newContact)
          .then(response => {
            setPersons(persons.map(contact => contact.id !== response.id? contact : response))
            clearForm()
            notify(`${response.name} has been updated`, true)
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== person.id))
            notify(`Information of ${person.name} have already been removed from server.`, false)
          })
       }
    } else {
      phonebook
        .create(newContact)
        .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            clearForm()
            notify(`Added ${newContact.name}`, true)
          })
          .catch(error => {
            console.error('Create contact failed', error)
            notify('Failed to create', false)
          })
    }
  }

  const handleDelete = (id) => {
    let person = persons.find((person) => person.id === id)
    if(person && window.confirm(`Delete ${person.name}`)){
      phonebook
        .deleteContact(id)
        .then(() => {
          notify(`Deleted ${person.name}`, true)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Delete failed', error)
          notify(`Failed to delete ${person.name}.`, false)
        })
    }
  }

  const filteredPersons = persons.filter((person) => {
    let len = search.length;
    return (person.name.slice(0, len).toLowerCase() === search.toLowerCase());
  });
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <Notification message={status.message} success={status.success}/>

      <h2>add new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handlePhoneChange={handlePhoneChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />

    </div>
  )
}

export default App