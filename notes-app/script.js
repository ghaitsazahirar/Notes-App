import './data/data.js';
import './js-compound/search-bar.js';

const form = document.querySelector('form');
let inputTitle = form.elements.inputjudul;
let inputDesc = form.elements.inputdesc;

form.addEventListener('submit', (event) => event.preventDefault());

const customValidationHandler = (event) => {
    event.target.setCustomValidity('');

    if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Fill this.');
        return;
    }
};

const handleValidation = (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidationEl = connectedValidationId
        ? document.getElementById(connectedValidationId)
        : null;

    if (connectedValidationEl) {
        if (errorMessage && !isValid) {
            connectedValidationEl.innerText = errorMessage;
        } else {
            connectedValidationEl.innerText = '';
        }
    }
}

inputTitle.addEventListener('change', customValidationHandler);
inputTitle.addEventListener('invalid', customValidationHandler);

inputDesc.addEventListener('change', customValidationHandler);
inputDesc.addEventListener('invalid', customValidationHandler);

inputTitle.addEventListener('blur', handleValidation);
inputDesc.addEventListener('blur', handleValidation);

document.addEventListener('DOMContentLoaded', function () { 
    const noteForm = document.getElementById('container');
    const noteList = document.getElementById('note-list');

    noteForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const title = inputTitle.value;
      const body = inputDesc.value;
  
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
  
      const bodyElement = document.createElement('p');
      bodyElement.textContent = body;
  
      noteElement.appendChild(titleElement);
      noteElement.appendChild(bodyElement);
  
      notesData.unshift({ title, body });
      noteList.listUpdate();

      document.getElementById('inputjudul').value = '';
      document.getElementById('inputdesc').value = '';
    });
    customElements.define('note-item', NoteItem);
    customElements.define('note-list', NoteList); 

    if (noteList) {
        const noteListInstance = new NoteList();
        noteList.replaceWith(noteListInstance);
    }
});

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
        <style>.note-item {
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
            display: grid;
            font-size: 15px;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 40px 60px;
            justify-items: center;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0px 6px 10px rgba(0,0,0,0.1);
            
        }

        </style>
            `;

            const ElementNotesData = document.createElement('div');
            ElementNotesData.classList.add('note-list');

            notesData.forEach(note => {
                const ElementNote = document.createElement('note-item');
                ElementNote.setNote(note);

                const elementNote = document.createElement('div');
                elementNote.classList.add('note');

                const titleElement = document.createElement('h2');
                titleElement.textContent = note.inputTitle;

                const bodyElement = document.createElement('p');
                bodyElement.textContent = note.inputDesc;

                elementNote.appendChild(titleElement);
                elementNote.appendChild(bodyElement);

                ElementNotesData.appendChild(ElementNote);
            });

            this.shadowRoot.appendChild(ElementNotesData);

            // Add the following line to append the NoteList element to the document
            document.body.appendChild(this.shadowRoot.firstChild);
        }
    }
