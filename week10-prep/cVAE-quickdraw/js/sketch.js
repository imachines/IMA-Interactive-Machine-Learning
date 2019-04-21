let cvae, index;

function setup() {
  createCanvas(640, 480);
  cvae = ml5.CVAE('../model/quick_draw/manifest.json', function(){
    console.log("model loaded...");
    console.log(cvae.labels);
  });
  fill(255);
  textSize(50);
}

function draw(){
  index = int(map(mouseY, 0, height, 0, 49));
  index = constrain(index, 0, 49);

  if(cvae.ready){
    cvae.generate(cvae.labels[index], function(err, res){
        image(res.image, 0, 0, width, height);
    });
    text(cvae.labels[index],20,70);
  }
}
