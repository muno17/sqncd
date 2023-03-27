//create 4x16 grid for buttons
let buttonContainer = document.getElementById('buttonContainer')
let altColor = [5, 6, 7, 8, 13, 14, 15, 16]

function gridCreator() {
    for (let i = 1; i < 5; i++) {
        let gridRow = document.createElement('div');
        gridRow.setAttribute('id', 'gridRow');
        buttonContainer.appendChild(gridRow);
        console.log('mid')
        for (let j = 1; j < 17; j++) {
            let gridButton = document.createElement('button');
            gridButton.setAttribute('id', 'gridButton');

            if (altColor.includes(j)) {
                gridButton.style.backgroundColor = "#BC81BF";
            }

            gridRow.appendChild(gridButton);
        console.log('all the way in')
        }
    }
};

// call gridCreator() when the page loads
window.addEventListener('load', () => gridCreator())
