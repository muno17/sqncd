WebMidi.enable();
console.log(WebMidi.inputs)
console.log(WebMidi.outputs)

let output = WebMidi.outputs[0];
let channel = output.channels[1];
//channel.playNote('C3', {duration: 1000})



// add functionality to midi dropdown menu
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









//create 4x16 grid for buttons
let buttonContainer = document.getElementById('buttonContainer')
let altColor = [5, 6, 7, 8, 13, 14, 15, 16]

function sqncr() {
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
                gridButton.style.backgroundColor = '#BC81BF';
            }

            let onOff = false;
            // add eventListeners to each button
            gridButton.addEventListener('click', () => {
                if (onOff === false) {
                    onOff = true;
                    gridButton.style.background = '#ECC987';
                } else if (onOff === true) {
                    onOff = false;
                    if (altColor.includes(j)) {
                        gridButton.style.backgroundColor = '#BC81BF';
                    } else {
                        gridButton.style.background = '#DBDBDB';
                    }
                }
            });


            gridRow.appendChild(gridButton);
        }
    }
};

// call gridCreator() when the page loads
window.addEventListener('load', () => sqncr())


 

