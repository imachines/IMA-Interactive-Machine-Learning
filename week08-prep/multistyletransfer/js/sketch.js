let video, style, output;
let transfer = false;
let style_names = ['zaha','la_muse', 'mathura', 'matilde_perez','matta','rain_princess','scream','udnie','wave','wreck'];
let styles = [];
let style_key = 0;


function setup() {
  // put setup code here
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  for(let i = 0; i < style_names.length; i++){
    let model_path = "../models/" + style_names[i];
    styles[i] = ml5.styleTransfer(model_path, video, function () {
      console.log(style_names[i] + " is loaded...");
    });  
  }
  // style = ml5.styleTransfer("../models/udnie", video, function () {
  //   console.log("model is loaded...");
  // });

  output = createImg('');
  output.hide();
}

function draw() {
  // put drawing code here
  if (!transfer) {
    console.log("show camera source...");
    image(video, 0, 0);
  } else {
    console.log("show styled result...");
    if(styles[style_key].ready){
      styles[style_key].transfer(function (err, result) {
        output.attribute('src',result.src);
      });
    }
    image(output, 0, 0, 640, 480);
    console.log(output.width + ":" + output.height);
  }
}

function keyPressed() {
  let num = parseInt(key,10);
  console.log(num);
  if (key === ' ') {
    transfer = !transfer;
  }else if(Number.isInteger(num)){
    console.log(num);
    style_key = num;
  }
}
