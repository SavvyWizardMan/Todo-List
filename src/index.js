import "./style.css";
import "./domscript";

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

    addTask.addEventListener('click', () => {
        for (let i of inputs) {
            if (i.value === "") return;
        }
        let isChecked = false;
        for (let j of radios) {
            if (j.checked) {
                isChecked = true;
                break;
            }      
        }

        if (!isChecked) {
            return;
        }

        title.value = "";
        desc.value = "";
        radio1.checked = false;
        radio2.checked = false;
        radio3.checked = false;
        dialog.close();
    });
    
    section.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const mx = window.innerWidth / 2;
        const my = window.innerHeight / 2;

        const ox = ((x - mx) / mx) * 45;
        const oy = ((y - my) / my) * 45;

        container.style.setProperty("--ry", ox + "deg");
        container.style.setProperty("--rx", -oy + "deg");

    });

    section.addEventListener('mouseout', () => {
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