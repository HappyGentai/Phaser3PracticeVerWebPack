import Align from "../UtilTool/align";
import { emitter as Emitter } from "../../../index";

export class ToggleButton extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    this.back = this.scene.add.image(0, 0, config.backKey);
    this.onIcon = this.scene.add.image(0, 0, config.onIcon);
    this.offIcon = this.scene.add.image(0, 0, config.offIcon);

    // Scale button size.
    Align.scaleToGameW(this.back, 0.1);
    Align.scaleToGameW(this.onIcon, 0.05);
    Align.scaleToGameW(this.offIcon, 0.05);

    this.add(this.back);
    this.add(this.onIcon);
    this.add(this.offIcon);

    if (!config.value) {
      config.value = true;
    }
    this.value = config.value;

    if (config.event) {
      this.event = config.event;
    }

    // Set icon default state.
    this.setIcons();

    this.back.setInteractive();
    this.back.on("pointerdown", this.toggle, this);

    if (config.x) {
      this.x = config.x;
    }
    if (config.y) {
      this.y = config.y;
    }
    // Phaser的Container本身不帶寬高得要自行設置
    this.setSize(this.back.displayWidth, this.back.displayHeight);
    this.scene.add.existing(this);
  }

  toggle() {
    this.value = !this.value;
    this.setIcons();

    if (this.event) {
      Emitter.emit(this.event, this.value);
    }
  }

  setIcons() {
    if (this.value) {
      this.onIcon.visible = true;
      this.offIcon.visible = false;
    } else {
      this.onIcon.visible = false;
      this.offIcon.visible = true;
    }
  }
}
