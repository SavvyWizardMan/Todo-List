import {createProject} from "./application";
import {createTask} from "./application";
import template from "./application";

export default function(section) {
    const projCon = template(section)[1];
    section.innerHTML = "";

    projCon.classList.add('project-box');

    let localLength = 0;

    if (JSON.parse(localStorage.getItem('projects')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('projects')));
    }

    for (let i = 0; i < localLength.length; i++) {
        const q = JSON.parse(localStorage.getItem('projects'));
        const e = q['project'+i];
        const o = new createProject(e.title, e.description);
        const g = o.display();
        const h = g[0];
        const flipDiv = o.displayFlip();
        h.firstChild.appendChild(flipDiv);
        if (Object.keys(e['tasks']).length === 0) {
            const p = document.createElement('p');
            p.innerText = "No tasks for this project!";
            p.classList.add('theNoTask');
            flipDiv.appendChild(p);
            break;
        }
        for (const j in e['tasks']) {
            const o = new createTask(j.title, j.description, j.dueDate, j.priority);
            const h = o.display();
            flipDiv.appendChild(h);
        }
        projCon.appendChild(h);
        projCon.appendChild(flipDiv);
    }
}