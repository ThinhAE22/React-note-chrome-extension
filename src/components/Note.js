import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaPalette, FaEdit } from "react-icons/fa";

const Note = ({ id, text, date, bgColor, handleDeleteNote, handleEditNote, handleColorChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const colors = ['#fef68a', '#67d7cc', '#ffa726', '#e57373', '#81c784'];

  const changeColor = () => {
    const currentColorIndex = colors.indexOf(bgColor);
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    handleColorChange(id, colors[nextColorIndex]);
  };

  const handleSaveEdit = () => {
    handleEditNote(id, editText, bgColor);
    setIsEditing(false);
  };

  return (
    <div className="note" style={{ backgroundColor: bgColor }}>
      {isEditing ? (
        <div className="note-edit">
          <textarea 
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              backgroundColor: bgColor,
              outline: 'none', 
              color: '#333',
              height: '100px'
            }}
          />
          <div className="note-footer">  
            <div className="function-button">
              <button className="save" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span>{text}</span>
          <div className="note-footer">
            <small>{date}</small>
            <div className="function-button">
              <MdDeleteForever
                onClick={() => handleDeleteNote(id)}
                className="delete-icon"
                size="1.3em"
              />
              <FaPalette
                className="colorize-icon"
                size="1.0em"
                onClick={changeColor}
              />
              <FaEdit
                className="edit-icon"
                size="1.0em"
                onClick={() => setIsEditing(true)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
