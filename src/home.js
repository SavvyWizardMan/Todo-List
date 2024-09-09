import {createTask} from "./application";
import {createProject} from "./application";
import {createNote} from "./application";
import template from "./application";

export default function(section) {
    const temp = template(section);
    const taskCon = temp[0];
    const projCon = temp[1];
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
    notesCon.classList.add('note-box');
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

    if (JSON.parse(localStorage.getItem('projects')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('projects')));
    }
    for (let i = 0; i < localLength.length; i++) {
        const q = JSON.parse(localStorage.getItem('projects'));
        const e = q['project'+i];
        const o = new createProject(e.title, e.description);
        const g = o.display();
        const h = g[0];
        const li = g[1];
        li.setAttribute('data-project', i);
        let isThere = false;
        document.querySelectorAll('.projects > li').forEach(list => {
            if (list.getAttribute('data-project') === li.getAttribute('data-project')) {
                isThere = true;
            }
        });
        if (!isThere) document.querySelector('.projects').appendChild(li);
        const flipDiv = o.displayFlip();
        h.firstChild.appendChild(flipDiv);
        projCon.appendChild(h);
        if (Object.keys(e['tasks']).length === 0) {
            const p = document.createElement('p');
            p.classList.add('theNoTask');
            p.innerText = "No tasks for this project!";
            flipDiv.appendChild(p);
        }
        for (const j in e['tasks']) {
            const o = new createTask(j.title, j.description, j.dueDate, j.priority);
            const h = o.display();
            flipDiv.appendChild(h);
        }
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
};

