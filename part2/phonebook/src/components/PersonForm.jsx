import React from 'react';
import { useState } from 'react'

const PersonForm = ({ persons, addPerson }) => {
    const [newPerson, setNewPerson] = useState(
        {
            name: '',
            number: '',
            id: 0
        }
    );
    const submitPerson = (e) => {
        const name = newPerson.name;
        e.preventDefault();
        setNewPerson(
            {
                name: '',
                number: '',
                id: 0
            })

        if (persons.find((person) => person.name.toLowerCase() == name.toLowerCase())) {
            alert(`${name} is already added to the phonebook`)
            return;
        }
        addPerson(newPerson);
    }
    return (
        <form>
            <div>name: <input value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} /></div>
            <div>number: <input value={newPerson.number} onChange={(e) => setNewPerson({ ...newPerson, number: e.target.value })} /></div>
            <div>
                <button onClick={submitPerson} type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;
