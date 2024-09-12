import {createTask} from "./application";
import {createProject}  from "./application";
import { createProjectTask} from "./application";
import template from "./application";

export default function(section) {
    const temp = template(section);
    const taskCon = temp[0];
    const projCon = temp[1];
    
    const t = new Date();
    const m = t.getMonth() + 1;

    return function() { 
        let localLength = Object.keys(JSON.parse(localStorage.getItem('tasks')));
        for (let i = 0; i < localLength.length; i++) {
        const e = JSON.parse(localStorage.getItem('tasks'))['task'+i] || [];
            if (e.date === `${t.getFullYear()}-${m < 10 ? "0"+m : m}-${t.getDate() < 10 ? "0"+t.getDate() : t.getDate()}`) {
                const o = new createTask(e.title, e.description, e.date, e.priority);
                const h = o.display();
                h.setAttribute('data-task', i);
                taskCon.appendChild(h);
                if (e.taskDone) {
                    document.querySelector('.task-box .inner').classList.toggle('complete');
                    document.querySelector('.task-box .inner input[type="checkbox"]').checked = true;
                }
            }
        }
        localLength = Object.keys(JSON.parse(localStorage.getItem('projects')));
        let isChecked = false;
        for (let i = 0; i < localLength.length; i++) {
            const q = JSON.parse(localStorage.getItem('projects'));
            const f = q['project'+i];
            const k = new createProject(f.title, f.description);
            const a = k.display();
            const h = a[0];
            const flipDiv = k.displayFlip();
            for (let j = 0; j < Object.keys(f['tasks']).length; j++) {
                const q = JSON.parse(localStorage.getItem('projects'));
                const e = q['project'+i]['tasks']['task'+j] || [];
                const o = new createProjectTask(e.title, e.description, e.date, e.priority);
                const c = o.display();
                c.setAttribute('data-projTask', j);
                if (e.date === `${t.getFullYear()}-${m < 10 ? "0"+m : m}-${t.getDate() < 10 ? "0"+t.getDate() : t.getDate()}`) {
                    flipDiv.appendChild(c);
                    h.firstChild.appendChild(flipDiv);
                    projCon.appendChild(h);
                if (e.taskDone) {
                    isChecked = true;
                }
            }
        }
            if (isChecked) {
                h.querySelector('.flip .inner').classList.toggle('complete');
                h.querySelector('.inner input[type="checkbox"]').checked = true;
            }
        }
    }

}