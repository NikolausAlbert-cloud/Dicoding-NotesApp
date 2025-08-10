import { Notes } from "../data/notes.js";

const home = () => {
  const noteListContainer = document.querySelector("note-list-container");
  
  const renderNotes = (notes) => {
    noteListContainer.innerHTML = "";

    notes.forEach((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteListContainer.appendChild(noteItemElement);
    })
  }

  const onAddNotesHandler = (e) => {
    const newData = e.detail;
    Notes.addNote(newData);

    const updatedNoteList = Notes.getAllNotes();
    console.log("home updatedNoteList", updatedNoteList);
    renderNotes(updatedNoteList);
  }

  const formFieldElement = document.querySelector("form-field");
  formFieldElement.addEventListener("submit-form", onAddNotesHandler)

  const initialNotes = Notes.getAllNotes();
  renderNotes(initialNotes);
}

export default home

home();