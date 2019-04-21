function setup() {
  createCanvas(400, 400);
  background(0);
}


function draw() {
  setTimeout( function () {
    background( random(255), random(255), random(255) );
    console.log("Anonymous Function in JS");
  }, 2000);
  noLoop();
}
