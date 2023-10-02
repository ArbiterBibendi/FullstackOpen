import { useState } from 'react';
import noteService from '../services/notes';

const NoteForm = ({notes, setNotes}) => {
    const [newNote, setNewNote] = useState('a new note...');

    const handleNoteChange = (e) => {
        console.log(e.target.value);
        setNewNote(e.target.value);
    }
    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5
        };

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            });

    }
    return (
        <form onSubmit={addNote}>
            <input onChange={handleNoteChange} value={newNote} />
            <button type="submit">save</button>
        </form>
    );
}

export default NoteForm;
