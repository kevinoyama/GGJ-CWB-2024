import Phaser from 'phaser';
import Capy from '../Players/Capy';
import Pillow from '../Players/Pillow';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;
        this.Capy = new Capy(this);
        this.Pillow = new Pillow(this);
    }

    preload() {
        this.load.image('bed', '../assets/Capybaras_3.jpg');
        this.load.image('pillowSpecialAttack', '../assets/sprite_31.png');
        this.Pillow.preload();
        this.Capy.preload();
    }

    create() {
        this.add.image(512, 200, 'bed');
        this.Pillow.create();
        this.Capy.create();
        this.physics.add.collider(this.Pillow.player, this.Capy.player);
        this.physics.add.collider(this.Capy.player, this.Pillow.pillowSpecialAttack);
        this.physics.add.overlap(this.Capy.player, this.Pillow.pillowSpecialAttack, this.Capy.hittedBySpecialAttack, null);
    }

    update() {
        this.Pillow.update();
        this.Capy.update();
    }

}


