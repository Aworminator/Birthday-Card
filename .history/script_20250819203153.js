let people = [
  {
    name: "Nicki Scally",
    picture: "./images/Nicole.jpg",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Zach Scally",
    picture: "./images/Zach.jpg",
    audioTitle: "Zach.m4a",
  },
  {
    name: "Alec Garnica",
    picture: "./images/Alec.jpg",
    audioTitle: "Alec.m",
  },
  {
    name: "John Oliver",
    picture: "./images/John.jpg",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Kohlby Hassleman",
    picture: "./images/Kohlby.jpg",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Tyler Moore",
    picture: "./images/Tyler.jpg",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Jeremiah Grabau",
    picture: "./images/Jeremiah.jpeg",
    audioTitle: "perry-sound.mp3",
  },
  {
    name: "Spencer Brenard",
    picture: "./images/Spencer.png",
    audioTitle: "perry-sound.mp3",
  },
];

let input = document.querySelector("#input");

function updateProgress(e, personName) {
  let { currentTime, duration } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  document.getElementById(
    `progress-${personName}`
  ).style.width = `${progressPercentage}%`;

  const playBtn = document.getElementById(`playBtn-${personName}`);
  // Only change the button state when the audio has ended
  if (currentTime === duration) {
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
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
            <img class="card-pic" src="${person.picture}" alt="">
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
  const audio = document.getElementById(`audio-${personName}`);
  const playBtn = document.getElementById(`playBtn-${personName}`);

  if (audio.paused || audio.ended) {
    playAudio(personName);
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    pauseAudio(personName);
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
}

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Random size
  const size = Math.random() * 40 + 30; // between 30px–70px
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.2}px`; // slightly oval like real balloons

  // Random color
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C77DFF"];
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

  // Random horizontal position
  balloon.style.left = Math.random() * 100 + "vw";

  // Random float speed
  const duration = Math.random() * 5 + 6; // 6s–11s
  balloon.style.animationDuration = `${duration}s`;

  // Add to body
  document.body.appendChild(balloon);

  // Remove when done
  setTimeout(() => balloon.remove(), duration * 1000);
}

// Keep spawning balloons
let balloonInterval = setInterval(createBalloon, 1200); // every ~1.2 seconds

// Mobile scroll-based balloon creation
let lastScrollY = 0;
let balloonScrollThreshold = 200; // Create balloon every 200px of scroll

function handleMobileScroll() {
  // Check if mobile (768px or less)
  if (window.innerWidth <= 768) {
    const currentScrollY = window.scrollY;

    // Check if scrolled down enough to trigger new balloons
    if (Math.abs(currentScrollY - lastScrollY) >= balloonScrollThreshold) {
      createBalloon();
      lastScrollY = currentScrollY;
    }
  }
}

// Add scroll listener for mobile balloon creation
window.addEventListener("scroll", handleMobileScroll);
