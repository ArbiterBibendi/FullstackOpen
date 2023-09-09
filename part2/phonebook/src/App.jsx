import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import personsService from "./services/personsService"

const URL = 'http://localhost:3001/persons';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    personsService
      .getPersons()
      .then((returnedPersons) => setPersons(returnedPersons))
  }, []);

  const checkNameExists = (name) => {
    return persons.find((currentPerson) => currentPerson.name.toLowerCase() == name.toLowerCase())
  }
  const generateId = () => {
    let highestId = 0;
    persons.forEach((person) => {
      if (person.id > highestId) {
        highestId = person.id;
      }
    })
  }
  const updatePerson = (personToUpdate, replaceWith) => {
    personsService
      .updatePerson(personToUpdate, replaceWith)
      .then((updatedPerson) => {
        const updatedPersons = persons.map((person) => {
          if (person.name == updatedPerson.name) {
            return updatedPerson;
          }
          else {
            return person;
          }
        });
        setPersons(updatedPersons);
      })
  }
  const addPerson = (personToAdd) => {
    const newPerson = { ...personToAdd, id: generateId() } // NEED TO UPDATE STATE AND DB STILL
    const existingPerson = checkNameExists(newPerson.name);
    const confirmUpdate = () => window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`);
    if (existingPerson) {
      if (confirmUpdate()) {
        updatePerson(existingPerson, { ...existingPerson, number: newPerson.number })
      }
      return;
    }
    personsService
      .createPerson(newPerson)
      .then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
      })
  }
  const deletePerson = (personToDelete) => {
    if (!window.confirm(`Delete ${personToDelete.name} ?`)) {
      return;
    }
    setPersons(persons.filter((currentPerson) => currentPerson.id != personToDelete.id));
    personsService.deletePerson(personToDelete.id);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Phonebook deletePerson={deletePerson} persons={persons.filter((person) => filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : true)} />
    </div>
  )
}

export default App