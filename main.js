import Phaser from 'phaser';
import MainScene from './Scenes/MainScene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 660,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 3200 }
    }
  },
  scene: MainScene
}

new Phaser.Game(config);