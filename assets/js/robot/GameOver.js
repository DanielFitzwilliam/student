let gamePaused = false;

// Function to end the game (customize this according to your game logic)
function endGame() {
    gamePaused = true; // Pause the game

    // Display the "Game Over" text on top of the black canvas
    const gameOverMessage = document.createElement("div");
    gameOverMessage.innerText = "Game Over!";
    gameOverMessage.style.fontSize = "48px";
    gameOverMessage.style.color = "red";
    gameOverMessage.style.position = "absolute";
    gameOverMessage.style.top = "50%";
    gameOverMessage.style.left = "50%";
    gameOverMessage.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(gameOverMessage);
}

export { endGame, gamePaused };