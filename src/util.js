/* <dialog>
        <button class="close">X</button>
        <h2>Create Task</h2>
        <form method="dialog">
            <label for="title">Title: </label><input type="text" id="title" required>
            <label for="desc">Description: </label><input type="text" id="desc" required>
            <label for="date">Due Date: </label><input type="date" id="date" required>
            <fieldset>
            <legend>Priority:</legend>
                <label for="high">High</label><input type="radio" id="high" name="priority" value="high" required>
                <label for="medium">Medium</label><input type="radio" id="medium" name="priority" value="medium" required>
                <label for="low">Low</label><input type="radio" id="low" name="priority" value="low" required>
            </fieldset>
            <button type="button" class="addTask">Add Task</button>
        </form>
    </dialog>
*/
//possibly
import {createTask} from "./application";
import homePage from "./home";
import projectPage from "./projects";
import notePage from "./notes";

export function makeDialog(h2Title, hasDueDate, buttonTxt) {
    if (document.querySelector('dialog') !== null) document.body.removeChild(document.querySelector('dialog'));
    const section = document.querySelector('section');
    const dialog = document.createElement('dialog');
    const addBtn = document.querySelector('#add');
    const closeBtn = document.createElement('button');
    const h2 = document.createElement('h2');
    const form = document.createElement('form');
    const titleLabel = document.createElement('label');
    const descLabel = document.createElement('label');
    const dateLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('input');
    const dateInput = document.createElement('input');
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    const highLabel = document.createElement('label');
    const medLabel = document.createElement('label');
    const lowLabel = document.createElement('label');
    const highInput = document.createElement('input');
    const medInput = document.createElement('input');
    const lowInput = document.createElement('input');
    const addTaskBtn = document.createElement('button');

    const inputs = [titleInput, descInput];
    const radios = [highInput, medInput, lowInput];

    const buttonId = buttonTxt.split(" ").join('');

    closeBtn.classList.add('close');
    closeBtn.innerText = "X";
    h2.innerText = h2Title;
    form.method = "dialog";
    titleLabel.setAttribute('for', "title");
    titleLabel.innerText = "Title:";
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.required = true;
    descLabel.setAttribute('for', "desc");
    descLabel.innerText = "Description:";
    descInput.type = "text";
    descInput.id = "desc";
    descInput.required = true;
    dateLabel.setAttribute('for', "date");
    dateLabel.innerText = "Due Date:";
    dateInput.type = "date";
    dateInput.id = "date";
    dateInput.required = true;
    legend.innerText = "Priority:";
    highLabel.setAttribute('for', "high");
    highLabel.innerText = "High";
    highInput.type = "radio";
    highInput.name = "priority";
    highInput.id = "high";
    highInput.value = "high";
    highInput.required = true;
    medLabel.setAttribute('for', "medium");
    medLabel.innerText = "Medium";
    medInput.type = "radio";
    medInput.name = "priority";
    medInput.id = "medium";
    medInput.value = "medium";
    medInput.required = true;
    lowLabel.setAttribute('for', "low");
    lowLabel.innerText = "Low";
    lowInput.type = "radio";
    lowInput.name = "priority";
    lowInput.id = "low";
    lowInput.value = "low";
    lowInput.required = true;
    addTaskBtn.innerText = buttonTxt;
    addTaskBtn.setAttribute('type', 'button');
    addTaskBtn.setAttribute('id', buttonId);

    for (let i of inputs) {
        i.addEventListener('focus', () => {
            i.previousSibling.style.position = "relative";
            i.previousSibling.style.top = "25px";
            i.previousSibling.style.left = "-65px";
        });

        i.addEventListener('focusout', () => {
            i.previousSibling.style.top = "0";
            i.previousSibling.style.left = "0";
        });
    }

    for (let j of radios) {
        j.addEventListener('click', () => {
            document.querySelector('fieldset').classList.add('correct');
        });
    }

    addTaskBtn.addEventListener('click', () => {
        let priority = "";

        for (let i of inputs) {
            if (i.value === "") return;

            i.addEventListener('click', () => {
                i.previousSibling.style.position = "relative";
                i.previousSibling.style.top = "25px";
                i.previousSibling.style.left = "-65px";
            });
        }

        dateInput.addEventListener('click', () => {
            dateLabel.style.position = "relative";
            dateLabel.style.top = "25px";
            dateLabel.style.left = "-65px";
        });

        if (hasDueDate) {
            if (dateInput.value === "") return;
        }

        if (hasDueDate) {
            let isChecked = false;
            for (let j of radios) {
                if (j.checked) {
                    priority = j.value;
                    isChecked = true;
                    break;
                }      
            }

            if (!isChecked) {
                return;
            }
        }

        // somewhere around here I'll make it so
        // you're not teleported to home
    
        let arr = {};
        let arr2 = {};
        let arr2Tasks = {};
        let arr3 = {};

        
        let localLength = "";
        switch (buttonId) {
            case "AddTask":
                if (JSON.parse(localStorage.getItem('tasks')) !== null) {
                    arr = JSON.parse(localStorage.getItem('tasks'));
                }
                // figure out later
                localLength = Object.keys(arr);
                for (let j = localLength.length; j <= localLength.length; j++) {
                    arr['task'+j] = {"title": titleInput.value, "description": descInput.value, "date": dateInput.value, "priority": priority};
                    localStorage.setItem('tasks', JSON.stringify(arr));
                }
                homePage(section);
            break;
            case "AddProject":
                if (JSON.parse(localStorage.getItem('projects')) !== null) {
                    arr2 = JSON.parse(localStorage.getItem('projects'));
                }

                localLength = Object.keys(arr2);
                for (let j = localLength.length; j <= localLength.length; j++) {
                    arr2['project'+j] = {"title": titleInput.value, "description": descInput.value, "tasks": {}};
                    localStorage.setItem('projects', JSON.stringify(arr2));
                }
                homePage(section);
            break;
            // we dont even know what project to assign the tasks obj to
            // because we can change what project were on through tabs
            // must be changed to accomodate this
            case "AddProjectTask":
                if (JSON.parse(localStorage.getItem('projects')) !== null || JSON.parse(localStorage.getItem('projects')) !== undefined) {
                    arr2 = JSON.parse(localStorage.getItem('projects'));                    
                }

                localLength = Object.keys(arr2) - 1;
                for (let j = localLength.length; j <= localLength.length; j++) {
                    arr2Tasks = arr2['project'+j]['tasks'];
                    for (let k = Object.keys(arr2Tasks).length; k <= Object.keys(arr2Tasks).length; k++) {
                        arr2Tasks['task'+k] = {"title": titleInput.value, "description": descInput.value, "date": dateInput.value, "priority": priority};
                    }
                    arr2['project'+j]['tasks'] = arr2Tasks;
                    
                    localStorage.setItem('projects', JSON.stringify(arr2));
                }
                projectPage(section);
            break;
            case "AddNote":
                if (JSON.parse(localStorage.getItem('notes')) !== null) {
                    arr3 = JSON.parse(localStorage.getItem('notes'));
                }
                localLength = Object.keys(arr3);
                for (let j = localLength.length; j <= localLength.length; j++) {
                    arr3['note'+j] = {"title": titleInput.value, "description": descInput.value};
                    localStorage.setItem('notes', JSON.stringify(arr3));
                }
                notePage(section);
            break;
        }

        titleInput.value = "";
        descInput.value = "";
        dateInput.value = "";
        highInput.checked = false;
        medInput.checked = false;
        lowInput.checked = false;
        if (hasDueDate) document.querySelector('fieldset').classList.remove('correct');
        dialog.close();
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    fieldset.appendChild(legend);
    fieldset.appendChild(highLabel);
    fieldset.appendChild(highInput);
    fieldset.appendChild(medLabel);
    fieldset.appendChild(medInput);
    fieldset.appendChild(lowLabel);
    fieldset.appendChild(lowInput);

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);

    if (hasDueDate) {
        form.appendChild(dateLabel);
        form.appendChild(dateInput);
        form.appendChild(fieldset);
    }

    form.appendChild(addTaskBtn);

    dialog.appendChild(closeBtn);
    dialog.appendChild(h2);
    dialog.appendChild(form);

    document.body.insertBefore(dialog, document.querySelector('img'));
}

export function deleteThing(localName, wrapper) {
    const local = Object.keys(JSON.parse(localStorage.getItem(localName+'s'))).length;
    const arr = JSON.parse(localStorage.getItem(localName+'s'));
    let index = 0;
        for (let i = 0; i < local; i++) {
            index = i;
            if (i === Number(wrapper.getAttribute(`data-${localName}`))) {
                delete arr[localName+i];
                document.querySelector(`.${localName}-box`).removeChild(wrapper);
                break;
            }
        }
        if (local === 0) return;

        for (let j = index; j < local; j++) {
            let ahead = j + 1;
            const o = arr[localName+ahead];
            if (o === null || o === undefined) break;
            arr[localName+j] = {"title": o.title, "description": o.description, "date": o.date, "priority": o.priority};
        }

        for (let h = local - 1; h < local; h++) {
            delete arr[localName+h];
        }
        localStorage.setItem(localName+"s", JSON.stringify(arr));
        homePage(document.querySelector('section'));
}

export function editThing(obj, theTitle, theDesc, theDate="", thePriority="", localName, editButton, wrapper) {

    //absolutely needs to be refactored
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
    const lastBtn = document.querySelector('form > button');
    const l = lastBtn.cloneNode();
    const button = document.querySelector('dialog > button');
    const b = button.cloneNode(true);

    h2.innerText = theTitle;
    t.value = theTitle;
    d.value = theDesc;
    l.innerText = "Modify";
    tl.innerText = "Title:";
    dl.innerText = "Description:";

    b.addEventListener('click', () => {
        diag.close();
    });

    f.appendChild(tl);
    f.appendChild(t);
    f.appendChild(dl);
    f.appendChild(d);
    diag.appendChild(b);
    diag.appendChild(h2);
    diag.appendChild(f);
    if (theDate !== "" && thePriority !== "") {
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

        da.value = theDate;
        dal.innerText = "Due Date:";
        hl.innerText = "High";
        ml.innerText = "Medium";
        ll.innerText = "Low";

        for (let rad of priorityIn) {
            if (thePriority === rad.value) {
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
                    const priorityP = document.querySelector('.inner > p:nth-child(6)');
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

            const arr = JSON.parse(localStorage.getItem(localName+"s"));
            const len = Object.keys(JSON.parse(localStorage.getItem(localName+"s")));
            for (let i = 0; i < len.length; i++) {
                if (i === Number(wrapper.getAttribute(`data-${localName}`))) {
                    arr[localName+i] = {"title": t.value, "description": d.value, "date": da.value, "priority": thePriority};
                }
            }
        localStorage.setItem(localName+"s", JSON.stringify(arr));

        // dis right here
        obj.display();
        diag.close();

            
        });
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
        document.body.appendChild(diag);
        diag.showModal();
        return;
    }
    
    const inputs = [t, d];

    l.addEventListener('click', () => {
        editButton.parentNode.querySelector('h3').innerText = t.value;
        editButton.parentNode.querySelector('p').innerText = d.value;

        for (let i of inputs) {
            if (i.value === "") return;
        }

        const arr = JSON.parse(localStorage.getItem(localName+"s"));
        const len = Object.keys(JSON.parse(localStorage.getItem(localName+"s")));
        for (let i = 0; i < len.length; i++) {
            if (i === Number(wrapper.getAttribute(`data-${localName}`))) {
                arr[localName+i] = {"title": t.value, "description": d.value};
            }
        }
        localStorage.setItem(localName+"s", JSON.stringify(arr));

        // dis right here
        obj.display();
        diag.close();
    });
    f.appendChild(l);
    document.body.appendChild(diag);
    diag.showModal();
};