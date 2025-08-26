import Utils from "../utils.js";

class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        width: 100%;
        background-color: #00809D;
        color: white;
        display: flex;
        position: fixed;
        bottom: 0;
      }

      .footer-bar-container {
        flex: 1 1 600px;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
      }

      p {
        margin: 0;
      }

      @media screen and (max-width:768px) {
        .footer-bar-container {
          justify-content: center;
          flex-direction: column;
          gap: 8px;
          font-size: 0.8em;
        }
      }
    `
  }

  connectedCallback() {
    this.render();
  }

  render() {
    Utils.emptyElement(this._shadowRoot);
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="footer-bar-container">
        <p>Copyright &copy; 2025 Notes App</p>
        <p>by Nikolaus Albert</p>
      </div>
    `
  }
}

customElements.define("footer-bar", FooterBar);