import { notesData, Notes } from "../data/notes.js";
import Utils from "../utils.js";

const home = () => {
  const noteListSuperContainer = document.querySelector(".noteListSuperContainer");
  const noteListContainer = document.querySelector("note-list-container");
  
  const onAddNotesHandler = (e) => {
    const data = e.target.value;
    console.log("newNote in home.js: ", data)
    Notes.addNote(data);
 
    showAllNotes();
  }

  const displayNotes = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteItemElements);
    noteListContainer.append(...noteItemElements);
  }

  const showAllNotes = () => {
    Array.from(noteListSuperContainer.children).forEach((element) => {
      Utils.emptyElement(element);
    })

    Utils.showElement(noteListContainer);
    // const notes = Notes.getAllNotes();
    // displayNotes(notes);
  }

  const formFieldElement = document.querySelector("form-field");
  formFieldElement.addEventListener("form-submit", onAddNotesHandler)
}

export default home