# sqncd

midi sequencer and random pattern generator webapp

**sqncd** can be found at https://www.sqncd.com/

![sqncd](https://www.sqncd.com/static/css/sqncd-promo.png)

-   64 step sequencer
-   option to randomly assign notes based on key and scale selection
-   sqnc button generates a random pattern
-   add up to 3 octaves up or down from base (octave 4)
-   accents and ghost notes
-   instantly delete all steps with reset button
-   copy from step to step
-   choose length of pattern
-   tempo from 4bpm to 300bpm
-   swing value from 0 to 100
-   send midi notes to an instrument connected via usb
-   option to send clock to all instruments connected via usb

---

Built using Javascript, HTML, CSS, Python and Flask

Uses the WEBMIDI API to handle MIDI interfacing between devices

Uses the Tone.js API to handle tempo and transport

---

**sqncd** is a free online web app that runs in the browser of computers and android devices (phones and tablets). iOS devices (iphones and ipads), are currently not supported as iOS does not support WEBMIDI. **sqncd** is designed to be quick and easy to use and is a great sketchpad to aid musicians struggling with writer's block. Through it's randomization features, **sqncd** can be used as a tool to create musical ideas. sqncd also features a 'user' mode which allows it to function as a typical sequencer, allowing the user to input their choice of note in any step. Accents and ghost notes help add dynamism to patterns and can be applied on any step.

By using the WEBMIDI API, **sqncd** is able to detect MIDI devices connected to the user's device. MIDI messages containing note values can be sent to one device at a time and clock can be configured to be sent to only the device receiving MIDI note messages or to all devices detected by WEBMIDI. Clock to all is currently not supported on mobile browsers and can only be used on desktop browsers.

A quickstart guide can be found at https://www.sqncd.com/quickstart

The full manual can be found at https://www.sqncd.com/manual

---

Acknowledgments

WEBMIDI.js, documentation: https://webmidijs.org/api/

Tone.js - documentation: https://tonejs.github.io/docs/14.7.77/index.html

Guitarland.com - idea for organizing midi scales- documentation: https://www.guitarland.com/Music10/FGA/LectureMIDIscales.html
