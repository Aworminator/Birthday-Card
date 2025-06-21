let name = "Matthew";

let people = [
  {
    name: "Matthew",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Sarah",
    audioTitle: "perry-sound.mp3",
  },
];

let header = document.getElementById("name");
let audio = document.getElementById("audio");
let playBtn = document.getElementById("playBtn");
let progress = document.querySelector(".progress");

header.innerHTML = `${name}`;

function updateProgress(e) {
  let { currentTime, duration } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;

  if (currentTime === duration) {
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
  } else {
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
  const isPlaying = playBtn.classList.contains("fa-play");

  if (isPlaying) {
    playAudio();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    pauseAudio();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
});

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

audio.addEventListener("timeupdate", updateProgress);

progress.addEventListener("click", setProgress);


people.map( person => {
    `<div class="card">
            <h1 id="name">${person.name}</h1>
            <img src="./images/Driving Crooner Matt.png" alt="">
            <div class="player">
            <i class="fa-solid fa-play" id="playBtn" onclick="playAudio()"><audio preload="metadata" id="audio" src="./audio/${people.audioTitle}"></audio></i>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
        </div>`
})