import Phaser from 'phaser';
import Capy from '../Players/Capy';
import Pillow from '../Players/Pillow';
import Pizza from '../Players/Pizza';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;
        this.Capy = new Capy(this);
        this.Pizza = new Pizza(this);
        //this.Pillow = new Pillow(this);
    }

    preload() {
        this.load.image('bed', '../assets/Capybaras_3.jpg');
        this.load.audio('audioFarm', ['../assets/Farm effect mp3.mp3']);
        //this.Pillow.preload();
        this.Capy.preload();
        this.Pizza.preload();
    }

    create() {
        this.add.image(512, 200, 'bed');
        //this.Pillow.create();
        this.Capy.create();
        this.Pizza.create();
        this.physics.add.collider(this.Pizza.player, this.Capy.player);
        this.musicFarm = this.sound.add('audioFarm',{
            loop: true
        });
        //this.musicFarm.play();
        this.sound.pauseOnBlur = true;


        this.physics.add.overlap(this.Pillow.specialAttacks, this.Capy.player, this.capyHittedBySpecialAttack, null, this);
    }

    update() {
        this.Capy.update();
        //this.Pillow.update();
        this.Pizza.update();
    }

    capyHittedBySpecialAttack(attack, player) {
        attack.disableBody(true, true);

        if(!this.Capy.isDefending) {
            this.Capy.lifeHealth -= 5;
        }
        console.log(this.Capy.lifeHealth);
   }

}


