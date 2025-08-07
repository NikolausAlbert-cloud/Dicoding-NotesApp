import Utils from "../utils";

class NoteListContainer extends HTMLELement {
  _shadowRoot = null;
  _style = null;

  _column = 2;
  _gutter = 16;

  static get observedAttributes() {
    return ["column", "gutter"];
  }

  constructor() {
    super();

    const _shadowRoot = this.attachShadow({ mode: "open" });
    const _style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .list {
        display: grid;
        grid-template-columns: ${'1fr', repeat(this._column)};
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

  _emptyContent() {
    this.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `
  }

  attributeChangeCallback(name, oldValue, newValue) {
    switch(name) {
      case "column":
        this.name = newValue;
        break;
      case "gutter":
        this.name = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("note-list-container", NoteListContainer);