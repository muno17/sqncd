// initiate an array where values that are waiting to be reset will be stored
let resetValues = []

let keyReset = document.getElementById('keyReset')
keyReset.addEventListener('click', () => {
    resetValue(keyReset)
})

let scaleReset = document.getElementById('scaleReset')
scaleReset.addEventListener('click', () => {
    resetValue(scaleReset)
})

let octaveReset = document.getElementById('octaveReset')
octaveReset.addEventListener('click', () => {
    resetValue(octaveReset)
})

let stepsReset = document.getElementById('stepsReset')
stepsReset.addEventListener('click', () => {
    resetValue(stepsReset)
})

// change color and add value to resetValues when value button is clicked
function resetValue (value) {
        if (value.classList.contains('off')) {
            value.classList.remove('off');
            value.style.background = '#ECC987';
            resetValues.pop('key')
        } else {
            let valueIndex = resetValues.indexOf('${value}');
            resetValues.splice(valueIndex, 1)
            value.classList.add('off');
            value.style.background = 'white';
        }
}