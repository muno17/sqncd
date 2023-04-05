import { scaleGenerator, midiNotes, octaves, octavizer } from '/static/javascript/notegen.js'
import { sendMidi } from '/static/javascript/midi_io.js'
import { accent, ghost, accentizer, ghoster, lengthButton, lastStep, copy, copyMaker } from '/static/javascript/noteFunctions.js'


// initiate default note values, if nothing is selected = C major
let scaleValue = 0;
let key = 'C'
// variable to store how many measure will play, default is 1 measure
let length = 16;

let selectedScale = document.getElementById('scaleDropdown');
selectedScale.addEventListener('change', () => {
    scaleValue = selectedScale.value;
})

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

                // randomly assign a note
                let buttonNote = randomNoteGenerator(key, scaleValue, octaves);
                gridButton[i].innerHTML = buttonNote;
                gridButton[i].style.background = '#94D0FF';
                gridButton[i].style.color = 'white';

                // add ghost or accent if their buttonFunction is on
                if (!accent.classList.contains('off')) {
                    accentizer(gridButton[i]);
                } else if (!ghost.classList.contains('off')) {
                    ghoster(gridButton[i]);
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
})

Tone.Transport.swingSubdivision = '16n';
Tone.Transport.swing = .50;
// swing updates to the value entered into the tempo field
let swing = document.getElementById('swing');
swing.addEventListener('input', (e) => {
    Tone.Transport.swing = e.target.value / 100;
})


Tone.Transport.timeSignature = 4;
Tone.Transport.setLoopPoints(0, `${length}m`);
Tone.Transport.loop = true;


let play = document.getElementById('play');
let stop = document.getElementById('stop');

play.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})

// transport starts when the play button is pressed
play.addEventListener('click', () => {
    if (play.classList.contains('off')) {
        play.classList.remove('off');
        stop.classList.add('off');
        play.style.backgroundColor = '#C1E1B6';
        play.style.color = 'white';
        stop.style.backgroundColor = 'white';
        stop.style.color = '#BC81BF'; 
        Tone.start();
        Tone.Transport.start();
        looper(-1, length);
    }
})

let looper = (step, length) => {
    let repeat = () => {
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
                    gridButton[(length) - 1].style.ckgrbaoundColor = '##8795E8';
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

        stop.classList.remove('off');
        play.classList.add('off');
        Tone.Transport.stop();
        Tone.Transport.clear(sequence);
        stop.classList.remove('off');
        play.style.backgroundColor = 'white';
        play.style.color = '#BC81BF';
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