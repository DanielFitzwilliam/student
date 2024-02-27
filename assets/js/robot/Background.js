import GameObject from './GameObject.js';

export class Background extends GameObject {
    constructor(canvas, image, speedRatio) {
        super(canvas, image, speedRatio);
    }
    update() {
        this.x = (this.x - this.speed) % this.width;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.width, this.y);
    }
}

export function initBackground(canvas, image, speedRatio) {
    // Build game object
    var background = new Background(canvas, image, speedRatio);

    // Prepare Window extents related to viewport
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Calculate the top position to place the image in the middle
    const topPosition = (maxHeight - background.height) / 2;

    // Calculate the new canvas width
    const canvasWidth = maxWidth;
    const canvasHeight = 550; // Maintain the aspect ratio

    // Calculate the new canvas left position to center it
    const canvasLeft = (maxWidth - canvasWidth) / 2;

    // Set dimensions for the background canvas
    canvas.width = canvasWidth; // Make the canvas as wide as the viewport
    canvas.height = canvasHeight;

    // Set Style properties for the background canvas
    canvas.style.width = `${canvasWidth}px`; // Update the width to match the canvas size
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.position = 'absolute';
    canvas.style.left = `${canvasLeft}px`;
    canvas.style.top = `${topPosition}px`; // Set the top position

    return background;
}

export default Background;
