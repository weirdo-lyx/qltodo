const BACKGROUND_MUSIC_SRC = '/assets/audio/happy-dynamic.mp3';

let backgroundMusic = null;

export function initBackgroundMusic() {
  if (backgroundMusic) {
    return backgroundMusic;
  }

  backgroundMusic = wx.createInnerAudioContext();
  backgroundMusic.src = BACKGROUND_MUSIC_SRC;
  backgroundMusic.loop = true;
  backgroundMusic.autoplay = true;
  backgroundMusic.volume = 0.65;
  backgroundMusic.obeyMuteSwitch = false;

  backgroundMusic.onError((error) => {
    console.warn('background music error', error);
  });

  return backgroundMusic;
}

export function playBackgroundMusic() {
  const audio = initBackgroundMusic();

  try {
    audio.play();
  } catch (error) {
    console.warn('background music play failed', error);
  }
}

export function pauseBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  try {
    backgroundMusic.pause();
  } catch (error) {
    console.warn('background music pause failed', error);
  }
}

