import React from 'react';

export default function Song (props) {
  const toggle = function(DOMID){
    const audio = document.getElementById(DOMID);
    const button = document.getElementById(`${props.song.id}_play`);
    if (button.value === 'notPlaying'){
      audio.play();
      button.value = 'playing';
      button.innerText = 'Stop';
    } else {
      audio.pause();
      audio.currentTime = 0;
      button.value = 'notPlaying';
      button.innerText = 'Play';
    }
  };

  return (
    <div id={props.song.id} className={props.currentSongList.includes(props.song) ? 'songActive' : 'songInactive'}>
      <div className="audioButton">
          <button id={`${props.song.id}_play`} value="notPlaying" onClick={() => toggle(props.song.id + '_audio')}>Play</button>
          <audio id={`${props.song.id}_audio`} src={props.song.preview_url} preload="auto" type="audio/mpeg" />
      </div>
      <div onClick={() => {props.onSongClick(props.song)}}>
        <p>{props.song.name}</p>
      </div>
    </div>
  );
}
