import Utils from "../utils.js";

class FormField extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  connectedCallback() {
    const form = this._shadowRoot.querySelector("form");
    const title = this._shadowRoot.querySelector("#title");
    const body = this._shadowRoot.querySelector("#body");
  
    form.addEventListener("submit", (e) => {
      this._onFormSubmit(e);
    });

    const validationHandler = (e) => {
      const { target } = e;
      const isValid = target.validity.valid;
      const errorMessage = target.validationMessage;

      const connectedValidationId = target.getAttribute("aria-describedby");
      const connectedValidationEl = this._shadowRoot.getElementById(connectedValidationId);

      if (connectedValidationEl) {
        connectedValidationEl.innerText = isValid ? "" : errorMessage;
      }
    }
  
    title.addEventListener("change", validationHandler);
    title.addEventListener("invalid", validationHandler);
    body.addEventListener("change", validationHandler);
    body.addEventListener("invalid", validationHandler);

    title.addEventListener("blur", validationHandler);
    body.addEventListener("blur", validationHandler);
  }

  _generateId() {
    const uuid = crypto.randomUUID();
    const randomString = uuid.replace(/-/g, "");

    return `notes-${randomString}`;
  }

  _onFormSubmit(e) {
    e.preventDefault();

    const info = this._shadowRoot.querySelector(".info-postSubmit");
    const textButton = this._shadowRoot.querySelector("button");
    textButton.disabled = true;
    textButton.style.backgroundColor = "#adcacfff";
    textButton.innerText = "Saving...";
    const title = this._shadowRoot.querySelector("#title").value;
    const body = this._shadowRoot.querySelector("#body").value;

    info.innerText = "";

    if (title || body) {
      const data = {
        id: this._generateId(),
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false
      };

      this.dispatchEvent(new CustomEvent("submit-form", {
        detail: data,
        bubble: true,
        composed: true
      }));

      setTimeout(() => {
        textButton.disabled = false;
        textButton.innerText = "Submit";
        textButton.style.backgroundColor = "#00809D";

        this._shadowRoot.querySelector("#title").value = "";
        this._shadowRoot.querySelector("#body").value = "";
        info.innerText = "Post submitted successfully!";
      }, 1000);

    } else {
      textButton.disabled = false;
      textButton.innerText = "Submit";
      textButton.style.backgroundColor = "#00809D";
      info.innerText = "Please fill in all fields.";
    }
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .form-group {
        margin: 16px 0
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
      }

      input, textarea {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: none;
        background-color: #FCF8DD;
        color: blue;
        overflow: auto;
        box-sizing: border-box;
      }

      textarea {
        height: 200px;
      }

      .validationMessage {
        color: red;
      }

      .input:user-invalid {
        border: 1px solid red;
      }

      .info-postSubmit {
        color: blue;
      }

      button {
        width: 30%;
        height: 40px;
        background-color: #00809D;
        color: white;
        border-radius: 4px;
        border: none;
        font-size: 1.2em;
        font-weight: bold;
        padding: 0px;
      }

      button:hover {
        background-color: #00657b;
        cursor: pointer;
      }

      @media screen and (max-width: 768px) {
        button {
          width: 100%;
          font-size: 1em;
        }
      }
    `
  }

  render() {
    this._updateStyle();
    Utils.emptyElement(this._shadowRoot);

    if (!this._shadowRoot.contains(this._style)) {
      this._shadowRoot.appendChild(this._style);
    }

    this._shadowRoot.innerHTML += `
      <div class="floating-form">
        <form>
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Type a title..." 
              aria-describedby="titleInputValidation" 
              minlength="2"
              required 
            />
            <p id="titleInputValidation" class="validationMessage"></p>
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <textarea 
              type="text" 
              id="body" 
              placeholder="Type a content..." 
              aria-describedby="bodyInputValidation"
              minlength="5" 
              required 
            ></textarea>
            <p id="bodyInputValidation" class="validationMessage"></p>
          </div>
          <p class="info-postSubmit"></p>
          <button type="submit">Submit</button>
        </form>
      </div>
    `
  }
}

customElements.define("form-field", FormField);