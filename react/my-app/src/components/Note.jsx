import React, { useState } from "react";
import { Delete, Edit } from "@material-ui/icons";
function Note(props) {
  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <div className="note">
      <input name="title" value={note.title} onChange={handleChange} />
      <input name="content" value={note.content} onChange={handleChange} />
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        <Delete />
      </button>
      <button
        onClick={() => {
          const infos = {
            title: note.title,
            content: note.content,
            id: props.id
          };
          props.onEdit(infos);
        }}
      >
        <Edit />
      </button>
    </div>
  );
}

export default Note;
