let people = [
  {
    name: "Matthew",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Sarah",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Ethan",
    audioTitle: "perry-sound.mp3",
  },
];

let input = document.querySelector(".container");

function updateProgress(e, personName) {
  let { currentTime, duration } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  document.getElementById(
    `progress-${personName}`
  ).style.width = `${progressPercentage}%`;

  const playBtn = document.getElementById(`playBtn-${personName}`);
  if (currentTime === duration) {
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
  } else {
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }
}

function setProgress(e, personName) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const audio = document.getElementById(`audio-${personName}`);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function playAudio(personName) {
  const audio = document.getElementById(`audio-${personName}`);
  audio.play();
}

function pauseAudio(personName) {
  const audio = document.getElementById(`audio-${personName}`);
  audio.pause();
}

people.forEach((person) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
            <h1 id="name">${person.name}</h1>
            <img src="./images/Driving Crooner Matt.png" alt="">
            <div class="player">
            <i class="fa-solid fa-play" id="playBtn-${person.name}" onclick="toggleAudio('${person.name}')">
            <audio preload="metadata" id="audio-${person.name}" src="./audio/${person.audioTitle}"></audio></i>
            <div class="progress-bar" id="progress-bar-${person.name}">
                <div class="progress" id="progress-${person.name}"></div>
            </div>
        </div>
        </div>`;
  input.appendChild(card);

  const audio = document.getElementById(`audio-${person.name}`);
  const progressBar = document.getElementById(`progress-bar-${person.name}`);

  audio.addEventListener("timeupdate", (e) => updateProgress(e, person.name));
  progressBar.addEventListener("click", (e) => setProgress(e, person.name));
});

function toggleAudio(personName) {
  const playBtn = document.getElementById(`playBtn-${personName}`);
  const isPlaying = playBtn.classList.contains("fa-play");

  if (isPlaying) {
    playAudio(personName);
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    pauseAudio(personName);
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
}
