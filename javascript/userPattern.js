import { octavizer, octaveReseter, turnOn } from '/static/javascript/notegen.js'

let Db = document.getElementById('Db')
let Eb = document.getElementById('Eb')
let Gb = document.getElementById('Gb')
let Ab = document.getElementById('Ab')
let Bb = document.getElementById('Bb')
let C = document.getElementById('C')
let D = document.getElementById('D')
let E = document.getElementById('E')
let F = document.getElementById('F')
let G = document.getElementById('G')
let A = document.getElementById('A')
let B = document.getElementById('B')

let pitchButtons = [C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B]

// add event listeners to turn pitchButtons on and off when clicked
for (let i = 0; i < 12; i++) {
    pitchButtons[i].addEventListener('click', () => {
        // get a reference to the currentPitch
        let currentPitch = document.getElementsByClassName('currentPitch')
        
        let oldPitch = currentPitch[0];
        oldPitch.classList.remove('currentPitch');
        oldPitch.classList.add('off');
        if (oldPitch.classList.contains('flat')) {
            oldPitch.style.backgroundColor = 'black';
        } else {
            oldPitch.style.backgroundColor = 'white';
        }
        
        // make pitchButton the new currentPitch
        pitchButtons[i].classList.remove('off');
        pitchButtons[i].style.backgroundColor = '#ECC987';
        pitchButtons[i].classList.add('currentPitch')
    })
}

export function userNoteGenerator(octaves) {
    let pitchButton = document.getElementsByClassName('currentPitch')
    let pitch = pitchButton[0].value
    let octave = octavizer(octaves)
    let octaveValue

    if (octave[0] === -36) {
        octaveValue = 1;
    } else if (octave[0] === -24) {
        octaveValue = 2;
    } else if (octave[0] === -12) {
        octaveValue = 3;
    } else if (octave[0] === 0) {
        octaveValue = 4;
    } else if (octave[0] === 12) {
        octaveValue = 5;
    } else if (octave[0] === 24) {
        octaveValue = 6;
    } else if (octave[0] === 36) {
        octaveValue = 7;
    }

    return pitch + octaveValue;
}

// resets octaves so middle C is default
export function resetUserOctaves(octaves) {
    for (let i = octaves.length - 1; i >= 0; i--) {
        octaveReseter(octaves[i]);
    }

    let newOctave = document.getElementById('octaveMid');
    newOctave.classList.add('octaveOn');
    turnOn(newOctave);
}
