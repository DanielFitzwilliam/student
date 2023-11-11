//Get canvas element
const canvas = document.getElementById("window");
const ctx = canvas.getContext("2d");

class Ball {
    constructor(x, y, size, speed, xSpeed, ySpeed) {
        this.x = x; //x position on the screen
        this.y = y; //y position on the screen
        this.size = size; //lengths of each side of the square
        this.speed = speed; //combined vector of x and y components
        this.xSpeed = this.speed * .6; //x component of vector
        this.ySpeed = this.speed * .8; //y component of vector
    };
    update() {
        this.drawBall(this.x, this.y, this.size, this.size);
    };
    drawBall(x, y, width, height) { //draws ball to the screen
        ctx.fillStyle = "red"; // ball color
        ctx.fillRect(x, y, width, height);
    };
};

const ball1 = new Ball (245, 145, 10);

export {ball1}