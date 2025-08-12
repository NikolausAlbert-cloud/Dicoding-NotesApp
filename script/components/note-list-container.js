import Utils from "../utils.js";

class NoteListContainer extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _column = 2;
  _gutter = 16;

  static get observedAttributes() {
    return ["column", "gutter"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .list {
        display: grid;
        grid-template-columns: repeat(${this._column}, 1fr);
        gap: ${this._gutter}px;
      }
    `
  }

  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._column = newValue;
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._gutter = newValue;
  }

  get gutter() {
    return this._gutter;
  }

  render() {
    this._updateStyle();

    Utils.emptyElement(this._shadowRoot);
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch(name) {
      case "column":
        this.column = newValue;
        break;
      case "gutter":
        this.gutter = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("note-list-container", NoteListContainer);