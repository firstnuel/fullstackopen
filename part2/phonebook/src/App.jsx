import { useState, useEffect } from 'react'
import phonebook from '../services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


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

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearch(event.target.value)

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let newContact = {
      name: newName.trim(), 
      number: newNumber,
      id: String(persons.length + 1)
    }

    if (persons.some(person => person.name.trim() === newContact.name.trim())){
       if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number`)) {
        let person = persons.find(person => person.name === newContact.name)
        phonebook
          .update(person.id, newContact)
          .then(response => {
            alert(`${response.name} has been updated`)
            setPersons(persons.map(contact => contact.id !== response.id? contact : response))
            clearForm()
          })
          .catch(error => {
            console.error('Update failed', error)
            alert(`Failed to update ${person.name}. They may have already been removed.`)
          })
       }

    } else {
      phonebook
        .create(newContact)
        .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            clearForm()
          })
          .catch(error => {
            console.error('Create contact failed', error)
            alert('Failed to create')
          })
    }
  }

  const handleDelete = (id) => {
    let person = persons.find((person) => person.id === id)
    if(window.confirm(`Delete ${person.name}`)){
      phonebook
        .deleteContact(id)
        .then(deletedObj => {
          setPersons(persons.filter(person => person.id !== deletedObj.id))
        })
        .catch(error => {
          console.error('Delete failed', error)
          alert(`Failed to delete ${person.name}.`)
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