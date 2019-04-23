let featureExtractor, classifier, video;
let labels = [];
let label = '';
let ready2predict = false;
function setup() {
  video = createCapture(VIDEO);
  createCanvas(800, 600);
  background(0);

  featureExtractor = ml5.featureExtractor('MobileNet',function(){
    console.log("mobilenet model is loaded...");
  });
  featureExtractor.numClasses = 4;

  classifier = featureExtractor.classification(video,function(){
    console.log("video/classifier is ready...");
  });

  labels = ['Tree', 'NYU', 'Organge', 'kHeart'];
}


function draw() {
  //
  if(ready2predict){
    classifier.classify(function(err, result){
      if(err){
        console.log(err);
      }else{
        label = result;
        console.log(label);
      }
    });
  }
}

function keyPressed(){
  if(key === 'p' || key === 'P'){
      ready2predict = !ready2predict;
  }

  if(key === 'q' || key === 'Q'){
    classifier.addImage(labels[0],function(){
      console.log("label 0 is added");
    });  //paired data: image + label
  }

  if(key === 'w' || key === 'W'){
    classifier.addImage(labels[1],function(){
      console.log("label 1 is added");
    });  //paired data: image + label
  }

  if(key === 'e' || key === 'E'){
    classifier.addImage(labels[2],function(){
      console.log("label 2 is added");
    });  //paired data: image + label
  }

  if(key === 'r' || key === 'R'){
    classifier.addImage(labels[3],function(){
      console.log("label 3 is added");
    });  //paired data: image + label
  }

  if(key === 't' || key === 'T'){
    classifier.train(function(lossValue){
      console.log("loss value is " +  lossValue);
    });
    console.log("model is well trained...");
  }

  if(key === 's' || key === 'S'){
    classifier.save();
  }
}
