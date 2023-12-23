---
toc: true
comments: false
layout: post
title: Bracket Fights
description: Practicing with JavaScript + DOM and making a bracket fight creator because why not
courses: { plans: {week: 14} }
type: hacks
blog: true
---

<h2>Enter Participants!</h2>
<div id="inputs">
    <!--Text input field for participants-->
    <input type="text" id="textInput">
    <!--Button to submit a participant-->
    <input type="button" id="enterButton" value="Enter">
    <!--Button to deletes a participant-->
    <input type="button" id="deleteButton" value="Delete">
</div>
<br>
<!--Text to display the list of participants-->
<h3>Current Participants:</h3><br>
<input type="button" id="runSimButton" value="Run Simulation">
<p id="display"></p>

<script type = "module">
    //Variables
    var participantsArray = []; //empty array to store the current list of participants
    var textInput = document.getElementById("textInput"); //gets the text input
    var enterButton = document.getElementById("enterButton"); //gets the enter button
    var deleteButton = document.getElementById("deleteButton"); //gets the delete button
    var runSimButton = document.getElementById("runSimButton"); //gets the run simulation button
    var simState = 0; //variable to enable and disable the other buttons
    var display = document.getElementById("display"); //gets the display lis of participants
    var displayText = "";
    var powersOf2 = []; //holds all of the powers of 2, which will be needed to detect an optimal # of participants
    for (let i = 1; i < 100; i++) { //adds the 1st through 100ths powers of 2 to the powersOf2 array
        powersOf2.push(Math.pow(2, i)); //Math.pow(x, y) outputs the value "x" to the power of "y"
    };
    function updateDisplay() { //function to update the display
        for (let i = 0; i < participantsArray.length; i++) { //for loop that formats the list of participants
            displayText += participantsArray[i] + "<br>"; //add the current item in the list of participants to the display, then add a line break
        };
        display.innerHTML = displayText; //actually set the display to displayText
        displayText = ""; // reset displayText back to empty
    };
    enterButton.addEventListener("click", function() { //Function that runs whenever the update button is clicked
        if (textInput.value != "" && simState === 0) { // check if the text input is not blank, and that the simulation hasn't started
            participantsArray.push(textInput.value); //add the input value to the list of participants
            console.log(participantsArray);
            textInput.value = ""; // reset the text input field
            updateDisplay();
        };
    });
    deleteButton.addEventListener("click", function() { //Function that runs whenever the delete button is clicked
        if (textInput.value != "" && participantsArray.includes(textInput.value) && simState === 0) { // check if the text input is not blank, that the input is in the list of participants, and that the simulation hasn't started
            participantsArray.pop(textInput.value); //remove the input value from the list of participants
            console.log(participantsArray);
            updateDisplay();
        };
        textInput.value = ""; // reset the text input field
    });
    runSimButton.addEventListener("click", function() { //Function that runs whenever the run simulation button is clicked
        if (powersOf2.includes(participantsArray.length)) {
            simState = 1;
            console.log("simulation success");
        } else {
            alert("You need to input a number of participants equal to a power of two.");
        }
    });
</script>