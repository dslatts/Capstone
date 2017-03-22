import React from 'react';

export default function Song (props) {
    return (
      <div id={props.song.id} className="songInactive" onClick={() => props.onSongClick(props.song.id)}>
        {/*TO DO: make song and player inline */}
        <p>{props.song.name}</p>
        {/*TO DO: Style audio component (Justin find it repulsive)*/}
        <audio controls><source src={props.song.preview_url} type="audio/mpeg" /></audio>
      </div>
    );
  }

