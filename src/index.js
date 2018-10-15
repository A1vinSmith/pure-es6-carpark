import {
    submitListener,
    generateParkContainer,
    renderBusInPark
} from './reducers/render';

// add event listener to form
const cmdSubmitEl = document.getElementById("cmdSubmit");
cmdSubmitEl.addEventListener("click", function (event) {
    event.preventDefault(); // prevent reload especially
    submitListener();
}, false);

generateParkContainer(document.getElementById('main'));
renderBusInPark();
