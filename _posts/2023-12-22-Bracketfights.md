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
<h3>Current Participants:</h3>
<input type="button" id="runSimButton" value="Run Simulation">
<p id="display"></p>
<br>
<h3>Battle Center</h3>
<div id="battleCenter">
    <h3>Who would win?</h3>
        <input type="button" id="battleChoice1" value="Choice1">
        <input type="button" id="battleChoice2" value="Choice2">
</div>

<script type = "module">
    //Variables
    var participantsArray = []; //empty array to store the full list of participants
    var winnersArray = []; //empty array to store the winners of the round
    var simArray = []; //empty array to store the list of participants for the current round
    var textInput = document.getElementById("textInput"); //gets the text input
    var enterButton = document.getElementById("enterButton"); //gets the enter button
    var deleteButton = document.getElementById("deleteButton"); //gets the delete button
    var runSimButton = document.getElementById("runSimButton"); //gets the run simulation button
    var simState = 0; //variable to enable and disable the other buttons
    var display = document.getElementById("display"); //gets the display list of participants
    var displayText = ""; //empty variable to store the current formatted list in the list of participants
    var choice1Button = document.getElementById("battleChoice1"); //gets the first battle button
    var choice2Button = document.getElementById("battleChoice2"); //gets the second battle button
    var currentListNumber = 0; //number to store the current place going down the list of participants
    var powersOf2 = []; //holds all of the powers of 2, which will be needed to detect an optimal # of participants
    for (let i = 1; i < 10; i++) { //adds the 1st through 10th powers of 2 to the powersOf2 array
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
    document.addEventListener("keydown", function() { //Function that runs whenever the enter key is pressed
        if (textInput.value != "" && simState === 0 && event.key === "Enter") { // check if the text input is not blank, that the simulation hasn't started, and that the key pressed is the enter key
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
        if (powersOf2.includes(participantsArray.length)) { //check if the number of participants is equal to a power of 2
            simState = 1; //deactivates the entry buttons
            for (let i = 0; i < participantsArray.length; i++) {
                simArray.push(participantsArray[i]);
            };
            currentListNumber = 0;
            choice1Button.value = simArray[0]; //sets the labels on the button to the first and second choice
            choice2Button.value = simArray[1];
        };
    });
    choice1Button.addEventListener("click", function () { //when the first choice button is clicked, run the function
        battleChoice(choice1Button.value);
    });
    choice2Button.addEventListener("click", function () { //when the second choice button is clicked, run the function
        battleChoice(choice2Button.value);
    });
    function battleChoice(choice) { //function that runs when a battle choice is made
        if (simState === 1) { //check that the simulation is active
            winnersArray.push(choice); //add the choice on that button's value to the list of winners
            currentListNumber += 2; //update the current list  for the next set of options
            console.log(winnersArray)
            if (currentListNumber > simArray.length - 1) { //check if the list of choices has been fully exhausted
                console.log("round over")
                for (let i = 0; i < winnersArray.length; i++) { //copies all of the values from winners into the next round
                    simArray.push(winnersArray[i]);
                };
                for (let i = 0; i < simArray.length; i++) { //empties the winners array for the next round
                    winnersArray.shift();
                };
                currentListNumber = 0; //sets the current list number back to the start
                choice1Button.value = simArray[currentListNumber]; //change the 1st button value to the next item
                choice2Button.value = simArray[currentListNumber + 1]; //change the 2nds button value to the next item
            } else { //this runs unless the array is done
                choice1Button.value = simArray[currentListNumber]; //change the 1st button value to the next item
                choice2Button.value = simArray[currentListNumber + 1]; //change the 2nds button value to the next item
            };
        };
    };
</script>