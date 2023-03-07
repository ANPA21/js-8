import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURENT_TIME = 'videplayer-current-time';
resumePlayback();

player.on('timeupdate', throttle(logTime, 250));

function logTime(evt) {
  localStorage.setItem(CURENT_TIME, evt.seconds);
}

function resumePlayback() {
  const savedTime = localStorage.getItem(CURENT_TIME);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
