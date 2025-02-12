import * as Phaser from "phaser";

// Assets taken from: https://nathanaltice.github.io/RocketPatrol/
import starfieldUrl from "/assets/starfield.png";
import spaceshipUrl from "/assets/spaceship.png";
import rocketUrl from "/assets/rocket.png";

export default class Play extends Phaser.Scene {
fire?: Phaser.Input.Keyboard.Key;
left?: Phaser.Input.Keyboard.Key;
right?: Phaser.Input.Keyboard.Key;

starfield?: Phaser.GameObjects.TileSprite;
rocket?: Phaser.GameObjects.Image;
ships: Phaser.GameObjects.Image[] = [];

movementSpeed = 2;
isFiring = false;

constructor() {
super("play");
}

preload() {
this.load.image("starfield", starfieldUrl);
this.load.image("spaceship", spaceshipUrl);
this.load.image("rocket", rocketUrl);
}

#addKey(
name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
): Phaser.Input.Keyboard.Key {
return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
}

create() {
this.fire = this.#addKey("F");
this.left = this.#addKey("LEFT");
this.right = this.#addKey("RIGHT");

this.starfield = this.add
.tileSprite(
0,
0,
this.game.config.width as number,
this.game.config.height as number,
"starfield",
)
.setOrigin(0, 0);
const x_offset = 40;

this.rocket = this.add.image(this.game.config.width as number / 2, this.game.config.height as number - 30, "rocket");
for(let i = 0; i < 3; i++){
this.ships[i] = this.add.image(this.game.config.width as number - x_offset, 30+ i * 40, "spaceship");
}
}

update() {
this.starfield!.tilePositionX -= 3;

if (this.left!.isDown && !this.isFiring) {
this.rocket!.x -= this.movementSpeed;
}
if (this.right!.isDown && !this.isFiring) {
this.rocket!.x += this.movementSpeed;
}
if (this.fire!.isDown && !this.isFiring) {
this.isFiring = true;
}
this.moveShips();
this.moveRocket();
}
moveRocket() {
if (this.isFiring) {
this.rocket!.y -= this.movementSpeed * 2;
if (this.rocket!.y < 0) {
this.isFiring = false;
this.rocket!.y = this.game.config.height as number - 30;
}
}
}
moveShips() {
const x_offset = 40;
this.ships.forEach((ship) => {
if (ship.x > -20) {
ship.x -= this.movementSpeed;
} else {
ship.x = this.game.config.width as number - x_offset;
}
});
}
}