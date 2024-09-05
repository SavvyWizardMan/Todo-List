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

    notesH2.innerText = "Notes:";
    notesCon.classList.add('notes-box');

    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task' + i)) || [];
        const o = new createTask(e.title, e.description, e.date, e.priority);
        taskCon.appendChild(o.display());
    }

    section.appendChild(notesH2);
    section.appendChild(notesCon);
    section.appendChild(taskCon);
    
    return taskCon;    
};

