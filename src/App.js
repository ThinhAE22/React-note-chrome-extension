import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import NotesList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/Header';


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text : "This is my first note!",
      date: "15/04/2021",
      bgColor: '#fef68a' // Default background color
    },
    {
      id: nanoid(),
      text : "This is my second note!",
      date: "25/04/2021",
      bgColor: '#67d7cc' // Default background color
    },
    {
      id: nanoid(),
      text : "This is my third note!",
      date: "5/04/2021",
      bgColor: '#ffa726' // Default background color
    },

]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  // Load notes and dark mode from local storage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('react-note-app-data'));
    if (savedData) {
      setNotes(savedData.notes);
      setDarkMode(savedData.darkMode);
    }
  }, []);

  // Save notes and dark mode to local storage whenever they change
  useEffect(() => {
    const dataToSave = {
      notes: notes,
      darkMode: darkMode
    };
    localStorage.setItem('react-note-app-data', JSON.stringify(dataToSave));
  }, [notes, darkMode]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNotes = (id) => {
    const  newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

  const editNote = (id, newText) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    ));
  };

  const changeNoteColor = (id, newColor) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, bgColor: newColor } : note
    ));
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
      <Header handleToggleDarkMode={setDarkMode}/>
      <Search handleSearchNote={setSearchText}/>
      <NotesList 
      notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText))} 
      handleAddNotes={addNote}
      handleDeleteNote={deleteNotes}
      handleEditNote={editNote}
      handleColorChange={changeNoteColor}
      />
      </div>
    </div>
  );
};

export default App;