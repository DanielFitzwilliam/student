const canvas = document.getElementById("window");
const ctx = canvas.getContext("2d");

class Paddle {
    constructor(x, y, width, height, speed, yLast) {
        this.x = x; //x position on the screen
        this.y = y; //y position on the screen
        this.width = width; //width of the paddle
        this.height = height; //height of the paddle
        this.speed = speed; //speed of movement of the paddle
        this.yLast = yLast; //y position on screen of the previous frame
        ctx.fillStyle = "white"; //paddle color
        document.addEventListener("keydown", function(e) {
            leftPaddle.controls(e);
        });
    };
    update() {
        this.drawPaddle(this.x, this.y, this.width, this.height, this.yLast);
    };
    drawPaddle(x, y, width, height, yLast) { //draws paddle to the screen
        ctx.clearRect(x, yLast, width, height);
        ctx.fillRect(x, y, width, height);
    };
    controls(e) {
        if(e instanceof KeyboardEvent) {
            this.yLast = this.y
            if(e.key === "w") {
                this.y -= this.speed;
            };
            if(e.key === "s") {
                this.y += this.speed;
            };
            this.update();
        };
    };
};

const leftPaddle = new Paddle (10, 100, 10, 100, 10);

export {leftPaddle}