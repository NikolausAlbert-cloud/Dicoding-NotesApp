import Utils from "../utils";

function remoteNotes () {
  const baseUrl = "https://notes-api.dicoding.dev/v2";
  const noteListSuperContainer = document.querySelector(".noteListSuperContainer");
  const noteListContainer = document.querySelector("note-list-container");
  const formFieldElement = document.querySelector("form-field");
  const info = document.querySelector("info");
  const loading = document.querySelector("#loading");

  const showResponseMessage = (message) => {
    info.textContent = message;
  };

  const showLoading = () => {
    Array.from(noteListSuperContainer.children).forEach((child) => {
      Utils.hideElement(child);
    });
    Utils.showElement(loading);
  }

  const showNotes = () => {
    Array.from(noteListSuperContainer.children).forEach((child) => {
      Utils.hideElement(child);
    });
    Utils.showElement(noteListContainer);
    Utils.showElement(info);
  }

  const getNotes = async () => {
    showLoading();
    
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.status !== "success") {
        throw new Error(responseJson.message || "failed getNotes");
      } else {
        renderAllNotes(responseJson.data);
        showNotes()
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    const newNote = e.detail;
    const options = {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    try {
      const response = await fetch(`${baseUrl}/notes`, options)
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message ||"failed create newNote")
      } else {
        showResponseMessage("success create newNote")
        getNotes();
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
  };

  const deleteNote = async (noteId) => {
    const options = {
      method: 'DELETE',
    }
    try {
      const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message ||"failed delete note");
      } else {
        showResponseMessage("success delete note");
        getNotes();
      };
    } catch (error) {
      showResponseMessage(error.message);
    };
  };

  const renderAllNotes = (notes) => {
    noteListContainer.innerHTML = "";
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });
    
    noteListContainer.append(...noteItemElements);
  };

  formFieldElement.addEventListener("submit-form", createNote);
  
  noteListContainer.addEventListener("click", (e) => {
    const deleteButton = e.composedPath().find(el => el.classList && el.classList.contains("delete-button"));

    if (deleteButton) {
      const noteId = deleteButton.dataset.id;
      console.log("noteId: ", noteId);
      deleteNote(noteId);
    }
  });

  getNotes();
};

export default remoteNotes;