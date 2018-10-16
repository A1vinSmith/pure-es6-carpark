import { generateParkContainer, renderBusInPark, removeOldBus } from './reducers/render';
import { isValidCommand } from './reducers/command';
import { placeBus, moveBus, rotateCurrentBus } from './reducers/execute';
import { splitCommand, replaceBlank } from './utils';
import * as CONSTANTS from './constants';

// Entry the project
export function submitListener() {
    const cmdTextAreaEl = document.getElementById("cmdTextArea");
    const cmdArray = replaceBlank(cmdTextAreaEl.value.split('\n'));
    
    const commandBreakException = {err: "Command not allowed"};
    const executeBreakException = {err: "Execute not available"};
    
    try {
        cmdArray.forEach((eachCmd) => {
            // Check command is available
            const commandError = isValidCommand(eachCmd);
            if (commandError) {
                alert(commandError);
                throw commandBreakException;
            } else {
                // Then execute, switch for diff commands
                // TODO: more encapsulate reduce boilerplate
                const cmd = splitCommand(eachCmd);
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
                case CONSTANTS.CMD_TURN_LEFT: {
                    const err = rotateCurrentBus(false);
                    if (err) { alert(err); throw executeBreakException; } 
                    break;
                }
                case CONSTANTS.CMD_TURN_RIGHT: {
                    const err = rotateCurrentBus(true);
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


// add event listener to form
const cmdSubmitEl = document.getElementById("cmdSubmit");
cmdSubmitEl.addEventListener("click", function (event) {
    event.preventDefault(); // prevent reload especially
    submitListener();       // Entry
}, false);

generateParkContainer(document.getElementById('main'));
renderBusInPark();
