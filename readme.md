# Milestone Two

### Code Institute: Interactive Frontend Development Milestone Project

![Beat The Break Logo](https://justinmcc066.github.io/MS2/assets/images/btb-logo.png)

## Beat The Break - [Live Site](https://beatthebreak.com)

Beat The Break is a fun music interactive game based around the famous MPC (Music Production Centre). The MPC is at the heart of most modern music productions but rose to fame in the 80's with the introduction of the Akai MPC60.

This game aims to teach the user the basic operation of a drum sequencer. They will learn how different beats/breaks are programmed across a grid of 16 pads and four differnt drums (Kick, Snare, Hi-Hat and Open Hi-Hat). 

 - - - - 

## Contents

1. [UX](#UX "Goto UX")
    * [User Stories](#User-Stories "Goto User Stories")
    * [Wireframes](#Wireframes "Goto Wireframes")
    * [Surface](#Surface "Goto Surface")

2. [Features](#Features "Goto Features")
    * [Existing Features](#Existing-Features "Goto Existing Features")
    * [Features Left to Implement](#Features-Left-to-Implement "Goto Features Left to Implement")

3. [Technologies Used](#Technologies-Used "Goto Technologies Used")

4. [Testing](#Testing "Goto Testing")
    * [Browsers](#Browsers "Goto Browsers")
    * [Responsiveness / Mobile-Friendly](#Responsiveness-/-Mobile-Friendly "Goto Responsiveness / Mobile-Friendly")
    * [W3C Validation](#W3C-Validation "Goto W3C Validation")
    * [User Story Testing](#User-Story-Testing "Goto User Story Testing")

5. [Deployment](#Deployment "Goto Deployment")
6. [Credits](#Credits "Goto Credits")
    * [Content](#Content "Goto Content")
    * [Code](#Code "Goto Code")
    * [Media](#Media "Goto Media")
    * [Acknowledgements](#Acknowledgements "Goto Acknowledgements")

 - - - -

## UX

The goal of this game is to:

* Match corresponding pad when you hear the beep. If you click correctly then you will get visual feedback from the pad and the sequencer will now play the sound of the drum type you have programmed.

* Provide a fun interactive way to learn the art of drum sequencing.

* Create both an audio and visual response to users hover and click actions for an immersive experience.

* Open up the world of music production and sound sequencing.


### User Stories

* "As a user I want to be engaged by the landing screen."

* "As a user I want to understand the game before I play."

* "As a user I want easy navigation from launch screen to gameplay."
  
* "As a user I want a fun sensory game with both audio and image feedback."

* "As a user I want a game that is not too difficult but increases in difficulty as I progress."

* "As a user I would like the option to make the game more challenging."

* "As a user I would like the game test my concentration."

* "As a user I want know my current score."

* "As a user I want to be aware of the level I am on."

* "As a user I want to be able to reset the game if necessary without the need to exit to the home screen to start over."

* "As a user I want to be able to exit the game from the main game area without using the back button."


### Wireframes

Wireframes were created using [Whimsical](https://whimsical.com/) wireframe editor. Layouts were created for mobile, tablet and desktop to assist the design decisions before coding.

**Desktop**

* [Landing Screen](https://github.com/JustinMcC066/MS2/blob/master/assets/wireframes/desktop-home.png)
* [Main Game Screen](https://github.com/JustinMcC066/MS2/blob/master/assets/wireframes/desktop-menu.png)

**Tablet**

* [Landing Screen](https://github.com/JustinMcC066/MS2/blob/master/assets/wireframes/desktop-home.png)
* [Main Game Screen](https://github.com/JustinMcC066/MS2/blob/master/assets/wireframes/desktop-menu.png)

**Mobile**

* [Landing Screen](https://github.com/JustinMcC066/MS2/blob/master/assets/wireframes/desktop-home.png)
* [Main Game Screen](https://github.com/JustinMcC066/MS2/blob/master/assets/wireframes/desktop-menu.png)


### Surface

Dark and atmospheric reminiscent of arcade halls, a place of the past.

Depth created with parallax and specled images.

Game area is bright, like stepping in to a new

Stylistically retro and reminiscent of classic arcade games i.e, Street Fighter

Fonts used are:
* [Michroma](https://fonts.google.com/specimen/Michroma)

Font is linked from [Google Fonts](https://fonts.google.com/) in the Style Sheet.

 - - - - 

## Features

### Existing Features:

#### Landing Screen:
   - The landing screen is simple in form and has a subltle parallax animaiton based on the users mouse move.
   - An audio track plays in the background and the boombox image is animated to the beat of the music.
   - The landing screen is simple in form and has a subltle parallax animaiton based on the users mouse move.

#### Navigation:
   - Navigation is provided via two buttons on the landing screen, "How to Play" and "Start Game". Further navigation is provided within the modals that these buttons activate.

#### Modals:
   - Modals are used throughout the game to display various elements e.g. "How To Play", "Select Difficulty", "You Win" & "You Lose". This prevents any need for further pages.
   - The select difficulty modal has three options, easy, normal and hard. Hover animations are used and text changes within the button for each to inform the user on how many shots they have to pass the game.
   - The "You Lose" modal gives the user the option to try again or exit to the home/landing screen. A spotify playlist is also embedded in an iFrame within. This playlist contains songs that influenced the beat patterns used in the game.
   - The "You Win" modal gives the user the option to start the game again or exit to the home/landing screen. The same Spotify playlist is also included in this modal.
   - The "How To Play" modal is made up of a carousel 

#### Animations:
   - Animations are used throughout to enhance the user experience and prompt the user if an action is needed.
   - The landing screen has a mousemove parallax animaiton to create depth and atmosphere.
   - The game title on the landing screen hovers on the y-axis giving life to the logo.
   - The boombox image is animated to the beat of the music that plays in the background making the landing screen more immersive and less static.
   - In the main game area a vinyl record spins and record needle arm animates to mimic the playing of the record. This animation is activated when the user hits play on the drum console.
   - The drum console play button animates with a scale effect to prompt the user to hit play when ready.

#### Buttons:
   - Main navigation buttons are designed to resemble the famous plastic arcade buttons.
   - When hovered the main navigation buttons play a sound and another when clicked, enhancing the interactive experience of the game.

#### Sounds:
   - The game is based around a music production instrument therefore audio is imperative.
   - Sounds similar to ones used in 80's arcade games are used to evoke a sense of nostalgia.
   - A sound sprite is used to contain all audio sounds in one single audio file. This fixes issues with playback on ios devices.

#### Drum Patterns:
   - A list of 20 drum patterns are housed withing a JSON file. Each contain a key and value. Each drum, of which there are four (Kinc, Snare, hihat, Open Hi- hat) has a value of 16 digits.
   - These digits are either 1 or 0. These 16 numbers represent the 16 pads.
   - The number 1 represents active and zero is inactive. The pad receives a class if it has the number one and plays a sound. No sound is played if the pad is zero as no class is added. This is how the drum patterns are programmed for each drum.

#### Game Console:
   - The game console in the main game area contains all gameplay feedback i.e. score, level, active drum, 16 sequencer pads, transport buttons and how to play button.

#### Sequencer Pads:
   - The sequencer pads are laid out in a 4x4 grid pattern to resemble a 16 note sequencer.
   - These pads are looped through with a blinking/pulse animation showing the user what pad is currently active.
   - Game play is based around these 16 pads and they form the main interactive element of the game.
   - When clicked, their style and colour change. If the user selects the correct pad it turns green or red if incorrect.

#### Shot Counter:
   - A shot counter is displayed on the drum console. This informs the user on how many shots/clicks they have remainig. The score decreases by 1 selects an incorrect pad.
   - When the shot counter reaches 0, the "You Lose" modal is diaplayed giving the user the option to check out the spotify playlist, try again or exit.

#### Level Display:
   - A level counter is displayed on the drum console letting the player know what level they are on.
   - When the player finishes level three the "You Win" modal is diaplayed giving the user the option to check out the spotify playlist, play again or exit.

### Features Left to Implement
* A feature I would like to implement is a free play mode allowing the player to use the drum sequencer and program their own beats.

 - - - - 

 ## Technologies Used

* [HTML5](https://en.wikipedia.org/wiki/HTML5)
  * For structuring the site pages.

* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
  * For styling the content of each page.

* [Bootstrap 4](https://getbootstrap.com/)
  * Framework used to form the layout of each page.

* [Howler.js](https://howlerjs.com/)
  * Javascript audio library user to call and playback audio.

* [Google Fonts](https://fonts.google.com/)
  * For linking fonts for use on the site.

* [Adobe Illustrator](https://www.adobe.com/ie/products/illustrator.html)
  * For logo and element design.

* [Sketch](https://www.sketch.com/)
  * For UI design.

* [Adobe Photoshop](https://www.adobe.com/ie/products/photoshop.html)
  * For image editing and resizing.

* [Ableton Live](https://www.ableton.com/en/)
  * For sound design, editing and audio sprite creation.

* [Visual Studio Code](https://code.visualstudio.com/)
  * Integrated development environment (IDE) used for development.

* [Git](https://git-scm.com/)
  * Used for version control.

* [GitHub](https://github.com/)
  * Used for managing and storing my code.

* [GitHub Pages](https://pages.github.com/)
  * Used to deploy the site.

 - - - - 


## Testing



## Deployment
Visual Studio Code IDE was used to develop the website. The code was committed to git and pushed to GitHub within Visual Studio Code.

The site is hosted on Github Pages and was deployed using the following steps:

1. Log into GitHub
2. Select correct repository from the dashboard.
3. Select "settings" on the repository page.
4. Under "GitHub Pages" section, choose master brance as source.

Live site can be viewed here: [Beat The Break](https://justinmcc066.github.io/MS2/index.html)

### Local

1. Navigate to [https://github.com/JustinMcC066/MS2.git](https://github.com/JustinMcC066/MS2.git)
2. Click the green 'Clone or Download' button and copy the text url in the dropdown.
3. Open up a terminal window in your IDE of choice.
4. Navigate to your desired file location.
5. Paste the following code and input it into your terminal to clone.
```
git clone https://github.com/JustinMcC066/MS2.git
```

 - - - - 

## Credits

### Content
All content was written and developed by me.

### Code
The following sites were used for inspiration and assistance:

* [Bootstrap Documentation](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
* [CSS Tricks](https://css-tricks.com/)
* [Stack Overflow](https://stackoverflow.com/)

### Media
The images used on this site are royalty free and were obtained from [Unsplash](https://unsplash.com/) and [Freepik](https://www.freepik.com/)

Sounds have been sourced from [FreeSound](https://freesound.org/)

### Acknowledgements
I wish to thank my Code Institute mentor, [Precious Ijege](https://github.com/precious-ijege/) for the feedback and encouragement on this project.

