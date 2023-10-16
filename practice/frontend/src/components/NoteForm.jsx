import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const addNote = async (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: true,
    }
    setNewNote('')
    createNote(noteObject)
  }

  return (
    <form onSubmit={addNote}>
      <input onChange={(e) => setNewNote(e.target.value)} value={newNote} placeholder='write note content here' />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm
