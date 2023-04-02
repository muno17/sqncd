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
// add 24 to the note's location in the array to get the corresponding midi note value

 console.log(midiNotes)
// console.log(midiNotes.length)
//console.log(document.getElementById('key').innerHTML)

// give key base value, change when new key is selected
let key = 'C'
let selectedKey = document.getElementById('keyDropdown');
selectedKey.addEventListener('change', () => {
    key = selectedKey.value;
})

// give scale base value, change when new scale is selected
let scaleValue = 0;
let scaleName = 'major';

let selectedScale = document.getElementById('scaleDropdown');
selectedScale.addEventListener('change', () => {
    scaleValue = selectedScale.value;
})


let base = 60;
// middle C is 60


// first element in array is length of scale, rest of elements are semitones
let scalesList = [
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

// set default scale to major
let scale = [8,2,2,1,2,2,2,1]

// how to pull a list from the scales array
//console.log(scalesList[0]['major'])
//console.log(scalesList[scaleValue][scaleName])




function baseGenerator (key, )


function scaleParser (scaleValue, scaleName) {
    return scalesList[scaleValue][scaleName]
} 


function scaleGenerator(base, scale) {
    midiScale = [base];
    scaleLength = scale[0];

    for (let i = 2; i < scaleLength + 1; i++) {
        let midiNote = midiScale[i - 1] + scale[i - 1];
        midiScale.push(midiNote);
    }
    return midiScale;
}

function octaveGenerator(generatedScale, octaveChoices) {
    
}