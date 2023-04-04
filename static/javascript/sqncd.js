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
                lastStep(gridButton[i])
                length = i + 1
            } else if (!copy.classList.contains('off')) {
                // if a copier exists, assign values to gridButton
                let copier = document.getElementsByClassName('copier');
                if (copier[0]) {
                    copyMaker(gridButton[i]);
                } else {
                    // assign button as copier 
                    gridButton[i].classList.add('copier')
                }
            } else {
                gridButton[i].classList.remove('off');

                // randomly assign a note
                let buttonNote = randomNoteGenerator(key, scaleValue, octaves);
                gridButton[i].innerHTML = buttonNote;
                gridButton[i].style.background = '#ECC987';
                gridButton[i].style.color = 'white';

                // add ghost or accent if their buttonFunction is on
                if (!accent.classList.contains('off')) {
                    accentizer(gridButton[i])
                } else if (!ghost.classList.contains('off')) {
                    ghoster(gridButton[i])
                } 

                // adjust length according to button's position
                if (gridButton[i].classList.contains('rowTwo')) {
                    let newLength = 2;
                    if (newLength > length) {
                        length = newLength;
                    }
                } else if (gridButton[i].classList.contains('rowThree')) {
                    let newLength = 3;
                    if (newLength > length) {
                        length = newLength;
                    }
                } else if (gridButton[i].classList.contains('rowFour')) {
                    length = 4;
                }
            }
        // events if the button is pressed when it's on
        } else {
                // add buttonFunction is any are on
                if (!accent.classList.contains('off')) {
                    accentizer(gridButton[i]);
                } else if (!ghost.classList.contains('off')) {
                    ghoster(gridButton[i]);
                } else if (!lengthButton.classList.contains('off')) {
                        lastStep(gridButton[i])
                        length = i + 1
                } else if (!copy.classList.contains('off')) {
                    // if a copier exists, assign values to gridButton
                    let copier = document.getElementsByClassName('copier');
                    if (copier[0]) {
                        copyMaker(gridButton[i]);
                    } else {
                        // assign button as copier 
                        gridButton[i].classList.add('copier')
                    }
                } else {
                    // turn note off if none of the buttonFunctions are on
                    gridButton[i].classList.add('off');
                    colorChanger(i + 1);
                    gridButton[i].innerHTML = 'm';

                    // check how many buttons are turned off in all the rows
                    let rowCountTwo = 0;
                    let rowCountThree = 0;
                    let rowCountFour = 0;

                    let rowTwo = document.getElementsByClassName('rowTwo')
                    let rowThree = document.getElementsByClassName('rowThree')
                    let rowFour = document.getElementsByClassName('rowFour')
                    for (let i = 0; i < 16; i++) {
                        if (rowTwo[i].classList.contains('off')) {
                            rowCountTwo ++;
                        }

                        if (rowThree[i].classList.contains('off')) {
                            rowCountThree ++;
                        }

                        if (rowFour[i].classList.contains('off')) {
                            rowCountFour ++;
                        }
                    }

                    // adjust length if all buttons in a row and the rows preceding it are off
                    if (rowCountFour === 16) {
                        length = 48;
                    }

                    if (rowCountThree === 16 && rowCountFour === 16) {
                        length = 32;
                    }

                    if (rowCountTwo === 16 && rowCountThree === 16 && rowCountFour === 16) {
                        length = 16;
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
Tone.Transport.swing = 0;
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
        play.style.backgroundColor = '#71b373';
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
            step = (step + 1) % (length);
            // change color to indicate current step
            gridButton[step].style.backgroundColor = '#DBDBDB';

            // change previous steps back to their assigned colors
            // if at step 1 then check 16th step
            if (step === 0) {
                // change previous step back to yellow if it has a note assigned to it
                if (gridButton[(length) - 1].innerHTML.length > 1) {
                    if (gridButton[(length) - 1].classList.contains('accent')) {
                        gridButton[(length) - 1].style.backgroundColor = '#F28D5F';
                    } else if (gridButton[(length) - 1].classList.contains('ghost')) {
                        gridButton[(length) - 1].style.backgroundColor = '#8EDFB7';
                    } else {
                        gridButton[(length) - 1].style.backgroundColor = '#ECC987';
                    }
                } else {
                    // assign original color back to step
                    colorChanger((length))
                }
            } else {
                if (gridButton[step - 1].innerHTML.length > 1) {
                    if (gridButton[step-1].classList.contains('accent')) {
                        gridButton[step-1].style.backgroundColor = '#EC9687';
                    } else if (gridButton[step-1].classList.contains('ghost')) {
                        gridButton[step-1].style.backgroundColor = '#DEC0DF';
                    } else {
                    gridButton[step - 1].style.backgroundColor = '#ECC987';
                    }
                } else {
                    // assign original color back to step
                    colorChanger(step);
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
                gridButton[step].style.color = '#DBDBDB';
            }
    }
    let sequence = Tone.Transport.scheduleRepeat(repeat, `16n`)

    // transport stops when the stop button is pressed
    stop.addEventListener('click', () => {
        // reset colors back to their original colors
        for (let i = 0; i < length; i++) {
                // change previous step back to it's original color
                if (gridButton[i].classList.contains('off')) {
                    colorChanger(i + 1)
                } else if (gridButton[i].classList.contains('accent')) {
                    gridButton[i].style.backgroundColor = '#EC9687';
                } else if (gridButton[i].classList.contains('ghost')) {
                    gridButton[i].style.backgroundColor = '#DEC0DF';
                } else {
                    gridButton[i].style.backgroundColor = '#ECC987';
                }
            }

        stop.classList.remove('off');
        play.classList.add('off');
        Tone.Transport.stop();
        Tone.Transport.clear(sequence);
        stop.classList.remove('off');
        play.style.backgroundColor = 'white';
        play.style.color = '#BC81BF';
        stop.style.backgroundColor = '#d74d73';
        stop.style.color = 'white'; 

    })
}

// reset steps when the reset button is pressed
let reset = document.getElementById('reset')
reset.addEventListener('click', () => {
    for (let i = 0; i < 64; i++) {
        gridButton[i].classList.add('off');
        colorChanger(i + 1);
        gridButton[i].innerHTML = 'm';

        // reset the velocity
        if (gridButton[i].classList.contains('accent')) {
            gridButton[i].classList.remove('accent');
        } else if (gridButton[i].classList.contains('ghost')) {
            gridButton[i].classList.remove('ghost');
        }
    }
})


// changes color back to it's original
function colorChanger(step) {                       
    if (gridButton[step - 1].classList.contains('columnOne')) {
    gridButton[step - 1].style.backgroundColor = '#94D0FF';
    gridButton[step - 1].style.color = '#94D0FF';
} else if (gridButton[step - 1].classList.contains('columnTwo')) {
    gridButton[step - 1].style.backgroundColor = '#8795E8';
    gridButton[step - 1].style.color = '#8795E8';
} else if (gridButton[step - 1].classList.contains('columnThree')) {
    gridButton[step - 1].style.backgroundColor = '#BC81BF';
    gridButton[step - 1].style.color = '#BC81BF';
} else if (gridButton[step - 1].classList.contains('columnFour')) {
    gridButton[step - 1].style.backgroundColor = '#9D81BF';
    gridButton[step - 1].style.color = '#9D81BF';
} }