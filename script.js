isMusicPlaying = false;


//näppäimet
const playBtn = document.getElementById("play");
const betBtn = document.getElementById("bet");

const firstLock = document.getElementById("first_lock");
const secondLock = document.getElementById("second_lock");
const thirdLock = document.getElementById("third_lock");
const fourthLock = document.getElementById("fourth_lock");

const musicOnOffBtn = document.getElementById("musicOnOff");

//musiikki ja äänet
const bgMusic = document.getElementById("bg-music");

const miauSound = document.getElementById("miau");
const purrSound = document.getElementById("purr");
const lockSound = document.getElementById("lock");

//kuvat
const musicOnOffImg = document.getElementById("musicOnOff_image")

function playSoundEffect(sound) {
    sound.currentTime = 0;
    sound.play()
}


musicOnOffBtn.onclick = function() {
    if (isMusicPlaying) {
        musicOnOffImg.src = "sounds/stopMusic.png";
        isMusicPlaying = false;
        bgMusic.pause();
    }else if (!isMusicPlaying) {
        musicOnOffImg.src = "sounds/startMusic.png";
        isMusicPlaying = true;
        playSoundEffect(bgMusic);
    }
}

playBtn.onclick = function() {

    playSoundEffect(miauSound);
}

betBtn.onclick = function() {
    playSoundEffect(purrSound);
}