// 既然叫常數的話...這些應該不會被變動吧?感覺是拿來當作一種標記的TAG?
const SET_SCORE = "setScore";
const UP_POINTS = "upPoints";
const SCORE_UPDATED = "scoreUpdated";
const PLAY_SOUND = "playSound";
const MUSIC_CHANGED = "musicChanged";
const TOGGLE_SOUND = "toggleSound";
const TOGGLE_MUSIC = "toggleMusic";

export default class Constants {
  static get SET_SCORE() {
    return SET_SCORE;
  }

  static get UP_POINTS() {
    return UP_POINTS;
  }

  static get SCORE_UPDATED() {
    return SCORE_UPDATED;
  }

  static get PLAY_SOUND() {
    return PLAY_SOUND;
  }

  static get MUSIC_CHANGED() {
    return MUSIC_CHANGED;
  }

  static get TOGGLE_SOUND() {
    return TOGGLE_SOUND;
  }

  static get TOGGLE_MUSIC() {
    return TOGGLE_MUSIC;
  }
}
