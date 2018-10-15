const INITIAL_STATE = {
    buses: [
        {posX:0,posY:0,direction:'NORTH',id:'1'},
        {posX:2,posY:1,direction:'WEST',id:'2'},
        {posX:4,posY:4,direction:'EAST',id:'3'},
        {posX:1,posY:1,direction:'SOUTH',id:'4'}
    ],
    selectedBusId: '',
    parkSize: 5,
    notification: '',
    report: ''
};

export const Store = (() => {
    // private variables
    let state;
    // private functions
    const init = (data) => state = Object.assign({}, data);
    const getAllState = () => state;

    //public functions
    return {
        getState: function () {
            return getAllState();
        },
        setState: function (data) {
            return init(data);
        }
    };
})();

Store.setState(INITIAL_STATE);