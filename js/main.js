import Note from './note.js';

//VARIABLES
let notes = [];

//DOM ELEMENTS
const createNoteBtn = document.querySelector('#create-note-btn');

const newNote = {
    background: document.querySelector('#create-note__background'),
    window: document.querySelector('#create-note__window'),
    title: document.querySelector('#create-note__title'),
    content: document.querySelector('#create-note__content'),
    color: document.querySelector('#create-note__color'),
    pin: document.querySelector('#create-note__pin'),
    notification: document.querySelector('#create-note__notification'),
    confirm: document.querySelector('#create-note__confirm')
};

function resetInput() {
    newNote.title.value = '';
    newNote.content.value = '';
    newNote.pin.checked = false;
    newNote.color.value = '#ffffff';
}

function editNote(clickedNote) {
    // display 'edit note' popup
    newNote.background.classList.remove('hide');

    // 
    newNote.title.value = clickedNote.title;
    newNote.content.value = clickedNote.content;
    newNote.pin.checked = clickedNote.isPinned;
    newNote.color.value = clickedNote.color;

    newNote.window.style.backgroundColor = clickedNote.color;

    newNote.title.focus();
}

//when color input is changed
// newNote.color.addEventListener('change', () => {
//     // change popup's background color
//     newNote.window.style.backgroundColor = newNote.color.value;
// });


function closePopup() {
    newNote.background.classList.add('hide');
}

function createNote() {
    //read data from inputs
    let title, content;
    if (newNote.title.value) {
        title = newNote.title.value;
    } else {
        title = "Untitled";
    }
    if (newNote.content.value) {
        content = newNote.content.value;
    } else {
        content = "...";
    }
    const isPinned = newNote.pin.checked;
    const color = newNote.color.value;
    const tags = [];
    // const notificationDate = newNoteNotification.value;

    //save the note
    // const note = new Note(title, content, isPinned, color, tags, notificationDate);
    const note = new Note(title, content, isPinned, color, tags);

    notes.push(note);
    note.display();

    closePopup();

    //add note to local storage
}

function hideNewNotePopup(e) {
    if (e.target.classList.contains('create-note__background') || e.target.classList.contains('create-note__cancel')) {
        if (newNote.content.value) {
            createNote();
        } else {
            closePopup();
        }
    }
}

function openNewNotePopup() {
    // reset values from inputs
    resetInput();

    //reset popup window background color
    newNote.window.style.backgroundColor = '#ffffff';

    newNote.background.classList.remove('hide'); //show popup
    newNote.title.focus();
}


document.addEventListener('click', (e) => {
    if (e.target.closest('.notes__note')) {
        notes.find(note => {
            if (note.id === Number(e.target.closest.getAttribute('data-id'))) {
                // TO DO SDJBFGHBSDFBSDHSDJFBKSDH
                editNote(note);
            }
        })
    }
});


createNoteBtn.addEventListener('click', openNewNotePopup);
newNote.background.addEventListener('click', hideNewNotePopup);
newNote.confirm.addEventListener('click', createNote);