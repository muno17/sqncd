import { colorChanger } from '/static/javascript/sequencer.js'

export let accent = document.getElementById('accent')
accent.addEventListener('click', () => {
    if (accent.classList.contains('off')) {
        accent.classList.remove('off');
        accent.style.backgroundColor = '#EC9687';
        accent.style.color = 'white';

        lengthButton.classList.add('off');
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
        copy.classList.add('off');
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
        ghost.classList.add('off');
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
    } else {
        accent.classList.add('off');
        accent.style.backgroundColor = 'white';
        accent.style.color = '#BC81BF';
    }
})

export let ghost = document.getElementById('ghost')
ghost.addEventListener('click', () => {
    if (ghost.classList.contains('off')) {
        ghost.classList.remove('off');
        ghost.style.backgroundColor = '#DEC0DF';
        ghost.style.color = 'white';

        lengthButton.classList.add('off')
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
        copy.classList.add('off');
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
        accent.classList.add('off');
        accent.style.backgroundColor = 'white';
        accent.style.color = '#BC81BF';
    } else {
        ghost.classList.add('off')
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
    }
})

// add accent if accent is on
export function accentizer(step) {
    if (!accent.classList.contains('off')) {
        if (step.classList.contains('ghost')) {
            step.classList.remove('ghost')
            step.style.backgroundColor = '#ECC987';
        } else {
            step.classList.add('accent')
            step.style.backgroundColor = '#EC9687';
        }
    }
}

// add ghost if ghost is on
export function ghoster(step) {
    if (!ghost.classList.contains('off')) {
        if (step.classList.contains('accent')) {
            step.classList.remove('accent');
            step.style.backgroundColor = '#ECC987';
        } else {
            step.classList.add('ghost');
            step.style.backgroundColor = '#DEC0DF';
        }
    }
}

export let copy = document.getElementById('copy')
copy.addEventListener('click', () => {
    if (copy.classList.contains('off')) {
        copy.classList.remove('off');
        copy.style.backgroundColor = '#FDFA0E';
        copy.style.color = 'black';

        lengthButton.classList.add('off');
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
        ghost.classList.add('off');
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
        accent.classList.add('off');
        accent.style.backgroundColor = 'white';
        accent.style.color = '#BC81BF';
    } else {
        // remove copier class from any button that may have it
        let copier = document.getElementsByClassName('copier');
        if (copier[0]) {
            copier[0].classList.remove('copier');
        }
        copy.classList.add('off')
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
    }
})

// copy over a note's value if a note has already been assigned 'copier'
export function copyMaker(step, stepNumber) {
    // if copy is pressed, give step class of copier
    // if a second button is pressed, copy the copier's values into it
    let copier = document.getElementsByClassName('copier');

    // add note value and ghost/accent
    if (copier[0].classList.contains('ghost')) {
        step.classList.add('ghost');
        step.style.backgroundColor = '#DEC0DF';
        step.style.color = 'white';
    } else if (copier[0].classList.contains('accent')) {
        step.classList.add('accent');
        step.style.backgroundColor = '#EC9687';
        step.style.color = 'white';
    } else if (copier[0].innerHTML === 'm') {
        colorChanger(stepNumber + 1);
        step.classList.add('off');
    } else {
        step.style.background = '#ECC987';
        step.style.color = 'white';
    }
    step.classList.remove('off')
    // copy over note value and reset copy
    step.innerHTML = copier[0].innerHTML;
    copier[0].classList.remove('copier');
}

export let lengthButton = document.getElementById('length')
lengthButton.addEventListener('click', () => {
    if (lengthButton.classList.contains('off')) {
        lengthButton.classList.remove('off');
        lengthButton.style.backgroundColor = '#1814f3';
        lengthButton.style.color = 'white';

        copy.classList.add('off');
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
        ghost.classList.add('off');
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
        accent.classList.add('off');
        accent.style.backgroundColor = 'white';
        accent.style.color = '#BC81BF';
    } else {
        lengthButton.classList.add('off');
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
    }
})

export function lastStep(step) {
    let formerLast = document.getElementsByClassName('last');
    formerLast[0].classList.remove('last');

    step.classList.add('last');
    lengthButton.classList.add('off');
    lengthButton.style.backgroundColor = 'white';
    lengthButton.style.color = '#BC81BF';
}