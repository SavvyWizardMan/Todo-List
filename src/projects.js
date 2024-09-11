import {createProject} from "./application";
import {createProjectTask} from "./application";
import template from "./application";

export default function(section, li, editBtn, delBtn) {
    section.innerHTML = "";
    const projCon = document.createElement('div');
    const projH2 = document.createElement('h2');

    projH2.innerText = "Project:";
    projCon.classList.add('project-box');
    let localLength = 0;

    if (JSON.parse(localStorage.getItem('projects')) !== null) {
        localLength = Object.keys(JSON.parse(localStorage.getItem('projects'))['project'+li.getAttribute('data-list')]['tasks']);
    }
    let isChecked = false;

    for (let i = li.getAttribute('data-list'); i <= li.getAttribute('data-list'); i++) {
        const q = JSON.parse(localStorage.getItem('projects'));
        const f = q['project'+i];
        const k = new createProject(f.title, f.description);
        const a = k.display();
        const h = a[0];
        const flipDiv = k.displayFlip();
        for (let j = 0; j < localLength.length; j++) {
            const q = JSON.parse(localStorage.getItem('projects'));
            const e = q['project'+li.getAttribute('data-list')]['tasks']['task'+j] || [];
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

    section.appendChild(projH2);
    if (editBtn !== "" && editBtn !== "") {
        section.appendChild(editBtn);
        section.appendChild(delBtn);
    }
    section.appendChild(projCon);
}