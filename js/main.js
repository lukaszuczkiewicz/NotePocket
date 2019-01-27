import Note from './note.js';

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

let notes = [];

//show a new note popup form window
createNoteBtn.addEventListener('click', () => {
    // reset values from inputs
    newNote.title.value = '';
    newNote.content.value = '';
    newNote.pin.checked = false;
    newNote.color.value = '#ffffff';
    //reset popup window background color
    newNote.window.style.backgroundColor = '#ffffff';

    newNote.background.classList.remove('hide'); //show popup
    newNote.title.focus();
});

//when color input is changed
newNote.color.addEventListener('change', () => {
    // change popup's background color
    newNote.window.style.backgroundColor = newNote.color.value;
});

//hide a new note popup form window
newNote.background.addEventListener('click', (e) => {
    if (e.target.classList.contains('create-note__background') || e.target.classList.contains('create-note__cancel')) {
        closePopup();
    }
});

function closePopup() {
    newNote.background.classList.add('hide');
}

//create a new note
newNote.confirm.addEventListener('click', () => {

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
    // notes.push(new Note(title, content, isPinned, color, tags, notificationDate));
    const note = new Note(title, content, isPinned, color, tags); //create a new note
    notes.push(note);
    note.display();

    closePopup();

    //add note to local storage
    //display note
});