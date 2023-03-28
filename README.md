# sqncd
midi random sequence creator

- clock
- shuffle
- scale selection
- up to 128?? (at least 64)
- ??select # of steps per bar??
- number of octaves
- midi output
- save midi file
- web app

Built using Javascript, Python, SQLite, Flask, HTML, CSS
using the WEBMIDI API to handle MIDI interfacing

------------- sqncd NEXT STEPS -------------
- assign a midi note to a button and send to output when clicked
    - assign a midi channel to send to
- assign a random note to a button
- implement a tempo function to go through one measure
- implement stop/play
- assing a random note when a button in the measure is pressed and play through measure
- loop through measure
- reset notes







------------- TO DO -------------
- sqncd 
    - add button functionality
        - if button clicked, add random note when sqncd, else option to manually assign note
        - remove note when button unclicked
        - monophonic for now
    - figure out how to add tempo
        - add lights to show tempo on sequencer
    - start, stop, pause buttons
    - figure out how to add shuffle
    - link midi channel selected to current button layout
        - make monophonic for now
        - only send to one output for now
    - figure out how to link scales to note selection
        - when scale selected, query scale table
    - figure out how to implement octave section
        - default to middle C
        - choose 3 octaves up or down
        - buttons -3 to +3, able to select as many as possible
        - new selections don't apply to buttons already pressed
    - implement sqnc button
        - choose random scale if none selected
        - choose random key if none selected
        - choose random octaves if all disabled
        - choose random notes if none selected
    - reset button
        - toggles for what to reset
        - k, s, o, n
        - resets reset options
    - display
        - show current note values


- SQL
    - create database
        - users table
            - id AUTOINCREMENT, username TEXT, email TEXT, hash TEXT
        - scale note table
            - possibly just create an array instead when scale is picked based on key
            - ^ would figure out notes based on semitones
        - midi file table
            - store saved formats
                - buttons on/off
                - notes assigned to each button


- Website
    - write up manual page
    - create login section
    - create registration section
    - once logged in, add password reset option to 'account' page
    - add content to account page:
        - password reset
        - midi files
        - change email
        - change color scheme? think of options
    - add news page - where updates will be stored
    - add content to home page
    - add area to donate
        - find out how to connect donate feature


- GUI
    - add tempo display
    - add shuffle display
    - figure out how to display midi channel dropdown
        - need dropdowns both for device and channel
    - add dropdown for scales
        - add another dropdown for key
    - figure out best way to implement octave section
    - move sqncd button over to new column
    - add reset button in sqncd button section
        - add dropdown with options of what to reset
    - add numbers to sequencer buttons
    - add measure numbers?
    - add method to tell which buttons are enabled
        - change color
        - have lights flashing
        - have not displayed on button while flashing
    - add display to show note data?
    - decide on final colors
    - add side panels - decide on colored or wooden
