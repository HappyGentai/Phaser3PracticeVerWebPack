import Align from "./UtilTool/align";
import {
  emitter as Emitter,
  game as Game,
  gameModel as GameModel,
} from "../../index";
import { audioManager } from "../scenes/sceneTitle";
import Collision from "./UtilTool/collision";
import Constants from "../constants";

// 繼承自Phaser的容器物件
export class Road extends Phaser.GameObjects.Container {
  // 建構子填入遊戲設定(config)以獲取需要的資料(scene, width...)
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    // 新增道路貼圖並指定為一個參數
    this.back = this.scene.add.image(0, 0, "road");
    // 將新增之參數添加至容器中(自己)
    this.add(this.back);
    // 將容器顯示在場上?
    this.scene.add.existing(this);
    {
      // 道路細節設置
      Align.scaleToGameW(this.back, 0.5);
      // 設置容器實際大小
      this.setSize(this.back.displayWidth, Game.config.height);
    }
    {
      // 道路中心線條設置
      // 建立中心線群組-Group(Phaser原生)並設置在場景上
      this.lineGroup = this.scene.add.group();
      // 設置一值作為中心線移動用的計數器
      this.lineMoveTime = 0;
    }
    {
      // 車車物件設置
      // 新增一車車參數並賦予值(圖片)
      this.car = this.scene.add.sprite(
        this.displayWidth / 4,
        (this.displayHeight / 2) * 0.8,
        "cars"
      );
      Align.scaleToGameW(this.car, 0.1);
      // 將車車加入道路群組中，發現原本生成的X和Y在加入容器後並不會校正數值，這是否代表著設置時都得要先想好該物件與容器中心之間的相對位置?
      this.add(this.car);
    }
    {
      // 道路容器互動事件設置
      this.back.setInteractive();
      // 設置點按道路容器(道路,中心線&車車等...)觸發切換車車跑道位置功能
      this.back.on("pointerdown", this.changeLanes, this);
    }
    {
      // 障礙物相關設置
      this.addObject();
    }
  }
  addObject() {
    // 建立一組物件資料陣列並利用隨機的方式配合物件資料Key值生成指定圖片
    var objs = [
      { key: "pcar1", speed: 12, scale: 10 },
      { key: "pcar2", speed: 10, scale: 10 },
      { key: "cone", speed: 20, scale: 5 },
      { key: "barrier", speed: 20, scale: 8 },
    ];
    var index = Math.floor(Math.random() * objs.length);
    // 設置生成障礙物之圖片索引值
    var key = objs[index].key;
    // 設置生成障礙物之速度
    var speed = objs[index].speed;
    // 設置生成障礙物之縮放比例
    var scale = objs[index].scale / 100;
    // 生成阻擋物物件
    this.object = this.scene.add.sprite(
      -this.displayWidth / 4,
      -this.displayHeight / 2,
      key
    );
    // 將新增之物件賦予速度參數，JS可以這樣憑空New參數也真夠噁的。
    this.object.speed = speed;
    // 隨機亂數並設置障礙物生成的位置
    // 這隨機變數的值為(0~1)*100
    var lane = Math.random() * 100;
    if (lane < 50) {
      this.object.x = this.displayWidth / 4;
    }
    // 隨遊戲場景寬做比例縮放
    Align.scaleToGameW(this.object, scale);
    // 將生成之物件加入道路群組中
    this.add(this.object);
  }
  makeLines() {
    // 設置生成間隔距離(Y)，數值為道路容器之高/10
    this.vSpace = this.displayHeight / 10;
    // 利用迴圈生產20個中心線
    for (var index = 0; index < 20; index++) {
      // 實體化中心線物件
      var newLine = this.scene.add.image(this.x, this.vSpace * index, "line");
      // 為新實體化的中心線追加原始位置Y的參數，幹JS可以這樣?噁心!
      newLine.oy = newLine.y;
      // 將實體化的中心線物件加入中心線群組中
      this.lineGroup.add(newLine);
    }
  }
  moveLines() {
    if (GameModel.gameOver === true) {
      return;
    }
    // 對中心線群組利用迭代的方式(類似Foreach?)呼轎子物件並執行指定方法
    this.lineGroup.children.iterate(
      function (child) {
        child.y += this.vSpace / 20;
      }.bind(this)
    );
    // 每當移動中心線方法執行20次之後，利用迭代的方式將所有的中心線物件位置Y設回初始值。
    this.lineMoveTime++;
    if (this.lineMoveTime === 20) {
      this.lineMoveTime = 0;
      this.lineGroup.children.iterate(
        function (child) {
          child.y = child.oy;
        }.bind(this)
      );
    }
  }
  changeLanes() {
    if (GameModel.gameOver === true) {
      return;
    }
    audioManager.playSound("whoosh");
    if (this.car.x > 0) {
      this.car.x = -this.displayWidth / 4;
    } else {
      this.car.x = this.displayWidth / 4;
    }
  }
  moveObject() {
    if (GameModel.gameOver === true) {
      return;
    }
    // 讓障礙物動起來
    this.object.y += (this.vSpace / this.object.speed) * GameModel.speed;
    // 與車車碰撞檢測
    if (Collision.checkCollide(this.car, this.object) === true) {
      // this.car.alpha = 0.5;
      this.scene.tweens.add({
        targets: this.car,
        duration: 600,
        y: Game.config.height / 2,
        angle: -270,
      });
      GameModel.gameOver = true;
      audioManager.playSound("boom");

      this.scene.time.addEvent({
        delay: 2000,
        callback: this.goGameOver,
        callbackScope: this.scene,
        loop: false,
      });
    } else {
      //this.car.alpha = 1;
    }
    if (this.object.y > Game.config.height) {
      // 當障礙物到達底部(畫面的高)時，破壞該障礙物並重新生成同時追加分數
      Emitter.emit(Constants.UP_POINTS, 1);
      this.object.destroy();
      this.addObject();
    }
  }

  goGameOver() {
    this.scene.start("SceneOver");
  }
}
