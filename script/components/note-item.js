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

  note(value) {
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
      }
      h3 {
        margin: 0 0 8px 0;
      }
      p {
        margin: 0 0 4px 0;
        color: #555;
      }
    `
  }

  render() {
    this._updateStyle();
    console.log("note-item this_note", this._note);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(this._note.createdAt));

    this._contentWrapper.innerHTML = `
      <div class="note-item-container" id="${this._note.id}">
        <h3>${this._note.title}</h3>
        <p>${formattedDate}</p>
        <p>${this._note.body}</p>
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);