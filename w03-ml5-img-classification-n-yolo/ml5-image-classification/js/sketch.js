let classifier;
let img;

let name = "Name";
let probability = 0;


function preload() {
  img = loadImage("img/tesla-cat.jpg");
}


function setup() {
  createCanvas(907, 510);
  background(0);

  classifier = ml5.imageClassifier('MobileNet', modelReady);
}


function draw() {
  image(img, 0, 0);
  textSize(20);
  text(name , 100, height/2);
  text(probability, 100, height/2 + 30);
}


function modelReady() {
  console.log("Model Loaded");
  classifyImage();
}

function classifyImage() {
  classifier.predict(img, gotResult);

  /////  .predict(input, ?callback) /////
  // A HTML video or image element or a p5 image or video element. If no input is provided, the default is to use the video given in the constructor.
}

function gotResult(err, results) {
  name = results[0].className;
  probability = nf(results[0].probability, 0, 2);
}
