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


        outputChannel.playNote(note, {duration: 100, rawAttack: velocity})
        }
}

// send start and stop messages
export function sendStartSignal() {
    if (!clockButton.classList.contains('off')) {
        for (let i = 0; i < deviceDropdown.length; i++) {
            let x = WebMidi.getOutputByName(deviceDropdown[i].value);
            x.sendStart()
        }
    } else {
        let outputDevice = WebMidi.getOutputByName(deviceValue);
        outputDevice.sendStart()
    }
}

export function sendStopSignal() {
    if (!clockButton.classList.contains('off')) {
        for (let i = 0; i < deviceDropdown.length; i++) {
            let x = WebMidi.getOutputByName(deviceDropdown[i].value);
            x.sendStop()
        }
    } else {
        let outputDevice = WebMidi.getOutputByName(deviceValue);
        outputDevice.sendStop()
    }
}

export function sendClockSignal(clockDevice) {
    // console.log(WebMidi.getOutputByName(deviceValue))
    // console.log(clockDevice)
    let sendToDevice = WebMidi.getOutputByName(clockDevice);
    sendToDevice.sendClock()
}
 
export let clockButton = document.getElementById('clockSwitch')
clockButton.addEventListener('click', () => {
    if (clockButton.classList.contains('off')) {
        clockButton.classList.remove('off')
    } else {
        clockButton.classList.add('off')
    }
})

export function clockDevices() {
    let devicesLength = deviceDropdown.length

    // create an array to store devices to receive clock
    let sendClockTo = []

    // loop through and add all devices that are not currently selected to sendClockTo[]
    for (let i = 0; i < devicesLength; i++) {
            sendClockTo.push(deviceDropdown[i].value);
    }
    return sendClockTo;
}