// Other Class
import { game } from "../../index";
import { Bar } from "../Classes/comps/bar";
// Res load path
import roadImgPath from "../../assets/images/road.jpg";
import carSpritePath from "../../assets/images/cars.png";
import lineImgPath from "../../assets/images/line.png";
import barrierImgPath from "../../assets/images/barrier.png";
import coneImgPath from "../../assets/images/cone.png";
import pcar1ImgPath from "../../assets/images/pcar1.png";
import pcar2ImgPath from "../../assets/images/pcar2.png";
import button1ImgPath from "../../assets/images/ui/buttons/2/1.png";
import titleImgPath from "../../assets/images/ui/title.png";
import titleBackImgPath from "../../assets/images/ui/titleBack.jpg";
import toggleBackImgPath from "../../assets/images/ui/toggles/1.png";
import sfxOffImgPath from "../../assets/images/ui/icons/sfx_off.png";
import sfxOnImgPath from "../../assets/images/ui/icons/sfx_on.png";
import musicOnImgPath from "../../assets/images/ui/icons/music_on.png";
import musicOffImgPath from "../../assets/images/ui/icons/music_off.png";
import backgroundMusicMp3Path from "../../assets/audio/random-race.mp3";
import backgroundMusicOggPath from "../../assets/audio/random-race.ogg";
import boomMp3Path from "../../assets/audio/boom.mp3";
import boomOggPath from "../../assets/audio/boom.ogg";
import whooshMp3Path from "../../assets/audio/whoosh.mp3";
import whooshOggPath from "../../assets/audio/whoosh.ogg";

export class SceneLoad extends Phaser.Scene {
  constructor() {
    // 使用繼承父親的建構函式
    super("SceneLoad");
  }
  preload() {
    //設置讀取監聽和載入進度文字和進度條;
    this.bar = new Bar({
      scene: this,
      x: game.config.width / 2,
      y: game.config.height / 2,
    });
    this.progText = this.add.text(
      game.config.width / 2,
      game.config.height / 2,
      "0%",
      { color: "#ffffff", fontSize: game.config.width / 20 }
    );
    this.progText.setOrigin(0.5, 0.5);
    this.load.on("progress", this.onProgress, this);
    //load our images or sounds
    this.load.image("road", roadImgPath);
    this.load.spritesheet("cars", carSpritePath, {
      frameWidth: 60,
      frameHeight: 126,
    });
    this.load.image("line", lineImgPath);
    this.load.image("barrier", barrierImgPath);
    this.load.image("cone", coneImgPath);
    this.load.image("pcar1", pcar1ImgPath);
    this.load.image("pcar2", pcar2ImgPath);

    this.load.image("button1", button1ImgPath);
    this.load.image("title", titleImgPath);
    this.load.image("titleBack", titleBackImgPath);

    this.load.image("toggleBack", toggleBackImgPath);
    this.load.image("sfxOff", sfxOffImgPath);
    this.load.image("sfxOn", sfxOnImgPath);
    this.load.image("musicOn", musicOnImgPath);
    this.load.image("musicOff", musicOffImgPath);

    this.load.audio("backgroundMusic", [
      backgroundMusicMp3Path,
      backgroundMusicOggPath,
    ]);
    this.load.audio("boom", [boomMp3Path, boomOggPath]);
    this.load.audio("whoosh", [whooshMp3Path, whooshOggPath]);
  }

  create() {
    // 切換Scene
    console.log("Assets preload done, Great!");
    this.scene.start("SceneTitle");
  }

  onProgress(value) {
    this.bar.setPercentX(value);
    let per = Math.floor(value * 100);
    let outPer = per + "%";
    this.progText.setText(outPer);
  }
}
