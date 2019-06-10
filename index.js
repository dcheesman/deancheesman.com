var dRange = 300;
var maxForce = 5;


var maxDots = 200;
var maxPolys = 42;

var dots = [];
var polys = [];

function setup () {
  var myCanvas = createCanvas(windowWidth, windowHeight);

  for (var i = 0 ; i< maxDots; i++){
    newDot();
  }
  for (var i = 0 ; i< maxPolys; i++){
    newPoly();
  }
}

function draw () {
  background(255);

  noStroke();
  fill(242);


  for (var i = dots.length - 1; i >= 0; i--) {
    dots[i].process();

    // if(dots[i].r < 1){
    //   if( random(100) > 98 ){
    //     dots.splice(i, 1);
    //   }
    // }
  }

  for (var i = polys.length - 1; i >= 0; i--) {
    polys[i].process();
  }
}

function newDot() {
  var newDot = new Dot();
  dots.push(newDot);
}

function newPoly() {
  var dot1 = Math.floor(Math.random() * maxDots);
  var dot2 = Math.floor(Math.random() * maxDots);
  var dot3 = Math.floor(Math.random() * maxDots);
  var newPoly = new Poly(dot1, dot2, dot3);
  polys.push(newPoly);
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

function Poly( dot_1, dot_2, dot_3) {
  this.dot1 = dot_1;
  this.dot2 = dot_2;
  this.dot3 = dot_3;
}

Poly.prototype.process = function() {
  var dot1 = dots[this.dot1];
  var dot2 = dots[this.dot2];
  var dot3 = dots[this.dot3];

  var d1 = dist( dot1.x, dot1.y, dot2.x, dot2.y);
  var d2 = dist( dot2.x, dot2.y, dot3.x, dot3.y);
  var d3 = dist( dot3.x, dot3.y, dot1.x, dot1.y);

  var da = (d1 + d2 + d3)/3;

  var a = map(d1, 0, dRange/3, 255, 0);

  fill( 110 , a );

  beginShape();
  vertex(dot1.x, dot1.y);
  vertex(dot2.x, dot2.y);
  vertex(dot3.x, dot3.y);
  endShape(CLOSE);
};