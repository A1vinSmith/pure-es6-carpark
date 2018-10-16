import { Store } from '../store';
import { isValidCommand } from './command';
import { placeBus, moveBus } from './execute';
import { splitCommand, replaceBlank } from '../utils';
import * as CONSTANTS from '../constants';
import '../index.css';

/* Creating a grid as container */
export const generateParkContainer = (el) => {
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

export const renderBusInPark = () => {
    const buses = Store.getState().buses;
    buses.map((bus) => {
        const box = document.getElementById("Coordinate" + bus.posX + "," + bus.posY);
        let img = document.createElement("i");
        img.className = `fa fa-bus inner rotate-${(bus.direction).toLowerCase()}`;
        box.appendChild(img);
    });
};

const removeOldBus = () => {
    // If elements get too much, could maintain a previousState in Store to solve
    const boxes = document.getElementsByClassName("box");
    for(let i = 0; i < boxes.length; i++) {
        while (boxes[i].firstChild) {
            boxes[i].removeChild(boxes[i].firstChild);
        }
    }
};

export function submitListener() {
    const cmdTextAreaEl = document.getElementById("cmdTextArea");
    const cmdArray = replaceBlank(cmdTextAreaEl.value.split('\n'));
    
    const commandBreakException = {err: "Command not allowed"};
    const executeBreakException = {err: "Execute not available"};
    
    try {
        cmdArray.forEach((cmd) => {
            // Check command is available
            const commandError = isValidCommand(cmd);
            if (commandError) {
                alert(commandError);
                throw commandBreakException;
            } else {
                // Then execute
                cmd = splitCommand(cmd);
                switch(cmd.command) {
                case CONSTANTS.CMD_PLACE: {
                    const position = {
                        posX: Number(cmd.params[0]), 
                        posY: Number(cmd.params[1]), 
                        direction: cmd.params[2].toUpperCase()
                    };
                    const err = placeBus(position);
                    if (err) { alert(err); throw executeBreakException; } 
                    break;
                }
                case CONSTANTS.CMD_MOVE_FARWARD: {
                    const err = moveBus();
                    if (err) { alert(err); throw executeBreakException; } 
                    break;
                }
                default:
                    break;
                }
                // Rerender after state set
                removeOldBus();
                renderBusInPark();
            }
        });
    } catch (e) {
        if (e !== commandBreakException && e !== executeBreakException) throw e;
    }
}
