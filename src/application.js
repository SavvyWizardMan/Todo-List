import trash from "./trash.svg";
import edit from "./notes.svg";
import {deleteThing} from "./util";
import {editThing} from "./util";
import { makeDialog } from "./util";

export class createTask {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    display() {
        const wrapper = document.createElement('div');
        const div = document.createElement('div');
        const innerDiv = document.createElement('div');
        div.classList.add('task');
        const titleP = document.createElement('h3');
        const descP = document.createElement('p');
        const dateP = document.createElement('p');
        const taskLabel = document.createElement('label');
        const taskDone = document.createElement('input');
        const priorityP = document.createElement('p');
        const contain = document.createElement('div');
        const delButton = document.createElement('button');
        const delImg = document.createElement('img');
        const editButton = document.createElement('button')
        const editImg = document.createElement('img');
        titleP.innerText = this.title;
        descP.innerText = this.description;
        dateP.innerText = this.dueDate;
        priorityP.innerText = this.priority;

        switch(this.priority) {
            case "high":
                priorityP.classList.add('high');
            break;
            case "medium":
                priorityP.classList.add('med');
            break;
            case "low":
                priorityP.classList.add('low');
            break;
        }

        taskLabel.innerText = "Task Complete?";
        taskDone.setAttribute('type', 'checkbox');
        // incorporate way to make ids unique
        // taskLabel.setAttribute('for', 'taskDone');
        // taskDone.setAttribute('id', 'taskDone');
        contain.classList.add('flexit');
        innerDiv.classList.add('inner');
        delButton.classList.add('icon');
        editButton.classList.add('icon');
        delImg.src = trash;
        delImg.alt = "Trash bin";
        editImg.src = edit;
        editImg.alt = "Sketch pad to edit";

        wrapper.classList.add('wrapper');
        descP.classList.add('desc');
        dateP.classList.add('date');

        innerDiv.appendChild(titleP);
        delButton.appendChild(delImg);
        editButton.appendChild(editImg);
        innerDiv.appendChild(delButton);
        innerDiv.appendChild(editButton);
        innerDiv.appendChild(descP);
        innerDiv.appendChild(dateP);
        innerDiv.appendChild(priorityP);
        contain.appendChild(taskLabel);
        contain.appendChild(taskDone);
        innerDiv.appendChild(contain);

        taskDone.addEventListener('change', () => {
            innerDiv.classList.toggle('complete');
        });

        if ((new Date(this.dueDate).getTime() + (24 * 60 * 60 * 1000)) < new Date().getTime()) {
            innerDiv.classList.add('pastDue');
        }

        // every div gets the same one
        // for (let i = localStorage.length - 1; i < localStorage.length; i++) {
        //     const e = JSON.parse(localStorage.getItem('task'+i));
        //     console.log(e);
        //     div.setAttribute('data-task', e["data-task"]);
        // }

        delButton.addEventListener('click', () => {
            const con = confirm("Are you sure?");

            if (con) deleteThing('task', wrapper);
        });

        editButton.addEventListener('click', () => editThing(this, this.title, this.description, this.dueDate, this.priority, 'task', editButton, wrapper));
        
        div.appendChild(innerDiv);
        wrapper.appendChild(div);

        return wrapper;
    }
}

export class createProject {

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    display() {
        const wrapper = document.createElement('div');
        const div = document.createElement('div');
        const descP = document.createElement('p');
        const li = document.createElement('li');
        const buttonLi = document.createElement('button');
        const projectsCon = document.querySelector('.projects');
        const innerDiv = document.createElement('div');
        div.classList.add('task');
        const titleP = document.createElement('h3');
        const allLis = document.querySelectorAll('.projects > li');

        for (let i = allLis.length; i <= allLis.length; i++) {
            buttonLi.setAttribute('id', i);
        }

        document.querySelectorAll('li > button:not(#addProj)').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll(`li:not(li:last-child)`).forEach(li => {
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
        
        wrapper.classList.add('wrapper');
        innerDiv.classList.add('inner');
        titleP.innerText = this.title;
        buttonLi.innerText = this.title;
        descP.innerText = this.description;

        buttonLi.addEventListener('click', () => {
            makeDialog("Create Project Task", true, "Add Project Task");
            const section = document.querySelector('section');
            const flipDiv = this.displayFlip();
            section.innerHTML = "";

            const proj = document.createElement('h2');
            const projectCon = document.createElement('div');
            projectCon.classList.add('project-box');
            proj.innerText = "Project:";
            
            div.appendChild(innerDiv);
            div.appendChild(flipDiv);
            wrapper.appendChild(div);
            projectCon.appendChild(wrapper);
            section.appendChild(proj);
            section.appendChild(projectCon);
        });
        li.appendChild(buttonLi);
        innerDiv.appendChild(titleP);
        innerDiv.appendChild(descP);
        div.appendChild(innerDiv);
        wrapper.appendChild(div);

        return [wrapper, li];
    }

    displayFlip() {
        const flipDiv = document.createElement('div');

        flipDiv.classList.add('flip');

        return flipDiv;
    }
}

export class createNote {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    display() {
        const wrapper = document.createElement('div');
        const div = document.createElement('div');
        const innerDiv = document.createElement('div');
        div.classList.add('task');
        const titleP = document.createElement('h3');
        const descP = document.createElement('p');
        const delButton = document.createElement('button');
        const delImg = document.createElement('img');
        const editButton = document.createElement('button')
        const editImg = document.createElement('img');

        titleP.innerText = this.title;
        descP.innerText = this.description;

        innerDiv.classList.add('inner');
        wrapper.classList.add('wrapper');
        descP.classList.add('desc');
        delButton.classList.add('icon');
        editButton.classList.add('icon');
        delImg.src = trash;
        delImg.alt = "Trash bin";
        editImg.src = edit;
        editImg.alt = "Sketch pad to edit";

        innerDiv.appendChild(titleP);
        delButton.appendChild(delImg);
        editButton.appendChild(editImg);
        innerDiv.appendChild(delButton);
        innerDiv.appendChild(editButton);
        innerDiv.appendChild(descP);

        div.appendChild(innerDiv);
        wrapper.appendChild(div);

        delButton.addEventListener('click', () => {
            const con = confirm("Are you sure?");

            if (con) deleteThing('note', wrapper);
        });

        editButton.addEventListener('click', () => editThing(this, this.title, this.description, "", "", 'note', editButton, wrapper));

        return wrapper;
    }
}

export default function(section) {
    section.innerHTML = "";
    const taskCon = document.createElement('div');
    taskCon.classList.add('task-box');
    const taskH2 = document.createElement('h2');
    const projectsH2 = document.createElement('h2');
    const projCon = document.createElement('div');
    projCon.classList.add('project-box');

    taskH2.innerText = "Tasks:";
    projectsH2.innerText = "Projects:";

    section.appendChild(taskH2);
    section.appendChild(taskCon);
    section.appendChild(projectsH2);
    section.appendChild(projCon);

    return [taskCon, projCon];
}