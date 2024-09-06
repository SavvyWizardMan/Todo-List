import trash from "./trash.svg";
import edit from "./notes.svg";
import homePage from "./home";
import todayPage from "./today";
import weekPage from "./week";

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

        if (new Date(this.date).getTime() < new Date().getTime()) {
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
            const local = localStorage.length;

            if (con) {
                let index = 0;
                for (let i = 0; i < localStorage.length; i++) {
                    index = i;
                    if (i === Number(wrapper.getAttribute('data-task'))) {
                        localStorage.removeItem('task'+i);
                        document.querySelector('.task-box').removeChild(wrapper);
                        break;
                    }
                }
                if (localStorage.length === 0) return;

                let atEnd = false;

                for (let j = index; j < localStorage.length; j++) {
                    let ahead = j + 1;
                    const o = JSON.parse(localStorage.getItem('task'+ahead));
                    if (o === null) break;
                    localStorage.setItem('task'+j, JSON.stringify({"title": o.title, "description": o.description, "date": o.date, "priority": o.priority}));
                }

                for (let h = local - 1; h < local; h++) {
                    if (local === 0) break;
                    localStorage.removeItem('task'+h);
                }

                homePage(document.querySelector('section'));
            }
        });

        editButton.addEventListener('click', () => {
            const diag = document.createElement('dialog');
            const h2 = document.createElement('h2');
            const form = document.querySelector('form');
            const f = form.cloneNode();
            const tLabel = document.querySelector('label[for="title"]');
            const tl = tLabel.cloneNode();
            const titleIn = document.querySelector('input[id="title"]');
            const t = titleIn.cloneNode()
            const descIn = document.querySelector('input[id="desc"]');
            const dLabel = document.querySelector('label[for="desc"]');
            const dl = dLabel.cloneNode();
            const d = descIn.cloneNode();
            const dateIn = document.querySelector('input[id="date"]');
            const daLabel = document.querySelector('label[for="date"]');
            const dal = daLabel.cloneNode();
            const da = dateIn.cloneNode();
            const fieldset = document.querySelector('fieldset');
            const fi = fieldset.cloneNode();
            const legend = document.querySelector('legend');
            const le = legend.cloneNode(true);
            const hLabel = document.querySelector('label[for="high"]');
            const hl = hLabel.cloneNode();
            const radio1 = document.querySelector('input[value="high"]');
            const r1 = radio1.cloneNode();
            const mLabel = document.querySelector('label[for="medium"]');
            const ml = mLabel.cloneNode();
            const radio2 = document.querySelector('input[value="medium"]');
            const r2 = radio2.cloneNode();
            const lLabel = document.querySelector('label[for="low"]');
            const ll = lLabel.cloneNode();
            const radio3 = document.querySelector('input[value="low"]');
            const r3 = radio3.cloneNode();

            const priorityIn = [r1, r2, r3];
            const inputs = [t, d, da];
            let thePriority = "";
            
            const lastBtn = document.querySelector('form > button');
            const l = lastBtn.cloneNode();
            const button = document.querySelector('dialog > button');
            const b = button.cloneNode(true);
            
            b.addEventListener('click', () => {
                diag.close();
            });

            h2.innerText = this.title;
            t.value = this.title;
            d.value = this.description;
            da.value = this.dueDate;
            l.innerText = "Modify";
            tl.innerText = "Title:";
            dl.innerText = "Description:";
            dal.innerText = "Due Date:";
            hl.innerText = "High";
            ml.innerText = "Medium";
            ll.innerText = "Low";

            for (let rad of priorityIn) {
                if (this.priority === rad.value) {
                    fi.classList.add('correct');
                    rad.checked = true;
                }
            }

            l.addEventListener('click', () => {
                editButton.parentNode.querySelector('h3').innerText = t.value;
                editButton.parentNode.querySelector('p').innerText = d.value;
                editButton.parentNode.querySelector('p:nth-child(5)').innerText = da.value;
                
                for (let i of inputs) {
                    if (i.value === "") return;
                }
                
                priorityIn.forEach(rad => {
                    if (rad.checked) {
                        thePriority = rad.value;
                        editButton.parentNode.querySelector('.inner > p:nth-child(6)').innerText = rad.value;

                        switch(rad.value) {
                            case "high":
                                priorityP.classList.add('high');
                                priorityP.classList.remove('med');
                                priorityP.classList.remove('low');
                            break;
                            case "medium":
                                priorityP.classList.add('med');
                                priorityP.classList.remove('low');
                                priorityP.classList.remove('high');
                            break;
                            case "low":
                                priorityP.classList.add('low');
                                priorityP.classList.remove('med');
                                priorityP.classList.remove('high');
                            break;
                        }
                    }
                });

                for (let i = 0; i < localStorage.length; i++) {
                    if (i === Number(wrapper.getAttribute('data-task'))) {
                        localStorage.setItem('task'+i, JSON.stringify({"title": t.value, "description": d.value, "date": da.value, "priority": thePriority}));
                    }
                }

                this.display();
                diag.close();
            });

            f.appendChild(tl);
            f.appendChild(t);
            f.appendChild(dl);
            f.appendChild(d);
            f.appendChild(dal);
            f.appendChild(da);
            fi.appendChild(hl);
            fi.appendChild(r1);
            fi.appendChild(ml);
            fi.appendChild(r2);
            fi.appendChild(ll);
            fi.appendChild(r3);
            fi.appendChild(le);
            f.appendChild(fi);
            f.appendChild(l);
            diag.appendChild(b);
            diag.appendChild(h2);
            diag.appendChild(f);
            document.body.appendChild(diag);
            diag.showModal();
        });
        
        div.appendChild(innerDiv);
        wrapper.appendChild(div);

        return wrapper;
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
    const taskCon = document.createElement('div');
    taskCon.classList.add('task-box');
    const taskH2 = document.createElement('h2');
    const projectsH2 = document.createElement('h2');
    const projCon = document.createElement('div');

    taskH2.innerText = "Tasks:";
    projectsH2.innerText = "Projects:";
    projCon.classList.add('project-box');

    section.appendChild(taskH2);
    section.appendChild(taskCon);
    section.appendChild(projectsH2);
    section.appendChild(projCon);
    section.appendChild(projCon);

    return taskCon;
}