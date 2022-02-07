import { Road } from "../Classes/road";
import {
  game as Game,
  emitter as Emitter,
  gameModel as GameModel,
} from "../..";
import AlignGrid from "../Classes/UtilTool/alignGrid";
import { SoundButtons } from "../Classes/ui/soundButtons";
import Constants from "../constants";
import { ScoreBox } from "../Classes/comps/scoreBox";

// 自訂義Class-場景，繼承自Phaser原生地場景物件
export class SceneMain extends Phaser.Scene {
  constructor() {
    // 使用繼承父親的建構函式
    super("SceneMain");
  }
  create() {
    //define our objects
    // 新增道路Class，建構子原本是要填入config，這邊用大括號是否代表著式只填入config裡的scene參數?
    this.road = new Road({ scene: this });
    this.road.x = Game.config.width * 0.5;
    this.road.y = Game.config.height * 0.5;
    this.road.makeLines();

    // 建立分數UI
    this.scoreBar = new ScoreBox({ scene: this });
    // 設置分數UI位置
    this.scoreBar.setPosition(Game.config.width / 2, 50);
    GameModel.gameOver = false;
    GameModel.speed = 1;
    GameModel.score = 0;
    // 會置網格資料
    this.alignGrid = new AlignGrid({ scene: this, rows: 5, cols: 5 });
    var soundButtons = new SoundButtons({ scene: this });
    Emitter.on(Constants.SCORE_UPDATED, this.scoreUpdate, this);
  }

  scoreUpdate() {
    if (GameModel.score / 5 == Math.floor(GameModel.score / 5)) {
      GameModel.speed += 0.25;
      if (GameModel.speed > 1.5) {
        GameModel.speed = 1.5;
      }
    }
  }

  update() {
    this.road.moveLines();
    this.road.moveObject();
  }
}
