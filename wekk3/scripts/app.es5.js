function CardApp() {
    this.btnAddNote = document.querySelector("#btnAddNote");
    this.notesContainer = document.querySelector(".notes");
    this.noteInput = document.querySelector("#txtAddNote");

    this.btnAddNote.addEventListener("click", this.addNote.bind(this));
}

CardApp.prototype.addNote = function (e) {
    var newNote = document.createElement("div");
    newNote.setAttribute("class", "card");
    newNote.innerHTML = "<p>" + this.noteInput.value + "</p>";

    var noteLink = document.createElement("a");
    noteLink.setAttribute("href", "#");
    noteLink.setAttribute("class", "card-remove");
    noteLink.innerText = "Remove";
    noteLink.addEventListener("click", this.removeNote.bind(this));

    newNote.appendChild(noteLink);

    this.notesContainer.appendChild(newNote);
    this.resetForm();
};

CardApp.prototype.resetForm = function () {
    this.noteInput.value = "";
    this.noteInput.focus();
};

CardApp.prototype.removeNote = function (e) {
    var noteToRemove = e.target.parentElement;
    this.notesContainer.removeChild(noteToRemove());
    e.preventDefault();
};

var app = new CardApp();
