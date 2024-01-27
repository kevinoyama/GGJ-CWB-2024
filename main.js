import Phaser from 'phaser';
import MainScene from './Scenes/MainScene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 }
    }
  },
  scene: MainScene
}

new Phaser.Game(config);