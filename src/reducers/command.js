import { Store } from '../store';
import { splitCommand, isValidDirection } from '../utils';
import { VALID_COMMANDS, CMD_PLACE } from '../constants';

const isBusInitialized = () => Store.getState().buses.length > 0;

export const isValidCommand = (uncheckedCmd) => {
    // Get result from splitCommand
    const cmd = splitCommand(uncheckedCmd);
    const params = cmd.params;
    const command = cmd.command;
    // Get State
    const parkSize = Store.getState().parkSize;
    let err = "";

    if (!isBusInitialized() && command !== "PLACE") return err = "Place a bus first";
    if (VALID_COMMANDS.indexOf(command) < 0) 
        return err = "Not valid command";
    else {
        if (command === CMD_PLACE) {
            if (params === null || params.length !== 3)
                return err = "Not a valid command, need 3 params";
            else if (!isValidDirection(params[2]))
                return err = "Not a valid direction";
            else if ( isNaN(Number(params[0])) || isNaN(Number(params[1])) )
                return err = "Not valid coordinates";
            else if ((Number(params[0]) > parkSize) || (Number(params[1]) > parkSize)
                || Number(params[0]) < 0 || Number(params[1]) < 0)
                return err = "Out range coordinates";
            else return err; // It's a place cmd
        }
        else {
            return err;     // It's others cmd
        }
    }
};
