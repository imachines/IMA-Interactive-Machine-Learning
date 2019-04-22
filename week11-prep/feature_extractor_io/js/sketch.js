// aven le zhou: https://www.aven.cc
// 2019.04


let featureExtractor, classifier, video;
let label, ready2predict = false;
let labels = [];

// let opt = {   
//   version: 1,
//   alpha: 1.0,
//   topk: 3,
//   learningRate: 0.0001,
//   hiddenUnits: 100,
//   epochs: 20,
//   numClasses: 3,
//   batchSize: 0.4
// }

function setup() {
  // put setup code here
  video = createCapture(VIDEO);
  // video.hide();
  createCanvas(800, 600);

  featureExtractor = ml5.featureExtractor('MobileNet', function () {
    console.log("model is loaded...");
  });
  featureExtractor.numClasses = 4;
  // featureExtractor.mobilenet.infer(video, endpoint);

  classifier = featureExtractor.classification(video, function () {
    console.log("video is ready...");
  });

  labels = ['Rock', 'Paper', 'Scissor', 'none'];

}

function draw() {
  // put drawing code here
  if (ready2predict) {
    classifier.classify(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        label = result;
        console.log(label);
      }
    });

    // const features = featureExtractor.getFeatures(video);
    // console.log('features: ', features);
  }
}

function keyPressed() {
  if (key === 'p' || key === 'P') {
    ready2predict = !ready2predict;
  }
  //If not input is provided, the video element provided 
  //in the method-type will be used.
  if (key === 'q' || key === 'Q') {
    classifier.addImage(labels[0], function () {
      console.log('added one ' + labels[0] + ' image');
    });
  }
  if (key === 'w' || key === 'W') {
    classifier.addImage(labels[1], function () {
      console.log('added one ' + labels[1] + ' image');
    });
  }
  if (key === 'e' || key === 'E') {
    classifier.addImage(labels[2], function () {
      console.log('added one ' + labels[2] + ' image');
    });
  }

  if (key === 'r' || key === 'R') {
    classifier.addImage(labels[3], function () {
      console.log('added one ' + labels[3] + ' image');
    });
  }

  if (key === 't' || key === 'T') {
    classifier.train(function (lossValue) {
      console.log("loss value is decreasing-- " + lossValue);
    });
    console.log("model is trained...");
  }

  // save and load the model
  //https://www.youtube.com/watch?v=eU7gIy3xV30

  if (key === 's' || key === 'S') {
    classifier.save();
  }

  if (key === 'l' || key === 'L') {
    ready2predict = false;
    classifier.load('model/model.json', function () {
      console.log("custom model is loaded...")
    });
  }
}