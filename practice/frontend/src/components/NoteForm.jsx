
const NoteForm = ({handleSubmit, handleNoteChange, newNote}) => {

    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleNoteChange} value={newNote} />
            <button type="submit">save</button>
        </form>
    );
}

export default NoteForm;
