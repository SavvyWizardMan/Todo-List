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
import notePage from "./notes";

export function makeDialog(h2Title, hasDueDate, buttonTxt) {
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
        console.log("cliicked");
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

        if (JSON.parse(localStorage.getItem('tasks')) !== null) {
            arr = JSON.parse(localStorage.getItem('tasks'));
        }
        switch (buttonId) {
            case "AddTask":
                // figure out later
                let localLength = Object.keys(arr);
                console.log(localLength);
                for (let j = localLength.length; j <= localLength.length; j++) {
                    console.log('rain');
                    arr['task'+j] = {"title": titleInput.value, "description": descInput.value, "date": dateInput.value, "priority": priority};
                    localStorage.setItem('tasks', JSON.stringify(arr));
                }
                homePage(section);

            break;
            // case "AddNote":
            //     for (let j = localLength; j <= localLength; j++) {
            //         localStorage.setItem('note'+j, JSON.stringify({"title": titleInput.value, "description": descInput.value}));
            //     }
            //     notePage(section);

            // break;
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
        console.log(dialog);
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