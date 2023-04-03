import { scaleGenerator, midiNotes, octaves, octavizer } from '/static/javascript/notegen.js'
import { sendMidi } from '/static/javascript/midi_io.js'


// initiate default note values, if nothing is selected = C major
let scaleValue = 0;
let key = 'C'
// variable to store how many measure will play, default is 1 measure
let length = 1;

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
            gridButton[i].classList.remove('off');
    
            // randomly assign a note
            let buttonNote = randomNoteGenerator(key, scaleValue, octaves);
            gridButton[i].innerHTML = buttonNote;
            gridButton[i].style.background = '#ECC987';
            gridButton[i].style.color = 'white';

            // adjust length according to button's position
            if (gridButton[i].classList.contains('rowTwo')) {
                let newLength = 2;
                if (newLength > length) {
                    length = newLength
                }
            } else if (gridButton[i].classList.contains('rowThree')) {
                let newLength = 3;
                if (newLength > length) {
                    length = newLength
                }
            } else if (gridButton[i].classList.contains('rowFour')) {
                length = 4;
            }

        // events if the button is turned off
        } else {
            gridButton[i].classList.add('off');
            if (gridButton[i].classList.contains('oddGridButton')) {
                gridButton[i].style.color = '#BC81BF';
                gridButton[i].style.backgroundColor = '#BC81BF';
            } else {
                gridButton[i].style.color = '#9281BF';
                gridButton[i].style.backgroundColor = '#9281BF';
            }
            gridButton[i].innerHTML = 'm';

            // check how many buttons are turned off in all the rows
            let rowCountTwo = 0
            let rowCountThree = 0
            let rowCountFour = 0

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
                length = 3;
            }

            if (rowCountThree === 16 && rowCountFour === 16) {
                length = 2;
            }

            if (rowCountTwo === 16 && rowCountThree === 16 && rowCountFour === 16) {
                length = 1;
            }
        }
    })
}

// function randomNoteGenerator(key, scaleValue) {
//     let scaleMidiNotes = scaleGenerator(key, scaleValue);
//     let randomNote = scaleMidiNotes[Math.floor(Math.random() * scaleMidiNotes.length)];
//     return midiNotes[randomNote]
// }

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

// transport starts when the play button is pressed
play.addEventListener('click', () => {
    if (play.classList.contains('off')) {
        play.classList.remove('off')
        stop.classList.add('off')
        Tone.Transport.start()
        looper(0, length)
        console.log('transport start');
    }
})

let looper = (step, length) => {
    let repeat = () => {
            step = (step + 1) % (16 * length);
            // change color to indicate current step
            gridButton[step].style.backgroundColor = '#DBDBDB';

            // change previous steps back to their assigned colors
            // if at step 1 then check 16th step
            if (step === 0) {
                // change previous step back to yellow if it has a note assigned to it
                if (gridButton[(16 * length) - 1].innerHTML.length > 1) {
                    gridButton[(16 * length) - 1].style.backgroundColor = '#ECC987';
                } else {
                    // assign original color back to step
                    gridButton[(16 * length) - 1].style.backgroundColor = '#BC81BF';
                    gridButton[(16 * length) - 1].style.color = '#BC81BF';
                }
            } else {
                if (gridButton[step - 1].innerHTML.length > 1) {
                    gridButton[step - 1].style.backgroundColor = '#ECC987';
                } else {
                    // change previous step back to yellow if it has a note assigned to it
                    if (gridButton[step - 1].innerHTML.length > 1) {
                        gridButton[step - 1].style.backgroundColor = '#ECC987';
                    } else {
                        // assign original color back to step
                        if (gridButton[step - 1].classList.contains('oddGridButton')) {
                            gridButton[step - 1].style.backgroundColor = '#BC81BF';
                            gridButton[step - 1].style.color = '#BC81BF';
                        } else {
                            gridButton[step - 1].style.backgroundColor = '#9281BF';
                            gridButton[step - 1].style.color = '#9281BF';
                        }
                    }
                } 
            }
            // send note if current step has a note assigned to it
            if (gridButton[step].innerHTML.length > 1) {
                sendMidi(gridButton[step].innerHTML);
            } else {
                gridButton[step].style.color = '#DBDBDB'
            }
    }
    let sequence = Tone.Transport.scheduleRepeat(repeat, `16n`)

    // transport stops when the stop button is pressed
    stop.addEventListener('click', () => {
        // reset colors back to their original colors
        for (let i = 0; i < (16 * length); i++) {
                // change previous step back to it's original color
                if (gridButton[i].classList.contains('off')) {
                    if (gridButton[i].classList.contains('oddGridButton')) {
                        gridButton[i].style.color = '#BC81BF';
                        gridButton[i].style.backgroundColor = '#BC81BF';
                    } else {
                        gridButton[i].style.color = '#9281BF';
                        gridButton[i].style.backgroundColor = '#9281BF';
                    }
                } else {
                    gridButton[i].style.backgroundColor = '#ECC987';
                }
            }
        stop.classList.remove('off')
        play.classList.add('off')
        Tone.Transport.stop();
        Tone.Transport.clear(sequence)
        stop.classList.remove('off')
    })
}

// reset steps when the reset button is pressed
let reset = document.getElementById('reset')
reset.addEventListener('click', () => {
    for (let i = 0; i < 64; i++) {
        gridButton[i].classList.add('off');
        if (gridButton[i].classList.contains('oddGridButton')) {
            gridButton[i].style.color = '#BC81BF';
            gridButton[i].style.backgroundColor = '#BC81BF';
        } else {
            gridButton[i].style.color = '#9281BF';
            gridButton[i].style.backgroundColor = '#9281BF';
        }
        gridButton[i].innerHTML = 'm';
    }
} )
