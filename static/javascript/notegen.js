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

const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// create a list of all midi note values
export let midiNotes = [];
// create array with all midi notes and names
for (let i = -1; i < 9; i++) {
    for (let j = 0; j < 12; j++) {
        midiNotes.push(`${keys[j]}${i}`);
    }
}


export function scaleGenerator(key = 'C', scaleValue = 0) {
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


// function octaveGenerator(generatedScale, octaveChoices) {
    
// }
