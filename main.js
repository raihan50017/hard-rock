
const searchLyrics = () => {
    const lyricsName = document.getElementById("lyricsName").value;
    fetch(`https://api.lyrics.ovh/suggest/${lyricsName}`)
    .then(res => res.json())
    .then(data => {
    const lyrics = data.data;
    createLyricsList(lyrics);
  });
}

const createLyricsList = (lyrics) =>{
     const lyricsList = document.getElementById('lyricsList');
     lyricsList.innerHTML = '';
     for(let i=0; i<10; i++){
         const {title, album, artist} = lyrics[i];
         lyricsList.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                  <div class="col-md-9">
                                  <h3 class="lyrics-name">${title}-${album.title}</h3>
                                  <p class="author lead">Album by <span>${artist.name}</span></p>
                                  </div>
                                  <div class="col-md-3 text-md-right text-center">
                                  <button onclick="getLyrics('${title}','${artist.name}')"  class="btn btn-success">Get Lyrics</button>
                                  </div>
                                  </div>`;
     }
}

const getLyrics = (title,artist) => {

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = document.getElementById('lyrics');
        const lyricTitle = document.getElementById('lyricsTitle');
        lyrics.innerText = '';
        lyricTitle.innerText = '';
        if(data.lyrics){
            lyricTitle.innerText = title + "-" + artist;
            lyrics.innerText = data.lyrics;
        }
        else{
            lyricTitle.innerText = 'Opps!! Lyrics not found, Try another.';
        }
    });
}