import trash from "./trash.svg";
import edit from "./notes.svg";

export class createTask {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    display() {
        const div = document.createElement('div');
        const innerDiv = document.createElement('div');
        div.classList.add('task');
        const titleP = document.createElement('h3');
        const descP = document.createElement('p');
        const dateP = document.createElement('p');
        const taskLabel = document.createElement('label');
        const taskDone = document.createElement('input');
        const priorityP = document.createElement('span');
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

        taskLabel.setAttribute('for', 'taskDone');
        taskLabel.innerText = "Task Complete?";
        taskDone.setAttribute('type', 'checkbox');
        taskDone.setAttribute('id', 'taskDone');
        contain.classList.add('flexit');
        innerDiv.classList.add('inner');
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
        innerDiv.appendChild(dateP);
        innerDiv.appendChild(priorityP);
        contain.appendChild(taskLabel);
        contain.appendChild(taskDone);
        innerDiv.appendChild(contain);

        taskDone.addEventListener('change', () => {
            innerDiv.classList.toggle('complete');
        });
        
        div.appendChild(innerDiv);

        return div;
    }
}

export class createProject {

    constructor(title) {
        this.title = title;
    }

    projectTask() {

    } 
}

export class createNote {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

export default function(section) {
    section.innerHTML = "";
    const taskH2 = document.createElement('h2');
    const projectsH2 = document.createElement('h2');
    const projCon = document.createElement('div');

    taskH2.innerText = "Tasks:";
    projectsH2.innerText = "Projects:";
    projCon.classList.add('project-box');

    section.appendChild(taskH2);
    section.appendChild(projectsH2);
    section.appendChild(projCon);
}