let video;
let poseNet;
let poses;

let graphic;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function (results) {
    poses = results;
  });

  graphic = createGraphics(width, height, RGB);
}


function draw() {
  background(0);
  //graphic.background(0);

  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;

        if (partname == "nose") {
          if (score > 0.8) {
            graphic.noStroke();
            graphic.fill(180, 120, 10);
            graphic.ellipse(x, y, 10, 10);
          }
        }

      }
    }
  }

  image(video, 0, 0);
  blendMode(ADD);
  image(graphic, 0, 0);
  blendMode(NORMAL);

  text("Press SpaceBar to clear the drawing.")
}


function modelReady() {
  console.log("Model Ready!");
}


function keyPressed() {
  if (key == " ") {
    graphic.background(0);
  }
}
