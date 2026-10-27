const PlayButton = document.getElementById("PlayPause");
const AudioInput = document.getElementById("FileInput");
const AudioSource = document.getElementById("AudioSource");

window.audioAnalyser = null;
window.audioBins = null;

let ctx = null;
let source = null;
let analyser = null;
let bins = null;

function setupAnalysis() {
    ctx = new AudioContext();

    analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;

    bins = new Uint8Array(analyser.frequencyBinCount);

    source = ctx.createMediaElementSource(AudioSource);
    source.connect(analyser);

    analyser.connect(ctx.destination);

    window.audioAnalyser = analyser;
    window.audioBins = bins;
}

AudioInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (!file) {
        PlayButton.innerText = "Select an audio file";
    }
    else{
        PlayButton.innerText = "Play";

        AudioSource.src = URL.createObjectURL(file);
        AudioSource.load();
    }
});

PlayButton.addEventListener("click", async () => {
    if (!ctx) setupAnalysis();

    await ctx.resume();

    if (AudioSource.paused) {
        await AudioSource.play();
        PlayButton.innerText = "Pause";
    } else {
        AudioSource.pause();
        PlayButton.innerText = "Play";
    }
})