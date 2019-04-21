function setup() {
  createCanvas(400, 400);
  background(0);
}


function draw() {
  changeColor(255,0,0, alertColorChange);
  noLoop();
}


function changeColor(r,g,b, myCallbackFuntion) {
  background(r,g,b);
  alert("Done!");
  myCallbackFuntion(r,g,b);
}


function alertColorChange(r,g,b) {
  alert(r + ", " + g + ", " + b);
}
