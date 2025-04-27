let song;
let fft;
let w;
let button;

function preload() {
  song = loadSound("Da Funk.mp3");
}

function setup() {
  createCanvas(640, 640);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Set smoothing to 0, 256 bins
  fft = new p5.FFT(0.8, 64);
  w = width / 64;
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  //console.log(spectrum[17]);
  if (spectrum[17] > 200) {
    console.log("hi");
    ellipse;
  }
  if (spectrum[45] > 50) {
    console.log("yo");
    ellipse(200, 100, 50, 50);
  }
  // stroke(255);
  // for (let i = 0; i < spectrum.length; i++) {
  //   let ampl = spectrum[i];

  //   let y = map(ampl, 0, 256, height, 0);
  //   rect(i * w, y, w, height - y);
  // }
  // Default length is 1024;
  // console.log(spectrum.length);

  // translate(width / 2, height / 2);
  // //beginShape();
  // for (let i = 0; i < spectrum.length; i++) {
  //   let angle = map(i, 0, spectrum.length, 0, 360);
  //   let ampl = spectrum[i];
  //   let r = map(ampl, 0, 256, 20, 100);
  //   //fill(i, 255, 255);
  //   let x = r * cos(angle);
  //   let y = r * sin(angle);
  //   stroke(i, 255, 255);
  //   line(0, 0, x, y);
  //   //vertex(x, y);
  // }
  // //endShape();
}
