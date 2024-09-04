import "./style.css";
import {createTask} from "./application";
import {createProject} from "./application";
import {createNote} from "./application";
import homePage from "./home";
import todayPage from "./today";
import weekPage from "./week";

(function() {
    const container = document.querySelector('.container');
    const section = document.querySelector('section');
    const addTaskBtn = document.querySelector('#add');
    const dialog = document.querySelector('dialog');
    const closeBtn = document.querySelector('.close');
    const addTask = document.querySelector('.addTask');
    const title = document.querySelector('input[id="title"]');
    const desc = document.querySelector('input[id="desc"]');
    const date = document.querySelector('input[type="date"]');
    const radio1 = document.querySelector('input[id="high"]');
    const radio2 = document.querySelector('input[id="medium"]');
    const radio3 = document.querySelector('input[id="low"]');
    const buttons = document.querySelectorAll('li > button');
    const inputs = [title, desc, date];
    const radios = [radio1, radio2, radio3];
    let priority = "";
    const task = document.querySelector('.task');
    const h1 = document.querySelector('h1');
    const homeBtn = document.querySelector('#home');
    const todayBtn = document.querySelector('#today');
    const weekBtn = document.querySelector('#week');
    const img = document.querySelector('.wizard');
    let deg = 45;
    const d = new Date();
    const dtoString = `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? "0"+(d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate() < 10 ? "0"+d.getDate() : d.getDate()}`;

    localStorage.setItem('task0', JSON.stringify({"title": "Wizard", "description": "I am a Wizard that is in your localStorage.", "date": dtoString, "priority": "high"}));
    homePage(section);

    setInterval(() => {
        h1.setAttribute("style", `background-image: linear-gradient(${deg}deg, red, magenta, green, black)`);
        deg++;

        if (deg === 360) {
            deg = 0;
        }
    }, 100);

    for (let j of radios) {
        j.addEventListener('click', () => {
            document.querySelector('fieldset').classList.add('correct')
        });
    }
    var pos1 = 0; 
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;

    /* shoutout to the bros at w3Schools */

    dragElement(container);

    function dragElement(elem) {
        elem.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        container.style.top = (container.offsetTop - pos2) + "px";
        container.style.left = (container.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    /* ------------------------------------------------- */

    const a = document.querySelector('audio');
    img.addEventListener('mouseenter', () => {
        a.play();
        img.style.animation = "ducked 163s cubic-bezier(0, 0, 0.55, 0.95) 1";
        img.style.zIndex = 3;
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll(`li:not(li:last-child)`).forEach(li => {
                li.childNodes.forEach(child => {
                    if (child.id === button.id) {
                        li.style.borderTop = "2px inset black";
                        li.style.borderLeft = "2px inset black";
                        li.style.borderRight = "2px inset black";
                        li.style.background = "#bbb";
                        document.querySelector('li:first-child').style.borderTopLeftRadius = "8px";
                    } else {
                        li.style.border = "none";
                        li.style.background = "none";
                        li.style.borderBottom = "2px solid black";
                    }
                });
            });
        });
    });

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

    addTask.addEventListener('click', () => {
        let localLength = localStorage.length;

        for (let i of inputs) {
            if (i.value === "") return;

            i.addEventListener('click', () => {
                console.log('clicked');
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

        const i = new createTask(title.value, desc.value, date.value, priority);
        homePage(section).appendChild(i.display());
        // somewhere around here I'll make it so
        // you're not teleported to home

        for (let j = localLength; j <= localLength; j++) {
            localStorage.setItem('task'+j, JSON.stringify({"title": title.value, "description": desc.value, "date": date.value, "priority": priority}));
        }

        title.value = "";
        desc.value = "";
        date.value = "";
        radio1.checked = false;
        radio2.checked = false;
        radio3.checked = false;
        document.querySelector('fieldset').classList.remove('correct');
        dialog.close();
    });
    
    /* This breaks the first div box's 3d effect
        fuck you wizard
     */
    // section.addEventListener('mousemove', (e) => {
    //     container.classList.remove('toggle');
    //     const x = e.clientX;
    //     const y = e.clientY;

    //     //center of section element
    //     const inx = section.clientWidth / 2;
    //     const inh = section.clientHeight / 2;

    //     //center of window
    //     const mx = window.innerWidth / 2;
    //     const my = window.innerHeight / 2;

    //     //offset
    //     const ox = ((x - inx) / mx) * 30;
    //     const oy = ((y - inh) / my) * 15;

    //     container.style.setProperty("--ry", ox + "deg");
    //     container.style.setProperty("--rx", -oy + "deg");

    // });

    // section.addEventListener('mouseout', () => {
    //     container.classList.add('toggle');
    //     container.style.setProperty("--ry", "0deg");
    //     container.style.setProperty("--rx", "0deg");
    // });

    addTaskBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    homeBtn.addEventListener('click', () => homePage(section));

    todayBtn.addEventListener('click', () => { 
        const e = todayPage(section);
        e();
    });

    weekBtn.addEventListener('click', () => {
        const e = weekPage(section);
        e();
    });
})();