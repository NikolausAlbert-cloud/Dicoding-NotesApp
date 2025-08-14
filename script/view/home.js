import { Notes } from "../data/notes.js";

const home = () => {
  const noteListContainer = document.querySelector("note-list-container");

  const renderNotes = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      return noteItemElement;
    });
 
    noteListContainer.append(...noteItemElements);
  };

  const onAddNotesHandler = (e) => {
    e.preventDefault();
    const newData = e.detail;
    Notes.addNote(newData);

    const updatedNoteList = Notes.getAllNotes();
    renderNotes(updatedNoteList);
  }

  const formFieldElement = document.querySelector("form-field");
  formFieldElement.addEventListener("submit-form", onAddNotesHandler)

  const initialNotes = Notes.getAllNotes();
  renderNotes(initialNotes);
}

export default home