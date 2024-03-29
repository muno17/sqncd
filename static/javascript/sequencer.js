import { scaleGenerator, midiNotes, octaves, octavizer } from '/static/javascript/notegen.js'
import { deviceDropdown, sendMidi, sendStartSignal, sendStopSignal, sendClockSignal, clockButton, clockDevices} from '/static/javascript/midi_io.js'
import { accent, ghost, accentizer, ghoster, lengthButton, lastStep, copy, copyMaker } from '/static/javascript/noteFunctions.js'
import { userNoteGenerator, resetUserOctaves } from '/static/javascript/userPattern.js'

// initiate default note values, if nothing is selected = C major
let scaleValue = 'user';
let key = 'C'
// variable to store how many measure will play, default is 1 measure
let length = 16;

// assign scale, show/hide elements if 'User' is selected
export let selectedScale = document.getElementById('scaleDropdown');
selectedScale.addEventListener('change', () => {
    scaleValue = selectedScale.value;
    if (scaleValue === 'user') {
        noteSection('none');
        pitchSection('inline');
        sqnc.style.marginTop = '0px';

        // make lowest octave the new octave
        resetUserOctaves(octaves);
    } else {
        noteSection('inline');
        pitchSection('none');
    }
})

// show or hide items based on what value is entered
function noteSection(displayValue) {
    let keyHeader = document.getElementById('keyHeader')
    keyHeader.style.display = displayValue;
    selectedKey.style.display = displayValue;
    sqnc.style.display = displayValue;
}

function pitchSection(displayValue) {
    let pitchButtons = document.getElementsByClassName('pitchButton');
    for (let i = 0; i < pitchButtons.length; i++) {
        pitchButtons[i].style.display = displayValue;
    }
}


let selectedKey = document.getElementById('keyDropdown');
selectedKey.addEventListener('change', () => {
    key = selectedKey.value;
})

// store the array of buttons so that they can be referenced individually
let gridButton = document.getElementsByClassName('gridButton')

// assign event listener to each button that will turn on/off and assign a random note
for (let i = 0; i < 64; i++) {
    gridButton[i].addEventListener('click', () => {
        // events if the button is turned on
        if (gridButton[i].classList.contains('off')) {
            // if length is on, only change the last step
            if (!lengthButton.classList.contains('off')) {
                lastStep(gridButton[i]);
                length = i + 1;
            } else if (!copy.classList.contains('off')) {
                // if a copier exists, assign values to gridButton
                let copier = document.getElementsByClassName('copier');
                if (copier[0]) {
                    copyMaker(gridButton[i], i);
                } else {
                    // assign button as copier 
                    gridButton[i].classList.add('copier');
                }
            } else {
                gridButton[i].classList.remove('off');
                
                // add note that user assigned if user scale is selected
                if (scaleValue === 'user') {
                    // userPattern function
                    if (selectedScale.value === 'user') {
                        let userNote = userNoteGenerator(octaves);
                        gridButton[i].innerHTML = userNote;
                    }
                    // gridButton
                } else {
                    // randomly assign a note
                    let buttonNote = randomNoteGenerator(key, scaleValue, octaves);
                    gridButton[i].innerHTML = buttonNote;
                }

                // add ghost or accent if their buttonFunction is on
                if (!accent.classList.contains('off')) {
                    accentizer(gridButton[i]);
                } else if (!ghost.classList.contains('off')) {
                    ghoster(gridButton[i]);
                } else {
                    gridButton[i].style.background = '#94D0FF';
                    gridButton[i].style.color = 'white';
                }
            }
        // events if the button is pressed when it's on
        } else {
                // add buttonFunction if any are on
                if (!accent.classList.contains('off')) {
                    accentizer(gridButton[i]);
                } else if (!ghost.classList.contains('off')) {
                    ghoster(gridButton[i]);
                } else if (!lengthButton.classList.contains('off')) {
                        lastStep(gridButton[i])
                        length = i + 1;
                } else if (!copy.classList.contains('off')) {
                    // if a copier exists, assign values to gridButton
                    let copier = document.getElementsByClassName('copier');
                    if (copier[0]) {
                        copyMaker(gridButton[i], i);
                    } else {
                        // assign button as copier 
                        gridButton[i].classList.add('copier');
                    }
                } else {
                    // turn note off if none of the buttonFunctions are on
                    gridButton[i].classList.add('off');
                    // colorChanger(i + 1);
                    gridButton[i].style.backgroundColor = 'white';
                    gridButton[i].style.color = 'white';
                    gridButton[i].innerHTML = 'm';

                    // remove any accent or ghost values
                    if (gridButton[i].classList.contains('accent')) {
                        gridButton[i].classList.remove('accent');
                    } else if (gridButton[i].classList.contains('ghost')) {
                        gridButton[i].classList.remove('ghost');
                    }
                }
            }
    })
}

function randomNoteGenerator(key, scaleValue, octaves) {
    // push octaves through octavizer
    let octaveValues = octavizer(octaves);

    // get the base scale
    let scaleMidiNotes = scaleGenerator(key, scaleValue);

    // loop through octaveValues and add to octavizedScale
    let octavizedScale = []

    for (let i = 0; i < octaveValues.length; i++) {
        for (let j = 0; j < scaleMidiNotes.length; j++) {
            let note = octaveValues[i] + scaleMidiNotes[j]
            octavizedScale.push(note) 
        }
    }

    let randomNote = octavizedScale[Math.floor(Math.random() * octavizedScale.length)];
    return midiNotes[randomNote]
}

// define the default bpm of the transport if none is input
Tone.Transport.bpm.value = 120;

// bpm updates to the value entered into the tempo field
let tempoSlider = document.getElementById('tempoSlider')
let tempo = document.getElementById('tempo');

tempoSlider.addEventListener('input', () => {
    tempo.innerHTML = tempoSlider.value
    Tone.Transport.bpm.value = tempo.innerHTML
})


Tone.Transport.swingSubdivision = '8n';
Tone.Transport.swing = .50;
// swing updates to the value entered into the tempo field
let swingSlider = document.getElementById('swingSlider')
let swing = document.getElementById('swing');

swingSlider.addEventListener('input', () => {
    swing.innerHTML = swingSlider.value
    Tone.Transport.swing = swing.innerHTML / 100.0
})


Tone.Transport.timeSignature = 4;
Tone.Transport.setLoopPoints(0, `${length}m`);
Tone.Transport.loop = true;


let start = document.getElementById('start');
let stop = document.getElementById('stop');

start.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})

// transport starts when the start button is pressed
start.addEventListener('click', () => {
        if (start.classList.contains('off')) {
            start.classList.remove('off');
            stop.classList.add('off');
            start.style.backgroundColor = '#C1E1B6';
            start.style.color = 'white';
            stop.style.backgroundColor = 'white';
            stop.style.color = '#BC81BF'; 
            Tone.start();
            Tone.Transport.start();
            if (deviceDropdown.value) {
                sendStartSignal();
            }
            looper(-1, length);
        }
})

let looper = (step, length) => {

    let repeat = () => {

        //check which devices to send clock signal to
        if (deviceDropdown.value) {
            let sendClockTo = clockDevices();
            // send a clock signal to all devices that are switched on
            if (!clockButton.classList.contains('off')) {
                // loop through devices and send clock
                for (let i = 0; i < sendClockTo.length; i++) {
                    for (let j = 0; j < 6; j++) {
                        sendClockSignal(sendClockTo[i]);
                    }
                }
            } else {
                for (let j = 0; j < 6; j++) {
                    sendClockSignal(deviceDropdown.value);
                }
            }
        }

        // check 'last', change length if a new one has been set
        let lastStep = document.getElementsByClassName('last');
        let lastStepId = lastStep[0].id;
        let lastStepArrLength = lastStepId.length;
        let newlength = lastStepId.slice(0,(lastStepArrLength - 1))
        
        if (lastStepId.includes('a')) {
            length = newlength;
        } else if (lastStepId.includes('b')) {
            length = parseInt(newlength) + 16;
        } else if (lastStepId.includes('c')) {
            length = parseInt(newlength) + 32;
        } else {
            length = parseInt(newlength) + 48 
        }
        buttonReset()
        

        step = (step + 1) % (length);
        // change color to indicate current step
        gridButton[step].style.backgroundColor = '#D7B373';

        // change previous steps back to their assigned colors
        // if at step 1 then check 16th step
        if (step === 0) {
            // change previous step back to yellow if it has a note assigned to it
            if (gridButton[(length) - 1].innerHTML.length > 1) {
                if (gridButton[(length) - 1].classList.contains('accent')) {
                    gridButton[(length) - 1].style.backgroundColor = '##8795E8';
                } else if (gridButton[(length) - 1].classList.contains('ghost')) {
                    gridButton[(length) - 1].style.backgroundColor = '#DEC0DF';
                } else {
                    gridButton[(length) - 1].style.backgroundColor = '#94D0FF';
                }
            } else {
                // assign original color back to step
                // colorChanger((length));
                gridButton[length - 1].style.backgroundColor = 'white';
                gridButton[length - 1].style.color = 'white';
            }
        } else {
            if (gridButton[step - 1].innerHTML.length > 1) {
                if (gridButton[step-1].classList.contains('accent')) {
                    gridButton[step-1].style.backgroundColor = '#8795E8';
                } else if (gridButton[step-1].classList.contains('ghost')) {
                    gridButton[step-1].style.backgroundColor = '#DEC0DF';
                } else {
                gridButton[step - 1].style.backgroundColor = '#94D0FF';
                }
            } else {
                // assign original color back to step
                // colorChanger(step);
                gridButton[step - 1].style.backgroundColor = 'white';
                gridButton[step - 1].style.color = 'white';
            }
            
        }
        // send note if current step has a note assigned to it
        if (gridButton[step].innerHTML.length > 1) {
            // create an array to store the note and velocity values
            let n = []
            n.push(gridButton[step].innerHTML);

            let velocity = 64;
            if (gridButton[step].classList.contains('accent')) {
                velocity = 127;
            } else if (gridButton[step].classList.contains('ghost')) {
                velocity = 20;
            }
            n.push(velocity)

            sendMidi(n);
        } else {
            gridButton[step].style.color = '#D7B373';
        }

    }
    let sequence = Tone.Transport.scheduleRepeat(repeat, `16n`)

    // transport stops when the stop button is pressed
    stop.addEventListener('click', () => {
        // reset colors back to their original colors
        buttonReset()

        if (deviceDropdown.value) {
            sendStopSignal()
        }
        stop.classList.remove('off');
        start.classList.add('off');
        Tone.Transport.stop();
        Tone.Transport.clear(sequence);
        stop.classList.remove('off');
        start.style.backgroundColor = 'white';
        start.style.color = '#BC81BF';
        stop.style.backgroundColor = '#EE9ABD';
        stop.style.color = 'white'; 
    })
}

// reset steps when the reset button is pressed
let reset = document.getElementById('reset')
reset.addEventListener('click', () => {
    reseter();
})

// randomly create a pattern
let sqnc = document.getElementById('sqnc')
sqnc.addEventListener('click', () => {
    // reset current buttons
    reseter();
    for (let i = 0; i < length; i++) {
        // generate random note
        let buttonNote = randomNoteGenerator(key, scaleValue, octaves);
        gridButton[i].innerHTML = buttonNote;

        // randomly apply ghost, accent, or turn off
        let randomChooser = Math.floor(Math.random() * 10)

        if (randomChooser < 9 && randomChooser > 4) {
            // colorChanger(i + 1);
            gridButton[i].style.backgroundColor = 'white';
            gridButton[i].style.color = 'white';
            gridButton[i].innerHTML = 'm';
        } else if (randomChooser === 1) {
            gridButton[i].classList.remove('off');
            gridButton[i].classList.add('accent')
            gridButton[i].style.backgroundColor = '#8795E8';
            gridButton[i].style.color = 'white';
        } else if (randomChooser === 2) {
            gridButton[i].classList.remove('off');
            gridButton[i].classList.add('ghost');
            gridButton[i].style.backgroundColor = '#DEC0DF';
            gridButton[i].style.color = 'white';
        } else {
            gridButton[i].classList.remove('off');
            gridButton[i].style.background = '#94D0FF';
            gridButton[i].style.color = 'white';
        } 
    }
})

function buttonReset() {
    for (let i = 0; i < 64; i++) {
        if (gridButton[i].classList.contains('off')) {
            // colorChanger(i + 1);
            gridButton[i].style.backgroundColor = 'white';
            gridButton[i].style.color = 'white';
        } else if (gridButton[i].classList.contains('accent')) {
            gridButton[i].style.backgroundColor = '#8795E8';
        } else if (gridButton[i].classList.contains('ghost')) {
            gridButton[i].style.backgroundColor = '#DEC0DF';
        } else {
            gridButton[i].style.backgroundColor = '#94D0FF';
        }
    }
}

function reseter() {
    for (let i = 0; i < 64; i++) {
        gridButton[i].classList.add('off');
        // colorChanger(i + 1);
        gridButton[i].style.backgroundColor = 'white';
        gridButton[i].style.color = 'white';
        gridButton[i].innerHTML = 'm';

        // reset the velocity
        if (gridButton[i].classList.contains('accent')) {
            gridButton[i].classList.remove('accent');
        } else if (gridButton[i].classList.contains('ghost')) {
            gridButton[i].classList.remove('ghost');
        }
    }
}
