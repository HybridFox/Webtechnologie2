if (localStorage.getItem("notes") == undefined) {
    localStorage.setItem("notes", "[]");
}

class CardApp {
    constructor() {
        this.btnAddNote = document.querySelector("#btnAddNote");
        this.notesContainer = document.querySelector(".notes");
        this.noteInput = document.querySelector("#txtAddNote");

        this.btnAddNote.addEventListener("click", this.addNote.bind(this));

        let a = JSON.parse(localStorage.getItem("notes"));
        for (let i = 0; i < a.length; i++) {
            this.addLocalStorageNote(a[i]);
        }
    }

    addNote(e) {
        let newNote = document.createElement("div");
        newNote.setAttribute("class", "card");
        newNote.innerHTML = `<p>${this.noteInput.value}</p>`;

        let noteLink = document.createElement("a");
        noteLink.setAttribute("href", "#");
        noteLink.setAttribute("class", "card-remove");
        noteLink.innerText = "Remove";
        noteLink.addEventListener("click", this.removeNote.bind(this));

        newNote.appendChild(noteLink);

        let a = JSON.parse(localStorage.getItem("notes"));
        a.push(this.noteInput.value);
        localStorage.setItem("notes", JSON.stringify(a));

        this.notesContainer.appendChild(newNote);
        this.resetForm();
    }

    addLocalStorageNote(noteText) {
        let newNote = document.createElement("div");
        newNote.setAttribute("class", "card");
        newNote.innerHTML = `<p>${noteText}</p>`;

        let noteLink = document.createElement("a");
        noteLink.setAttribute("href", "#");
        noteLink.setAttribute("class", "card-remove");
        noteLink.innerText = "Remove";
        noteLink.addEventListener("click", this.removeNote.bind(this));

        newNote.appendChild(noteLink);

        this.notesContainer.appendChild(newNote);
        this.resetForm();
    }

    resetForm() {
        this.noteInput.value = "";
        this.noteInput.focus();
    }

    removeNote(e) {
        let noteToRemove = e.target.parentElement;
        this.notesContainer.removeChild(noteToRemove);
        e.preventDefault();

        let a = JSON.parse(localStorage.getItem("notes"));
        let key = a.indexOf(noteToRemove.firstChild.innerHTML);
        a.splice(key, 1);
        localStorage.setItem("notes", JSON.stringify(a));

    }
}

let app = new CardApp();
