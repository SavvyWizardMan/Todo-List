import trash from "./trash.svg";
import edit from "./notes.svg";
import {deleteThing} from "./util";
import {deleteProject} from "./util";
import {deleteProjectThing} from "./util";
// import {editProjectThing} from "./util";
import {editThing} from "./util";
import { makeDialog } from "./util";
import homePage from "./home";
import projectPage from "./projects";

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
            const arr = JSON.parse(localStorage.getItem('tasks'));
            arr['task'+wrapper.getAttribute('data-task')] = {"title": this.title, "description": this.description, "date": this.dueDate, "priority": this.priority, 'taskDone': taskDone.checked};
            localStorage.setItem('tasks', JSON.stringify(arr));
        });

        if ((new Date(this.dueDate).getTime() + (30 * 60 * 60 * 1000)) < new Date().getTime()) {
            innerDiv.classList.add('pastDue');
        }

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
        const delButton = document.createElement('button');
        const delImg = document.createElement('img');
        const editButton = document.createElement('button')
        const editImg = document.createElement('img');
        const descP = document.createElement('p');
        const li = document.createElement('li');
        const buttonLi = document.createElement('button');
        const innerDiv = document.createElement('div');
        div.classList.add('task');
        const titleP = document.createElement('h3');
        
        wrapper.classList.add('wrapper');
        innerDiv.classList.add('inner');
        titleP.innerText = this.title;
        buttonLi.innerText = this.title;
        descP.innerText = this.description;
        delButton.classList.add('icon', 'projectI');
        editButton.classList.add('icon', 'projectI');
        delImg.src = trash;
        delImg.alt = "Trash bin";
        editImg.src = edit;
        editImg.alt = "Sketch pad to edit";

        delButton.appendChild(delImg);
        editButton.appendChild(editImg);

        li.appendChild(buttonLi);
        innerDiv.appendChild(titleP);
        innerDiv.appendChild(descP);
        div.appendChild(innerDiv);
        wrapper.appendChild(div);

        buttonLi.addEventListener('click', () => {
            makeDialog("Create Project Task", true, "Add Project Task", li);
            projectPage(document.querySelector('section'), li, editButton, delButton);
        });

        delButton.addEventListener('click', () => {
            const con = confirm('are you sure you want to delete this project?');

            if (con) {
                deleteProject(li);
            }
        });

        editButton.addEventListener('click', () => {
            console.log('clicked');
            editThing(this, this.title, this.description, this.dueDate, this.priority, 'project', editButton, li);
        });

        return [wrapper, li];
    }

    displayFlip() {
        const flipDiv = document.createElement('div');

        flipDiv.classList.add('flip');

        return flipDiv;
    }
}

export class createProjectTask {
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
            const arr = JSON.parse(localStorage.getItem('projects'));
            arr['project'+wrapper.getAttribute('data-projtask')]['tasks']['task'+wrapper.getAttribute('data-projTask')] = {"title": this.title, "description": this.description, "date": this.dueDate, "priority": this.priority, 'taskDone': taskDone.checked};
            localStorage.setItem('projects', JSON.stringify(arr));
        });

        if ((new Date(this.dueDate).getTime() + (30 * 60 * 60 * 1000)) < new Date().getTime()) {
            innerDiv.classList.add('pastDue');
        }

        delButton.addEventListener('click', () => {
            const con = confirm("Are you sure?");

            if (con) deleteProjectThing(wrapper);
        });

        editButton.addEventListener('click', () => editThing(this, this.title, this.description, this.dueDate, this.priority, 'projtask', editButton, wrapper));
        
        div.appendChild(innerDiv);
        wrapper.appendChild(div);

        return wrapper;
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