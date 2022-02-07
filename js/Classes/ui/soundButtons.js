import Constants from "../../constants";
import { emitter as Emitter, game as Game, gameModel } from "../../../index";
import { ToggleButton } from "./toggleButton";

// 這是一個含有音樂及音效開關UI的集合
export class SoundButtons extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    this.musicButton = new ToggleButton({
      scene: this.scene,
      backKey: "toggleBack",
      onIcon: "musicOn",
      offIcon: "musicOff",
      event: Constants.TOGGLE_MUSIC,
    });

    this.soundButton = new ToggleButton({
      scene: this.scene,
      backKey: "toggleBack",
      onIcon: "sfxOn",
      offIcon: "sfxOff",
      event: Constants.TOGGLE_SOUND,
    });

    this.add(this.musicButton);
    this.add(this.soundButton);

    // 將音樂設置UI放在最左上角的位置
    this.musicButton.y = this.musicButton.height / 2;
    this.musicButton.x = this.musicButton.width / 2;

    this.soundButton.x = Game.config.width - this.soundButton.width / 2;
    this.soundButton.y = this.musicButton.y;

    if (gameModel.musicOn == false) {
      this.musicButton.toggle();
    }
    if (gameModel.soundOn == false) {
      this.soundButton.toggle();
    }

    Emitter.on(Constants.TOGGLE_MUSIC, this.setGameMusic, this);
    Emitter.on(Constants.TOGGLE_SOUND, this.setGameSound, this);

    this.scene.add.existing(this);
  }

  setGameMusic() {
    var onOff = gameModel.musicOn;
    gameModel.musicOn = !onOff;
  }
  setGameSound() {
    var onOff = gameModel.soundOn;
    gameModel.soundOn = !onOff;
  }
}
