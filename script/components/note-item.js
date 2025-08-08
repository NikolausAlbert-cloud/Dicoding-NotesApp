class NoteItem extends HTMLElement {
  _shadowRoot = null
  _style = null
  _note = {
    id: "",
    title: "",
    body: "",
    createdAt: "",
    archieved: false
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set _note(value) {
    this._note = value;
    this.render();
  }

  get _note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
    `
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note-item-container" id="${this.note.id}>
        <h3>${this.note.title}</h3>
        <p>${this.note.createdAt}</p>
        <p>${this.note.body}</p>
      </div>
    `
  }
}

customElements.define("note-item", NoteItem);