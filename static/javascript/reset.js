// reset notes

let resetValues = []

let keyReset = document.getElementById('keyReset')
keyReset.addEventListener('click', () => {
    resetButton(keyReset)
})

let scaleReset = document.getElementById('scaleReset')
scaleReset.addEventListener('click', () => {
    resetButton(scaleReset)
})

let octaveReset = document.getElementById('octaveReset')
octaveReset.addEventListener('click', () => {
    resetButton(octaveReset)
})

let stepsReset = document.getElementById('stepsReset')
stepsReset.addEventListener('click', () => {
    resetButton(stepsReset)
})

function resetButton (value) {
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