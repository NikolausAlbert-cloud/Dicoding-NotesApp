class NoteItem extends HTMLElement {
  _shadowRoot = null
  _style = null
  _note = {
    id: "",
    title: "",
    body: "",
    createdAt: "",
    archived: false
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._shadowRoot.appendChild(this._style);

    this._contentWrapper = document.createElement('div');
    this._shadowRoot.appendChild(this._contentWrapper);
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      .note-item-container {
        border: 1px solid #ddd;
        padding: 16px;
        margin-bottom: 8px;
        border-radius: 8px;
        height: 150px;
        box-shadow: 0 0 4px 0 #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      h3 {
        margin: 0 0 8px 0;
      }
      #createdAt {
        font-size: 0.8em;
        font-style: italic;
        font-weight: bold;
      }
      p {
        margin: 0 0 4px 0;
        color: #555;
        font-size: 1em;
        line-height: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      .buttonContainer {
        display: flex;
        gap: 8px;
      }

      .buttonItem {
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        cursor: pointer;
      }

      .delete-button {
        background: red;
      }

      .archive-button {
        background: green;
      }
        
      .unarchive-button {
        background: blue;
      }

      @media screen and (max-width: 445px) {
        .note-item-container {
          height: 120px;
        }
        #createdAt {
          font-size: 0.6em;
        }
        p {
          font-size: 0.8em;
        }
      }
    `
  }

  render() {
    this._updateStyle();

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(this._note.createdAt));

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(this._note.createdAt));

    this._contentWrapper.innerHTML = `
      <div class="note-item-container"  data-id="${this._note.id}">
        <div class="textContainer">
          <h3>${this._note.title}</h3>
          <p id="createdAt">${formattedDate}, ${formattedTime}</p>
          <hr>
          <p>${this._note.body}</p>
        </div>
        <div class="buttonContainer">
          <button
            type="button"
            class="buttonItem delete-button"
          >
            Delete
          </button>
          <button
            type="button"
            class="buttonItem archive-button"
          >
            Archive
          </button>
          <button
            type="button"
            class="buttonItem unarchive-button"
          >
            Unarchive
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);