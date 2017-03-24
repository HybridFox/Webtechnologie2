let App = React.createClass({
    getInitialState() {
        return {
            music: [
                {imageUrl: 'http://static.djbooth.net/pics-features/tlop-worst-album-release.jpg', title: 'The Life Of Pablo', artist: 'Kanye West'},
                {imageUrl: 'https://heathenharvest.files.wordpress.com/2016/02/david-bowie-blackstar.jpg', title: 'Blackstar', artist: 'David Bowie'},
                {imageUrl: 'http://images.rapgenius.com/beb23feb3d0be493ef446e5a7abf61a2.600x600x1.jpg', title: 'Manon', artist: 'De Jeugd Van Tegenwoordig'},
                {imageUrl: 'http://cdn3.pitchfork.com/albums/22814/homepage_large.4984cf76.jpg', title: 'This Unruly Mess I\'ve made', artist: 'Macklemore & Ryan Lewis'},
            ],
            searchQuery: ''
        }
    },

    _getFilteredMusicList() {
        if (this.state.searchQuery) {
            let query = this.state.searchQuery.toLowerCase();
            return this.state.music.filter((item) => {
                return item.title.toLowerCase().indexOf(query) > -1 || item.artist.toLowerCase().indexOf(query) > -1;
            })
        }
        console.log(this.state.music);
        return this.state.music;
    },

    _handleMusicAdded(album) {
        console.log(album);
        let newMusic = this.state.music;
        newMusic.push(album);

        this.setState({
            music: newMusic
        });
    },

    render() {
        return (
            <div className="app-container">
                <h1>
                    The music app
                </h1>
                <input value={this.state.searchQuery} onChange={(e) => this.setState({searchQuery: e.target.value})}/>
                <MusicList musicArray={this._getFilteredMusicList}/>
                <Form onMusicAdded={this._handleMusicAdded}/>
            </div>
        )
    }
});

let MusicList = React.createClass({
    _generateList() {
        return this.props.musicArray.map(function(item, i) {
            return (
                <MusicItem
                    key={i}
                    title={item.title}
                    artist={item.artist}
                    imageUrl={item.imageUrl}
                />
            )
        });
    },

    render() {
        return(
            <div>
                {this._generateList()}
            </div>
        );
    }
});

let MusicItem = function(props) {
    let {title, artist, imageUrl} = props;
    return (
        <div className="music-item">
            <div className="cover" style={imageUrl ? {backgroundImage: 'url("' + imageUrl + '")'} : null}/>
            <div className="info">
                <h2 className="title">{title}</h2>
                <div className="artist">{artist}</div>
            </div>
        </div>
    );
};

MusicItem.propTypes = {
    title: React.PropTypes.string.isRequired,
    artist: React.PropTypes.string.isRequired,
    imageUrl: React.PropTypes.string
};

let emptyState = {
    title: '',
    artist: '',
    imageUrl: '',
    valid: false
}

let Form = React.createClass({
    getInitialState() {
        return emptyState;
    },

    _validateForm() {
        if(this.state.artist && this.state.title) {
            this.setState({
                valid: true
            });
        } else {
            this.setState({
                valid: false
            });
        }
    },

    _handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]: value
        }, this._validateForm());
    },

    _handleSubmit(e) {
        e.preventDefault();
        if (this.state.valid) {
            this.props.onMusicAdded(this.state);
            this.setState(emptyState);
        }
    },

    render() {
        return (
            <div className="music-form">
                <h1>Add your own music</h1>
                <form >
                    <div className="flex">
                        <input value={this.state.title} name={'title'} className="margin-small-right" type="text" placeholder="title" onChange={this._handleChange}/>
                        <input value={this.state.artist} name={'artist'} className="margin-small-left" type="text" placeholder="artist" onChange={this._handleChange}/>
                    </div>
                    <input value={this.state.imageUrl} name={'imageUrl'} type="text" placeholder="album cover url" onChange={this._handleChange}/>
                    <button disabled={!this.state.valid} className={this.state.valid ? '' : 'disabled'} onClick={this._handleSubmit}>Add To Musiclist</button>
                </form >
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("root")
);