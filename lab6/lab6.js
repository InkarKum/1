let tracks = [
    { url: "APT.mp3", cover: "images.jpeg", name: "ROSÉ & Bruno Mars - APT", artist: "ROSÉ & Bruno Mars" },
    { url: "Snowman.mp3", cover: "Snowman.jpeg", name: "Sia – Snowman", artist: "Sia" },
    { url: "Август Это Ты.mp3", cover: "Мот.jpeg", name: "Мот - Август-Это Ты", artist: "Мот" }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

function updatePlayer() {
    const track = tracks[currentTrackIndex];
    document.getElementById('trackCover').src = track.cover;
    document.getElementById('trackName').textContent = track.name;
    document.getElementById('artistName').textContent = track.artist;
    audio.src = track.url;
    if (isPlaying) {
        audio.play();
    }
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        document.querySelector('button').textContent = 'Pause';
    } else {
        audio.pause();
        isPlaying = false;
        document.querySelector('button').textContent = 'Play';
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updatePlayer();
}

function populateTrackList() {
    const trackList = document.getElementById('trackList');
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.onclick = () => {
            currentTrackIndex = index;
            updatePlayer();
            togglePlayPause();
        };
        trackList.appendChild(li);
    });
}

window.onload = () => {
    updatePlayer();
    populateTrackList();
};
