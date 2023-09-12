import axios from "axios";

const URL = "/api/persons"
const getPersons = () => {
    return (
        axios
            .get(URL)
            .then((response) => response.data)
    )
}
const createPerson = (newPerson) => {
    return (
        axios
            .post(URL, newPerson)
            .then((response) => response.data)
    )
}
const updatePerson = (person, newPerson) => {
    return (
        axios
            .put(`${URL}/${person.id}`, newPerson)
            .then((response) => response.data)
    )
}
const deletePerson = (id) => {
    return (
        axios
            .delete(`${URL}/${id}`)
            .then(response => response.data)
    )
}


export default { getPersons, createPerson, deletePerson, updatePerson }