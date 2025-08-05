class FormField extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _submitEvent = "submit";

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .addEventListener("submit", (e) => this._onFormSubmit(e, this));
  }

  _generateId() {
    const uuid = crypto.randomUUID();
    const randomString = uuid.replace(/-/g, "");

    return `notes-${randomString}`;
  }

  _onFormSubmit(e, formSubmitInstance) {
    formSubmitInstance.dispatchEvent(new CustomEvent("submit"));
    e.preventDefault();

    const title = this._shadowRoot.querySelector("#title").value;
    const body = this._shadowRoot.querySelector("#body").value;

    const data = {
      id: this._generateId(),
      title,
      body,
      createAt: new Date().toISOString(),
      archived: false
    }
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        backround-color: #00809D;
      }

      .floating-form {
        width: 100%;
      }

      .form-group {
        margin: 16px 0
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weigth: bold;
      }

      input, textarea {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: none;
        background-color: #FCF8DD;
        color: blue;
        overflow: auto;
      }

      textarea {
        height: 200px;
        
      }

      button {
        width: 30%;
        height: 40px;
        background-color: #00809D;
        color: white;
        border-radius: 4px;
        border: none;
        font-weight: bold;
        padding: 0px;
      }

      button:hover {
        background-color: #00657b;
        cursor: pointer;
      }
    `
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="floating-form">
        <form>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" placehoder="Title" required />
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <textarea type="text" id="body" placehoder="Body" required ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    `
  }
}

customElements.define("form-field", FormField);