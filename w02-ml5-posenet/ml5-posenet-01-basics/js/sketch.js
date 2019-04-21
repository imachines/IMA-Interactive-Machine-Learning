let video;
let poseNet;
let poses;


function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function (results) {
    poses = results;
  });
}


function draw() {
  background(0);
  image(video, 0, 0);

  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      // console.log( poses[i].pose.keypoints ); // take a look at this first

      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        // console.log( poses[i].pose.keypoints[j] );
        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;

        if (score > 0.5) {
          noStroke();
          fill(0,255,0);
          ellipse(x,y,5,5);
          text(partname, x + 10, y + 10);
          text(nf(score, 0, 2), x + 10, y + 30);
        }
      }
    }
  }
}


function modelReady() {
  console.log("Model Ready!");
}
