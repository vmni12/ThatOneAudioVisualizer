
function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);

    const analyser = window.audioAnalyser;
    const bins = window.audioBins;

    if (bins){
        analyser.getByteFrequencyData(bins);

        const barWidth = width / bins.length;

        noStroke();
        for (let i = 0; i < bins.length; i++) {
            const x = i * barWidth;
            const h = map(bins[i], 0, 255, 0, height);

            rect(x, height - h, Math.max(1, barWidth - 1), h);
        }
    }
}
