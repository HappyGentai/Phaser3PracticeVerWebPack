import { game as Game } from "../../../index";

// 對齊用小工具，這個東西跟腳本main之間有耦合(參數game)得要注意下
export default class Align {
  // 此為靜態方法，將填入物件的寬變為遊戲場景之寬乘上填入之百分比，最後將物件之縮放數值Y設置為物件之縮放數值X
  static scaleToGameW(obj, per) {
    obj.displayWidth = Game.config.width * per;
    obj.scaleY = obj.scaleX;
  }
  // 此為靜態方法，將填入之物件的位置設質為遊戲場景之中心點。
  static center(obj) {
    obj.x = Game.config.width / 2;
    obj.y = Game.config.height / 2;
  }
  static centerH(obj) {
    obj.x = Game.config.width / 2;
  }
  static centerV(obj) {
    obj.y = Game.config.height / 2;
  }
}
