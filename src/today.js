import createTask from "./application";
import createProject  from "./application";
import createNote from "./application";

export default function(section) {
    section.innerHTML = "";
    const taskH2 = document.createElement('h2');
    const projectH2 = document.createElement('h2');
    const notesH2 = document.createElement('h2');
    const t = new Date();
    const m = t.getMonth() + 1;

    taskH2.innerText = "Tasks:";
    projectH2.innerText = "Projects:";
    notesH2.innerText = "Notes:";

    section.appendChild(taskH2);
    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task'+i)) || [];
        if (e.date === `${t.getFullYear()}-${m < 10 ? "0"+m : m}-${t.getDate() < 10 ? "0"+t.getDate() : t.getDate()}`) {
            const o = new createTask(e.title, e.description, e.date, e.priority);
            section.appendChild(o.display());
        }
    }
    section.appendChild(projectH2);
    section.appendChild(notesH2);
}