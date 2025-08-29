class CheckNotes extends HTMLElement {
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
      :host {
        display: flex;
        align-items: center;
        justify-content: left;
        gap: 8px;
      }

      h3 {
        margin-block: 8px;
      }

      #buttonContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .buttonItem {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .archive-button {
        background-color: lightblue;
      }

      .unarchive-button {
        background-color: lightgreen;
      }

      .buttonItem:hover {
        opacity: 0.8;
      }
    `
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div id="checkNotesContainer">
        <h3>Check Notes</h3>
        <div id="buttonContainer">
          <button
            type="button"
            class="buttonItem archive-button"
            data-id="check-archivedNotes"
          >
            Archived
          </button>
          <button
            type="button"
            class="buttonItem unarchive-button"
            data-id="check-unarchivedNotes"
          >
            Unarchived
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("check-notes", CheckNotes);