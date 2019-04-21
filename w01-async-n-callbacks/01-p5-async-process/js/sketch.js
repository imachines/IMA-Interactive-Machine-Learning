let img;

function setup() {
  console.log("1: Setup Started");

  createCanvas(400, 300);
  background(0);
  img = loadImage("img/nyush.jpg");

  console.log("2: Setup Done");
}


function draw() {
  console.log("3: Draw Started " + frameCount);
  background(0);
  image( img, 0, 0, 400, 300);

  if (img.width > 1) {
    console.log("ImageLoaded");
    noLoop();
  }
  console.log("4: Draw Done " + frameCount);
}
