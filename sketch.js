let song;
let fft;
let w;
let button;
let spectrum;
let bgColor = "#000000";
let prevRangeValue;
let newRangeValue;
//bass values
let prevBassValue;
let newBassValue;
//high head values
let prevHighHeadValue;
let newHighHeadValue;
//noise values
let xNoise = 0;
let yNoise = 0;
let addValue = 0;

let offsetValue = 30;
function preload() {
  song = loadSound("Da Funk.mp3");
}

function setup() {
  createCanvas(640, 640);
  ellipseMode(CENTER)
  createP("Spectrum Analyzer");
  sliderSpectrum = createSlider(0,64 );
  createP("Spectrum peak value");
  sliderPeakValue = createSlider(0,255 );

  addValue = random(0, 100);
  
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Set smoothing to 0, 256 bins
  fft = new p5.FFT(0.6, 64);
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
  background(bgColor);
  offsetValue= round(map(sliderPeakValue.value(), 0, 255, 0, 80));
  spectrum = fft.analyze();
  let spectrumHerz = spectrum[sliderSpectrum.value()];
  let circleSize = map(spectrumHerz, 0, 255, 0, 100);

  oldRangeValue = newRangeValue;
  newRangeValue = spectrumHerz;
  // if(abs(oldRangeValue-newRangeValue) > offsetValue) {
  //   //
  // }
  //bass check
  prevBassValue = newBassValue;
  newBassValue = spectrum[2];
  if(abs(prevBassValue-newBassValue) > 50) {
    bgColor = color(random(100), random(100), random(100));
  }

  //high head check
  prevHighHeadValue = newHighHeadValue;
  newHighHeadValue = spectrum[33];
  if(abs(prevHighHeadValue-newHighHeadValue) > 50) {
    addValue +=100;
  }
  xNoise = noise(0.001 * addValue);
  yNoise = noise(0.001 * addValue);
  push();
  fill(255);
  text("Spectrum Value "+sliderSpectrum.value(), 10, 10);
  text("Peak Value "+offsetValue, 10, 30);
  text(abs(oldRangeValue-newRangeValue), 10, 50);
  pop();
  
  ellipse(width/2*xNoise, height/2*yNoise, circleSize, circleSize);
}
