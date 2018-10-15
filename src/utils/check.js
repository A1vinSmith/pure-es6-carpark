/**
 * Check whether there is another bus stops at the target unit.
 * @param  {Boolean} preCheck       [For return in compose early,
 *                                      get the previous check function result.
 *                                      If false, no need for a further check]
 * @param  {Object} [newPosition]   [The new position will the bus locate,
 *                                     must include attributes: posX(int), posY(int)]
 * @param  {Array}  [existingBuses] [The existing buses' position,
 *                                   the element in the array is object which includes
 *                                   the attributes:: posX(int), posY(int)]
 * @param  {String} id              [Bus id, if exist, need to check whether it is the same bus.
 *                                  For the cases: turning bus's directions.]
 * @return {Boolean}                [Return true if exists, false if no]
 */
export const checkBusExists = (preCheck = true, newPosition = {}, existingBuses = [], id) => {
    if (preCheck === false) return false; // Exit early
    for (let i = 0; i < existingBuses.length; i += 1) {
        const bus = existingBuses[i];
        if (newPosition.posX === bus.posX &&
            newPosition.posY === bus.posY &&
            (!id || id !== bus.id)) {
            return true;
        }
    }
    return false;
};
