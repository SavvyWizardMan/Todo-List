import {createTask} from "./application";
import {createProject} from "./application";
import {createProjectTask} from "./application";
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
    document.querySelectorAll('li:not(ul > li:first-child, ul > li:last-child').forEach(li => {
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
        if (e.taskDone) {
            document.querySelector('.task-box .inner').classList.toggle('complete');
            document.querySelector('.task-box .inner input[type="checkbox"]').checked = true;
        }
    }

    localLength = 0;

    if (JSON.parse(localStorage.getItem('projects')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('projects')));
    }

    let isChecked = false;
    for (let i = 0; i < localLength.length; i++) {
        const q = JSON.parse(localStorage.getItem('projects'));
        const e = q['project'+i] || [];
        const o = new createProject(e.title, e.description);
        const g = o.display();
        const flipDiv = o.displayFlip();
        const h = g[0];
        const lis = g[1];
        lis.setAttribute('data-list', i);
        lis.querySelector('button').setAttribute('id', i);
        let isThere = false;
        document.querySelectorAll('.projects > li').forEach(listI => {
            if (lis.getAttribute('data-list') === listI.getAttribute('data-list')) {
                isThere = true;
            }
        });
        if (!isThere) {
            document.querySelector('.projects').appendChild(lis);
        }
        h.setAttribute('data-project', i);
        const taskLen = Object.keys(e['tasks']);
        for (let j = 0; j < taskLen.length; j++) {
            const q = JSON.parse(localStorage.getItem('projects'));
            const e = q['project'+lis.getAttribute('data-list')]['tasks']['task'+j] || [];
            const o = new createProjectTask(e.title, e.description, e.date, e.priority);
            const c = o.display();
            c.setAttribute('data-projTask', j);
            flipDiv.appendChild(c);
            if (e.taskDone) {
                isChecked = true;
            }
        }        
        h.firstChild.appendChild(flipDiv);
        projCon.appendChild(h);
        if (isChecked) {
            h.querySelector('.flip .inner').classList.toggle('complete');
            h.querySelector('.inner input[type="checkbox"]').checked = true;
        }
    }

    const buttons = document.querySelectorAll('li > button:not(#addProj)');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll(`li:not(ul > li:last-child)`).forEach(li => {
                li.childNodes.forEach(child => {
                    if (child.id === button.id) {
                        li.style.borderTop = "2px inset black";
                        li.style.borderLeft = "2px inset black";
                        li.style.borderRight = "2px inset black";
                        li.style.background = "#bbb";
                        document.querySelector('li:first-child').style.borderTopLeftRadius = "8px";
                    } else {
                        li.style.border = "none";
                        li.style.background = "none";
                        li.style.borderBottom = "2px solid black";
                    }
                });
            });
        });
    });

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

