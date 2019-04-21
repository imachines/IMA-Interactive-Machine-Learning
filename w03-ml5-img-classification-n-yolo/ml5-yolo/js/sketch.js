let video;
let yolo;
let status;
let objects = [];


function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  yolo = ml5.YOLO(video, modelReady);
}


function draw() {
  background(0);
  image(video, 0, 0, 640, 480);

  for (let i = 0; i < objects.length; i++) {

    let name = objects[i].className;
    let x = objects[i].x * width;
    let y = objects[i].y * height;
    let w = objects[i].w * width;
    let h = objects[i].h * height;

    noFill();
    strokeWeight(4);
    stroke(0,255, 0);
    rect(x, y, w, h);

    noStroke();
    fill(0, 255, 0);
    text(name, x, y - 7);

  }
}


function modelReady() {
  console.log('Model loaded!');
  // start detecting
  detect();
}


function detect() {
  yolo.detect(function(err, results){
    objects = results;
    detect();
  });
}
