const INITIAL_STATE = {
    buses: [],
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