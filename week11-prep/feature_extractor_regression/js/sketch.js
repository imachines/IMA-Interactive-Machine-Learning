// aven le zhou: https://www.aven.cc
// 2019.04


let featureExtractor, regressor, video;
let val, ready2predict = false;
let labels = [];

function setup() {
  // put setup code here
  createCanvas(800,600);
  video = createCapture(VIDEO);
  // video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet',function(){
    console.log("model is loaded...");
  });

  regressor = featureExtractor.regression(video, function(){
    console.log("video is ready...");
  });

  labels = [0,3,6];

}

function draw() {
  // put drawing code here
  if(ready2predict){
    regressor.predict(function(err,result){
      if(err){
        console.log(err);
      }else{
        val = result;
        console.log(floor(val));
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
    regressor.addImage(labels[0],function(){ 
      console.log('added one ' + labels[0] + ' image');
    });
  }
  if(key === 'w' || key === 'W'){
    regressor.addImage(labels[1],function(){ 
      console.log('added one ' + labels[1] + ' image');
    });
  }
  if(key === 'e' || key === 'E'){
    regressor.addImage(labels[2],function(){ 
      console.log('added one ' + labels[2] + ' image');
    });  
  }

  if(key === 't' || key === 'T'){
    regressor.train(function(lossValue){
      console.log("loss value is decreasing-- "+ lossValue);
    });
    console.log("model is trained...");
  }
}