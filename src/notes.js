import {createNote} from "./application";

export default function(section) {
    section.innerHTML = "";
    const notesCon = document.createElement('div');
    const notesH2 = document.createElement('h2');

    notesH2.innerText = "Notes:";
    notesCon.classList.add('notes-box');
    let localLength = 0;

    if (JSON.parse(localStorage.getItem('notes')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('notes')));
    }

    for (let i = 0; i < localLength.length; i++) {
        const q = JSON.parse(localStorage.getItem('notes'));
        const e = q['note'+i] || [];
        const o = new createNote(e.title, e.description);
        const h = o.display();
        h.setAttribute('data-note', i);
        notesCon.appendChild(h);
    }

    section.appendChild(notesH2);
    section.appendChild(notesCon);
}