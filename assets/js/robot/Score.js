// Score.js

let score = 0;

//Adds to Score & Updates Display
function incrementScore() {
    score += 5;
    updateScoreDisplay(); // Call the function to update the score display
}

//Returns the Score
function getScore() {
    return score;
}

//Creates Score Display
function createScoreDisplay() {
    const scoreDisplay = document.createElement('div'); //Creates Element for Score
    scoreDisplay.id = 'scoreDisplay'; //Id
    scoreDisplay.textContent = `Score: ${score}`; //Text format
    document.body.appendChild(scoreDisplay); //Adds score to webpage
    applyScoreStyles(scoreDisplay); // Apply styles to the score display
}

//Updates Score Display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay'); //Gets the scoreDisplay with the ID
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${getScore()}`; //Updates the score
    }
}

//Styling for Score Display
function applyScoreStyles(element) {
    element.style.position = 'absolute';
    element.style.top = '10px';
    element.style.left = '10px';
    element.style.fontSize = '20px';
    element.style.color = 'white';
}

// Initialize the score display when the page loads
window.addEventListener('load', createScoreDisplay);

//Exports Functions
export { incrementScore, getScore, score };
