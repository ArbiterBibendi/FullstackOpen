

const Person = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}
const Phonebook = ({ persons }) => {
    return persons.map((person) => <Person key={person.id} person={person} />)
}

export default Phonebook;