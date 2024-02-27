import Character from './Character.js';
import { incrementScore, score } from './Score.js';

// Creates animation for the enemy
const enemyAnimation = {
    scale: 0.15,
    width: 798,
    height: 735,
    attack: { row: 3, frames: 9, idleFrame: { column: 7, frames: 0 } },
};

//Variables to Delay Animation timing
let frameUpdateDelay = 2;
let frameCounter = 0;

// Enemy class
export class Enemy extends Character {
    constructor(enemyCanvas, image, speedRatio, domain, domainOffset) {
        //Defines Dimension of Enemy Hitbox
        const hitbox = {
            width: 50,
            height: 50,
        };

        super (enemyCanvas, image, speedRatio, enemyAnimation.width, enemyAnimation.height, enemyAnimation.scale);
        
        const enemyCanvasStyle =  document.getElementById("enemies"); //Used for reverse scaling of the canvas to make the enemy turn left 
        this.enemyCanvasStyle = enemyCanvasStyle

        //Hitbox is now a property of enemy
        this.hitbox = hitbox;

        this.domain = domain; // Sets the distance that the enemy will walk before turning around
        this.domainOffset = domainOffset; // Sets the distance that the enemy will walk before turning around
        };

        //Updates hitbox to match enemy position
        updateHitbox() {
            this.hitbox.x = this.x
            this.hitbox.y = this.y
            //console.log('Hitbox:', this.hitbox); //logs the position of the hitbox
        }

        setDomain(domain){
            this.domain = domain;
        };

        setDomainOffset(domainOffset){
            this.domainOffset = domainOffset;
        };
        
        //update the enemy every repeat of the game loop
        update() {
            this.domainOffset += this.enemySpeed; // "domainOffset" essentially works as a timer that counts up every second.
            if(this.domainOffset > -1 && this.domainOffset < this.domain) { // move right until the timer equals "domain"
                this.x += this.enemySpeed; // move two spaces to the right
                this.enemyCanvasStyle.style.transform = 'scaleX(1)'; //makes enemy face right
            } else if (this.domainOffset > this.domain && this.domainOffset < this.domain * 2) {
                this.x -= this.enemySpeed; //move two spaces to the left
                this.enemyCanvasStyle.style.transform = 'scaleX(-1)'; //makes enemy face left
            } else if (this.domainOffset > this.domain * 2) {
                this.domainOffset = 0; // reset the counter back to 0
                incrementScore(); //add 5 to the score
            //If Enemy reaches right side, add 5 to the score
            } else if (this.domainOffset === this.domain) {
                incrementScore();
            }
            if(score===10 && this.enemySpeed===4) {
                this.enemySpeed += 4;
                console.log(this.enemySpeed)
            };

             //Delays Frame Animation
            frameCounter++
            if (frameCounter >= frameUpdateDelay) {
                //Resets FrameCount
                frameCounter = 0;
                
                //Updates Animation
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        };
};

// Initializes the enemy 
export function initEnemy(_canvasId, image, gameSpeed, speedRatio, domain, domainOffset, enemySpeed) {
    var enemy = new Enemy(_canvasId, image, gameSpeed, speedRatio, domain, domainOffset, enemySpeed);
        enemy.setFrameY(enemyAnimation['attack'].row);
        enemy.setFrameX(enemyAnimation['attack'].column);
        enemy.setMaxFrame(enemyAnimation['attack'].frames);
        enemy.setX(1200); // Set an initial X position for the enemy
        enemy.setY(520); // Set an initial Y position for the enemy
        enemy.setDomain(1200); // Sets the distance that the enemy will walk before turning around
        enemy.setDomainOffset(1200); // The current x location of the enemy relative to its domain
        enemy.enemySpeed = 4; // the speed of the enemy
    return enemy;
};

export default Enemy;