import {createTask} from "./application";
import {createProject} from "./application";
import {createNote} from "./application";
import template from "./application";

export default function(section) {
    const taskCon = template(section);
   
    const notesCon = document.createElement('div');
    const notesH2 = document.createElement('h2');
    const li = document.querySelector('li:first-child');
    
    li.style.borderTop = "2px inset black";
    li.style.borderLeft = "2px inset black";
    li.style.borderRight = "2px inset black";
    li.style.background = "#bbb";
    document.querySelector('li:first-child').style.borderTopLeftRadius = "8px";
    document.querySelectorAll('li:not(li:first-child, li:last-child').forEach(li => {
        li.style.border = "none";
        li.style.background = "none";
        li.style.borderBottom = "2px solid black";
    });

    notesH2.innerText = "Notes:";
    notesCon.classList.add('notes-box');
    let localLength = 0;

    if (JSON.parse(localStorage.getItem('tasks')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('tasks')));
    }

    for (let i = 0; i < localLength.length; i++) {
        const q = JSON.parse(localStorage.getItem('tasks'));
        const e = q['task'+i] || [];
        const o = new createTask(e.title, e.description, e.date, e.priority);
        const h = o.display();
        h.setAttribute('data-task', i);
        taskCon.appendChild(h);
    }

    localLength = 0;

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
    
    return taskCon;    
};

