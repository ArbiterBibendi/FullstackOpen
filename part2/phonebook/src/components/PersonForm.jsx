import React from 'react';
import { useState } from 'react'

const emptyPerson = {
    name: '',
    number: '',
    id: 0
};
const PersonForm = ({ persons, addPerson }) => {
    const [newPerson, setNewPerson] = useState(emptyPerson);
    const submitPerson = (e) => {
        e.preventDefault();
        addPerson(newPerson);
        setNewPerson(emptyPerson);
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
