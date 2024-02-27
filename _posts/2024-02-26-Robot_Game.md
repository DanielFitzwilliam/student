---
layout: post
title: Universum
toc: true
comments: true
image: /images/robot/newBackground.jpg
playerSprite: /images/robot/robotSpritesheet.png
---

<!-- Liquid code, run by Jekyll, used to define the location of assets -->
{% assign backgroundFile = site.baseurl | append: page.image %}
{% assign playerSpriteImage = site.baseurl | append: page.playerSprite %}

<!--Styling for Canvas-->
<style>
    #background {
        border: 3px solid white; /* Add a white border with 10px width */
    }
</style>

<!--Connects audio id to actual audio file-->
<audio id="winnerSound" src="{{site.baseurl}}/assets/audio/winner.wav" preload="auto"></audio>

<script type="module">
    
    //Function for Sound
    let sound = 0;
    function playWinnerSound() {
        const winnerSound = document.getElementById("winnerSound");
        winnerSound.play();
    }

    //Import code from other files and apply it to the file
    import GameEnv from '{{site.baseurl}}/assets/js/robot/GameEnv.js';
    import { initBackground } from '{{site.baseurl}}/assets/js/robot/Background.js';
    import { initPlayer} from '{{site.baseurl}}/assets/js/robot/Player.js';
    import { initEnemy} from '{{site.baseurl}}/assets/js/robot/Enemy.js';
    import { endGame, gamePaused } from '{{site.baseurl}}/assets/js/robot/GameOver.js';
    import {getScore, score} from '{{site.baseurl}}/assets/js/robot/Score.js';

    // Prepare Background Image
    const backgroundImg = new Image();
    backgroundImg.src = '{{backgroundFile}}';  // Jekyll/Liquid puts the filename here

    // Prepare HTML with Background Canvas
    const backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.id = "background";
    document.body.appendChild(backgroundCanvas);

    // Prepare Player Image
    const playerImg = new Image();
    playerImg.src = "{{playerSpriteImage}}";

    // Prepare HTML with Player Canvas
    const playerCanvas = document.createElement("canvas");
    playerCanvas.id = "characters";
    document.body.appendChild(playerCanvas);

    // Prepare Enemy Image
    const enemyImg = new Image();
    enemyImg.src = "{{playerSpriteImage}}";

    // Prepare HTML with Enemy Canvas
    const enemyCanvas = document.createElement("canvas");
    enemyCanvas.id = "enemies";
    document.body.appendChild(enemyCanvas);
    
    // Setup Globals
    GameEnv.gameSpeed = 4; //Controls game speed (player, background, enemies)
    GameEnv.controls = document.getElementById("controls");

    //Applies background functionality and updates game animation
    backgroundImg.onload = function () {
        // Background object(s)
        const backgroundSpeedRatio = 0.2 //Controls speed of background
        var backgroundObj = initBackground(backgroundCanvas, backgroundImg, backgroundSpeedRatio); //Sets up background properties

        // Character object(s)
        //player
        const playerSpeedRatio = 0.7 //Controls speed of player
        var playerObj = initPlayer(playerCanvas, playerImg, playerSpeedRatio); //Sets up player properties
        //enemy
        const enemySpeedRatio = 0.7 // Controls speed of enemy (unused currently)
        var enemyObj = initEnemy(enemyCanvas, enemyImg, enemySpeedRatio);

        //Checks for collision between the player & enemy
        function checkCollisions(playerObj, enemyObj) {
        if (
            playerObj.hitbox.x < enemyObj.hitbox.x + enemyObj.hitbox.width &&
            playerObj.hitbox.x + playerObj.hitbox.width > enemyObj.hitbox.x &&
            playerObj.hitbox.y < enemyObj.hitbox.y + enemyObj.hitbox.height &&
            playerObj.hitbox.y + playerObj.hitbox.height > enemyObj.hitbox.y
        ) {
            //Run endGame function
            endGame();
        }
    }

        // Game loop
        function gameLoop() {
            if (!gamePaused) {

                // Check if the score reaches 20
                if (getScore() === 20) {
                    if (!sound)
                        playWinnerSound()
                        sound = 1;
                }
                
                //Draws and updates background animation
                backgroundObj.update();
                backgroundObj.draw();
                
                //Draws and updates player animation
                playerObj.update();
                playerObj.draw();
                
                //Draws and updates enemy animation
                enemyObj.update();
                enemyObj.draw();

                //Updates Hitboxes for both the player & enemy
                playerObj.updateHitbox();
                enemyObj.updateHitbox();

                //Checks for collisions between the player and enemy
                checkCollisions(playerObj, enemyObj);

                requestAnimationFrame(gameLoop);  // cycle the game, aka recursion
            }
        }

        // Start the game
        gameLoop();
    }
</script>

<!--Centers the Button -->
<style>
    div {
        text-align: center;
    }
</style>

<!--HTML section for Buttons-->
<div>
    <!--Loads Youtube Video-->
    <div id="player"></div>
    <!--HTML for Buttons-->
    <button onclick="input()" id="swapInput">Show Input</button>
    <button onclick="mute()" id="muteButton">Mute</button>
    <div id="inputVisible" style="display:none">
        <input type="text" id="URLId" placeholder="Insert URL Here">
        <button onclick="changeLink()">Swap Song</button>
        <br><button onclick="defaultMusic()" id="defaultButton">Switch to Default 2</button>
    </div>
    <!--Warning Message-->
    <p>Please be aware some videos do not work with the background music due to various reasons</p>
</div>

<script>
    // Code for default button
    function defaultMusic() {
        const videoId = player.getVideoData().video_id;
        if (videoId === "xZhrZMervZU") {
            const videoId = "VGNcGl1zVjQ";
            player.loadVideoById(videoId);
            document.getElementById("defaultButton").innerHTML = "Switch to Default 1"
            console.log(videoId)
        }
        if (videoId !== "xZhrZMervZU") {
            const videoId = "xZhrZMervZU";
            player.loadVideoById(videoId);
            document.getElementById("defaultButton").innerHTML = "Switch to Default 2"
            console.log(videoId)
        }
    }

    // Input bar revealer
    let inputBar = true;
    function input() {
        const inputVisible = document.getElementById("inputVisible");
        if (inputBar) {
            inputVisible.style.display = "block";
            document.getElementById("swapInput").innerHTML = "Hide Input"
        } else {
            inputVisible.style.display = "none";
            document.getElementById("swapInput").innerHTML = "Show Input"
        }
        inputBar = !inputBar;
    }
    
    // Code for video swapper
    let player;
    function changeLink() {
        const inputText = document.getElementById("URLId").value;
        if (inputText.length >= 11) {
            const videoId = inputText.substring(inputText.length - 11);
            player.loadVideoById(videoId);
            document.getElementById("defaultButton").innerHTML = "Switch to Default 1"
        }
    }

    // Mute Button
    function mute() {
        if (player.isMuted()) {
            player.unMute();
            document.getElementById("muteButton").innerHTML = "Mute"
        } else {
            player.mute();
            document.getElementById("muteButton").innerHTML = "Unmute"
        }
        isMuted = !isMuted;
    }

// Load the YouTube IFrame API asynchronously
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {

    //Assigns x a random variable
    let x = Math.random();

    //If Audio is less than 0.5 assign the first link, if not, assign the second link
    let audio = (x < 0.5) ? 'xZhrZMervZU' : 'VGNcGl1zVjQ';
    if (audio === "VGNcGl1zVjQ") {
        document.getElementById("defaultButton").innerHTML = "Switch to Defailt 1"
    }

    //Properties for Youtube Player
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: audio, // Randomized video ID
        playerVars: {
            'autoplay': 1, //Automatically Plays Video
            'loop': 1 //Loops Audio
        },
    });
}

    //Further Documentation on Youtube API
    //https://developers.google.com/youtube/iframe_api_reference#Playback_controls
    //https://developers.google.com/youtube/player_parameters
</script>