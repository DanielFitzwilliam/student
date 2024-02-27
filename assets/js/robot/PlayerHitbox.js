import CharacterPlayer from './Player.js';

export class PlayerHitbox extends CharacterPlayer {
    constructor(player) {
        super(player.canvas, player.image, player.speedRatio);
        this.player = player;
        this.width = 50;
        this.height = 50;
    }

    // Function to update the hitbox position based on the player's position
    update() {
        this.x = this.player.x + (this.player.width - this.width) / 2;
        this.y = this.player.y + (this.player.height - this.height) / 2;
    }
}
