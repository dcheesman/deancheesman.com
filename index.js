var dRange = 300;
var maxForce = 5;


var maxDots = 200;

var dots = [];

function setup () {
  var myCanvas = createCanvas(windowWidth, windowHeight);

  for (var i = 0 ; i< maxDots; i++){
    newDot();
  }
}

function draw () {
  background(255);

  noStroke();
  fill(242);


  for (var i = dots.length - 1; i >= 0; i--) {
    dots[i].process();

    if(dots[i].r < 1){
      if( random(100) > 98 ){
        dots.splice(i, 1);
      }
    }
  }
}

function newDot() {
  var newDot = new Dot();
  dots.push(newDot);
}

function Dot( new_x  , new_y ) {

  this.targetR = 15;
  this.rStart = 0;
  this.x = new_x || random(width);
  this.y = new_y || random(height);
  this.r = this.rStart;

  this.vx = random(-1, 1);
  this.vy = random(-1, 1);
}

Dot.prototype.process = function (){
  this.d = dist(mouseX, mouseY, this.x, this.y);


  // radius process
  if(this.d < dRange ){
    this.r = map(this.d, dRange, 0, this.rStart, this.targetR);
    if(dots.length < maxDots) {
      newDot(this.x, this.y);
      this.vx = random(-1, 1);
      this.vy = random(-1, 1);
    }
  } else {
    this.r = lerp(this.r, this.rStart, 0.1);
  }


  // velocity
  if(this.x + this.vx > width || this.x + this.vx < 0){
    this.vx *= -1;
  }

  if(this.y + this.vy > height || this.y + this.vy < 0){
    this.vy *= -1;
  }

  this.x += this.vx;
  this.y += this.vy;


  ellipse(this.x, this.y, this.r, this.r);

};