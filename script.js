const song = document.querySelector('.song');
const play = document.querySelector('.play');
const video = document.querySelector('video');
const playingTimeButtons = document.querySelectorAll('.time');
const weather = document.querySelectorAll('.weather button');
const repeatButton = document.querySelector('.replay');


let boolPlayingTimer = false;

window.onload = function () {
    setInterval(showTime, 500);
}

function showTime() {
    if (!boolPlayingTimer) {
        let date = new Date();
        if (date.getMinutes() < 10) {
            timer.textContent = `${date.getHours()}:0${date.getMinutes()}`;
        } else {
            timer.textContent = `${date.getHours()}:${date.getMinutes()}`;
        }
    }
}

function playSong() {
    if (song.paused) {
        song.play();
        video.play();
        play.style.backgroundImage = 'url("img/pause.svg")';
    } else {
        song.pause();
        video.pause();
        play.style.backgroundImage = 'url("img/play.svg")';
    }
}

const outline = document.querySelector('.moving-outline circle');
const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

function progressCircle(durationPlaying) {
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = durationPlaying - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = outlineLength - (currentTime / durationPlaying) * outlineLength;
        outline.style.strokeDashoffset = progress;
        animateTimer(minutes, seconds);
        if (currentTime >= durationPlaying) {
            song.pause();
            video.pause();
            play.style.backgroundImage = 'url("img/play.svg")';
            song.currentTime = 0;
        }
    }
}

function playingTime(e) {
    song.play();
    play.style.backgroundImage = 'url("img/pause.svg")';
    song.currentTime = 0;
    boolPlayingTimer = true;
    let durationPlaying = e.toElement.dataset.time;
    progressCircle(durationPlaying);
}

const timer = document.querySelector('.timer');

function animateTimer(minutes, seconds) {
    if(seconds > 10) {
        timer.textContent = `${minutes}:${seconds}`;
    } else {
        timer.textContent = `${minutes}:0${seconds}`;
    }
}

function pickWeather() {
    song.src = this.dataset.sound;
    video.src = this.dataset.video;
    playSong();
}

function repeat() {
    song.currentTime = 0;
    boolPlayingTimer = true;
}

play.addEventListener('click', playSong);
playingTimeButtons.forEach(time => time.addEventListener('click', playingTime));
weather.forEach(button => button.addEventListener('click', pickWeather));
repeatButton.addEventListener('click', repeat);