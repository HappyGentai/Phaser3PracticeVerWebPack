export default class Collision {
  //  物件碰撞偵測，Obj1為被檢測對象
  static checkCollide(obj1, obj2) {
    // 計算物件1與物件2的X與Y之間的間隔
    var distX = Math.abs(obj1.x - obj2.x);
    var distY = Math.abs(obj1.y - obj2.y);
    // 若X距離小於物件1的寬/2(半徑)則代表在X上有接觸
    if (distX < obj1.width / 2) {
      // 若Y距離小於物件1的寬/2(半徑)則代表在Y上有接觸
      if (distY < obj1.height / 2) {
        // X與Y數值皆小於物件1的寬/2,高/2，碰撞確認。
        return true;
      }
    }
    // 執行至此代表物件間沒有碰撞
    return false;
  }
}
