import Note from './note.js';

//DOM ELEMENTS
//add a note inputs:
const createNoteBtn = document.querySelector('#create-note-btn');
const newNoteTitle = document.querySelector('#create-note__title');
const newNoteContent = document.querySelector('#create-note__content');
const newNoteColor = document.querySelector('#create-note__color');
const newNotePin = document.querySelector('#create-note__pin');
const newNoteNotification = document.querySelector('#create-note__notification');
const newNoteConfirm = document.querySelector('#create-note__confirm');

const newNotePopup = document.querySelector('#new-note-popup');

let notes = [];


//show a new note popup form window
createNoteBtn.addEventListener('click', () => {
    newNotePopup.classList.remove('hide'); //show popup
    newNoteTitle.focus();
});
//hide a new note popup form window
newNotePopup.addEventListener('click', (e) => {
    if (e.target.classList.contains('create-note__background') || e.target.classList.contains('create-note__cancel')) {
        closePopup();
    }
});

function closePopup() {
    newNotePopup.classList.add('hide');
}

//create a new note
newNoteConfirm.addEventListener('click', () => {

    let title, content;
    if (newNoteTitle.value) {
        title = newNoteTitle.value;
    } else {
        title = "Untitled";
    }
    if (newNoteContent.value) {
        content = newNoteContent.value;
    } else {
        content = "...";
    }
    const isPinned = newNotePin.checked;
    const color = newNoteColor.value;
    const tags = [];
    // const notificationDate = newNoteNotification.value;
    // notes.push(new Note(title, content, isPinned, color, tags, notificationDate));
    const newNote = new Note(title, content, isPinned, color, tags); //create a new note
    notes.push(newNote);
    newNote.display();

    console.log(newNoteColor.value);

    closePopup();

    // reset values from input

    //add note to local storage
    //display note
});