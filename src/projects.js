import {createProject} from "./application";
import {createTask} from "./application";
import template from "./application";

export default function(section, li) {
    section.innerHTML = "";
    const projCon = document.createElement('div');
    const projH2 = document.createElement('h2');

    projH2.innerText = "Project:";
    projCon.classList.add('project-box');
    let localLength = 0;

    if (JSON.parse(localStorage.getItem('projects')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('projects'))['project'+li.getAttribute('data-list')]['tasks']);
    }

    for (let i = li.getAttribute('data-list'); i <= li.getAttribute('data-list'); i++) {
        const q = JSON.parse(localStorage.getItem('projects'));
        const f = q['project'+i];
        const k = new createProject(f.title, f.description);
        const a = k.display();
        const h = a[0];
        const flipDiv = k.displayFlip();
        for (let i = 0; i < localLength.length; i++) {
            const q = JSON.parse(localStorage.getItem('projects'));
            const e = q['project'+li.getAttribute('data-list')]['tasks']['task'+i] || [];
            const o = new createTask(e.title, e.description, e.date, e.priority);
            const c = o.display();
            c.setAttribute('data-projTask', i);
            flipDiv.appendChild(c);
        }
        h.firstChild.appendChild(flipDiv);
        projCon.appendChild(h);
    }

    section.appendChild(projH2);
    section.appendChild(projCon);
}