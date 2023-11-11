import {leftPaddle} from "./paddle.js"

const button = document.getElementById("play");
button.addEventListener("click", startGameLoop);

let gameState; //0 for off. 1 for on
let testCounter; //counts to 10 then ends game loop

resetGameLoop();
function resetGameLoop() {
    gameState = 0;
};

function startGameLoop() {
    if(gameState === 0) {
        gameState = 1;
        testCounter = 0;
        gameLoop();
    };
};

function gameLoop() {
        testCounter++;
        leftPaddle.update();
        if (testCounter < 1000) {
            gameLoop();
        };
};