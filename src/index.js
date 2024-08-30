import "./style.css";

(function() {
    const container = document.querySelector('.container');
    const section = document.querySelector('section');

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
})();