let classifier;
let video;

let name = "";
let probability = 0;


function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}


function draw() {
  background(0);
  fill(255);
  textSize(20);
  text(name , width/2, height/2);
  text(probability, width/2, height/2 + 30);
}


function modelReady() {
  console.log("Model Loaded");
  classifyVideo();
}


function classifyVideo() {
  classifier.predict(gotResult);

  /////  .predict(input, ?callback) /////
  // A HTML video or image element or a p5 image or video element. If no input is provided, the default is to use the video given in the constructor.
}


function gotResult(err, results) {
  name = results[0].className;
  probability = nf(results[0].probability, 0, 2);
  classifyVideo();
}
