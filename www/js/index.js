let ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";

const app = {
  active:[playList],
  page:[],
  media: null,
  playingSong: "0",
  currentStatus: null,
  currentTarget: null,
  audio: [
    {
      id: 0,
      artist: "Drake",
      album: "0 To 100 /The Catch",
      track: "0 To 100 /The Catch",
      length: "367",
      path: "file:///android_asset/www/media/Drake/0to100.mp3",
      albumLink:"./media/Images/drake_0-100.jpg"
    },
    {
      id: 1,
      artist: "Drake",
      album: "Back To Back - Single",
      track: "Back To Back",
      length: "170",
      path: "file:///android_asset/www/media/Drake/BackToBack.mp3",
      albumLink:"./media/Images/backtoback.jpg"
    },
    {
      id: 2,
      artist: "Travis Scott",
      album: "ASTROWORLD",
      track: "SICKO MODE(feat.Drake)",
      length: "323",
      path: "file:///android_asset/www/media/TravisScott/SickoMode.mp3",
      albumLink:"./media/Images/Astroworld.jpg"
    },
    {
      id: 3,
      artist: "Drake",
      album: "Scorpion",
      track: "God's Plan",
      length: "199",
      path: "file:///android_asset/www/media/Drake/God'sPlan.mp3",
      albumLink:"./media/Images/Scorpion.jpg"
    },
    {
      id: 4,
      artist: "Christ Brown",
      album: "Indigo",
      track: "No Guidance(feat.Drake)",
      length: "262",
      path: "file:///android_asset/www/media/ChrisBrown/NoGuidance.mp3",
      albumLink:"./media/Images/indigo.jpg"
    }
  ],
  status:{
    '0':'Media.MEDIA_NONE',
    '1':'Media.MEDIA_STARTING',
    '2':'Media.MEDIA_RUNNING',
    '3':'Media.MEDIA_PAUSED',
    '4':'Media.MEDIA_STOPPED'
  },
  err: {
    '1':'MEDIA_ERR_ABORTED',
    '2':'MEDIA_ERR_NETWORK',
    '3':'MEDIA_ERR_DECODE',
    '4':'MEDIA_ERR_NONE_SUPPORTED'
  },
  init: () => {
    console.log('init');   
    app.createList();
    app.addListeners();
  },
  createList: function(){
    let list = document.querySelector(".list");
    for(let i=0; i<app.audio.length;i++){
      let div = document.createElement("div");

      div.addEventListener("click", app.songWasClicked);
      div.setAttribute('class', "musicCard");
      div.setAttribute('data-item-id', i );
      div.setAttribute('id',  i );
      list.appendChild(div);
      let img = document.createElement('img');
      img.setAttribute("class", "album");
      //img.setAttribute('data-item-id', i+1 );
      img.src = app.audio[i].albumLink;
      
      img.alt = "albumImg";

      let info = document.createElement('div');
      info.setAttribute('class', "info");

      div.appendChild(img);
      div.appendChild(info);

      let track =document.createElement('div');
      let artist =document.createElement('div');

      track.setAttribute("class", "track");
      track.textContent = app.audio[i].track;
      artist.setAttribute("class", "artist");
      artist.textContent = app.audio[i].artist;

      info.appendChild(track);
      info.appendChild(artist);
    }
  },
  addListeners: function(){
    // document.querySelector(".play-btn").addEventListener("click", app.play);
    document.querySelectorAll(".play")[0].addEventListener("click", app.resume);
    document.querySelectorAll(".pause")[0].addEventListener("click", app.pause);
    document.querySelectorAll(".play")[1].addEventListener("click", app.resume);
    document.querySelectorAll(".pause")[1].addEventListener("click", app.pause);
    document.querySelector(".play-player").addEventListener("click", app.resume);
    document.querySelector(".pause-player").addEventListener("click", app.pause);
    // document.querySelector(".musicCard-bar").addEventListener("click", app.transPage);
    document.querySelector(".album-bar").addEventListener("click", app.transPlayerBar);
    document.querySelector(".musicBar-right").addEventListener("click", app.transPlayerBar);
    document.querySelector(".lastSong").addEventListener('click', app.prev);
    document.querySelector(".nextSong").addEventListener('click', app.next);
    
  },
  checkPlayOrPluse: function(status){
    console.log("checkPlayOrPlause");
    // setTimeout(() => {
      if(status == 0 || 
        status == 3 ||
        status == 4 ||
        status == null){
        document.querySelectorAll(".play")[0].classList.remove("stopping");
        document.querySelectorAll(".pause")[0].classList.add("stopping");
        document.querySelectorAll(".play")[1].classList.remove("stopping");
        document.querySelectorAll(".pause")[1].classList.add("stopping");
        document.querySelector(".play-player").classList.remove("stopping");
        document.querySelector(".pause-player").classList.add("stopping");         
        console.log("show pause");
      }else{
        document.querySelectorAll(".pause")[0].classList.remove("stopping");
        document.querySelectorAll(".play")[0].classList.add("stopping");
        document.querySelectorAll(".pause")[1].classList.remove("stopping");
        document.querySelectorAll(".play")[1].classList.add("stopping");
        document.querySelector(".pause-player").classList.remove("stopping");
        document.querySelector(".play-player").classList.add("stopping");
        console.log("show play");
      }
    // }, 200);
  },
  songWasClicked: (ev)=>{
    let wasClicked = ev.currentTarget;
    let target = wasClicked.getAttribute("id");
    console.log(target);
    let li = wasClicked.closest('[data-item-id]');
    console.log(ev.target + " " + ev.currentTarget);
    let id = parseInt( li.getAttribute('data-item-id') );
    // let song = app.audio.find( personObj => personObj.id === id);
    // let para = document.querySelector('#results p');
    app.playingSong = id;
    console.log(app.playingSong);

    app.play();
  },
  listBackground:()=>{
    for(let i=0;i<app.audio.length;i++){
      document.querySelectorAll(".musicCard")[i].classList.remove("playing");
    }
    // let tar = app.playingSong
    console.log(`#${app.playingSong}`);
    document.getElementById(app.playingSong).classList.add("playing");
  },
  changeBar:function(){
    console.log('change buttom bar');
    document.querySelector('.album-bar').src =app.audio[app.playingSong].albumLink;
    document.querySelector('.track-bar').textContent = app.audio[app.playingSong].track;
    document.querySelector('.artist-bar').textContent = app.audio[app.playingSong].artist;
  },
  ftw: function() {
    console.log("success doing something");
  },
  wtf: function(err) {
    console.log("failure");
    console.log(err);
  },
  statusChange: function(status){
    app.listBackground();
    console.log("media status is now " + app.status[status]);
    app.checkPlayOrPluse(status);
    // if(status == 1 ){
      
    //   app.changeBar();
    //   console.log("show play");
    //   }else if(status == 4){
    //     app.next();
    //   }else{
    // }
    // status = status;
    // // if( status == 4){
    //   app.next();
    // }
  },
  play: function(){
    console.log("going to play music");
    // let playNextSong;
    // clearTimeout(playNextSong);
    // let src = app.audio[app.playingSong].path
    if(app.media !== null){
      app.media.release();
      app.media = null;
    }
    app.media = new Media(app.audio[app.playingSong].path , app.ftw, app.wtf, app.statusChange);
    app.media.play();
    app.changeBar();
    app.checkPlayOrPluse();
    app.listBackground();

  //   playNextSong = setTimeout(function(){
  //     console.log("setTimeout about end song")
  //     app.next();
  // }, app.audio[app.playingSong].length * 1000);
  },
  pause: function(){ 
    // let playNextSong;
    // clearTimeout(playNextSong);
    app.media.pause();
    // app.changeBar();
    // app.checkPlayOrPluse();
  },
  resume:()=>{
    // let src = app.audio[app.playingSong].path
    // app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
    app.media.play();
    // app.changeBar();
    // app.checkPlayOrPluse();
  },
  ff: function(){
    let pos = app.media.getCurrentPosition(( pos )=>{
      let dur = app.media.getDuration();
      console.log('current position', pos);
      pos += 10;
      if(pos < dur){
        app.media.seekTo( pos * 1000 );
      }
    })
  },
  next:()=>{
    console.log("next song");
    app.playingSong++;
    if(app.playingSong >= app.audio.length){app.playingSong = 0};
    app.play();
  },
  prev:()=>{
    console.log("last song");
    app.playingSong--;
    if(app.playingSong < 0){app.playingSong = app.audio.length-1};
    app.play();
  },
  transPlayerBar:function(){
    console.log('playerBar Trans')
    document.querySelector(".musicBar").classList.add("playerMode");
    document.querySelector(".musicCard-bar").classList.add("playerMode");
    document.querySelector(".album-bar").classList.add("playerMode");
    document.querySelector(".player-back").classList.add("playerMode");
    document.querySelector(".musicBar-right").classList.add("playerMode");
    document.querySelector(".musicBar-info").classList.add("playerMode");
    document.querySelector(".musicBar").classList.add("playerMode");
    document.querySelector(".artist-bar").classList.add("playerMode");
    document.querySelector("#btn-bar").classList.add("playerMode");
    document.querySelector(".player-bottom").classList.add("playerMode");
    document.querySelector(".album-bar").removeEventListener("click", app.transPlayerBar);
    document.querySelector(".musicBar-right").removeEventListener("click", app.transPlayerBar);
    document.querySelector(".player-back").addEventListener('click', app.transList);
    // document.querySelector(".musicBar").addEventListener("click", app.transPlayerBar)
  },
  transList:function(){
    console.log('List Trans');
    document.querySelector(".musicBar").classList.remove("playerMode");
    document.querySelector(".musicCard-bar").classList.remove("playerMode");
    document.querySelector(".album-bar").classList.remove("playerMode");
    document.querySelector(".player-back").classList.remove("playerMode");
    document.querySelector(".musicBar-right").classList.remove("playerMode");
    document.querySelector(".musicBar-info").classList.remove("playerMode");
    document.querySelector(".musicBar").classList.remove("playerMode");
    document.querySelector(".artist-bar").classList.remove("playerMode");
    document.querySelector("#btn-bar").classList.remove("playerMode");
    document.querySelector(".player-bottom").classList.remove("playerMode");
    // document.querySelector(".musicBar").addEventListener("click", app.transPlayerBar);
    document.querySelector(".album-bar").addEventListener("click", app.transPlayerBar);
    document.querySelector(".musicBar-right").addEventListener("click", app.transPlayerBar);
    // document.querySelector(".musicBar").addEventListener("click", app.transPlayerBar)
  },  
}

document.addEventListener(ready, app.init);
