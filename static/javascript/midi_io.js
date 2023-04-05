// check if browser supports WebMIDI
if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI');
} else {
    console.log('WebMIDI is not supported in this browser');
}


WebMidi.enable().then(onEnabled, sendMidi).catch(err => console.log(''));

let devices = []

// give channel base value, change when new channel is selected
let channel = 1
let selectedChannel = document.getElementById('channelDropdown');
selectedChannel.addEventListener('change', () => {
    channel = selectedChannel.value;
})

let deviceDropdown = document.getElementById('deviceDropdown');
deviceDropdown.addEventListener('change', () => {

})

// add all devices to devices[]
function onEnabled() {
    WebMidi.outputs.forEach(output => {
        let name = output.name;
        // console.log(`${name}`)
        let option = document.createElement('option');
        option.text = `${name}`;
        deviceDropdown.add(option);
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

    let device = devices[0]
    console.log(devices[0])

    let outputDevice = WebMidi.getOutputByName(devices[0]);
    let channel = outputDevice.channels[1];
    
    channel.playNote(note, {duration: 100, rawAttack: velocity})

    }

}