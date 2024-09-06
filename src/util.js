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
export function makeDialog(h2Title, hasDueDate, buttonTxt) {
    const dialog = document.createElement('dialog');
    const addTaskBtn = document.querySelector('#add');
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
    const addBtn = document.createElement('button');

    const inputs = [titleInput, descInput, dateInput];
    const radios = [highInput, medInput, lowInput];

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
    dateInput.type = "text";
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
    addBtn.classList.add('addTask');
    addBtn.innerText = buttonTxt;

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

    addBtn.addEventListener('click', () => {
        let priority = "";
        let localLength = localStorage.length;

        for (let i of inputs) {
            if (i.value === "") return;

            i.addEventListener('click', () => {
                i.previousSibling.style.position = "relative";
                i.previousSibling.style.top = "25px";
                i.previousSibling.style.left = "-65px";
            });
        }
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

        // somewhere around here I'll make it so
        // you're not teleported to home

        for (let j = localLength; j <= localLength; j++) {
            localStorage.setItem('task'+j, JSON.stringify({"title": titleInput.value, "description": descInput.value, "date": dateInput.value, "priority": priority}));
        }

        const i = new createTask(titleInput.value, descInput.value, dateInput.value, priority);
        const obj = i.display();
        homePage(section);
        
        titleInput.value = "";
        descInput.value = "";
        dateInput.value = "";
        highInput.checked = false;
        medInput.checked = false;
        lowInput.checked = false;
        document.querySelector('fieldset').classList.remove('correct');
        dialog.close();
    });

    addTaskBtn.addEventListener('click', () => {
        document.body.insertBefore(dialog, document.querySelector('img'));
        dialog.showModal();
        console.log('clicked');
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

    form.appendChild(addBtn);

    dialog.appendChild(closeBtn);
    dialog.appendChild(h2);
    dialog.appendChild(form);
}