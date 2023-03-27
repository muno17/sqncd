//create 4x16 grid for buttons
let buttonContainer = document.getElementById('buttonContainer')
let altColor = [5, 6, 7, 8, 13, 14, 15, 16]

function gridCreator() {
    for (let i = 1; i < 5; i++) {
        let gridRow = document.createElement('div');
        gridRow.setAttribute('id', 'gridRow');
        buttonContainer.appendChild(gridRow);
        for (let j = 1; j < 17; j++) {
            let gridButton = document.createElement('button');
            gridButton.setAttribute('id', 'gridButton');

            if (altColor.includes(j)) {
                gridButton.style.backgroundColor = "#BC81BF";
            }

            gridRow.appendChild(gridButton);
        }
    }
};

// call gridCreator() when the page loads
window.addEventListener('load', () => gridCreator())


// add functionality to dropdown menu
let midiButton = document.getElementById('midiButton')
let midiClick = document.getElementById('midiChannelHouse');
midiButton.addEventListener('click', () => {
    if (midiClick.style.display === 'none') {
        midiClick.style.display = 'block';
    } else {
        console.log('nonein')
    }
})
// COME BACK TO THIS



