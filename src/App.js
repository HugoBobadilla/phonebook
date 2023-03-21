
import { useEffect, useState } from 'react'
import personService from './services/persons'
import './App.css'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'
import Search from './components/Search'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=> {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newName === '' || phoneNumber === '') {
      alert('Name and Phone are required!')
    } else {
      const newPersonObj = {
        name: newName,
        phone: phoneNumber
      }
      
      const person = persons.find(p => p.name.toLowerCase() === newPersonObj.name.toLowerCase())
      

      if(person !== undefined) {
        const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(answer) {
          const updatedPerson = {...person, phone: phoneNumber}
          personService
            .update(person.id, updatedPerson)
            .then(returnedPerson => {
              const updatedPersonsArr = persons.map(p => p.name !== updatedPerson.name ? p : returnedPerson)
              setPersons(updatedPersonsArr)
            })
        }
      } else {
        personService
          .create(newPersonObj)
          .then(returnedPerson => {
            setPersons([...persons, returnedPerson])
            setNewName('')
            setPhoneNumber('')
          })
      }
    }
  }

  const deletePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
      .remove(id)
      .then(returnedPerson => {
        const newPersonsArr = persons.filter(person => person.id !== id)
        setPersons(newPersonsArr)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search 
        handleFilter={handleFilter}
        filter={filter}
      />
      <AddPerson
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handlePhoneNumber={handlePhoneNumber}
        newName={newName}
        phoneNumber={phoneNumber}
      />
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
