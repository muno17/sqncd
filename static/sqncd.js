

WebMidi
.enable()
.then(onEnabled)
.catch(err => console.log(''));

let devices = []

// Function triggered when WEBMIDI.js is ready
function onEnabled(n) {
// Display available MIDI input devices
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

}




// add functionality to midi dropdown menus
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
                    onEnabled(60)
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


 

