let img;


function preload() {
  img = loadImage("img/nyush.jpg");
}


function setup() {
  createCanvas(400, 300);
  background(0);
}


function draw() {
  background(0);
  image( img, 0, 0, 400, 300);
  
  console.log( frameCount + " | " +img.width);

  noLoop();
}
