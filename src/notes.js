import {createNote} from "./application";
import {makeDialog} from "./util";

export default function(section) {
    section.innerHTML = "";
    const notesCon = document.createElement('div');
    const notesH2 = document.createElement('h2');

    if (document.querySelector('dialog') !== null) {
        document.body.removeChild(document.querySelector('dialog'));
    }

    makeDialog('Create Note', false, 'Add Note');

    notesH2.innerText = "Notes:";
    notesCon.classList.add('notes-box');

    section.appendChild(notesH2);
    section.appendChild(notesCon);
}