import { scaleGenerator, midiNotes } from '/static/javascript/notegen.js'
import { sendMidi } from '/static/javascript/midi_io.js'


// initiate default note values if nothing is selected = C major
let scaleValue = 0;
let key = 'C'
// variable to store how many measure will play
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
        if (gridButton[i].classList.contains('false')) {
            gridButton[i].classList.remove('false');
    
            // randomly assign a note
            let buttonNote = randomNoteGenerator(key, scaleValue);
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
            gridButton[i].classList.add('false');
            if (gridButton[i].classList.contains('oddGridButton')) {
                gridButton[i].style.color = '#BC81BF';
                gridButton[i].style.backgroundColor = '#BC81BF';
            } else {
                gridButton[i].style.color = '#5F9F89';
                gridButton[i].style.backgroundColor = '#5F9F89';
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
                if (rowTwo[i].classList.contains('false')) {
                    rowCountTwo ++;
                }

                if (rowThree[i].classList.contains('false')) {
                    rowCountThree ++;
                }

                if (rowFour[i].classList.contains('false')) {
                    rowCountFour ++;
                }
            }

            console.log("rowCountTwo = " + rowCountTwo)
            console.log("rowCountThree = " + rowCountThree)
            console.log("rowCountFour = " + rowCountFour)
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

            console.log(length)
        }
    })
}

function randomNoteGenerator(key, scaleValue) {
    let scaleMidiNotes = scaleGenerator(key, scaleValue);
    let randomNote = scaleMidiNotes[Math.floor(Math.random() * scaleMidiNotes.length)];
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


Tone.Transport.timeSignature = 4;
Tone.Transport.setLoopPoints(0, `${length}m`);
Tone.Transport.loop = true;


// transport starts when the play button is pressed
let play = document.getElementById('play');
play.addEventListener('click', () => {
    
    Tone.Transport.start()
    looper(0, length)
    console.log('transport start');
})

let looper = (step, length) => {
    let repeat = () => {
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
                            gridButton[step - 1].style.backgroundColor = '#5F9F89';
                            gridButton[step - 1].style.color = '#5F9F89';
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

            step = (step + 1) % (16 * length);
    }
    let sequence = Tone.Transport.scheduleRepeat(repeat, `16n`)


    // transport stops when the stop button is pressed
    let stop = document.getElementById('stop')
    stop.addEventListener('click', () => {
        // reset colors back to their original colors
        for (let i = 0; i < (16 * length); i++) {
                // change previous step back to it's original color
                if (gridButton[i].classList.contains('false')) {
                    if (gridButton[i].classList.contains('oddGridButton')) {
                        gridButton[i].style.color = '#BC81BF';
                        gridButton[i].style.backgroundColor = '#BC81BF';
                    } else {
                        gridButton[i].style.color = '#5F9F89';
                        gridButton[i].style.backgroundColor = '#5F9F89';
                    }
                } else {
                    gridButton[i].style.backgroundColor = '#ECC987';
                }
            }
        
        Tone.Transport.stop();
        Tone.Transport.clear(sequence)

    })
}


