import { musicList } from "./musicList.js";

const audio = document.getElementById("audio");
const thumbnail = document.querySelector(".thumbnail");
const title = document.querySelector(".music-title");
const musicArtist = document.querySelector(".artist-name");
const slider = document.getElementById("range-slider");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".fa-forward-step");
const prevBtn = document.querySelector(".fa-backward-step");
const musicPlayerContainer = document.querySelector(".music-player-container");

let currentMusic = 0;
const setMusic = (i) => {
    let musicLibrary = musicList[i];
    currentMusic = i;
    thumbnail.innerHTML = `<div class="thumbnail">
    <img src="${musicLibrary.thumbnailImage}" alt="">
    </div>`;
    title.innerHTML = musicLibrary.musicTitle;
    musicArtist.innerHTML = musicLibrary.artist;
    audio.src = musicLibrary.musicLink;
    musicPlayerContainer.style.backgroundImage = `url("${musicLibrary.thumbnailImage}")`;
}

setMusic(currentMusic);

setInterval(()=>{
    currentTime.innerHTML = formatTime(audio.currentTime);
    slider.value = audio.currentTime;
    setTimeout(()=>{
        slider.max = audio.duration;
        musicDuration.innerHTML = formatTime(audio.duration);
    },500)
    //this logic build for playing music continiously
    if(audio.currentTime == audio.duration){
        currentMusic++;
        setMusic(currentMusic);
        audio.play();
    }
},1000)

const formatTime = (time) => {
    let min = Math.floor(time/60);
    min = (min<10) ? `0${min}`: min;
    let sec = Math.floor(time%60);
    sec = (sec<10) ? `0${sec}` : sec;
    return `${min}:${sec}`;
}

let value = 0;
playBtn.addEventListener("click", ()=>{
    if(value == 0){
        playBtn.innerHTML = `<i class="fa-solid fa-pause" style="font-size:22px"></i>`
        audio.play();
        value = 1;
    }
    else{
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
        audio.pause();
        value = 0;
    }
})

slider.addEventListener("click", ()=>{
    audio.currentTime = slider.value;
})


nextBtn.addEventListener("click", ()=>{
    if(currentMusic == musicList.length-1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
})

prevBtn.addEventListener("click", ()=>{
    if(currentMusic == 0){
        currentMusic = musicList.length-1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
})
