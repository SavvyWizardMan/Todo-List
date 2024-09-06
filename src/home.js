import {createTask} from "./application";
import {createProject} from "./application";
import {createNote} from "./application";
import template from "./application";

export default function(section) {
    template(section);
    const taskCon = document.createElement('div');
    taskCon.classList.add('task-box');
    const notesCon = document.createElement('div');
    const notesH2 = document.createElement('h2');
    const li = document.querySelector('li:first-child');

    li.style.borderTop = "2px inset black";
    li.style.borderLeft = "2px inset black";
    li.style.borderRight = "2px inset black";
    li.style.background = "#bbb";
    document.querySelector('li:first-child').style.borderTopLeftRadius = "8px";

    notesH2.innerText = "Notes:";
    notesCon.classList.add('notes-box');

    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task' + i)) || [];
        const o = new createTask(e.title, e.description, e.date, e.priority);
        const h = o.display();
        h.setAttribute('data-task', i);
        taskCon.appendChild(h);
    }

    section.appendChild(notesH2);
    section.appendChild(notesCon);
    section.appendChild(taskCon);
    
    return taskCon;    
};

