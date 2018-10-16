import { Store } from '../store';
import { checkInsidePark, checkBusExists } from '../utils';
import { removeOldBus, renderBusInPark } from './render';
import * as MESSAGES from '../constants/messages';

/**
 * [placeBus place a new one in the carpack]
 * @param  {Object} position [The new position will the bus locate,
 *                          must include attributes: posX(int), posY(int), direction(string)]
 * @return {err}            [Messages for execute result]
 */
export const placeBus = (position) => {
    let err = "";
    const { buses, parkSize } = Store.getState();
    if (!checkInsidePark(position, parkSize)) {
        return err = MESSAGES.NOTIFICATION_OUTSIDE_PARK;
    } else if (checkBusExists(position, buses)) {
        return err = MESSAGES.NOTIFICATION_UNIT_TAKEN;
    } else {
        removeOldBus();

        // Set current bus state
        const buses = Store.getState().buses;
        buses.push(position);
    
        renderBusInPark();
        return err;
    }
        /* move an exsiting bus or 
    } else if (id) {
        bus = Store.getState().buses[-1]
      dispatch(moveExistingBus(position, id));
      dispatch(setNotification(''));
    } else if (Utils.isValidDirection(position.direction)) {
      dispatch(createNewBus(position));
      dispatch(selectBus());
      dispatch(setNotification(''));
    }
    */
};