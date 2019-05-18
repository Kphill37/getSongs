import ItunesService from "./itunes-service.js";
//Private
const itunesService = new ItunesService()

function drawSongs() {
  let songs = itunesService.Songs
  let template = ""

  for (let i = 0; i < songs.length; i++) {
    let song = songs[i]
    template += `    

    <div class="col-xl-4 col-md-6 col-xs-12">
    <img src="${song.albumArt}" alt="">
          <ul class="list-group">
          
                <li class="list-group-item>
                    <img src="${song.albumArt}" alt="">
                    <div class="container-fluid">
                    <h2>Song: ${song.title}</h2>
                    <h3>Album: ${song.collection}</h3>
                    <h3>Artist: ${song.artist}</h3>
                    <h3>Price: $${song.price}</h3>
                    </div>
                </li>
                </ul>
                <div class="row">
                <audio controls><source src="${song.preview}" type="audio/mpeg"></audio>
                </div
        </div>
        </div>
        `
  }

  document.querySelector(".row").innerHTML = template
  document.addEventListener('play', function (e) {
    var audios = document.getElementsByTagName('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] != e.target) {
        audios[i].pause();
      }
    }
  }, true);
  //changes button back to GET MUSIC once songs are loaded
  document.querySelector('#get-music-button').textContent = 'GET MUSIC'
  console.log(itunesService.Songs)
}


//PUBLIC
class ItunesController {
  constructor() {
    //BE SURE TO REGISTER YOUR SUBSCRIBERS!!!!!!
    itunesService.addSubscriber("songs", drawSongs)
  }


  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    document.querySelector('#get-music-button').innerHTML = `<div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>`
    itunesService.getMusicByArtist(artist)
  }
}


export default ItunesController