import { useState, useEffect } from 'react';
import Note from './components/Note';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  console.log('render', notes.length, 'notes')



  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(() => {
        setErrorMessage(`the note '${note.content}' was already deleted from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      })
  }
  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  }


  const notesToShow = showAll ? notes : notes.filter((note) => note.important === true);
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {
        user && <div>
          <button onClick={logout}>
            logout
            </button>
          <p>{user.name} logged in</p>
          
        </div>
      }
      {
        user === null ?
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} /> :
          <NoteForm notes={notes} setNotes={setNotes} />
      }
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)
        }
      </ul>

      <Footer />
    </div>
  )
}

export default App 