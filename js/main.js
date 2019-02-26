import {Note, pinnedNotes, otherNotes} from './note.js';

//VARIABLES
let notes = [];
let status;
let editedNote;

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
    confirm: document.querySelector('#create-note__confirm'),
    remove: document.querySelector('#create-note__remove')
};

function resetInput() {
    newNote.title.value = '';
    newNote.content.value = '';
    newNote.pin.checked = false;
    newNote.color.value = '#ffffff';
}

function changeNewNotePopupColor() {
    // change popup's background color
    newNote.window.style.backgroundColor = newNote.color.value;
}

function closePopup() {
    newNote.background.classList.add('hide');
}

function displayNotes() {
    // reset previously displayed notes
    pinnedNotes.innerHTML = '';
    otherNotes.innerHTML = '';

    notes.forEach(note => {
        note.display();
    });
}

function removeNote() {
    const i = notes.indexOf(editedNote);
    const removed  = notes.splice(i, 1);
    closePopup();
    displayNotes();
}

function saveNote() {
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
    const notificationDate = newNote.notification.value;

    
    if (status === 'add' && newNote.content.value) { //create a new note
        
        const note = new Note(title, content, isPinned, color, tags, notificationDate);
        notes.push(note);

    } else if (status === 'edit') { //update the note
        const i = notes.indexOf(editedNote)
        notes[i].title = title;
        notes[i].content = content;
        notes[i].isPinned = isPinned;
        notes[i].color = color;
        notes[i].tags = tags;
        notes[i].notificationDate = notificationDate;
    }

    displayNotes();
    closePopup();

    //add note to local storage
}

function hideNotePopup(e) {
    if (e.target.classList.contains('create-note__background') || e.target.classList.contains('create-note__cancel')) {
        saveNote();
    }
}

function openNewNotePopup() {
    status = "add";
    // reset values from inputs
    resetInput();

    //reset popup window background color
    newNote.window.style.backgroundColor = '#ffffff';

    newNote.background.classList.remove('hide'); //show popup
    newNote.remove.classList.add('hide'); //hide remove btn
    newNote.title.focus();
}

function openEditNotePopup(clickedNote) {
    status = "edit";
    newNote.background.classList.remove('hide'); //show popup
    newNote.remove.classList.remove('hide'); //show remove btn
    newNote.title.focus();

    //load inputs
    newNote.title.value = clickedNote.title;
    newNote.content.value = clickedNote.content;
    newNote.pin.checked = clickedNote.isPinned;
    newNote.color.value = clickedNote.color;

    //change popup bg color
    newNote.window.style.backgroundColor = clickedNote.color;

    editedNote = clickedNote;
}


//EVENT LISTENERS
newNote.color.addEventListener('change', changeNewNotePopupColor) //when color input is changed
createNoteBtn.addEventListener('click', openNewNotePopup);
newNote.background.addEventListener('click', hideNotePopup);
newNote.confirm.addEventListener('click', saveNote);
newNote.remove.addEventListener('click', removeNote);
document.addEventListener('click', (e) => {
    const element = e.target.closest('.notes__note');
    if (element) {
        notes.find(note => {
            if (note.id == element.getAttribute('data-id')) {
                openEditNotePopup(note);
            }
        })
    }
});