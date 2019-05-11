let video, style, output, img;
let transfer = false;

function setup() {
  // put setup code here
  // createCanvas(400, 200);
  // video = createCapture(VIDEO);
  // video.size(640, 480);
  // video.hide();

  style = ml5.styleTransfer("../models/zaha",function () {
    console.log("model is loaded...");
  });

  output = createImg('');
  // output.hide();
}

function draw() {
  // put drawing code here
  if (!transfer) {
    // console.log("show camera source...");
    // image(video, 0, 0);
  } else {
    console.log("show styled result...");
    if(style.ready){
      img = document.getElementById('img')
      style.transfer(img, function (err, result) {
        if(err){
          console.log('tranfer failed...');
        }else{
          output.attribute('src',result.src);
        }
      });
    }
    // image(output, 200, 0, 200, 200);
    console.log(output.width + ":" + output.height);
  }
}

function keyPressed() {
  if (key === ' ') {
    transfer = !transfer;
  }
}
