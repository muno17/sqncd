// add functionality to midi, key and scale dropdown menus
// choose octaves
// choose key/scale
// allow user to assign notes ???

const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

let midiNotes = [];
// create array with all midi notes and names
for (let i = 1; i < 8; i++) {
    for (let j = 0; j < 12; j++) {
        midiNotes.push(keys[j] + i);
    }
}
// console.log(midiNotes)
// console.log(midiNotes.length)
//console.log(document.getElementById('key').innerHTML)

// give key base value, change when new key is selected
let key = 'C'
let selectedKey = document.getElementById('keyDropdown');
selectedKey.addEventListener('change', () => {
    key = selectedKey.value;
})

// give scale base value, change when new scale is selected
let scale = 'Major'
let selectedScale = document.getElementById('scaleDropdown');
selectedKey.addEventListener('change', () => {
    scale = selectedKey.value;
})


let base = document.getElement 
// middle C is 60


// first element in array is length of scale, base + rest of elements

const major = [8,2,2,1,2,2,2,1]
const minor = [8,2,1,2,2,1,2,2]
const harmonic_minor = [8,2,1,2,2,1,3,1]
const melodic_minor = [8,2,1,2,2,2,2,1]
const dorian = [8,2,1,2,2,2,1,2]
const phrygian = [8,1,2,2,2,1,2,2]
const lydian = [8,2,2,2,1,2,2,1]
const mixolydian = [8,2,2,1,2,2,1,2]
const aeolian = [8,2,1,2,2,1,2,2]
const locrian = [8,1,2,2,1,2,2,2]
const lydian_domiant = [8,2,2,2,1,2,1,2]
const super_locrian = [8,1,2,1,2,2,2,2]
const minor_pentatonic = [6,3,2,2,3,2]
const major_pentatonic = [6,2,2,3,2,3]
const minor_blues = [7,3,2,1,1,3,2]
const major_blues = [7,2,1,1,3,2,3]
const whole_half_diminished = [9,2,1,2,1,2,1,2,1]
const half_whole_diminished = [9,1,2,1,2,1,2,1,2]

function scaleGenerator(base, scale) {
    
    midiScale = [base]
    length = scale[0];

    for (let i = 2; i < length + 1; i++) {
        let midiNote = midiScale[i - 1] + scale[i - 1]
        midiScale.push(midiNote)
    }

}

function octaveGenerator(generatedScale, octaveChoices) {
    
}