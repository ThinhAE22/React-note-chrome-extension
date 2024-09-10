import React from 'react';
import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNotes, handleDeleteNote, handleEditNote, handleColorChange }) => {
  return (
    <div className="note-list"> {/* Ensure class name matches CSS */}
      {notes.map((note)=> 
        (<Note 
          key={note.id} // Assigning a unique key using note.id
          id = {note.id} 
          text = {note.text} 
          date={note.date}
          bgColor={note.bgColor}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
          handleColorChange={handleColorChange}
        />)
      )}
      <AddNote handleAddNotes={handleAddNotes}/>
    </div>
  );
};

export default NotesList;
