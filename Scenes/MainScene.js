import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
    }

    preload() {
        this.load.image('bed', '../assets/bed-example.jpg');
        this.load.image('pillow', '../assets/pillow.png');
    }

    create() {
        this.add.image(512, 200, 'bed');
        this.pillow = this.physics.add.image(512,400, 'pillow').setScale(0.2).refreshBody();
    
        this.pillow.setCollideWorldBounds(true);
    }

    update() {
        
    }

}
