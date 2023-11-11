//Get canvas element
const canvas = document.getElementById("window");
const ctx = canvas.getContext("2d");

class Ball {
    constructor(x, y, size, speed, xSpeed, ySpeed) {
        this.x = x; //x position on the screen
        this.y = y; //y position on the screen
        this.size = size; //lengths of each side of the square
        this.speed = speed; //combined vector of x and y components
        this.xSpeed = xSpeed; //x component of vector
        this.ySpeed = ySpeed; //y component of vector
    };
    update() {
        if(this.y < 0) { //when the ball hits the ceiling, bounce off
            this.ySpeed *= -1;
        };
        if(this.y + this.size > canvas.height) { //when the ball hits the floor, bounce off
            this.ySpeed *= -1;
        };
        if(this.x < 0) { //when the ball hits the left wall, bounce off (temporary)
            this.xSpeed *= -1;
        };
        if(this.x + this.size > canvas.width) { //when the ball hits the right wall, bounce off (temporary)
            this.xSpeed *= -1;
        };
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.drawBall(this.x, this.y, this.size, this.size);
    };
    drawBall(x, y, width, height) { //draws ball to the screen
        ctx.fillStyle = "red"; // ball color
        ctx.fillRect(x, y, width, height);
    };
};

const ball1 = new Ball (canvas.width / 2, canvas.height / 2, 10, 5, 3, 4);

export {ball1}