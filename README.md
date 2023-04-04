# sqncd
midi sequencer and randomizer webapp

- clock
- shuffle
- key selection
- scale selection
- 64 steps
- ??select # of steps per bar??
- number of octaves
- midi output
- save midi file

Built using Javascript, Python, SQLite, Flask, HTML, CSS
using the WEBMIDI API to handle MIDI interfacing
using the Tone.js API to handle tempo and transport

------------- sqncd NEXT STEPS -------------
- DONE assign a midi note to a button and send to output when clicked
    - DONE assign a midi channel to send to
- DONE assign a random note to a button
- DONE implement a tempo function to go through one measure
- DONE implement stop/play
- DONE assing a random note when a button in the measure is pressed and play through measure
- DONE loop through measure
- DONE reset notes
- DONE incorporate scaleGenerator into randomNote
- DONE check for correct length to run
- DONE run through correct length
- DONE reset button reacts to any of the selector buttons that are pressed
- DONE choose octaves
- DONE choose key/scale

- choose device
- choose midi channel
- add copy function
- add last function
- add undo function


------------- website NEXT STEPS -------------
- create password reset page
- create forgot username page
- create forgot password page
- find way to add id to load on every page when logged in
- create account page
- create donate page 
- add content to all other pages




------------- TO DO -------------
- sqncd 
    - DONE add button functionality
        - DONE if button clicked, add random note when sqncd, else option to manually assign note
        - DONE remove note when button unclicked
        - DONE monophonic for now
    - DONE figure out how to add tempo
        - DONE add lights to show tempo on sequencer
    - DONE start, stop, pause buttons
    - link midi channel selected to current button layout
        - only send to one output for now
        - scan for new midi devices
    - DONE figure out how to link scales to note selection
    - DONE scale note table
    - DONE possibly just create an array instead when scale is picked based on key
    - DONE ^ would figure out notes based on semitones
    - DOEN figure out how to implement octave section
        - DONE default to middle C
        - DONE choose 3 octaves up or down
        - DONE buttons -3 to +3, able to select as many as possible
        - DONE new selections don't apply to buttons already pressed
    - implement sqnc button
        - choose random scale if none selected
        - choose random key if none selected
        - choose random octaves if all disabled
        - choose random notes if none selected
    - DONE reset button
    - DONE ???figure out how to add shuffle???


- SQL
    - create database
        - DONE users table
            - id AUTOINCREMENT, username TEXT, email TEXT, hash TEXT
        - midi file table
            - store saved formats
                - buttons on/off
                - notes assigned to each button


- Website
    - after logging in, how to make website recognize id on all pages
        - change login link to logout
        - add account link
    - write up manual page
        - add quickstart guide
    - DONE - create login section
    - DONE - create registration section
    - once logged in, add password reset option to 'account' page
    - add content to account page/dropdown:
        - password reset
        - midi files
        - change email
        - change color scheme? think of options
        - opt in/out of emails
    - DONE - add news page - where updates will be stored
    - add content to home page
    - add area to donate
        - find out how to connect donate feature


- GUI
    - DONE add tempo display
    - DONE figure out how to display midi channel dropdown
        - DONE need dropdowns both for device and channel
    - DONE add dropdown for scales
        - DONE add another dropdown for key
    - DONE figure out best way to implement octave section
    - DONE add method to tell which buttons are enabled
        - DONE change color
        - DONE have lights flashing
    - DONE decide on final colors
    - DONE add side panels - decide on colored or wooden
    - DONE add shuffle display
