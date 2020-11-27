/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi and heal" in the browser's dev tools console
console.log("hi and heal");


// code modified and borrowed from Yusuku Omie codepen.io/lm0-3/pen/PZVRJr

function setup(){
  createCanvas(500, 350);
  centerX = width / 2;
  centerY = height / 2;
  for(var i = 1; i <= 20; i++){
   flower[i] = new Flower(10 * i, i);
  }
}



function draw(){
  background(161, 248, 176);
  for(var i = 15; i >= 1; i--){
    flower[i].draw();
    flower[i].update();
  }
}


class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  add(v){
    this.x += v.x;
    this.y += v.y;
  }
  sub(v){
    this.x -= v.x;
    this.y -= v.y;
  }
  mult(n){
    this.x = this.x * n;
    this.y = this.y * n;
  }
  div(n){
    this.x = this.x / n;
    this.y = this.y / n;
  }
  mag(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  normalize(){
    let m = this.mag();
    if(m !== 0){
      this.div(m);
    }
  }
  limit(max){
    if(this.mag() > max){
      this.normalize();
      this.mult(max);
    }
  }
}

let centerX, centerY;
let flower = [];
let limit = 35;


class Flower {
  constructor(r, i){
    this.angle =radians(360 / 60  * i);
    this.r = r;
    this.index = i;
    this.position = [];
    this.mouse = new Vector(mouseX - centerX, mouseY - centerY);
    this.mouse.normalize();
    this.mouse.mult(5);
    for(var i = 0; i <= limit; i++){
      this.position[i] = new Vector(cos(radians(360 / limit * i)) * this.r + centerX, sin(radians(360 / limit * i)) * this.r + centerY);
    }
  }
  draw(){
    noStroke();
    fill(120 - (100 / 20 * this.index), 255 - (120 / 20 * this.index), 120 + (125 / 20 * this.index));
    beginShape();
    for(var i = 0; i <= limit; i++){
      curveVertex(this.position[i].x + this.mouse.x * sin(360 / limit *i), this.position[i].y + this.mouse.y * cos(360 / limit *i),);
    }
    endShape();
  }
  update(){
    this.mouse = new Vector(mouseX - centerX, mouseY - centerY);
    this.mouse.normalize();
    this.mouse.mult(20 * sin(this.angle));
  }
}
