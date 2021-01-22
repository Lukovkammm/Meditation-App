const song = document.querySelector('.song');
const play = document.querySelector('.play');
const video = document.querySelector('video');
const weatherButtons = document.querySelector('.weather-buttons');
const timerButtons = document.querySelector('.time-buttons')
const repeatButton = document.querySelector('.replay');
const outline = document.querySelector('.moving-outline circle');
const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

let boolPlayingTimer = false;

const timerConfig = [{
    time: 120,
    text: '2 minutes'
}, {
    time: 300,
    text: '5 minutes'
}, {
    time: 600,
    text: '10 minutes'
}];

const videoConfig = [{
    name: 'rain',
    sound: './sounds/rain.mp3',
    video: './video/Rain - 17013.mp4'
}, {
    name: 'beach',
    sound: './sounds/beach.mp3',
    video: './video/beach- 31416.mp4'
}];

window.onload = function () {
    setInterval(showTime, 1000);
}

const timerContent = timerConfig.reduce(((acc, item) => {
    return acc + `
    <button class="time" data-time="${item.time}">${item.text}</button>`
}), '');
timerButtons.innerHTML = timerContent;

const videoContent = videoConfig.reduce(((acc, item) => {
    return acc + `
    <button class="${item.name}" data-sound="${item.sound}" data-video="${item.video}"></button>`
}), '');
weatherButtons.innerHTML = videoContent;

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
    if(seconds >= 10) {
        timer.textContent = `${minutes}:${seconds}`;
    } else {
        timer.textContent = `${minutes}:0${seconds}`;
    }
}

function pickWeather(e) {
    song.src = e.target.dataset.sound;
    video.src = e.target.dataset.video;
    playSong();
}

function repeat() {
    song.currentTime = 0;
    boolPlayingTimer = true;
}

play.addEventListener('click', playSong);
timerButtons.addEventListener('click', (e) => {
    const activeButton = e.target.children;
    if (activeButton) {
        playingTime(e);
    }
});

weatherButtons.addEventListener('click', (e) => {
    const activeButton = e.target.children;
    if (activeButton) {
        pickWeather(e);
    }
});
repeatButton.addEventListener('click', repeat);