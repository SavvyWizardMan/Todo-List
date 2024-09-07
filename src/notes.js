import {createNote} from "./application";

export default function(section) {
    section.innerHTML = "";
    const notesCon = document.createElement('div');
    const notesH2 = document.createElement('h2');

    notesH2.innerText = "Notes:";
    notesCon.classList.add('notes-box');

    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('note' + i)) || [];
        if (e.length === 0) break;
        const o = new createNote(e.title, e.description);
        const h = o.display();
        h.setAttribute('data-note', i);
        notesCon.appendChild(h);
    }

    section.appendChild(notesH2);
    section.appendChild(notesCon);
}