//create 4x16 grid for buttons
let buttonContainer = document.getElementById('buttonContainer')

function gridCreator() {
    for (let i = 0; i < 4; i++) {
        let gridRow = document.createElement('div');
        gridRow.setAttribute('id', 'gridRow');
        buttonContainer.appendChild(gridRow);
        console.log('mid')
        for (let j = 0; j < 16; j++) {
            let gridButton = document.createElement('button');
            gridButton.setAttribute('id', 'gridButton');
            gridRow.appendChild(gridButton);
        console.log('all the way in')
        }
    }
};

// call gridCreator() when the page loads
window.addEventListener('load', () => gridCreator())
