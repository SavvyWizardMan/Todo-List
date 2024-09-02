import createTask from "./application";
import createProject from "./application";
import createNote from "./application";

export default function(section) {
    section.innerHTML = "";
    const taskH2 = document.createElement('h2');
    const projectsH2 = document.createElement('h2');
    const notesH2 = document.createElement('h2');
    const taskCon = document.createElement('div');
    const projCon = document.createElement('div');
    const notesCon = document.createElement('div');
    const addTask = document.querySelector('.addTask');


    taskH2.innerText = "Tasks:";
    projectsH2.innerText = "Projects:";
    notesH2.innerText = "Notes:";
    taskCon.classList.add('task-box');
    projCon.classList.add('project-box');
    notesCon.classList.add('notes-box');

    section.appendChild(taskH2);
    section.appendChild(taskCon);
    section.appendChild(projectsH2);
    section.appendChild(projCon);
    section.appendChild(notesH2);
    section.appendChild(notesCon);
    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task' + i)) || [];
        const o = new createTask(e.title, e.description, e.date, e.priority);
        taskCon.appendChild(o.display());
    }

    // I dont fucking know anymore
    const dialog = document.querySelector('dialog');
    const title = document.querySelector('input[id="title"]')
    const desc = document.querySelector('input[id="desc"]')
    const date = document.querySelector('input[type="date"]')
    const radio1 = document.querySelector('input[id="high"]');
    const radio2 = document.querySelector('input[id="medium"]');
    const radio3 = document.querySelector('input[id="low"]');
    const inputs = [title, desc];
    const radios = [radio1, radio2, radio3];
    let priority = "";

    addTask.addEventListener('click', () => {
        let localLength = localStorage.length;

        for (let i of inputs) {
            if (i.value === "") return;
        }
        let isChecked = false;
        for (let j of radios) {
            if (j.checked) {
                priority = j.value;
                isChecked = true;
                break;
            }      
        }

        if (!isChecked) {
            return;
        }

        const i = new createTask(title.value, desc.value, date.value, priority);
        taskCon.appendChild(i.display());

        for (let j = localLength; j <= localLength; j++) {
            localStorage.setItem('task'+j, JSON.stringify({"title": title.value, "description": desc.value, "date": date.value, "priority": priority}));
        }

        title.value = "";
        desc.value = "";
        radio1.checked = false;
        radio2.checked = false;
        radio3.checked = false;
        dialog.close();
    });
};