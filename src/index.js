import './index.css';

/* Creating a grid as container */
const generateParkContainer = (el) => {
    let container = document.createElement("div");
    container.id = "park-container";
    container.className = "grid";
    let i, k;
    for (i = 0; i < 5; i += 1) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row" + i;

        for (k = 0; k < 5; k += 1) {
            var box = document.createElement("div");
            box.className = "box";
            box.id = "box" + k;
            //box.innerHTML = k + ' ' + (5 - 1 - i);
            box.innerHTML = row.id + ' ' + box.id;
            // TODO: separate render and state
            row.appendChild(box);
        }

        container.appendChild(row);
    }

    el.appendChild(container);
};

generateParkContainer(document.getElementById('main'));
