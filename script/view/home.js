import { Notes } from "../data/notes.js";
import Utils from "../utils.js";

const home = () => {
  const noteListSuperContainer = document.querySelector(".noteListSuperContainer");
  const noteListContainer = document.querySelector("note-list-container");

  const renderNotes = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      return noteItemElement;
    });
 
    console.log("home.js ...noteItemElements", ...noteItemElements);
    noteListSuperContainer.append(...noteItemElements);
    console.log("home.js noteListSuperContainer", noteListSuperContainer);
  };

  const onAddNotesHandler = (e) => {
    e.preventDefault();
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