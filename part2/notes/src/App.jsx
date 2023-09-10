import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'


const URL = 'http://localhost:3001/notes';
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })
  }, []);
  console.log('render', notes.length, 'notes')

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(noteObject));
        setNewNote('');
      });

  }
  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  }
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch((error) => {
        setErrorMessage(`the note '${note.content}' was already deleted from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important === true);
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)
        }
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App 