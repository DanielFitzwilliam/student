const canvas = document.getElementById("window");
const ctx = canvas.getContext("2d");

class Paddle {
    constructor(x, y, width, height, speed, yLast) {
        this.x = x; //x position on the screen
        this.y = y; //y position on the screen
        this.width = width; //width of the paddle
        this.height = height; //height of the paddle
        this.speed = speed; //speed of movement of the paddle
        this.keysPressed = {}; //holds all current keys pressed
        ctx.fillStyle = "white"; //paddle color
        document.addEventListener("keydown", (e) => this.keyDownHandler(e));
        document.addEventListener("keyup", (e) => this.keyUpHandler(e))
    };
    update() {
        if(this.keysPressed["w"]) {
            this.y -= this.speed;
        };
        if(this.keysPressed["s"]) {
            this.y += this.speed;
        };
        this.drawPaddle(this.x, this.y , this.width, this.height)
    };
    drawPaddle(x, y, width, height) { //draws paddle to the screen
        ctx.clearRect(x, 0 , width, canvas.height);
        ctx.fillRect(x, y, width, height);
    };
    keyUpHandler(e) {
        this.keysPressed[e.key] = false;
    };
    keyDownHandler(e) {
        this.keysPressed[e.key] = true;
    }
};

const leftPaddle = new Paddle (10, 100, 10, 100, 5);

export {leftPaddle}