import {createTask} from "./application";
import {createProject}  from "./application";
import template from "./application";

export default function(section) {
    template(section);
    
    const taskCon = document.createElement('div');

    taskCon.classList.add('task-box');
    const t = new Date();
    const m = t.getMonth() + 1;

    return function() { for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task'+i)) || [];
            if (e.date === `${t.getFullYear()}-${m < 10 ? "0"+m : m}-${t.getDate() < 10 ? "0"+t.getDate() : t.getDate()}`) {
                const o = new createTask(e.title, e.description, e.date, e.priority);
                taskCon.appendChild(o.display());
            }
        }
        section.appendChild(taskCon);
        return taskCon;
    }

}