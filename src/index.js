import "./style.css";
import homePage from "./home";
import todayPage from "./today";
import weekPage from "./week";
import notesPage from "./notes";
import {makeDialog} from "./util";
import projectPage from "./projects";

(function() {
    const container = document.querySelector('.container');
    const section = document.querySelector('section');
    const h1 = document.querySelector('h1');
    const addProj = document.querySelector('#addProj');
    const addBtn = document.querySelector('#add');
    const homeBtn = document.querySelector('#home');
    const todayBtn = document.querySelector('#today');
    const weekBtn = document.querySelector('#week');
    const notesBtn = document.querySelector('#notes');
    const img = document.querySelector('.wizard');
    const infoOpen = document.querySelector('.infoOpen');
    const infoDial = document.querySelector('.infoDial');
    const closeBtn = document.querySelector('.infoDial .close');
    let deg = 45;
    const d = new Date();
    const dtoString = `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? "0"+(d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate() < 10 ? "0"+d.getDate() : d.getDate()}`;

    makeDialog('Create Task', true, 'Add Task');
    addBtn.addEventListener('click', () => {
        document.querySelector('dialog').showModal();
    });

    addProj.addEventListener('click', () => {
        makeDialog('Create Project', false, 'Add Project');
        document.querySelector('dialog').showModal();
    });

    infoOpen.addEventListener('click', () => {
        infoDial.showModal();
        infoDial.scrollTo(0, 0);
    });

    closeBtn.addEventListener('click', () => {
        infoDial.close();
    });
    /* 
        evil wizard 
        on a real note, this would overwrite the first todo task someone made
        on refresh since it sets task0 to my devious wizard and doesn't "push" the
        other todos up by a step
    */
    // localStorage.setItem('task0', JSON.stringify({"title": "Wizard", "description": "I am a Wizard that is in your localStorage.", "date": dtoString, "priority": "high"}));
    homePage(section);

    setInterval(() => {
        h1.setAttribute("style", `background-image: linear-gradient(${deg}deg, red, magenta, green, black)`);
        deg++;

        if (deg === 360) {
            deg = 0;
        }
    }, 100);

    var pos1 = 0; 
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;

    /* shoutout to the bros at w3Schools */

    document.querySelector('.func').addEventListener('mousedown', dragMouseDown);

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

        img.addEventListener('animationend', () => {
            img.style.animation = "";
        });
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

    homeBtn.addEventListener('click', () => { 
        makeDialog('Create Task', true, 'Add Task');
        homePage(section);
    });

    todayBtn.addEventListener('click', () => { 
        const e = todayPage(section);
        e();
    });

    weekBtn.addEventListener('click', () => {
        const e = weekPage(section);
        e();
    });

    notesBtn.addEventListener('click', () => {
        makeDialog('Create Note', false, 'Add Note');
        notesPage(section);
    });
})();