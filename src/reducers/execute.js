import { Store } from '../store';
import {
    checkInsidePark,
    checkBusExists,
    moveForwardBus,
    rotateBus
} from '../utils';
import * as MESSAGES from '../constants/messages';

/**
 * [placeBus place a new one in the carpack]
 * @param  {Object} position [The new position will the bus locate,
 *                          must include attributes: posX(int), posY(int), direction(string)]
 * @return {err}            [Messages for execute result]
 */
export const placeBus = (position) => {
    let err = "";
    const {
        buses,
        parkSize
    } = Store.getState();
    if (!checkInsidePark(position, parkSize)) {
        return err = MESSAGES.NOTIFICATION_OUTSIDE_PARK;
    } else if (checkBusExists(position, buses)) {
        return err = MESSAGES.NOTIFICATION_UNIT_TAKEN;
    } else {
        // Set current bus state
        const buses = Store.getState().buses;
        buses.push(position);
        
        return err;
    }
};

const currentBusPos = (buses) => buses[buses.length - 1];

/**
 * [moveBus move a exist one in the carpack]
 * @return {err}            [Messages for execute result]
 */
export const moveBus = () => {
    let err = "";
    const {
        buses,
        parkSize
    } = Store.getState();
    if (buses.length === 0) {
        return err = MESSAGES.ERROR_NO_BUS_TO_MOVE;
    }
    const position = moveForwardBus(currentBusPos(buses));
    if (!checkInsidePark(position, parkSize)) {
        return err = MESSAGES.NOTIFICATION_OUTSIDE_PARK;
    } else if (checkBusExists(position, buses)) {
        return err = MESSAGES.NOTIFICATION_UNIT_TAKEN;
    } else {
        // Set current bus state
        buses.pop();
        buses.push(position);

        return err;
    }
};

/**
 * [rotateBus move a exist one to other direction]
 * @return {err}            [Messages for execute result]
 */
export const rotateCurrentBus = (isClockwise) => {
    let err = "";
    const { buses } = Store.getState();
    if (buses.length === 0) {
        return err = MESSAGES.ERROR_NO_BUS_TO_MOVE;
    } else {
        const position = currentBusPos(buses);
        position.direction = rotateBus(position.direction, isClockwise);
        
        // Set current bus state
        buses.pop();
        buses.push(position);

        return err;
    }
};
