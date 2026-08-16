const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const album = document.getElementById("album");
const status = document.getElementById("status");

// Demo playlist using freely streamable sample tracks.
// Replace "src" with your own file paths (e.g. "songs/song1.mp3") when hosting your own audio.
const songs = [
    {
        name: "Enthaaraa Enthaaraa",
        artist: "shadab Faridi, Chinmayi",
        src: "songs/song1.mp3"
    },
    {
        name: "Enakenna unathanthu",
        artist: "Benny Dayal, Mahathi",
        src: "songs/song2.mp3"
    },
    {
        name: "Poove Sempoove ",
        artist: "K.J.Yesudas",
        src: "songs/song3.mp3"
    }
];

let songIndex = 0;
let isSeeking = false;

// ---- Load Song ----
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.name;
    artist.textContent = song.artist;
    audio.src = song.src;
    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    status.textContent = "";
}

// ---- Play / Pause ----
function playSong() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                playBtn.textContent = "⏸️";
                album.classList.add("spinning");
                status.textContent = "";
            })
            .catch(() => {
                // Autoplay was blocked or the file failed to load
                playBtn.textContent = "▶️";
                album.classList.remove("spinning");
                status.textContent = "Tap play again — playback needs a click first.";
            });
    }
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
    album.classList.remove("spinning");
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

// ---- Navigation ----
function goToSong(newIndex) {
    songIndex = (newIndex + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
}

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", () => goToSong(songIndex + 1));
prevBtn.addEventListener("click", () => goToSong(songIndex - 1));

// ---- Progress Bar ----
audio.addEventListener("timeupdate", () => {
    if (audio.duration && !isSeeking) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
    currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    isSeeking = true;
});

progress.addEventListener("change", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
    isSeeking = false;
});

// ---- Volume ----
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// ---- Song Ends ----
audio.addEventListener("ended", () => {
    goToSong(songIndex + 1);
});

// ---- Error Handling ----
audio.addEventListener("error", () => {
    status.textContent = "Couldn't load this track. Check the file path/URL.";
    playBtn.textContent = "▶️";
    album.classList.remove("spinning");
});

// ---- Time Format ----
function formatTime(time) {
    if (isNaN(time) || time === Infinity) {
        return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// ---- Init ----
loadSong(songIndex);
