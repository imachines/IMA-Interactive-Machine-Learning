// aven le zhou: https://www.aven.cc
// 2019.04

let featureExtractor, features, knnClassifier;
let video;
let label, ready2predict = false;
let labels = [];


function setup() {
  // put setup code here
  video = createCapture(VIDEO);
  // video.hide();
  createCanvas(800,600);

  featureExtractor = ml5.featureExtractor('MobileNet',function(){
    console.log("model is loaded...");
  });

  knnClassifier = ml5.KNNClassifier();

  labels = ['老虎','棒子','鸡','none'];

}

function draw() {
  // put drawing code here
  if(ready2predict){
    const features = featureExtractor.infer(video);
    knnClassifier.classify(features,function(err,result){
      if(err){
        console.log(err);
      }else{
        label = result.label;
        console.log(label);
      }
    });
  }
}

function keyPressed(){
  if(key === 'p' || key === 'P'){
    ready2predict = !ready2predict;
  }
  //If not input is provided, the video element provided
  //in the method-type will be used.
  if(key === 'q' || key === 'Q'){
    const features = featureExtractor.infer(video);
    knnClassifier.addExample(features, labels[0]);
  }
  if(key === 'w' || key === 'W'){
    const features = featureExtractor.infer(video);
    knnClassifier.addExample(features, labels[1]);
  }
  if(key === 'e' || key === 'E'){
    const features = featureExtractor.infer(video);
    knnClassifier.addExample(features, labels[2]);
  }
  if(key === 'r' || key === 'R'){
    knnClassifier.addExample(features, labels[3]);
  }
}
