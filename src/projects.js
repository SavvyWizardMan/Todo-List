import {createProject} from "./application";
import template from "./application";

export default function(section) {
    const projCon = document.querySelector('.project-box');

    projCon.classList.add('project-box');

    const p = new createProject("hello", "hi");
    const o = p.display();

    projCon.appendChild(o);
    section.appendChild(projCon);
}