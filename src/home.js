import createTask from "./application";

export default function homePage(section) {
    section.innerHTML = "";
    const taskH2 = document.createElement('h2');
    const projectsH2 = document.createElement('h2');
    const notesH2 = document.createElement('h2');

    taskH2.innerText = "Tasks:";
    projectsH2.innerText = "Projects:";
    notesH2.innerText = "Notes:";

    section.appendChild(taskH2);
    localStorage.setItem("task0", JSON.stringify({"title": 'Wizard', "description": 'I am Wizard. I\'m in your localStorage.', "date": "2024-08-31", "priority": "high"}));
    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task' + i));
        const o = new createTask(e.title, e.description, e.date, e.priority);
        const h = o.display();
        section.appendChild(h);
    }
    section.appendChild(projectsH2);
    section.appendChild(notesH2);
};