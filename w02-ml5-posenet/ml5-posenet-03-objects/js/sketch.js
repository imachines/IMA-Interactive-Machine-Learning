let video;
let poseNet;
let poses;

let particles = [];

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


function modelReady() {
  console.log("Model Ready!");
}


function draw() {
  background(0);

  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;

        if (score > 0.8) {
          if (partname == "leftEar") {
            particles.push( new Particle(x, y, random(1, 3), random(-1, 1)));
          } else if (partname == "rightEar") {
            particles.push( new Particle(x, y, random(-3, -1), random(-1, 1)));
          }
        }

      }
    }
  }

  image(video, 0, 0);

  // update and display particles
  for (let i=0; i<particles.length; i++) {
    let p = particles[i];
    p.move();
    p.display();
  }

  // limit the number of particles
  if (particles.length > 400) {
    particles.splice(0, 1);
  }
}



class Particle {
  constructor(x, y, xspd, yspd) {
    this.x = x;
    this.y = y;
    this.xspd = xspd;
    this.yspd = yspd;
    this.size = random(5, 12);
    this.color = color(random(255),random(255),random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
  move() {
    this.x += this.xspd;
    this.y += this.yspd;
  }
}
