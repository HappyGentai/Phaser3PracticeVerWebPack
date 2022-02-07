import { audioManager } from "../../scenes/sceneTitle";
import { emitter } from "../../../index";
import Constants from "../../constants";

let _score;
let _soundOn;
let _musicOn;
let gameOver;

// 遊戲資料模組
export default class Model {
  constructor() {
    _score = 0;
    _soundOn = true;
    _musicOn = true;
    gameOver = false;
  }

  set musicOn(val) {
    _musicOn = val;
    audioManager.musicChanged();
  }

  get musicOn() {
    return _musicOn;
  }

  set soundOn(val) {
    _soundOn = val;
  }

  get soundOn() {
    return _soundOn;
  }

  // 設置分數方法
  set score(value) {
    _score = value;
    console.log("Score Update, current score are " + _score);
    emitter.emit(Constants.SCORE_UPDATED);
  }

  // 獲取分數方法
  get score() {
    return _score;
  }
}
