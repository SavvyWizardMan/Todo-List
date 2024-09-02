import "./style.css";
import createTask from "./application";
import createProject from "./application";
import createNote from "./application";
import homePage from "./home";
import todayPage from "./today";

(function() {
    const container = document.querySelector('.container');
    const section = document.querySelector('section');
    const addTaskBtn = document.querySelector('.add');
    const dialog = document.querySelector('dialog');
    const closeBtn = document.querySelector('.close');
    const addTask = document.querySelector('.addTask');
    
    const task = document.querySelector('.task');
    const h1 = document.querySelector('h1');
    const homeBtn = document.querySelector('#home');
    const todayBtn = document.querySelector('#today');
    const taskBox = document.querySelector('.task-box');
    let deg = 45;
    const d = new Date();
    const dtoString = d.toISOString().split('T')[0].replace(/\d\d$/g, d.getDate());
    localStorage.setItem("task0", JSON.stringify({"title": 'Wizard', "description": 'I am Wizard. I\'m in your localStorage.', "date": dtoString, "priority": "high"}));

    homePage(section);

    setInterval(() => {
        h1.setAttribute("style", `background-image: linear-gradient(${deg}deg, red, magenta, green, black)`);
        deg++;

        if (deg === 360) {
            deg = 0;
        }
    }, 100);
    
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

    todayBtn.addEventListener('click', () => todayPage(section));
})();