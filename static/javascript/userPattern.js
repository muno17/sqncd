import { keys, octavizer } from '/static/javascript/notegen.js'
import { selectedScale } from '/static/javascript/sequencer.js'

let pitchButton = document.getElementsByClassName('pitchButton')

// turn pitchButtons on and off when clicked
for (let i = 0; i < 12; i++) {
    pitchButton[i].value = keys[i];

    //console.log(pitchButton[i])
    pitchButton[i].addEventListener('click', () => {
        // get a reference to the currentPitch
        let currentPitch = document.getElementsByClassName('currentPitch')
        
        // if no pitch button has been selected yet, make it the currentPitch
        if (!currentPitch[0]) {
            pitchButton[i].classList.remove('off');
            pitchButton[i].classList.add('currentPitch')
            pitchButton[i].style.backgroundColor = '#ECC987';
        } else {
            // turn off currentPitch and and reset color
            let oldPitch = currentPitch[0];
            oldPitch.classList.remove('currentPitch');
            oldPitch.classList.add('off');
            if (oldPitch.classList.contains('flat')) {
                oldPitch.style.backgroundColor = 'black';
            } else {
                oldPitch.style.backgroundColor = 'white';
            }
            
            // make pitchButton the new currentPitch
            pitchButton[i].classList.remove('off');
            pitchButton[i].style.backgroundColor = '#ECC987';
            pitchButton[i].classList.add('currentPitch')
        }
    })
}

// if (scaleValue === 'user') {
//     console.log('in here')
// }