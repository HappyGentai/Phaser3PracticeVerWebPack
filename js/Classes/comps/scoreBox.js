import { emitter, gameModel } from "../../../index";
import Constants from "../../constants";

export class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);

    this.scene = config.scene;
    {
      this.text1 = this.scene.add.text(0, 0, "Score: 0");
      this.text1.setOrigin(0.5, 0.5);
      this.add(this.text1);
    }

    this.text1.setBackgroundColor("#000000");

    this.scene.add.existing(this);

    emitter.on(Constants.SCORE_UPDATED, this.scoreUpdate, this);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  scoreUpdate() {
    let newScore = gameModel.score;
    let newText = "Score: " + newScore;

    if (this.scene) {
      if (this.text1) {
        this.text1.setText(newText);
      }
    }

    //this.text1.setText(newText);
  }
}
