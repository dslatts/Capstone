import React from 'react';

export default function Song (props) {
  var toggle = function(DOMID){
    var audio = document.getElementById(DOMID);
    var button = document.getElementById(`${props.song.id}_play`);
    if (button.className === 'fa fa-play-circle fa-2x'){
      audio.play();
      button.className = 'fa fa-stop-circle fa-2x';
    } else {
      audio.pause();
      audio.currentTime = 0;
      button.className = 'fa fa-play-circle fa-2x';
    }
  };

  var highlightedRender = function(){
    if (props.currentSongList.includes(props.song)){
      return (
        <div id={props.song.id} className="songActive" >
          <div className="audioButton">
            <i id={`${props.song.id}_play`} className="fa fa-play-circle fa-2x" aria-hidden="true" value="notPlaying" onClick={() => toggle(props.song.id + '_audio')} />
            <audio id={`${props.song.id}_audio`} src={props.song.preview_url} preload="auto" type="audio/mpeg" />
          </div>
          <div onClick={()=>{props.onSongClick(props.song)}}>
            <p>{props.song.name}</p>
          </div>
        </div>

      );
    } else {
      return (
        <div id={props.song.id} className="songInactive" >
          <div className="audioButton">
            <i id={`${props.song.id}_play`} className="fa fa-play-circle fa-2x" aria-hidden="true" value="notPlaying" onClick={() => toggle(props.song.id + '_audio')} />
            <audio id={`${props.song.id}_audio`} src={props.song.preview_url} preload="auto" type="audio/mpeg" />
          </div>
          <div onClick={()=>{props.onSongClick(props.song)}}>
            <p>{props.song.name}</p>
          </div>
        </div>
      );
    }
  };

  return (
    highlightedRender()
  );
}
