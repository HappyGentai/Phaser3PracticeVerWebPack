import model from "../mc/model";
import { emitter as Emitter } from "../../../index";

export class FlatButton extends Phaser.GameObjects.Container {
  constructor(config) {
    if (!config.scene) {
      console.log("missing scene!");
      return;
    }
    if (!config.key) {
      console.log("missing key");
    }
    super(config.scene);
    this.config = config;

    this.scene = config.scene;
    this.back = this.scene.add.image(0, 0, config.key);
    this.add(this.back);

    if (config.text) {
      if (config.textConfig) {
        this.text1 = this.scene.add.text(0, 0, config.text, config.textConfig);
      } else {
        this.text1 = this.scene.add.text(0, 0, config.text);
      }
      this.text1.setOrigin(0.5, 0.5);
      this.add(this.text1);
    }

    if (config.x) {
      this.x = config.x;
    }
    if (config.y) {
      this.y = config.y;
    }

    this.scene.add.existing(this);

    {
      // About btn event
      if (config.event) {
        this.back.setInteractive();
        this.back.on("pointerdown", this.pressed, this);
      }
      // 電腦模式下滑鼠與圖片重疊和離開判定，該數值由main.js來設置
      if (model.isMobile == -1) {
        this.back.on("pointerover", this.over, this);
        this.back.on("pointerout", this.out, this);
      }
    }
  }

  over() {
    this.y -= 5;
  }

  out() {
    this.y += 5;
  }

  pressed() {
    if (this.config.params) {
      Emitter.emit(this.config.event, this.config.params);
    } else {
      Emitter.emit(this.config.event);
    }
  }
}
