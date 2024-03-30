import  notesData from './data/data.js';
import './js-compound/search-bar.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const inputTitle = form.elements.Title;
  const inputDesc = form.elements.Description;

  form.addEventListener('submit', (event) => event.preventDefault());

  const customValidationHandler = (event) => {
    event.target.setCustomValidity('');

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Important to fill');
      return;
    }
  };

  inputDesc.addEventListener('invalid', customValidationHandler);

  function handleValidation(event) {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidationX2 = connectedValidationId
      ? document.getElementById(connectedValidationId) : null;

    if (connectedValidationX2) {
      if (errorMessage && !isValid) {
        connectedValidationX2.innerText = errorMessage;
      }
      else {
        connectedValidationX2.innerText = '';
      }
    }
  }

  inputTitle.addEventListener('blur', handleValidation);
  inputDesc.addEventListener('blur', handleValidation);

  class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    setNote(note) {
      this.note = note;
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .note-item {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 10px;
            padding: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .note-item h2 {
            margin-top: 0;
          }
        </style>

        <div class="note-item">
          <h2>${this.note.title}</h2>
          <p>${this.note.body}</p>
        </div>
      `;
    }
  }

  class NoteList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.listUpdate();
    }

    listUpdate() {
      this.shadowRoot.innerHTML = `
        <style>
          .note-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        </style>
      `;

      const ElementNotesData = document.createElement('div');
      ElementNotesData.classList.add('note-list');

      notesData.forEach(note => {
        const ElementNote = document.createElement('note-item');
        ElementNote.setNote(note);

        ElementNotesData.appendChild(ElementNote);
      });

      this.shadowRoot.appendChild(ElementNotesData);
    }
  }

  customElements.define('note-item', NoteItem);
  customElements.define('note-list', NoteList);

  const noteList = document.getElementById('note-list');

  if (noteList) {
    const noteListInstance = new NoteList();
    noteList.replaceWith(noteListInstance);
  }
});