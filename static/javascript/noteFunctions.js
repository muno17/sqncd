export let accent = document.getElementById('accent')
accent.addEventListener('click', () => {
    if (accent.classList.contains('off')) {
        accent.classList.remove('off');
        accent.style.backgroundColor = '#EC9687';
        accent.style.color = 'white';

        lengthButton.classList.add('off')
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
        copy.classList.add('off')
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
        ghost.classList.add('off')
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
    } else {
        accent.classList.add('off')
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
        copy.classList.add('off')
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
        accent.classList.add('off')
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








let copy = document.getElementById('copy')
copy.addEventListener('click', () => {
    if (copy.classList.contains('off')) {
        copy.classList.remove('off');
        copy.style.backgroundColor = '#479682';
        copy.style.color = 'white';

        lengthButton.classList.add('off')
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
        ghost.classList.add('off')
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
        accent.classList.add('off')
        accent.style.backgroundColor = 'white';
        accent.style.color = '#BC81BF';
    } else {
        copy.classList.add('off')
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
    }
})

export let lengthButton = document.getElementById('length')
lengthButton.addEventListener('click', () => {
    if (lengthButton.classList.contains('off')) {
        lengthButton.classList.remove('off');
        lengthButton.style.backgroundColor = '#1814f3';
        lengthButton.style.color = 'white';

        copy.classList.add('off')
        copy.style.backgroundColor = 'white';
        copy.style.color = '#BC81BF';
        ghost.classList.add('off')
        ghost.style.backgroundColor = 'white';
        ghost.style.color = '#BC81BF';
        accent.classList.add('off')
        accent.style.backgroundColor = 'white';
        accent.style.color = '#BC81BF';
    } else {
        lengthButton.classList.add('off')
        lengthButton.style.backgroundColor = 'white';
        lengthButton.style.color = '#BC81BF';
    }
})

export function lastStep(step) {
    let formerLast = document.getElementsByClassName('last');
    formerLast[0].classList.remove('last');

    step.classList.add('last')
}



let undo = document.getElementById('undo')
undo.addEventListener('click', () => {
    if (undo.classList.contains('off')) {
        undo.classList.remove('off');

    } else {
        undo.classList.add('off')

    }
})