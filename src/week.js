import {createTask} from "./application";
import createProject  from "./application";
import template from "./application";

export default function(section) {
    const taskCon = template(section);
    
    const t = new Date();

    return function() { for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task'+i)) || [];
            if (new Date(e.date).getTime() < (t.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                const o = new createTask(e.title, e.description, e.date, e.priority);
                const h = o.display();
                h.setAttribute('data-task', i);
                taskCon.appendChild(h);
            }
        }
        section.appendChild(taskCon);
        return taskCon;
    }
}