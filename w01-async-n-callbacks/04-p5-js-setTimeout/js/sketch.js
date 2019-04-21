function setup() {
  createCanvas(400, 400);
  background(0);
}


function draw() {
  setTimeout(changeBgColor, 2000)
  noLoop();
}


function changeBgColor() {
  background( random(255), random(255), random(255) );
  console.log("BgColor: Changed");
}
