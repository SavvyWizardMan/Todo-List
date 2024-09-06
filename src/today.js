import {createTask} from "./application";
import {createProject}  from "./application";
import template from "./application";

export default function(section) {
    const taskCon = template(section);
    
    const t = new Date();
    const m = t.getMonth() + 1;

    return function() { for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task'+i)) || [];
            if (e.date === `${t.getFullYear()}-${m < 10 ? "0"+m : m}-${t.getDate() < 10 ? "0"+t.getDate() : t.getDate()}`) {
                const o = new createTask(e.title, e.description, e.date, e.priority);
                const h = o.display();
                h.setAttribute('data-task', i);
                taskCon.appendChild(h);
            }
        }
        return taskCon;
    }

}