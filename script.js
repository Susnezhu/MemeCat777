isMusicPlaying = false;

//kuvien indeksit, jotta ne ilmestyisivät vuoron perään
let count = 0;

//saa lukuja, jotka tuli rullasta
const spinResult = [];

//rahamäärä ja panos
let currentCash = 50;
let CurrentBet = 1;

//kuvat, joita otetaan indeksillä
const imgs = {
    img1: "one.jpeg",
    img2: "two.jpeg",
    img3: "three.jpeg",
    img4: "four.jpeg",
    img5: "five.jpeg"
}

//paljonko saa rahaa, eri kuvista
const payouts = {
    1: 10,
    2: 6,
    3: 5,
    4: 4,
    5: 3
};

//rullat
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const slot4 = document.getElementById("slot4");

const slots = [slot1, slot2, slot3, slot4];

//näppäimet
const buttons = document.querySelectorAll("button"); //kaikki näppäimet

const playBtn = document.getElementById("play");
const betBtn = document.getElementById("bet");

//lukitukset
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
const slotSpin = document.getElementById("slotSpin");
const winSound = document.getElementById("winSound");

//kuvat
const musicOnOffImg = document.getElementById("musicOnOff_image");
const catDance1 = document.getElementById("catDance1");
const catDance2 = document.getElementById("catDance2");

//tekstit
const betText = document.getElementById("betText")
const cashText = document.getElementById("cashText")
const winText = document.getElementById("winText");

catDance1.style.display = "none";
catDance2.style.display = "none";
winText.style.display = "none";

//laittaa musiikin tai äänen päälle
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

//musiikki näppäin
musicOnOffBtn.onclick = function() {
    if (isMusicPlaying) {
        musicOnOffImg.src = "sounds/stopMusic.png";
        isMusicPlaying = false;
        bgMusic.pause();
    }else if (!isMusicPlaying) {
        musicOnOffImg.src = "sounds/startMusic.png";
        isMusicPlaying = true;
        playSound(bgMusic);
    }
}

//laittaa kaikki näppäimet pois tai laittaa ne päälle
function buttonsOff(value) {

    if (value == true) {
        buttons.forEach(function(btn) {
            btn.disabled = true;
          });
    }

    if (value == false) {
        buttons.forEach(function(btn) {
            btn.disabled = false;
          });
    }
}

//palauttaa randomin kuvan numeron ja kuvan
function randomPic() {
    const index = Math.floor(Math.random() * 5) + 1; //numero 1 - 5
    return {
        id: index, //kuvan numero
        pic: imgs["img" + index] //kuva
    };
}

//pyörittää rullan
function startSpinning() {

    const intervalId = setInterval(function() {
        playSound(slotSpin);

        const random = randomPic()
        spinResult.push(random.id);
        slots[count].src = "memes/" + random.pic;

        count++;

        if (count >= 4) {
            clearInterval(intervalId);
            count = 0;

            //tarkistaa voiton
            checkWin();
          }
    },500)
}

//tarkistaa onko voittoa
function checkWin() {
    if (spinResult[0] === spinResult[1] &&
        spinResult[1] === spinResult[2] &&
        spinResult[2] === spinResult[3]) {

        const payout = payouts[spinResult[0]];
        currentCash += payout * CurrentBet;
        winText.textContent = (payout * CurrentBet) + "€";

        winText.style.display = "block";
        cashText.textContent = "Rahaa: "+ currentCash +"€"

        playSound(winSound);
        catDance1.style.display = "block";
        catDance2.style.display = "block";

        setTimeout(function() {
            winText.style.display = "none";
            catDance1.style.display = "none";
            catDance2.style.display = "none";
            buttonsOff(false);
        },5000)


    } else {
        console.log("Ei voittoa 😿"); //TÄHÅN LISÄTÄ JOTAIN (emt, esim ääni)
        buttonsOff(false);
    }
}

//pelaa näppäin
playBtn.onclick = function() {

    currentCash -= CurrentBet;

    cashText.textContent = "Rahaa: "+ currentCash +"€"

    playSound(miauSound);

    //piilottaa kuvat
    for (let i = 0; i < slots.length; i++) {
        slots[i].src = "memes/spin-img.png";
    }

    buttonsOff(true)

    setTimeout(function() {
            //laittaa kissojen kuvat
        startSpinning();
    },600)
}

//panos näppäin
betBtn.onclick = function() {
    playSound(purrSound);

    if (CurrentBet < 3) {
        CurrentBet ++;
    } else {
        CurrentBet = 1;
    }

    betText.textContent = "Panos: " + CurrentBet + "€"
}