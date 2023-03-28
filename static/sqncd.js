//create 4x16 grid for buttons
let buttonContainer = document.getElementById('buttonContainer')
let altColor = [5, 6, 7, 8, 13, 14, 15, 16]

function gridCreator() {
    for (let i = 1; i < 5; i++) {
        let gridRow = document.createElement('div');
        gridRow.setAttribute('class', 'gridRow');
        buttonContainer.appendChild(gridRow);
        for (let j = 1; j < 17; j++) {
            let gridButton = document.createElement('button');
            gridButton.setAttribute('class', 'gridButton');
            gridButton.setAttribute('id', `button${i}${j}`);
            // buttons ids are 1-4 plus 1-16
            //let x = `button${i}${j}`
            //console.log(x)
            if (altColor.includes(j)) {
                gridButton.style.backgroundColor = "#BC81BF";
            }
            let onOff = false;
            // add eventListeners to each button
            gridButton.addEventListener('click', () => {
                if (onOff === false) {
                    onOff = true;
                    gridButton.style.background = 'black';
                } else if (onOff === true) {
                    gridButton.style.background = 'white';
                    onOff = false;
                }
            });


            
            gridRow.appendChild(gridButton);
        }
    }
};

// call gridCreator() when the page loads
window.addEventListener('load', () => gridCreator())


// add functionality to dropdown menu
let midiButton = document.getElementById('midiButton');
let midiClick = document.getElementById('midiChannelHouse');
midiButton.addEventListener('click', () => {
    if (midiClick.style.display === 'none') {
        midiClick.style.display = 'block';
    } else {
        midiClick.style.display = 'none';
    }
})
// COME BACK TO THIS

 

