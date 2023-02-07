const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'select playlists.id, playlists.name from playlists where playlists.id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongsById(playlistId) {
    const query = {
      text: 'select songs.* from playlists join playlistsongs on playlists.id = playlistsongs.playlist_id join songs on songs.id = playlistsongs.song_id where playlists.id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistsService;
