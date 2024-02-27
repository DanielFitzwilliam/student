import GameEnv from './GameEnv.js';
import Character from './Character.js';

const PlayerAnimation = {
    // Sprite properties
    scale: 0.15,
    width: 798,
    height: 735,

    //Animations
    idle: { row: 0, frames: 20, idleFrame: { column: 7, frames: 0 } }, //Default Animation when idle
    death: {row: 2, frames: 40, idleFrame: {column: 7, frames: 0}}, //Animation when colliding with enemy
	d: { row: 0, frames: 20, idleFrame: { column: 7, frames: 0 } }, // Walk right with 'd' key
    w: { row: 1, frames: 32, idleFrame: {column: 7, frames: 0}}, // Jump up with 'w' key
	a: { row: 6, frames: 10, idleFrame: { column: 7, frames: 0 } }, // Walk left with 'a' key
}

//Variables to Delay Animation timing
let frameUpdateDelay = 2;
let frameCounter = 0;

export class CharacterPlayer extends Character {
    constructor(playerCanvas, image, speedRatio) {
        // Define the hitbox as a separate object
        const hitbox = {
            width: 50,
            height: 50,
        };

        super(playerCanvas, image, speedRatio, PlayerAnimation.width, PlayerAnimation.height, PlayerAnimation.scale);

        //Sets the hitbox as the propety of the player
        this.hitbox = hitbox;

        //When Player isn't moving, call idle animation
        this.setFrameY(PlayerAnimation.idle.row);
        this.setFrameX(PlayerAnimation.idle.idleFrame.column);
        this.setMaxFrame(PlayerAnimation.idle.idleFrame.frames);

        //Player is Idle on initialization
        this.isIdle = true;

        //Jumping Properties
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isJumping = false;

        //Variable for Flipping the Player Left & Right
        this.isFacingRight = true;
        const playerCanvasStyle =  document.getElementById("characters"); //Gets the canvas specified to the player 
        this.playerCanvasStyle = playerCanvasStyle //Canvas Style is now a property of the player
    }

    //Function to run when jumping is enabled
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = -15;
        }
    }

    //Updates the Position of the hitbox to match the player
    updateHitbox() {
        this.hitbox.x = this.x
        this.hitbox.y = this.y
        //console.log('Hitbox:', this.hitbox); //logs the position of the hitbox
    }

    // Player perform a unique update
    update() {
        //Logic for moving the Player to the Left
        if (this.frameY === PlayerAnimation.a.row && !this.isIdle) {
            this.x -= this.speed;
        }
        
        //Logic for moving the Player to the Right
        else if (this.frameY === PlayerAnimation.d.row && !this.isIdle){
            this.x += this.speed;
        }

        //Logic for moving the Player Upwards
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;

            if (this.y >= 523.6) {
                this.isJumping = false;
                this.y = 523.6;
            }
        }

        //Logic for making player face left or right
        if (this.isFacingRight) {
            this.playerCanvasStyle.style.transform = 'scaleX(1)'; // Player faces right
        } else {
            this.playerCanvasStyle.style.transform = 'scaleX(-1)'; // Player faces left (flipped)
        }

        //Delays Frame Animation
        frameCounter++
        if (frameCounter >= frameUpdateDelay) {
            frameCounter = 0;
            // Update animation frameX of the object
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    };
};
// Can add specific initialization parameters for the Player here
// In this case the Player is following the default character initialization
export function initPlayer(canvasId, image, gameSpeed, speedRatio) {
    // Create the Player character
    var player = new CharacterPlayer(canvasId, image, gameSpeed, speedRatio);

    // Player Frame position and Frame extents
    player.setFrameY(PlayerAnimation['a'].row);
    player.setFrameX(PlayerAnimation['a'].idleFrame.column)
    player.setMaxFrame(PlayerAnimation['a'].idleFrame.frames);

    // Player Screen Position
    player.setX(100);
    player.setY(524);

    // New event listeners for keydown and keyup events
    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65: // 'A' key
                player.setFrameY(PlayerAnimation['a'].row);
                player.setMaxFrame(PlayerAnimation['a'].frames);
                player.isIdle = false;
                player.isFacingRight = false;
                break;
            case 68: // 'D' key
                player.setFrameY(PlayerAnimation['d'].row);
                player.setMaxFrame(PlayerAnimation['d'].frames);
                player.isIdle = false;
                player.isFacingRight = true;
                break;
            case 87: // 'W' key
                player.jump();
                player.setFrameY(PlayerAnimation['w'].row);
                player.setMaxFrame(PlayerAnimation['w'].frames);
                player.isIdle = false;               
                break;
        }
    });

    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65: // 'A' key
            case 68: // 'D' key
            case 87: // 'W' key
            case 83: // 'S' key
                //When there is no movement, player is idle and activate idle animation
                player.isIdle = true;
                player.setFrameY(PlayerAnimation['idle'].row);
                player.setMaxFrame(PlayerAnimation['idle'].frames);
                break;
        }
    });

    // Player Object
    return player;
}

export default CharacterPlayer;