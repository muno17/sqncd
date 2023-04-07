// check if browser supports WebMIDI
if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI');
} else {
    console.log('WebMIDI is not supported in this browser');
}
WebMidi.enable().then(onEnabled, sendMidi).catch(err => console.log(''));

// give channel base value, change when new channel is selected
let channel = 1
let selectedChannel = document.getElementById('channelDropdown');
selectedChannel.addEventListener('change', () => {
    channel = selectedChannel.value;
})

let deviceValue = ''
let deviceDropdown = document.getElementById('deviceDropdown');
deviceDropdown.addEventListener('change', () => {
    deviceValue = deviceDropdown.value;
})

// add all devices to devices[]
function onEnabled() {
    WebMidi.outputs.forEach(output => {
        let name = output.name;

        let option = document.createElement('option');
        option.text = `${name}`;
        deviceDropdown.add(option);

        // make sure the first device displayed is the default on startup
        deviceValue = deviceDropdown[0].value
    })
}

// Function triggered when WEBMIDI.js is ready
export function sendMidi(n) {
// Display available MIDI input devices
    let note = n[0];
    let velocity = n[1];
    if (WebMidi.outputs.length < 1) {
    console.log("No device detected.");
    // pass this into dropdown as only option, disable midi channels
    } else {
        // assign the selected channel to the selected device    
        let outputDevice = WebMidi.getOutputByName(deviceValue);
        let outputChannel = outputDevice.channels[channel];

        outputChannel.sendStart()
        outputChannel.playNote(note, {duration: 100, rawAttack: velocity})
        }
}


// send start and stop messages
export function sendStartSignal() {
    let outputDevice = WebMidi.getOutputByName(deviceValue);
    outputDevice.sendStart()
        // outputDevice.sendClock()
}

export function sendStopSignal() {
    let outputDevice = WebMidi.getOutputByName(deviceValue);
    outputDevice.sendStop()
}

export function sendClockSignal(device) {
    let device = WebMidi.getOutputByName(device);
    device.sendClock()
}

 
export let clockButton = document.getElementById('clockSwitch')
clockButton.addEventListener('click', () => {
    // let outputDevice = WebMidi.getOutputByName(deviceValue);
    // console.log(outputDevice)
    if (clockButton.classList.contains('off')) {
        clockButton.classList.remove('off')
    } else {
        clockButton.classList.add('off')
    }
})

function clockDevices() {
    
}