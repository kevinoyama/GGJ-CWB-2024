import Phaser from 'phaser';
import MainScene from './Scenes/MainScene';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scenes: MainScene
}

new Phaser.Game(config);