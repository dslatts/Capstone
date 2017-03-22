import React, {Component} from 'react';

export default class Song extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSelected: false
    };
    this.renderSongClass = this.renderSongClass.bind(this);
  }

  renderSongClass(){
    if (this.state.isSelected){
      return 'songActive';
    }
    else {
      return 'songInactive';
    }
  }

  render() {
    return (
      <div className={this.renderSongClass} onClick={() => this.props.onSongClick(this.props.song.id)}>
        {/*TO DO: make song and player inline */}
        <p>{this.props.song.name}</p>
        {/*TO DO: Style audio component (Justin find it repulsive)*/}
        <audio controls><source src={this.props.song.preview_url} type="audio/mp3" /></audio>
      </div>
    );
  }
}

