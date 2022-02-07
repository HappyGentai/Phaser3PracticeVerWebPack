import AlignGrid from "../Classes/UtilTool/alignGrid";
import Align from "../Classes/UtilTool/align";
import { game as Game, emitter as Emitter } from "../..";
import { FlatButton } from "../Classes/ui/flatButton";

export class SceneOver extends Phaser.Scene {
  constructor() {
    super("SceneOver");
  }
  preload() {
    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("title", "images/ui/title.png");
  }
  create() {
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    //this.alignGrid.showNumbers();

    var titleBack = this.add.image(
      Game.config.width / 2,
      Game.config.height / 2,
      "titleBack"
    );
    var title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(38, title);

    var btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "Play Again!",
      event: "reStart_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);

    Emitter.once("reStart_game", this.startGame, this);
  }

  startGame() {
    // 切換Scene
    console.log("Restart game.");
    this.scene.start("SceneMain");
  }

  update() {}
}
