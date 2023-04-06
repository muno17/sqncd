import { keys } from '/static/javascript/notegen.js'

let pitchButton = document.getElementsByClassName('pitchButton')

for (let i = 0; i < 12; i++) {
    pitchButton[i].value = keys[i];

    pitchButton[i].addEventListener('click', () => {
        if (pitchButton[i].classList.contains('off')) {
            pitchButton[i].classList.remove('off');
            pitchButton[i].style.backgroundColor = '#ECC987';
        } else {
            pitchButton[i].classList.add('off');
            if (pitchButton[i].classList.contains('flat')) {
                pitchButton[i].style.backgroundColor = 'black';
            } else {
                pitchButton[i].style.backgroundColor = 'white';
            }
        }
    })
}