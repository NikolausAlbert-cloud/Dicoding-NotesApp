function remoteNotes () {
  const baseUrl = "https://notes-api.dicoding.dev/v2";

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
      showResponseMessage(error);
    }
  };

  getNotes();

  const createNote = async (e) => {
    e.preventDefault();
    const newNote = e.detail;
    console.log("newNote: ", newNote);
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

  const formFieldElement = document.querySelector("form-field");
  formFieldElement.addEventListener("submit-form", createNote);
  
  const showResponseMessage = (message) => {
    const responseMessage = document.querySelector("#response-message");
    responseMessage.textContent = message;
  };

  const noteListContainer = document.querySelector("note-list-container");

  const renderAllNotes = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });
    
    noteListContainer.append(...noteItemElements);
  };
};

export default remoteNotes;