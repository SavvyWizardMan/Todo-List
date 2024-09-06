export default function(elem) {
    for (let j = 0; j < localStorage.length; j++) {
        console.log('running');
        elem.setAttribute('data-task', j);
    }
}
