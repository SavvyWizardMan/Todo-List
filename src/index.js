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
    const task = document.querySelector('.task');
    const h1 = document.querySelector('h1');
    let deg = 45;
    let priority = "";

    setInterval(() => {
        h1.setAttribute("style", `background-image: linear-gradient(${deg}deg, red, magenta, green, black)`);
        deg++;

        if (deg === 360) {
            deg = 0;
        }
    }, 50);

    addTask.addEventListener('click', () => {
        let localLength = localStorage.length;

        for (let i of inputs) {
            if (i.value === "") return;
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

        const i = new createTask(title.value, desc.value, date.value, priority);
        i.display(section);

        for (let j = localLength; j <= localLength; j++) {
            console.log(j);
            localStorage.setItem('task'+j, JSON.stringify({"title": title.value, "description": desc.value, "date": date.value, "priority": priority}));
        }

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
        console.log('yea');
        dialog.showModal();
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    localStorage.setItem("task0", JSON.stringify({"title": 'Wizard', "description": 'I am Wizard. I\'m in your localStorage.', "date": "2024-08-31", "priority": "high"}));

    for (let i = 0; i < localStorage.length; i++) {
        const e = JSON.parse(localStorage.getItem('task' + i));
        const o = new createTask(e.title, e.description, e.date, e.priority);
        const innerDiv = o.display(section);
        if (innerDiv === null ||  innerDiv === undefined) continue;
        innerDiv.addEventListener("hover", () => {
            task.style.transform = "rotateY(20deg) rotateX(20deg)";
        });
    }
})();