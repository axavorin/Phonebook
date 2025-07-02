import axios from 'axios'
import { useEffect, useState } from 'react'
import personNumbers from './services/PersonsNumbers'
import Notification from './components/Notification'

const Person = ({person, onDelete}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={onDelete}>delete</button>
    </div>
  )
}

const PersonList = ({persons, onDelete}) => {
  return (
    <div>
      {persons.map((person) => <Person key={person.name} person={person} onDelete={onDelete(person.id, person.name)} />)}
    </div>
  )
}

const InputField = ({label, value, onChange}) => {
  return (
    <div>
      {label}: <input value={value} onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [message, setMessage] = useState(null)


  useEffect(() => {
    personNumbers.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }

    personNumbers.add(newPerson)
      .then(data => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${newPerson.name} succesfully added.`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const handleDelete = (id, name) => {
    return () => {
      if (confirm(`Delete ${name}?`)) {
        personNumbers.del(id)
          .then(data => {
            setPersons(persons.filter(person => person.id != id))
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <Notification message={message} />
        <InputField label="name" value={newName} onChange={handleNewName} />
        <InputField label="number" value={newNumber} onChange={handleNewNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons} onDelete={handleDelete} />
    </div>
  )
}

export default App