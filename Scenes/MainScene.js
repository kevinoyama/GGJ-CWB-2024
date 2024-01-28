import Phaser from 'phaser';

import Player from '../Players/Player';

export default class MainScene extends Phaser.Scene {
    
    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;

        this.player1 = new Player(this, {
            name: 'capy',
            spritesheet: '../assets/capysprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            start_x: 200,
            start_y: 400,
            special_attack_image: '../assets/sprite_31.png'
        }, 1);

        this.player2 = new Player(this, {
            name: 'pizza',
            spritesheet: '../assets/pizzasprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            start_x: 600,
            start_y: 400,
            special_attack_image: '../assets/sprite_31.png'
        }, 2);


    }

    preload() {
        this.load.image('bed', '../assets/Capybaras_3.jpg');
        this.load.audio('audioFarm', ['../assets/Farm effect mp3.mp3']);

        this.player1.preload();
        this.player2.preload();
    }

    create() {
        this.add.image(512, 200, 'bed');
        // this.physics.add.collider(this.Pizza.player, this.Capy.player);
        this.musicFarm = this.sound.add('audioFarm',{
            loop: true
        });
        //this.musicFarm.play();
        this.sound.pauseOnBlur = true;

        this.player1.create();
        this.player2.create();
        this.physics.add.overlap(this.player1.specialAttacks, this.player2.player, this.capyHittedBySpecialAttack, null, this);

    }

    update() {

        this.player1.update();
        this.player2.update();
    }

    capyHittedBySpecialAttack(attack, player) {
        attack.disableBody(true, true);

        if(!this.Capy.isDefending) {
            this.Capy.lifeHealth -= 5;
        }
        console.log(this.Capy.lifeHealth);
   }

}


