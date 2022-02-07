import { game as Game } from "../../../index";

export default class AlignGrid {
  constructor(config) {
    this.config = config;
    if (!config.scene) {
      console.log("Missing scene.");
      return;
    }
    if (!config.rows) {
      config.rows = 5;
    }
    if (!config.cols) {
      config.cols = 5;
    }
    if (!config.height) {
      config.height = Game.config.height;
    }
    if (!config.width) {
      config.width = Game.config.width;
    }

    this.scene = config.scene;

    {
      // 建立網格分割長,寬基礎值
      this.cw = config.width / config.cols;
      this.ch = config.height / config.rows;
    }
  }

  show() {
    // Scene上建立Graphics物件，用來後續繪製網格用
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);

    // 設定繪製線條資料(直線)
    for (var index = 0; index < this.config.width; index += this.cw) {
      // 繪製起始點設置
      this.graphics.moveTo(index, 0);
      // 繪製終點設置
      this.graphics.lineTo(index, this.config.height);
    }
    // 設定繪製線條資料(橫線)
    for (var index = 0; index < this.config.height; index += this.ch) {
      // 繪製起始點設置
      this.graphics.moveTo(0, index);
      // 繪製終點設置
      this.graphics.lineTo(this.config.width, index);
    }

    // 繪製設定之資料
    this.graphics.strokePath();
  }

  // 放置物件至網格上的方法
  placeAt(xx, yy, obj) {
    // calc position based upon the cellwidth and cellheight.
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;

    obj.x = x2;
    obj.y = y2;
  }

  // 放置物件至網格上(索引位置)的方法
  placeAtIndex(index, obj) {
    var yy = Math.floor(index / this.config.cols);
    var xx = index - yy * this.config.cols;

    this.placeAt(xx, yy, obj);
  }

  // 顯示網格及網格內的索引數值
  showNumbers() {
    this.show();
    var count = 0;
    for (var index = 0; index < this.config.rows; index++) {
      for (var indexC = 0; indexC < this.config.cols; indexC++) {
        // 建立文字至場上
        var numText = this.scene.add.text(0, 0, count, { color: "#ff0000" });
        // 設置文字UI繪製中心點
        numText.setOrigin(0.5, 0.5);
        // 設置文字位置至對應網格上
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }
}
