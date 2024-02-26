import Character from './Character.js';
import GameEnv from './GameEnv.js';
import GameControl from './GameControl.js';

export class Bullet extends Character {
    constructor (canvas, image, data, xPercentage, yPercentage, name) {
        super(canvas, image, data);

        //required, goes unused
        this.name = name;

        //bullet's initial position
        this.y = 0;
        this.x = xPercentage * GameEnv.innerWidth;

        //bullet's initial speed
        this.speed = this.speed * 1;

        //rotate sprite to make the bullet face downwards
        this.canvas.style.transform = "rotate(90deg)";
    }

    update() {
        super.update();

        //Random Event 2: Time Stop All Enemies
        if (GameControl.randomEventId === 2 && GameControl.randomEventState === 1) {
            this.speed = 0;
            if (this.name === "goombaSpecial") {
                GameControl.endRandomEvent();
            };
        };

        //move the bullet downwards
        this.y += this.speed;

        //move the bullet back to the top of the screen when it hits the bottom
        if (this.y > (GameEnv.innerHeight - this.canvas.height)) {
            this.y = 0;
        };
    }
}

export default Bullet;