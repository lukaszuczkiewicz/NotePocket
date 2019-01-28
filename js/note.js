//html note containers:
const pinnedNotes = document.querySelector('#pinned');
const otherNotes = document.querySelector('#other');

export default class Note {
    constructor(title, content, isPinned, color, tags) {
        this.title = title;
        this.content = content;
        this.isPinned = isPinned;
        this.color = color;
        this.tags = tags;
        // this.notificationDate = notificationDate;
        this.notificationDate = false;

        const date = new Date();
        this.id = date.getTime();
        
        this.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0,5)}`;
    }
    display() {
        const noteHtml = `
        <div class="notes__note" data-id="${this.id}">
            <h2 class="heading-2">${this.title}</h2>
            <p class="notes__note__date">${this.date}</p>
            <p class="notes__note__content">${this.content}</p>
            <p class="notes__note__notification">${this.notificationDate}</p>
        </div>
        `;

        if (this.isPinned) {
            pinnedNotes.innerHTML += noteHtml;
        } else {
            otherNotes.innerHTML += noteHtml;
        }

        // set note color
        document.querySelector(`[data-id="${this.id}"]`).style.backgroundColor = this.color;
    }
}