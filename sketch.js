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
let noiseVector;
let addValue = 0;

let points = [];

function preload() {
  song = loadSound("Daft Punk Rollin.mp3");
}

function setup() {
  createCanvas(windowWidth , windowHeight-25);
  ellipseMode(CENTER)
  background(bgColor);
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
  
  spectrum = fft.analyze();
  let spectrumHerz = spectrum[33];
  let circleSize = map(spectrumHerz, 0, 255, 0, 10);

  oldRangeValue = newRangeValue;
  newRangeValue = spectrumHerz;
  //bass check
  prevBassValue = newBassValue;
  newBassValue = spectrum[2];
  if(abs(prevBassValue-newBassValue) > 50) {
    bgColor = color(random(100,255), random(100,255), random(100.255));
    bgColor.setAlpha(100);
    background(bgColor);
  }

  //high head check
  prevHighHeadValue = newHighHeadValue;
  newHighHeadValue = spectrum[33];

  noiseVector = createVector(map(noise(addValue*0.02), 0, 1,-50, width+50), map(noise ((addValue*0.02)+1000), 0, 1,-50, height+50));

  if(abs(prevHighHeadValue-newHighHeadValue) > 50) {
    addValue +=1;
    points.push(noiseVector);
    
    push();
    noFill();
    stroke('rgba(255, 255, 255, 0.25)');
    beginShape();
    strokeWeight(2);
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      console.log(p.x);
      vertex(p.x,p.y);
    }
    endShape();
    pop();
  }

  if(points.length >200) {
    points.splice(0, 1);
  }
  

  
  fill('rgba(255, 255, 255, 0.01)');
  noStroke();
  ellipse(xNoise, yNoise, circleSize, circleSize);
}
