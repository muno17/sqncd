export let accent = document.getElementById('accent')
accent.addEventListener('click', () => {
    if (ghost.classList.contains('off') && copy.classList.contains('off') 
        && lengthButton.classList.contains('off')) {
        if (accent.classList.contains('off')) {
            accent.classList.remove('off');
            accent.style.backgroundColor = '#F47951';
            accent.style.color = 'white';

        } else {
            accent.classList.add('off')
            accent.style.backgroundColor = 'white';
            accent.style.color = '#BC81BF';
        }
    }
})

export let ghost = document.getElementById('ghost')
ghost.addEventListener('click', () => {
    if (accent.classList.contains('off') && copy.classList.contains('off') 
        && lengthButton.classList.contains('off')) {
        if (ghost.classList.contains('off')) {
            ghost.classList.remove('off');
            ghost.style.backgroundColor = '#ffff00';
            ghost.style.color = 'white';
        } else {
            ghost.classList.add('off')
            ghost.style.backgroundColor = 'white';
            ghost.style.color = '#BC81BF';
        }
    }
})

let undo = document.getElementById('undo')
undo.addEventListener('click', () => {
    if (undo.classList.contains('off')) {
        undo.classList.remove('off');

    } else {
        undo.classList.add('off')

    }
})

let copy = document.getElementById('copy')
copy.addEventListener('click', () => {
    if (ghost.classList.contains('off') && accent.classList.contains('off') 
        && lengthButton.classList.contains('off')) {
        if (copy.classList.contains('off')) {
            copy.classList.remove('off');
            copy.style.backgroundColor = '#479682';
            copy.style.color = 'white';
        } else {
            copy.classList.add('off')
            copy.style.backgroundColor = 'white';
            copy.style.color = '#BC81BF';
        }
    }
})

let lengthButton = document.getElementById('length')
lengthButton.addEventListener('click', () => {
    if (ghost.classList.contains('off') && copy.classList.contains('off') 
    && accent.classList.contains('off')) {
        if (lengthButton.classList.contains('off')) {
            lengthButton.classList.remove('off');
            lengthButton.style.backgroundColor = '#ECE287';
            lengthButton.style.color = 'white';
        } else {
            lengthButton.classList.add('off')
            lengthButton.style.backgroundColor = 'white';
            lengthButton.style.color = '#BC81BF';
        }
    }
})

// add accent if accent is on
export function accentizer(step) {
    if (!accent.classList.contains('off')) {
        if (!ghost.classList.contains('off')) {
            step.classList.remove('ghost')
            step.style.background = '#ECC987';
        } else {
            step.classList.add('ghost')
            step.style.background = '#F47951';
        }
    }
}

// add ghost if ghost is on
export function ghoster(step) {
    if (!ghost.classList.contains('off')) {
        if (!accent.classList.contains('off')) {
            step.classList.remove('accent');
            step.style.background = '#ECC987';
        } else {
            step.classList.add('ghost');
            step.classList.style.background = '#ffff00';
        }
    }
}