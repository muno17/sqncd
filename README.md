# sqncd
midi sequencer and random pattern generator webapp

- 64 step sequencer
- option to randomly assign notes based on key and scale selection
- sqnc button generates a random pattern
- add up to 3 octaves up or down from base (octave 4)
- accents and ghost notes
- instantly delete all steps with reset button
- copy from step to step
- choose length of pattern
- tempo from 4bpm to 300bpm
- swing value from 0 to 100
- send midi notes to an instrument connected via usb
- option to send clock to all instruments connected via usb

_________________________

Built using Javascript, HTML, CSS, Python and Flask

Uses the WEBMIDI API to handle MIDI interfacing

Uses the Tone.js API to handle tempo and transport

_________________________

sqncd is a free online web app that can be ran in the browser of computers and android devices (phones and tablets).  By using the WEBMIDI API, sqncd is able to detect midi devices connected to the user's device.  Midi messages containing note values can be sent to one device at a time and clock can be configured to be sent to only the device receiving midi note messages or to all devices detected by WEBMIDI.


