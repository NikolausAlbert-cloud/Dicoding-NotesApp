import Utils from "../utils.js";

class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
        color: white;
        background-color: #00809D;
        box-shadow: 0 4px 2px -2px gray;
        position: sticky;
        top: 0;
        z-index: 1;
      }
      
       h1 {
        padding: 16px;
        margin: 0;
        font-size: 1.5em;
        text-align: center;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    Utils.emptyElement(this._shadowRoot);
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
        <h1>Notes App</h1>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);