import React from 'react';

//used in history, if multiple artists on a song, creates a string 'artist1 feat. artist2, artist3, etc'
  var createArtistString = function(artistArray){
    var featured = [];
    if (artistArray.length === 1){
      return artistArray[0].name;
    }
    else {
      featured = artistArray.slice(1).map((artist) => artist.name);
      return `${artistArray[0].name} feat. ${featured.join(', ')}`;
    }
  };
export default function History (props) {
  return (
    <div>
      <p>Recent History</p>
      <table>
          <thead>
            <tr>
                <th>Title</th>
                <th>Artist</th>
            </tr>
          </thead>
          <tbody>
              {props.userHistory && props.userHistory.map((item) => {
              return (
                <tr key={item.track.id + item.track.played_at}>
                  <td>{item.track.name}</td>
                  <td>{createArtistString(item.track.artists)}</td>
                </tr>);
              })}
          </tbody>
      </table>


    </div>);

}
