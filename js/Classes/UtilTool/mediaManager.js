import { emitter as Emitter, gameModel } from "../../../index";
import Constants from "../../constants";

export default class MediaManager {
  constructor(config) {
    this.scene = config.scene;
    Emitter.on(Constants.MUSIC_CHANGED, this.musicChanged, this);
  }

  musicChanged() {
    if (this.bgm) {
      if (gameModel.musicOn === false) {
        this.bgm.stop();
      } else {
        this.bgm.play();
      }
    }
  }

  playSound(key) {
    if (gameModel.soundOn === true) {
      var sound = this.scene.sound.add(key);
      sound.play();
    }
  }

  setBackGroundMusic(key) {
    if (gameModel.musicOn === true) {
      this.bgm = this.scene.sound.add(key, { volume: 0.5, loop: true });
      this.bgm.play();
      console.log("Music start");
    }
  }
}
