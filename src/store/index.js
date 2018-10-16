const INITIAL_STATE = {
    buses: [],
    parkSize: 5
};

export const Store = (() => {
    
    let state;
    
    const init = (data) => state = Object.assign({}, data);
    const getAllState = () => state;

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