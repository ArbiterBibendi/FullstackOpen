import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'
import personsService from "./services/personsService"

const emptyNotification = { message: '', isError: false }

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(emptyNotification);
  useEffect(() => {
    personsService
      .getPersons()
      .then((returnedPersons) => setPersons(returnedPersons))
  }, []);

  const notify = (message) => {
    console.log(message);
    setNotification({
      message,
      isError: false
    });
    setTimeout(() => setNotification(emptyNotification), 5000);
  }
  const notifyError = (message) => {
    console.log(message);
    setNotification({
      message,
      isError: true
    });
    setTimeout(() => setNotification(emptyNotification), 5000);
  }

  const checkNameExists = (name) => {
    return persons.find((currentPerson) => currentPerson.name.toLowerCase() == name.toLowerCase())
  }

  const updatePerson = (personToUpdate, replaceWith) => {
    return (
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
          notify(`Updated ${personToUpdate.name}`);
        })
        .catch((e) => {
          notifyError(e.response.data);
        })
    )
  }
  const addPerson = (personToAdd) => {
    const newPerson = { ...personToAdd } // NEED TO UPDATE STATE AND DB STILL
    const existingPerson = checkNameExists(newPerson.name);
    const confirmUpdate = () => window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`);
    if (existingPerson) {
      if (confirmUpdate()) {
        updatePerson(existingPerson, { ...existingPerson, number: newPerson.number });
      }
      return;
    }
    personsService
      .createPerson(newPerson)
      .then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
        notify(`Added ${newPerson.name}`);
      })
      .catch((e) => {
        notifyError(e.response.data)
      });
  }
  const deletePerson = (personToDelete) => {
    if (!window.confirm(`Delete ${personToDelete.name} ?`)) {
      return;
    }
    personsService
      .deletePerson(personToDelete.id)
      .then(() => {
        setPersons(persons.filter((currentPerson) => currentPerson.id != personToDelete.id));
        notify(`Deleted ${personToDelete.name}`);
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Phonebook deletePerson={deletePerson} persons={persons.filter((person) => filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : true)} />
    </div>
  )
}

export default App