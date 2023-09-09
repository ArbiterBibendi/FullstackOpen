

const Person = ({ person, deletePerson }) => {
    return (
        <>
            <p>{person.name} {person.number}</p>
            <button onClick={() => deletePerson(person)}>delete</button>
        </>

    )
}
const Phonebook = ({ persons, deletePerson }) => {
    return persons.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson}/>)
}

export default Phonebook;