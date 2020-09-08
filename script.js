//Вывести содержимое массивов -- DONE
//Сделать переключение между заметками -- Done
//Добавить возможность удаления заметок
//
'use strict';

const notes = {
    note: ["hello world", "lorem ipsum"],
    //note: [],
    noteContent: ["hello world content", "lorem ipsum content"]
};

const entries = document.querySelector('.entries'),
    notesList = document.querySelector('.entries-list'),
    mainWindow = document.querySelector('#notes');

function createDOM() {

    if (notes.note.length !== 0) {
        entries.innerHTML = '';
        notesList.innerHTML = '';

        notes.note.forEach((title, id) => {
            let entry = document.createElement('div');
            entry.classList.add('entry');
            entries.appendChild(entry);

            entry.innerHTML = `

            <div class="entry-title">
                ${title}
            </div>
            <div class="entry-content">
                ${notes.noteContent[id]}
            </div>

        `;

            let note = document.createElement('li');
            note.classList.add('note');
            notesList.appendChild(note);

            note.innerHTML = ` ${id + 1}. ${title}`;

        });

    } else {
        entries.innerHTML = `<div class="no-notes">No notes. Would you like to write one?</div>`;
        notesList.innerHTML = '';
    }
}

function hideNotes() {

    entries.childNodes.forEach(item => {
        item.classList.add('hidden');
    });

    notesList.childNodes.forEach(item => {
        item.classList.remove('selected');
    });

}

function showNote(id = 0) {
    entries.childNodes[id].classList.remove('hidden');
    notesList.childNodes[id].classList.add('selected');
}

notesList.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('note')) {
        notesList.querySelectorAll('li').forEach((item, id) => {
            if (target == item) {
                hideNotes();
                showNote(id);
            }
        });
    }

});

createDOM();
hideNotes();
showNote();