let tempo = document.getElementById('tempo');
//tempo.addEventListener()




// add functionality to midi dropdown menus



//implement a tempo function to go through one measure
// implement stop/play
// assing a random note when a button in the measure is pressed and play through measure
// loop through measure
// reset notes

// choose device
// choose midi channel
// choose octaves
// choose key/scale
// allow user to assign notes



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
            let buttonNote = 130
            // add eventListeners to each button
            gridButton.addEventListener('click', () => {
                if (onOff === false) {
                    onOff = true;
                    gridButton.style.background = '#ECC987';

                    // randomly assign a 
                    if (buttonNote === 130) {
                        buttonNote = getRandomNote(36, 60)
                    }
                    sendMidi(buttonNote)
                } else if (onOff === true) {
                    onOff = false;
                    if (altColor.includes(j)) {
                        gridButton.style.backgroundColor = '#BC81BF';
                    } else {
                        gridButton.style.background = '#DBDBDB';
                    }

                    // reset the note
                    buttonNote = 130
                }
            });


            gridRow.appendChild(gridButton);
        }
    }
};

function getRandomNote(x, y) {
    let min = x;
    let max = y;
    return Math.floor(Math.random() * (max - min + 1) + min);

}

//setInterval(() => console.log(Tone.now()), 100);




// call sqncr() when the page loads
window.addEventListener('load', () => sqncr())


// check if browser supports WebMIDI
if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI');
} else {
    console.log('WebMIDI is not supported in this browser');
}


WebMidi.enable().then(sendMidi).catch(err => console.log(''));

let devices = []

// Function triggered when WEBMIDI.js is ready
function sendMidi(n) {
// Display available MIDI input devices
    let note = n
    if (WebMidi.outputs.length < 1) {
    console.log("No device detected.");
    // pass this into dropdown as only option, disable midi channels
    } else {
    WebMidi.outputs.forEach((device, index) => {
        //console.log(`${index}: ${device.name}`);
        // add to devices array to be able to reference in dropdowns
        devices.push(`${index}: ${device.name}`);

        // pass in device and midi channel to send to
        let outputDevice = WebMidi.getOutputByName(device['name']);
        let channel = outputDevice.channels[1];
        
        //console.log(device['name'])
        channel.playNote(n, {duration: 300})

        // add eventListener for notes function


    });
    }

};