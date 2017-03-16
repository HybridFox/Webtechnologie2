"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (localStorage.getItem("notes") == undefined) {
    localStorage.setItem("notes", "[]");
}

var CardApp = function () {
    function CardApp() {
        _classCallCheck(this, CardApp);

        this.btnAddNote = document.querySelector("#btnAddNote");
        this.notesContainer = document.querySelector(".notes");
        this.noteInput = document.querySelector("#txtAddNote");

        this.btnAddNote.addEventListener("click", this.addNote.bind(this));

        var a = JSON.parse(localStorage.getItem("notes"));
        for (var i = 0; i < a.length; i++) {
            this.addLocalStorageNote(a[i]);
        }
    }

    _createClass(CardApp, [{
        key: "addNote",
        value: function addNote(e) {
            var newNote = document.createElement("div");
            newNote.setAttribute("class", "card");
            newNote.innerHTML = "<p>" + this.noteInput.value + "</p>";

            var noteLink = document.createElement("a");
            noteLink.setAttribute("href", "#");
            noteLink.setAttribute("class", "card-remove");
            noteLink.innerText = "Remove";
            noteLink.addEventListener("click", this.removeNote.bind(this));

            newNote.appendChild(noteLink);

            var a = JSON.parse(localStorage.getItem("notes"));
            a.push(this.noteInput.value);
            localStorage.setItem("notes", JSON.stringify(a));

            this.notesContainer.appendChild(newNote);
            this.resetForm();
        }
    }, {
        key: "addLocalStorageNote",
        value: function addLocalStorageNote(noteText) {
            var newNote = document.createElement("div");
            newNote.setAttribute("class", "card");
            newNote.innerHTML = "<p>" + noteText + "</p>";

            var noteLink = document.createElement("a");
            noteLink.setAttribute("href", "#");
            noteLink.setAttribute("class", "card-remove");
            noteLink.innerText = "Remove";
            noteLink.addEventListener("click", this.removeNote.bind(this));

            newNote.appendChild(noteLink);

            this.notesContainer.appendChild(newNote);
            this.resetForm();
        }
    }, {
        key: "resetForm",
        value: function resetForm() {
            this.noteInput.value = "";
            this.noteInput.focus();
        }
    }, {
        key: "removeNote",
        value: function removeNote(e) {
            var noteToRemove = e.target.parentElement;
            this.notesContainer.removeChild(noteToRemove);
            e.preventDefault();

            var a = JSON.parse(localStorage.getItem("notes"));
            var key = a.indexOf(noteToRemove.firstChild.innerHTML);
            a.splice(key, 1);
            localStorage.setItem("notes", JSON.stringify(a));
        }
    }]);

    return CardApp;
}();

var app = new CardApp();
