import { emitter as Emitter, game as Game } from "../../index";
import AlignGrid from "../Classes/UtilTool/alignGrid";
import Align from "../Classes/UtilTool/align";
import { FlatButton } from "../Classes/ui/flatButton";
import MediaManager from "../Classes/UtilTool/mediaManager";

export let audioManager;

export class SceneTitle extends Phaser.Scene {
  constructor() {
    super("SceneTitle");
  }
  create() {
    this.AlignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    var titleBack = this.add.image(
      Game.config.width / 2,
      Game.config.height / 2,
      "titleBack"
    );
    var title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.AlignGrid.placeAtIndex(38, title);

    this.btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "start",
      event: "start_game",
    });
    this.AlignGrid.placeAtIndex(93, this.btnStart);

    Emitter.on("start_game", this.startGame, this);

    // 設置音樂音效管理器
    audioManager = new MediaManager({ scene: this });
    audioManager.setBackGroundMusic("backgroundMusic");

    // this.AlignGrid.showNumbers();
  }

  startGame() {
    // 切換Scene
    this.scene.start("SceneMain");
  }

  update() {}
}
