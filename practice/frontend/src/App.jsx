import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true);

  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => { // get all notes
    const asyncFunction = async () => {
      const initialNotes = await noteService.getAll();
      setNotes(initialNotes);
    }
    asyncFunction();
  }, []);

  useEffect(() => { // get logged in user from local storage
    const loggedInUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }




  const toggleImportanceOf = async id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map(note => note.id !== id ? note : returnedNote));
    } catch (e) {
      notifyError(`The note '${note.content}' was already deleted from the server`);
      setNotes(notes.filter((note) => note.id !== id));
    }
  }
  const login = async (username, password) => {
    try {
      const returnedUser = await loginService.login({ username, password });
      noteService.setToken(returnedUser.token);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(returnedUser));
      setUser(returnedUser);
    }
    catch (e) {
      console.log(e);
      notifyError('Wrong credentials');
    }
  }
  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  }
  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    try {
      const response = await noteService.create(noteObject);
      setNotes(notes.concat(response));
    } catch (e) {
      console.log(e);
      if (e.response?.data.error) {
        notifyError(e.response.data.error);
      }
    }
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
          <Togglable key='loginformtogglable' buttonLabel={'login'}>
            <LoginForm login={login} />
          </Togglable> :
          <Togglable key='noteformtogglable' buttonLabel={'new note'} ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Togglable>
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
    </div >
  )
}

export default App 