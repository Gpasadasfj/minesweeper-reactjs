import defaultClick from "../assets/sounds/defaultClick.wav";
import flagSound from "../assets/sounds/flagSound.wav";
import mineSound from "../assets/sounds/mineSound.mp3";
import victorySound from "../assets/sounds/victorySound.mp3";

export default function soundManager() {
  const defaultAudio = new Audio(defaultClick);
  const flagAudio = new Audio(flagSound);
  const mineAudio = new Audio(mineSound);
  const victoryAudio = new Audio(victorySound);
  victoryAudio.preload = "auto";
  mineAudio.preload = "auto";
  flagAudio.preload = "auto";
  defaultAudio.preload = "auto";

  function playDefault() {
    defaultAudio.currentTime = 0;
    defaultAudio.play();
  }
  function playFlag() {
    flagAudio.currentTime = 0;
    flagAudio.play();
  }
  function playMine() {
    mineAudio.currentTime = 0;
    mineAudio.play();
  }
  function playVictory() {
    victoryAudio.currentTime = 0;
    victoryAudio.play();
  }

  return { playDefault, playFlag, playMine, playVictory };
}
