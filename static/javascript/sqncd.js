import { scaleGenerator, midiNotes } from '/static/javascript/notegen.js'
import { sendMidi } from '/static/javascript/midi_io.js'


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
})

// variable to store how many measure will play
let length = 2;

Tone.Transport.timeSignature = 4;
Tone.Transport.setLoopPoints(0, `${length}m`);
Tone.Transport.loop = true;


// transport starts when the play button is pressed
let play = document.getElementById('play');
play.addEventListener('click', () => {
    
    Tone.Transport.start()
    looper(0)
    console.log('transport start');
})

const looper = (step) => {
    let repeat = () => {
            // change color to indicate current step
            gridButton[step].style.backgroundColor = '#DBDBDB';

            // change previous steps back to their assigned colors
            // if at step 1 then check 16th step
            if (step === 0) {
                // change previous step back to yellow if it has a note assigned to it
                if (gridButton[15].innerHTML.length > 1) {
                    gridButton[15].style.backgroundColor = '#ECC987';
                } else {
                    // assign original color back to step
                    gridButton[15].style.backgroundColor = '#BC81BF';
                    gridButton[15].style.color = '#BC81BF';
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

            step = (step + 1) % 16;
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

// generate scale, use scale[0], scale[scale.length - 1] as min and max for randomNote
 

// store the array of buttons so that they can be referenced individually
let gridButton = document.getElementsByClassName('gridButton')

// assign event listener to each button that will turn on/off and assign a random note
for (let i = 0; i < 64; i++) {
    gridButton[i].addEventListener('click', () => {
    
        if (gridButton[i].classList.contains('false')) {
            gridButton[i].classList.remove('false');
    
            // randomly assign a note
            let buttonNote = randomNoteGenerator();
            gridButton[i].innerHTML = buttonNote;
            gridButton[i].style.background = '#ECC987';
            gridButton[i].style.color = 'white';

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
        }
    })
}



function randomNoteGenerator() {
    let scaleMidiNotes = scaleGenerator();

    let randomNote = scaleMidiNotes[Math.floor(Math.random() * scaleMidiNotes.length)];
    console.log(randomNote)
    return midiNotes[randomNote]

}