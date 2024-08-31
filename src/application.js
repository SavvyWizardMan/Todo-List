export default class createTask {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    display(parent) {
        const div = document.createElement('div');
        div.classList.add('task');
        const titleP = document.createElement('h2');
        const descP = document.createElement('p');
        const dateP = document.createElement('p');
        const taskLabel = document.createElement('label');
        const taskDone = document.createElement('input');
        const priorityP = document.createElement('span');
        const dateO = new Date();
        titleP.innerText = this.title.value;
        descP.innerText = this.description.value;
        dateP.innerText = this.dueDate.value;

        taskLabel.setAttribute('for', 'taskDone');
        taskLabel.innerText = "Task Complete?";
        taskDone.setAttribute('type', 'checkbox');
        taskDone.setAttribute('id', 'taskDone');

        div.appendChild(titleP);
        div.appendChild(descP);
        div.appendChild(dateP);
        div.appendChild(taskLabel);
        div.appendChild(taskDone);

        taskDone.addEventListener('change', () => {
            div.classList.toggle('complete');
        });

        parent.appendChild(div);
    }
}

export class createProject {

    constructor(title) {
        this.title = title;
    }

    static projectTask() {

    } 
}

export function createNote(title, description) {
    this.title = title;
    this.description = description;
}