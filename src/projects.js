import {createProject} from "./application";
import {createTask} from "./application";
import template from "./application";

export default function(section) {
    // const projCon = template(section)[1];
    // section.innerHTML = "";

    // projCon.classList.add('project-box');

    // let localLength = 0;

    // if (JSON.parse(localStorage.getItem('projects')) !== null) {
    //     localLength = Object.keys(JSON.parse(localStorage.getItem('projects')));
    // }
    // for (let i = 0; i < localLength.length; i++) {
    //     const q = JSON.parse(localStorage.getItem('projects'));
    //     const e = q['project'+0] || [];
    //     const o = new createProject(e.title, e.description);
    //     const g = o.display();
    //     const h = g[0];
    //     const li = g[1];
    //     li.setAttribute('data-project', i);
    //     let isThere = false;
    //     document.querySelectorAll('.projects > li').forEach(list => {
    //         if (list.getAttribute('data-project') === li.getAttribute('data-project')) {
    //             isThere = true;
    //         }
    //     });
    //     if (!isThere) document.querySelector('.projects').appendChild(li);
    //     const flipDiv = o.displayFlip();
    //     projCon.appendChild(h);
    //     h.firstChild.appendChild(flipDiv);
    //     if (Object.keys(e['tasks']).length === 0) {
    //         const p = document.createElement('p');
    //         p.classList.add('theNoTask');
    //         p.innerText = "No tasks for this project!";
    //         flipDiv.appendChild(p);
    //         continue;
    //     }
    //     const len = Object.keys(e['tasks']).length;
    //     const z = e['tasks']['task'+i];
    //     for (let i = len - 1; i <= len - 1; i++) {
    //         const o = new createTask(z.title, z.description, z.date, z.priority);
    //         const h = o.display();
    //         flipDiv.appendChild(h);
    //     }
    // }
}