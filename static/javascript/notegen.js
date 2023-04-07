

// choose octaves
// allow user to assign notes ???

// first element in array is length of scale, rest of elements are semitones
const scalesList = [
    {major : [8,2,2,1,2,2,2,1]},
    {minor: [8,2,1,2,2,1,2,2]},
    {harmonic_minor : [8,2,1,2,2,1,3,1]},
    {melodic_minor : [8,2,1,2,2,2,2,1]},
    {dorian : [8,2,1,2,2,2,1,2]},
    {phrygian : [8,1,2,2,2,1,2,2]},
    {lydian : [8,2,2,2,1,2,2,1]},
    {mixolydian : [8,2,2,1,2,2,1,2]},
    {aeolian : [8,2,1,2,2,1,2,2]},
    {locrian : [8,1,2,2,1,2,2,2]},
    {lydian_domiant : [8,2,2,2,1,2,1,2]},
    {super_locrian : [8,1,2,1,2,2,2,2]},
    {minor_pentatonic : [6,3,2,2,3,2]},
    {major_pentatonic : [6,2,2,3,2,3]},
    {minor_blues : [7,3,2,1,1,3,2]},
    {major_blues : [7,2,1,1,3,2,3]},
    {whole_half_diminished : [9,2,1,2,1,2,1,2,1]},
    {half_whole_diminished : [9,1,2,1,2,1,2,1,2]}
]

export const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// create a list of all midi note values
export let midiNotes = [];
// create array with all midi notes and names
for (let i = -1; i < 9; i++) {
    for (let j = 0; j < 12; j++) {
        midiNotes.push(`${keys[j]}${i}`);
    }
}


export function scaleGenerator(key = 'C', scaleValue = 1) {
    // find the base midi note
    let base = 60 + keys.indexOf(key);

    // initialize a list to store the midi values of the scale, first element is the base
    let midiScale = [base];

    // pull the name of the scale - needed to find the scalePattern
    let scaleNameGenerator = Object.keys(scalesList[scaleValue])
    let scaleName = scaleNameGenerator[0]

    // pull the pattern corresponding to the scale
    let scalePattern = scalesList[scaleValue][scaleName]
    let scaleLength = scalePattern[0];

    // loop through the scale, add the pattern amount to the previous midiScale element's value and push to midiScale
    for (let i = 1; i < scaleLength; i++) {
        let midiNote = midiScale[i - 1] + scalePattern[i];
        midiScale.push(midiNote);
    }

    return midiScale;
}

let octaveButton = document.getElementsByClassName('octaveButton')
for (let i = 0; i < octaveButton.length; i++) {
    octaveButton[i].addEventListener('click', () => {
        turnOn(octaveButton[i])
    })
}

// create an array to keep track of which arrays are activated
export let octaves = [octaveMid]

function turnOn(octaveButton) {
    if (octaveButton.classList.contains('off')) {
        octaveButton.classList.remove('off');
        octaveButton.style.background = '#94D0FF';
        octaves.push(octaveButton);
    } else if (octaves.length > 1) {
        octaveButton.classList.add('off');
        octaveButton.style.background = 'white';
        let position = octaves.indexOf(octaveButton);
        octaves.splice(position, 1);
    }
}

// create new array to store possible values to add or subtract

// check which octaves have been turned on, add corresponding values to octaveValues
export function octavizer(octaves) {
    let octaveValues = [];

    if (octaves.includes(octaveNegThree)) {
        octaveValues.push(-36);
    }

    if (octaves.includes(octaveNegTwo)) {
        octaveValues.push(-24);
    } 

    if (octaves.includes(octaveNegOne)) {
        octaveValues.push(-12);
    }

    if (octaves.includes(octaveMid)) {
        octaveValues.push(0);
    }

    if (octaves.includes(octavePlusOne)) {
        octaveValues.push(12);
    }

    if (octaves.includes(octavePlusTwo)) {
        octaveValues.push(24);
    }

    if (octaves.includes(octavePlusThree)) {
        octaveValues.push(36);
    }

    return octaveValues;
}