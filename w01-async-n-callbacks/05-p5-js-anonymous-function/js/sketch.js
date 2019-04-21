function setup() {
  createCanvas(400, 400);
  background(0);
}


function draw() {
  setTimeout( variableName, 2000);
  noLoop();
}

// There is no function name now.
let variableName = function () {
  background( random(255), random(255), random(255) );
  console.log("Anonymous Function in JS");
}
