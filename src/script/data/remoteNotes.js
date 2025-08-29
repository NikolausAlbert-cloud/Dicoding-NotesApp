function remoteNotes () {
  const baseUrl = "https://notes-api.dicoding.dev/v2";
  const noteListContainer = document.querySelector("note-list-container");
  const formFieldElement = document.querySelector("form-field");
  const responseMessage = document.querySelector("#response-message");

  const showResponseMessage = (message) => {
    responseMessage.textContent = message;
  };

  const getNotes = async () => {
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();
      
      if (responseJson.status !== "success") {
        throw new Error("getNotes message error: NotFound");
      } else {
        renderAllNotes(responseJson.data);
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
        throw new Error("failed create newNote")
      } else {
        showResponseMessage("success create newNote")
        getNotes();
      }
    } catch (error) {
      showResponseMessage(error);
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
        throw new Error("failed delete note");
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