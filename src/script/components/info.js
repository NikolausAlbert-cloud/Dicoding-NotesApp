class Info extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super(); 

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  };

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  };

  _updateStyle() {
    this._style.textContent = `
      .info-message {
        color: blue;
      }
    `
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <p id="info-message">Info</p>
      <slot></slot>
    `;
  }
}

customElements.define("info", Info);