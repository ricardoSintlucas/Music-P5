let song;
let fft;

let button;
let spectrum;
let bgColor = "#ffffff";
//bass values
let prevBassValue;
let newBassValue;
//high head values
let prevHighHeadValue;
let newHighHeadValue;
//noise values
let noiseVector;
let addValue = 0;

let cubeSize = 30;
let colums;
let rows;

let bassValue = 0;
let highHeadValue = 0;


let points = [];
let colorSquareR=244;
let colorSquareG=244;
function preload() {
  song = loadSound("Da Funk.mp3");
}

function setup() {
  createCanvas(windowWidth , windowHeight-25);
  background(bgColor);  
  //colorMode(HSB);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Set smoothing to 0, 256 bins
  fft = new p5.FFT(0.6, 64);

  colums = windowWidth / cubeSize;
  rows = windowHeight / cubeSize; 

  for (let i = 0; i < colums; i++) {
    
    for (let j = 0; j < rows; j++) {
      let x = i * cubeSize;
      let y = j * cubeSize;
      push();
      stroke(240);
      fill(255);
      square(x, y, cubeSize);
      pop();
      
    }
  }
 
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

  
  //bass check
  prevBassValue = newBassValue;
  newBassValue = spectrum[2];
  if(abs(prevBassValue-newBassValue) > 50) {
    if(bassValue*cubeSize <= width) {
      bassValue +=1;
    }else{
      bassValue = 0;
    }
    //console.log("bass:"+bassValue + " "+width);
    colorSquareR++;
  }
  //high head check
  prevHighHeadValue = newHighHeadValue;
  newHighHeadValue = spectrum[33];


  if(abs(prevHighHeadValue-newHighHeadValue) > 50) {
    if(highHeadValue*cubeSize <= height) {
      highHeadValue +=1;
    }else{
      highHeadValue = 0;
    }
    //console.log("high:"+highHeadValue + " "+height);
    colorSquareG++;
  }  
  let newX = bassValue*cubeSize;
  let newY = highHeadValue*cubeSize;
  
  let newRed = colorSquareR%255;
  let newGreen =  colorSquareG%255;
  push();
  fill(newRed, newGreen, 255);
  noStroke();
  square(newX, newY, cubeSize);
  pop();

}
