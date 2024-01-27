import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
    }

    preload() {
        this.load.image('bed', '../assets/bed-example.jpg');
    }

    create() {
        this.add.image(512, 200, 'bed');
    }

    update() {
        
    }

}
