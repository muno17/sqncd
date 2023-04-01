
// define the default bpm of the transport
Tone.Transport.bpm.value = 120;

// bpm updates to the value entered into the tempo field
let tempo = document.getElementById('tempo');
tempo.addEventListener('input', (e) => {
    // bpm min 1, max 300
    if (e.target.value > 300) {
        Tone.Transport.bpm.value = 300;
    } else if (e.target.value < 1) {
        Tone.Transport.bpm.value = 1;
    } else {
        Tone.Transport.bpm.value = e.target.value;
    }
})

// variable to store how many measure will play
let length = 2;

Tone.Transport.timeSignature = 4;
Tone.Transport.setLoopPoints(0, `${length}m`);
Tone.Transport.loop = true;


// transport starts when the play button is pressed
let play = document.getElementById('play');
play.addEventListener('click', () => {
    
    Tone.Transport.start()
    looper(0)
    console.log('transport start');
})

const looper = (step) => {
    let repeat = () => {
            // change color to indicate current step
            gridButton[step].style.backgroundColor = '#DBDBDB';

            // change previous steps back to their assigned colors
            // if at step 1 then check 16th step
            if (step === 0) {
                // change previous step back to yellow if it has a note assigned to it
                if (!isNaN(gridButton[15].innerHTML)) {
                    gridButton[15].style.backgroundColor = '#ECC987';
                } else {
                    // assign original color back to step
                    gridButton[15].style.backgroundColor = '#BC81BF';
                    gridButton[15].style.color = '#BC81BF';
                }
            } else {
                if (!isNaN(gridButton[step - 1].innerHTML)) {
                    gridButton[step - 1].style.backgroundColor = '#ECC987';
                } else {
                    // change previous step back to yellow if it has a note assigned to it
                    if (!isNaN(gridButton[step - 1].innerHTML)) {
                        gridButton[step - 1].style.backgroundColor = '#ECC987';
                    } else {
                        // assign original color back to step
                        if (gridButton[step - 1].classList.contains('oddGridButton')) {
                            gridButton[step - 1].style.backgroundColor = '#BC81BF';
                            gridButton[step - 1].style.color = '#BC81BF';
                        } else {
                            gridButton[step - 1].style.backgroundColor = '#5F9F89';
                            gridButton[step - 1].style.color = '#5F9F89';
                        }
                    }
                } 
            }

            // send note if current step has a note assigned to it
            if (!isNaN(gridButton[step].innerHTML)) {
                sendMidi(gridButton[step].innerHTML);
            } else {
                gridButton[step].style.color = '#DBDBDB'
            }

            step = (step + 1) % 16;
    }
    let sequence = Tone.Transport.scheduleRepeat(repeat, `16n`)


    // transport stops when the stop button is pressed
    let stop = document.getElementById('stop')
    stop.addEventListener('click', () => {
        // reset colors back to their original colors
        for (let i = 0; i < (16 * length); i++) {
                // change previous step back to it's original color
                if (gridButton[i].classList.contains('false')) {
                    if (gridButton[i].classList.contains('oddGridButton')) {
                        gridButton[i].style.color = '#BC81BF';
                        gridButton[i].style.backgroundColor = '#BC81BF';
                    } else {
                        gridButton[i].style.color = '#5F9F89';
                        gridButton[i].style.backgroundColor = '#5F9F89';
                    }
                } else {
                    gridButton[i].style.backgroundColor = '#ECC987';
                }
            }
        
        Tone.Transport.stop();
        Tone.Transport.clear(sequence)

    })
}


 

// store the array of buttons so that they can be referenced individually
let gridButton = document.getElementsByClassName('gridButton')

// assign event listener to each button that will turn on/off and assign a random note
for (let i = 0; i < 64; i++) {
    gridButton[i].addEventListener('click', () => {
    
        if (gridButton[i].classList.contains('false')) {
            gridButton[i].classList.remove('false');
    
            // randomly assign a note
            let buttonNote = randomNote(36, 60);
            gridButton[i].innerHTML = buttonNote;
            gridButton[i].style.background = '#ECC987';
            gridButton[i].style.color = 'white';

            //sendMidi(buttonNote)
        } else {
            gridButton[i].classList.add('false');
            if (gridButton[i].classList.contains('oddGridButton')) {
                gridButton[i].style.color = '#BC81BF';
                gridButton[i].style.backgroundColor = '#BC81BF';
            } else {
                gridButton[i].style.color = '#5F9F89';
                gridButton[i].style.backgroundColor = '#5F9F89';
            }
            gridButton[i].innerHTML = 'm';
        }
    })
}



function randomNote(x, y) {
    let min = x;
    let max = y;
    return Math.floor(Math.random() * (max - min + 1) + min);

}

// check if browser supports WebMIDI
if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI');
} else {
    console.log('WebMIDI is not supported in this browser');
}

WebMidi.enable().then(sendMidi).catch(err => console.log(''));

let devices = []

// give channel base value, change when new channel is selected
let channel = 1
let selectedChannel = document.getElementById('channelDropdown');
selectedChannel.addEventListener('change', () => {
    channel = selectedChannel.value;
})

// Function triggered when WEBMIDI.js is ready
function sendMidi(n) {
// Display available MIDI input devices
    let note = n
    if (WebMidi.outputs.length < 1) {
    console.log("No device detected.");
    // pass this into dropdown as only option, disable midi channels
    } else {
    WebMidi.outputs.forEach((device, index) => {
        //console.log(`${index}: ${device.name}`);
        // add to devices array to be able to reference in dropdowns
        devices.push(`${index}: ${device.name}`);

        // pass in device and midi channel to send to
        let outputDevice = WebMidi.getOutputByName(device['name']);
        let channel = outputDevice.channels[1];
        
        //console.log(device['name'])
        channel.playNote(n, {duration: 300})

        // add eventListener for notes function

    })
    }

}