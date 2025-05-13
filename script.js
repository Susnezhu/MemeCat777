isMusicPlaying = false;

//rahamäärä ja panos
let currentCash = 50;
let CurrentBet = 1;

//rullan pyörimisen kerrat
count = 0;

let isLocksWorking = false;

//rullat
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const slot4 = document.getElementById("slot4");

//näppäimet
const buttons = document.querySelectorAll("button"); //kaikki näppäimet

const musicOnOffBtn = document.getElementById("musicOnOff");

const playBtn = document.getElementById("play");
const betBtn = document.getElementById("bet");

//lukitukset
const firstLock = document.getElementById("first_lock");
const secondLock = document.getElementById("second_lock");
const thirdLock = document.getElementById("third_lock");
const fourthLock = document.getElementById("fourth_lock");

//musiikki ja äänet
const bgMusic = document.getElementById("bg-music");

const miauSound = document.getElementById("miau");
const purrSound = document.getElementById("purr");
const lockSound = document.getElementById("lock");
const slotSpin = document.getElementById("slotSpin");
const winSound = document.getElementById("winSound");
const errorSound = document.getElementById("errorSound");

//kuvat
const musicOnOffImg = document.getElementById("musicOnOff_image");
const catDance1 = document.getElementById("catDance1");
const catDance2 = document.getElementById("catDance2");

//tekstit
const betText = document.getElementById("betText");
const cashText = document.getElementById("cashText")
const winText = document.getElementById("winText");

catDance1.style.display = "none";
catDance2.style.display = "none";
winText.style.display = "none";


//kuvat ja voitto arvo
const imgs = [
    {img: "one.jpeg", payout: 10},
    {img: "two.jpeg", payout: 6},
    {img: "three.jpeg", payout: 5},
    {img: "four.jpeg", payout: 4},
    {img: "five.jpeg", payout: 3}
]

//rullat ja arvot
const slots = [
    {slot: slot1, lock: false, value: null},
    {slot: slot2, lock: false, value: null},
    {slot: slot3, lock: false, value: null},
    {slot: slot4, lock: false, value: null}
]

//lukitusnäppäimet
const locks = [
    {lock: firstLock, num: 0},
    {lock: secondLock, num: 1},
    {lock: thirdLock, num: 2},
    {lock: fourthLock, num: 3},
]

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

//antaa randomin numeron 0-4 ja ottaa kuvan indeksillä
function randomPic(){
    const index = Math.floor(Math.random() * 4) + 1; //numero 1 - 5
    return {
        id: index, //kuvan numero
        pic: imgs[index].img //kuva
    };
}

//pyörittää rullaa
function startSpinning() {
    const intervalId = setInterval(function() {
        const random = randomPic();

        //jos rulla ei ole lukittu, antaa sille uuden arvon ja vaihtaa kuvan
        if (!slots[count].lock) {
            slots[count].value = random.id
            slots[count].slot.src = "memes/" + random.pic;
        }
        
        playSound(slotSpin);

        count ++

        //jos kaikkiin rulliin on laitettu kuva
        if (count >= 4) {
            clearInterval(intervalId);
            count = 0;
            buttonsOff(false);


            //laittaa lukitus näppäimet oletukseen
            for (let i = 0; i < slots.length; i++) {
                slots[i].lock = false;
                locks[i].lock.style.background = "#22222271";
            }

            //tarkistaa voiton
            checkWin();
          }
    },500)
}

function checkWin() {

    //ottaa ensimmäisen rullan arvon
    let firstValue = slots[0].value;
    let isWin = true;

    //tarkistaa, onko kaikki rullat saman arvoisia
    for (let i = 1; i < slots.length; i++) {
        if (slots[i].value !== firstValue) {
            isWin = false;
            break;
        }
    }

    //jos kaikki ovat samanarvoisia, antaa voiton
    if (isWin) {

        //ottaa lukitukset pois, koska muuten käyttäjä voi lukita voiton kokoajan
        isLocksWorking = false;

        //lasketaan voitto ja laitetaan se näkyville
        let cashPayout = (imgs[slots[0].value].payout) * CurrentBet
        currentCash += cashPayout;
        winText.textContent = cashPayout + "€";

        winText.style.display = "block";
        cashText.textContent = "Rahaa: " + currentCash + "€";

        playSound(winSound);
        catDance1.style.display = "block";
        catDance2.style.display = "block";

        setTimeout(function() {
            winText.style.display = "none";
            catDance1.style.display = "none";
            catDance2.style.display = "none";
            buttonsOff(false);
        }, 5000);
    } else {
        buttonsOff(false);
    }

    //lopuksi palauttaa lukitus näppäimet oletukseen
    if (isLocksWorking) {
        for (let i=0; i < locks.length; i++) {
            locks[i].lock.style.background = "#ff6b9f9d";
        }
    }

}

//pelaa näppäin
playBtn.onclick = function() {
    if (currentCash < CurrentBet) {
        playSound(errorSound);
        return;
    }

    //pyörähdyksen aikana laittaa lukitukset päälle
    isLocksWorking = true;

    //vähentää panoksen rahoista ja päivittää näytölle
    currentCash -= CurrentBet;
    cashText.textContent = "Rahaa: "+ currentCash +"€"

    playSound(miauSound);

    //piilottaa kuvat
    for (let i=0; i < slots.length; i++) {
        if (!slots[i].lock) {
            slots[i].slot.src = "memes/spin-img.png"
        } else if (slots[i].lock) {
            isLocksWorking = false;
        }
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

//lukitusnäppäimet
for (let l of locks) {
    l.lock.onclick = function() {
        if (isLocksWorking) { //jos lukitus on päällä
            if (currentCash < 1 && !slots[l.num].lock) { //jos liian vähän rahaa ja lukitus pois päältä (Antaa poistaa lukituksen, mutta ei anna ostaa sitä)
                playSound(errorSound)
                return
            }
            playSound(lockSound);
            if (!slots[l.num].lock) {
                slots[l.num].lock = true;
                l.lock.style.background = "#333";
                currentCash -= 1;
            } else if (slots[l.num].lock) {
                slots[l.num].lock = false;
                l.lock.style.background = "#22222271";
                currentCash += 1;
            }
            cashText.textContent = "Rahaa: "+ currentCash +"€"
        }
    }
}
