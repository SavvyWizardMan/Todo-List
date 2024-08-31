import "./style.css";
import createTask from "./application";
import createProject from "./application";
import createNote from "./application";

(function() {
    const container = document.querySelector('.container');
    const section = document.querySelector('section');
    const addTaskBtn = document.querySelector('.add');
    const dialog = document.querySelector('dialog');
    const closeBtn = document.querySelector('.close');
    const addTask = document.querySelector('.addTask');
    const title = document.querySelector('input[id="title"]')
    const desc = document.querySelector('input[id="desc"]')
    const date = document.querySelector('input[type="date"]')
    const radio1 = document.querySelector('input[id="high"]');
    const radio2 = document.querySelector('input[id="med"]');
    const radio3 = document.querySelector('input[id="low"]');
    const inputs = [title, desc];
    const radios = [radio1, radio2, radio3];
    let priority = "";

    addTask.addEventListener('click', () => {
        for (let i of inputs) {
            if (i.value === "") return;
        }
        let isChecked = false;
        for (let j of radios) {
            if (j.checked) {
                priority = j;
                isChecked = true;
                break;
            }      
        }

        if (!isChecked) {
            return;
        }

        const i = new createTask(title, desc, date, true);
        i.display(section);

        title.value = "";
        desc.value = "";
        radio1.checked = false;
        radio2.checked = false;
        radio3.checked = false;
        dialog.close();
    });
    
    section.addEventListener('mousemove', (e) => {
        container.classList.remove('toggle');
        const x = e.clientX;
        const y = e.clientY;

        //center of section element
        const inx = section.clientWidth / 2;
        const inh = section.clientHeight / 2;

        //center of window
        const mx = window.innerWidth / 2;
        const my = window.innerHeight / 2;

        //offset
        const ox = ((x - inx) / mx) * 30;
        const oy = ((y - inh) / my) * 15;

        container.style.setProperty("--ry", ox + "deg");
        container.style.setProperty("--rx", -oy + "deg");

    });

    section.addEventListener('mouseout', () => {
        container.classList.add('toggle');
        container.style.setProperty("--ry", "0deg");
        container.style.setProperty("--rx", "0deg");
    });

    addTaskBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });
})();