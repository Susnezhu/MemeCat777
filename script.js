const playBtn = document.getElementById("play");
const betBtn = document.getElementById("bet")

const miauSound = document.getElementById("miau")
const purrSound = document.getElementById("purr")

playBtn.onclick = function() {
    miauSound.play()
}

betBtn.onclick = function() {
    purrSound.play()
}