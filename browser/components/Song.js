import React from 'react';

export default function Song (props) {
  var toggle = function(DOMID){
    // e.preventDefault();
    // console.log(e);
    var audio = document.getElementById(DOMID);
    console.log(DOMID);
    if (audio.playing){
      audio.playing = false;
      audio.pause();
    } else {
      audio.playing = true;
      audio.play();
    }
  };

  var highlightedRender = function(){
    if (props.currentSongList.includes(props.song)){
      return (
        <div id={props.song.id} className="songActive" onClick={()=>{props.onSongClick(props.song)}}>
          <p>{props.song.name}</p>
          <audio controls><source src={props.song.preview_url} type="audio/mpeg" /></audio>
          {/*<button id={`${props.song.id}_play`} onClick={toggle(props.song.id + '_audio')} >Play</button>
          <audio id={`${props.song.id}_audio`} src={props.song.preview_url} preload="auto" type="audio/mpeg" playing="false" ></audio>*/}
        </div>
      );
    } else {
      return (
        <div id={props.song.id} className="songInactive" onClick={()=>{props.onSongClick(props.song)}}>
          <p>{props.song.name}</p>
          <audio controls><source src={props.song.preview_url} type="audio/mpeg" /></audio>
          {/*<button id={`${props.song.id}_play`} onClick={toggle(props.song.id + '_audio')} >Play</button>
          <audio id={`${props.song.id}_audio`} src={props.song.preview_url} preload="auto" type="audio/mpeg" playing="false" ></audio>*/}
        </div>
      );
    }
  };

  return (
    highlightedRender()
  );
}
