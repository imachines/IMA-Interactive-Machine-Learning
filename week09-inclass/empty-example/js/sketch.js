let style, video;
let output;
let transfer = false;
let style_names = ['zaha','wave','udnie'];
let styles = [];
let style_index = 0;

function setup() {
  // put setup code here
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();

  for(let i = 0; i < style_names.length; i++){
    let path = "../models/" + style_names[i];
    styles[i] = ml5.styleTransfer(path, video, function(){
      console.log(style_names[i] + "model is loaded");
    });
  }
  // style = ml5.styleTransfer("../models/zaha", video, function(){
  //   console.log("model is loaded");
  // });

  output = createImg('');
  output.hide();
}

function draw() {
  // put drawing code here

  if(styles[style_index].ready && transfer){
    styles[style_index].transfer(function(err, results){
      if(err){
        console.log("style transfer failed...");
      }else{
        output.attribute('src', results.src);
      }
    });
  }

  if(transfer){
    image(output,0,0,640,480);
  }else{
    image(video,0,0);
  }

  //the error popup in class when the model is not ready
  //and the style transfer has started
}
function keyPressed(){
  if(key === ' '){
    transfer = !transfer;
  }
  if(key == 'q' || key == 'Q'){
    style_index = 2;
  }
  if(key == 'a' || key == 'A'){
    style_index = 1;
  }
  if(key == 'z' || key == 'Z'){
    style_index = 0;
  }


}
