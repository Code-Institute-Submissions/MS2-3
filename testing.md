# Testing

## Contents

1.  [Browsers](#Browsers "Goto Browsers")
2.  [Responsiveness / Mobile-Friendly](#Responsiveness-/-Mobile-Friendly "Goto Responsiveness / Mobile-Friendly")
3.  [Code Validation](#Code-Validation "Goto Code Validation")
4.  [User Story Testing](#User-Story-Testing "Goto User Story Testing")
5.  [Manual Testing](#Manual-Testing "Goto User Manual Testing")
    * [Audio](#Audio "Goto Audio")
    * [Game Functionality](#Game-Functionality "Goto Game Functionality")
    * [Design](#Design "Goto Design")
    * [Gameplay](#Gameplay "Goto Gameplay")

## Browsers
The site was tested across multiple browsers - Chrome, Safari, Firefox and Opera to ensure each page displayed correctly.
Browser compatibility was also tested using the Lambdatest App.

## Responsiveness / Mobile-Friendly
The site's reponsiveness was continuously monitored during the development stage using Chromes *Dev Tools*.
Media queries have been added to ensure all elements resize with any issues at the various Bootstrap breakpoints.
Further testing was done using [Responsive Test Tool](http://responsivetesttool.com/) which allowed for testing on additional devices - no errors were recorded.
Responsiveness was also tested using the Lambdatest App.

![Responsiveness Testing](https://raw.githubusercontent.com/JustinMcC066/MS2/master/readme_images/site-responsiveness.jpg)
![Testing Feedback Table](https://raw.githubusercontent.com/JustinMcC066/MS2/master/readme_images/site-testing.jpg)

## Code Validation
All html pages were checked using [W3C Markup Validation](https://validator.w3.org/) and passed with no errors.

The CSS file was checked using [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) and passed with no errors.

All JavaScript files were checked using [JS Hint](https://jshint.com/) No errors were reported.


## User Story Testing

* "As a user I want to be engaged by the landing screen."
  * Landing screen is complete with audio and animations that set the atmosphere and tone for the game.

* "As a user I want to understand the game before I play."
  * "How To Play" button is centered on screen and coloured individually to stand out. A how to play modal is displayed when clicked with all necessary information to undestand gameplay. A breakdown of the the differences between each difficulty is also included.

* "As a user I want easy navigation from launch screen to gameplay."
  * "Start Game" button is positioned in the middle of the screen and is vibrantly coloured to be easily accesible. When clicked "Select difficulty" modal is displayed allowing the user to start the game at their preferred difficulty.

* "As a user I want a fun sensory game with both audio and image feedback."
  * Sound is used throughout for feedback. Buttons when hovered play sounds. Incorrect pads when clicked play an error sound.
  * Images and elements are animated. Buttons respond visually to clicks and pads change colour for correct (green) and incorrect (red) feedback.

* "As a user I want a game that is not too difficult but increases in difficulty as I progress."
  * The sounds build up over time as you program the drum sequencer which slowy increases the difficulty in identifying the beep sound.

* "As a user I would like the option to make the game more challenging."
  * When the user clicks the "Start Game" button on the landing screen a "Select difficulty" modal is displayed. Three levels of difficulty are available to choose from: Easy, Normal and Hard.

* "As a user I would like the game test my concentration."
  * The user must pay attention to both sound and imagery and respond accordingly. This tests both the users visual and aural response.

* "As a user I want know my current score."
  * On the main game screen the score/shot counter is located on the drum console and styled to stand out from the rest of the console.
  * The score/shot counter updates immediately when the user selects an incorrect pad.

* "As a user I want to be aware of the level I am on."
  * On the main game screen the level number is displayed next to the score/shot counter and level number highlighted in red.
  * In addition, when the user completes the current level, a level modal is displayed and announces the next level.

* "As a user I want to be able to pause the game from the main game area without losing my progress."
  * The play button changes to a pause button when the game is active. This allows the user to pause the sequencer and all sounds. This button reverts back to a play button which will resume game-play when clicked.

* "As a user I want to be able to reset the game if necessary without the need to exit to the home screen to start over."
  * If the user loses all their shots a "Try Again" modal is displayed where the user has the option to reset the game and try again or exit to the main screen.
  * If the user wins, a "You Win" modal is displayed giving the user the option to play again or exit to the main screen.

* "As a user I want to be able to see the game instructions from within the main game area."
  * A how to play button is located on the drum console in the main game area. When clicked, the "How To Play" modal is displayed.      

* "As a user I want to be able to exit the game from the main game area without using the back button."
  * A home button is located on the drum console in the main game area. This exits the game when clicked and brings the user to the landing screen.

## Manual Testing

Manual testing was completed at various stages throughout development. This ensured all elements responded correctly to each interaction as intended and functions ouput the correct result.
Logging values to the console was key to identifying incorrect calculations and outcomes. [Chrome Developers Tools](https://developers.google.com/web/tools/chrome-devtools)Chrome Developers Tools was used throughout all stages of development.

### Audio

1.  ##### Issue
  * Audio was loaded and called using the < audio > html element. However after deploying the site to github pages and viewing on mobile there was an issue with playback.
1.  ##### Fix
  * Android devices handled the playback of the drum sounds in the sequencer without any issues but Apple devices would only play one sound every revolution of the sequencer.
  * In order to fix this issue I used the Howler.js audio library which handles audio much better and is much more reliable across all platforms.

2.  ##### Issue
  * Separate audio files caused lag due to the individual file sizes.
2.  ##### Fix
  * I created a single audio file to house all the sounds used in the game. Howler.js allows you to create audio sprites within a single audio file which are accessed by their position in milliseconds.
  * Using the audio sprites prevented lagging issues and responded much quicker to user interactions.

3.  ##### Issue
* Title music loop continued to play when drum sequencer was active.
3.  ##### Fix
  * Howlers global stop function was used on the start game button to stop the title music from playing.
  * This however cut the sound off and felt quite abrupt so I added a fading title music sound sprite to be played immediately after the global stop function. This allowed for a smoother transition in sound.

4.  ##### Issue
  * Audio sprite was getting cut off before finishing when exiting the game. The location.reload function stopped all processes when called thus stopping all audio from playing.
4.  ##### Fix
  * I added a setTimeout function to delay the location.reload by 500 milliseconds giving the exit sound time to play in full. This made the transition from the main game to the landing screen less abrupt.

5.  ##### Issue
  * Click functions were added to the how to play and start game buttons which paused the bombox animationa and faded the title music. The animation was reactivated and title music was played again when the "X" close button or ready buttons were clicked. This caused an issue in the main game when the how to play modal was activated as the title music began to play when dismissed which interrupted the game.
5.  ##### Fix
  * A condition was added to the function that plays the title music when the modals are dismissed. This only allowed the title music to be played when the landing scren was activated.

6.  ##### Issue
  * The game title music does not play until the user clicks on their browser window - this is due to a policy change introduced by Google and Apple relating to auto-play audio.
6.  ##### Fix
  * A portion of the title music is played when the user clicks the how to play button and start game button. When the user dismisses these modals the title music plays on loop.

#### Game Functionality

1.  ##### Issue
  * Vinyl arm and spinning record animations interfered with the playback of the drum sequencer and caused the blinking light animation that loops over each pad to lag.
1.  ##### Fix
  * The animation was reversed from playing when the play button was clicked to playng when the main game area is displayed and stopping when the play button is clicked.

2.  ##### Issue
  * When the "You Win" and "You Lose" modals were displayed the user could click outside to dismiss the modal. This allowed the game to play beyond the end level and into minus points making the game never ending.
2.  ##### Fix
  * A data-backdrop="static" attribute was applied to each modal to prevent the user from dismissing the modal. This forces the user to reset the game by chosing "Play Again" or "Try Again" buttons or exit the game.

3.  ##### Issue
  * The pads advance when the number of correct click are equal to the number of pads in the pattern. However, the user could continue to click one correct pad which would increment the variable used to check the number of correct click by 1. This caused a nuber of issues: the pads advanced before all correct pads were selected causing the beep to play in the position of the previous and current drum type.
  * The user could also accidentally double click an incorrect pad and lose two shots.
3.  ##### Fix
  * A class was created with the pointer event of none which was added to each pad when clicked. This disabled the pads fom further clicks. This class was then removed when the user reaches a new level or resets the game.

#### Design

1.  ##### Issue
  * Images became squashed and didn't scale proportionately on Safari and apple devices.
1.  ##### Fix
  * Align-self classes were used to fix this issue.

#### Gameplay

1.  ##### Issue
  * When testing with family and friends I found that they ignored the play button which is necessary to start the sequencer. Instead they clicked the pads first which caused confused.
1.  ##### Fix
  * I added a scale animation to the play button to draw the users attention.
  * I dropped the opacity of the drum pads making them look disabled.
  * A pointer event of none was also applied to the drum pads which prevented the user from clicking the pads and running down their shot counter before the game began.

2.  ##### Issue
  * When testing with family and friends I noticed that they found it difficult to keep up with the speed of the game.
2.  ##### Fix
  * A variable was created to store a tempo value which was set for each difficulty. The tempo now differs for each difficulty making the easy mode much slower alowing for a much more enjoyable experience for unfamiliar users. Users are now more engaged at the easier difficulty and gives them the confidence to try the harder difficulties.