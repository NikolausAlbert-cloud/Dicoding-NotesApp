import Utils from "../utils";

function remoteNotes () {
  const baseUrl = "https://notes-api.dicoding.dev/v2";
  const noteListSuperContainer = document.querySelector(".noteListSuperContainer");
  const noteListContainer = document.querySelector("note-list-container");
  const formFieldElement = document.querySelector("form-field");
  const info = document.querySelector("info");
  const loading = document.querySelector("#loading");
  const checkNotesContainer = document.querySelector("check-notes"); 

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
    showLoading();
    const options = {
      method: 'DELETE',
    }
    try {
      const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
      const responseJson = await response.json();
      console.log("deleteNote: ", responseJson);

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

  const archivingNote = async (noteId) => {
    showLoading();

    try {
      const options = {
        method: 'POST'
      };

      const response = await fetch(`${baseUrl}/notes/${noteId}/archive`, options);
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message || "failed archiving note");
      } else {
        showResponseMessage("success archiving note");
        getNotes();
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
  };

  const unarchivingNote = async (noteId) => {
    showLoading();

    try {
      const options = {
        method: 'POST'
      };

      const response = await fetch(`${baseUrl}/notes/${noteId}/unarchive`, options);
      const responseJson = await response.json();
      console.log("unarchivingNote: ", responseJson);

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message || "failed unarchiving note");
      } else {
        showResponseMessage("success unarchiving note");
        getNotes();
      }
    } catch (error) {
      showResponseMessage(error.message); 
    }
  };

  const checkUnarchivedNotes = () => {
    showResponseMessage("showing unarchived notes");
    getNotes();
  };

  const checkArchivedNotes = async () => {
    showLoading();
    try {
      const response = await fetch(`${baseUrl}/notes/archived`);
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        throw new Error(responseJson.message || "failed get archived notes");
      } else {
        showResponseMessage("success get archived notes");
        renderAllNotes(responseJson.data);
        showNotes();
      };
    } catch (error) {
      showResponseMessage(error.message);
    };
  };

  formFieldElement.addEventListener("submit-form", createNote);
  
  noteListContainer.addEventListener("click", (e) => {
    const deleteButton = e.composedPath().find(el => el.classList && el.classList.contains("delete-button"));
    const archiveButton = e.composedPath().find(el => el.classList && el.classList.contains("archive-button"));
    const unarchiveButton = e.composedPath().find(el => el.classList && el.classList.contains("unarchive-button"));
    const noteItem = e.composedPath().find(el => el.classList && el.classList.contains("note-item-container"));
    const noteId = noteItem.dataset.id;

    if (deleteButton) {
      deleteNote(noteId);
    } else if (archiveButton) {
      archivingNote(noteId);
    } else if (unarchiveButton) {
      unarchivingNote(noteId);
    }
  });

  checkNotesContainer.addEventListener("click", (e) => {
    const archivedButton = e.composedPath().find(el => el.classList && el.classList.contains("archive-button"));
    const unarchivedButton = e.composedPath().find(el => el.classList && el.classList.contains("unarchive-button"));
    // const noteId = archivedButton.dataset.id || unarchivedButton.dataset.id;

    if (archivedButton) {
      checkArchivedNotes();
    } else if (unarchivedButton) {
      checkUnarchivedNotes();
    }
  });

  getNotes();
};

export default remoteNotes;