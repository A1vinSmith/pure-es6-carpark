import { Store } from './store';
import './index.css';

/* Creating a grid as container */
const generateParkContainer = (el) => {
    let container = document.createElement("div");
    container.id = "park-container";
    container.className = "grid";
    const parkSize = Store.getState().parkSize;
    
    for (let i = 0; i < parkSize; i += 1) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row" + i;

        for (let k = 0; k < parkSize; k += 1) {
            let box = document.createElement("div");
            box.className = "box";
            box.id = "Coordinate" + k + ',' + (parkSize - i - 1); // Make id match the coordinate
            // Add to row
            row.appendChild(box);
        }
        // Add to the park container
        container.appendChild(row);
    }
    // Add to the parent node 'main'. Could be document.body as well.
    el.appendChild(container);
};

// TODO: move to utils
const placeBus = () => {
    const buses = Store.getState().buses;
    buses[0] = {
        posX: 3,
        posY: 2,
        direction: 'NORTH',
        id: '1'
    };
}; // TODO: END

export const renderBusInPark = () => {
    const buses = Store.getState().buses;
    buses.map((bus) => {
        const box = document.getElementById("Coordinate" + bus.posX + "," + bus.posY);
        let img = document.createElement("i");
        img.className = `fa fa-bus inner rotate-${(bus.direction).toLowerCase()}`;
        box.appendChild(img);
    });
};

generateParkContainer(document.getElementById('main'));
placeBus();
renderBusInPark();
