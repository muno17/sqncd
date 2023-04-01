
// main sequencer functions - assign notes to buttons and transport

// define the default bpm of the transport
Tone.Transport.bpm.value = 120;

// bpm updates to the value entered into the tempo field
let tempo = document.getElementById('tempo');
tempo.addEventListener('input', (e) => {
    // bpm min 1, max 300
    if (e.target.value > 300) {
        Tone.Transport.bpm.value = 300;
    } else if (e.target.value < 1) {
        Tone.Transport.bpm.value = 1;
    } else {
        Tone.Transport.bpm.value = e.target.value;
    }
    console.log(Tone.Transport.bpm.value)
})

// variable to store how many measure will play
let length = '1m'

Tone.Transport.timeSignature = 4;
Tone.Transport.setLoopPoints(0, length);
Tone.Transport.loop = true;


let buttonNotes = document.getElementsByClassName(length)
let rowOne = buttonNotes[0]
// return htmlcollection of all elements in the row corresponding to length
console.log(buttonNotes) 


// transport starts when the play button is pressed
let play = document.getElementById('play')
play.addEventListener('click', () => {
    Tone.Transport.start();

    console.log('transport start')
    console.log(rowOne[0])
})

// transport stops when the stop button is pressed
let stop = document.getElementById('stop')
stop.addEventListener('click', () => {
    Tone.Transport.stop();
    console.log('transport stop')
})




// passing a random note when a button in the measure is pressed and play through measure
// loop through measure
// implement a tempo function to go through one measure

//create 4x16 grid for buttons
let buttonContainer = document.getElementById('buttonContainer')
let altColor = [5, 6, 7, 8, 13, 14, 15, 16]

// function sqncr() {
//     for (let i = 1; i < 5; i++) {
//         let gridRow = document.createElement('div');
//         // set class name to #m - make it possible to reference measures
//         gridRow.setAttribute('class', `${i}m`);
//         buttonContainer.appendChild(gridRow);

//         for (let j = 1; j < 17; j++) {
//             let gridButton = document.createElement('button');
//             gridButton.setAttribute('class', 'gridButton');
//             gridButton.setAttribute('id', `button${i}${j}`);
//             // buttons ids are 1-4 plus 1-16
//             //let x = `button${i}${j}`
//             //console.log(x)
//             if (altColor.includes(j)) {
//                 gridButton.style.backgroundColor = '#BC81BF';
//             }

//             let onOff = false;
//             let buttonNote = 130
//             gridButton.nodeValue = buttonNote;
//             // add eventListeners to each button
//             gridButton.addEventListener('click', () => {
//                 if (onOff === false) {
//                     onOff = true;
//                     gridButton.style.background = '#ECC987';

//                     // randomly assign a note if none assigned
//                     if (buttonNote === 130) {
//                         buttonNote = getRandomNote(36, 60)
//                         gridButton.innerHTML = buttonNote;
//                         console.log(gridButton.innerHTML)
//                     }
//                     sendMidi(buttonNote)
//                 } else if (onOff === true) {
//                     onOff = false;
//                     if (altColor.includes(j)) {
//                         gridButton.style.backgroundColor = '#BC81BF';
//                     } else {
//                         gridButton.style.background = '#5F9F89';
//                     }

//                     // reset the note
//                     buttonNote = 130
//                     gridButton.nodeValue = buttonNote;
//                 }
//             });


//             gridRow.appendChild(gridButton);
//         }
//     }
// };



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