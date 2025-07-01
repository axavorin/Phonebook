import axios from 'axios'
import { useEffect, useState } from 'react'

const Person = ({person}) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const PersonList = ({persons}) => {
  return (
    <div>
      {persons.map((person) => <Person key={person.name} person={person} />)}
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

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <InputField label="name" value={newName} onChange={handleNewName} />
        <InputField label="number" value={newNumber} onChange={handleNewNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons} />
    </div>
  )
}

export default App