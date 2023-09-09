import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import axios from 'axios'

const URL = 'http://localhost:3001/persons';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setPersons(response.data);
      });
  }, []);

  const addPerson = (person) => setPersons(persons.concat({ ...person, id: persons.length + 1 }));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Phonebook persons={persons.filter((person) => filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : true)} />
    </div>
  )
}

export default App