// @include "basil.js";
// @include "./lib/underscore.js";

function draw() {
  b.units (b.MM);
  var x = b.random (0,b.width);
  var y = b.random (0,b.height);
  b.fill(255,255,0);
  b.ellipse(x,y,100,100);
  b.fill(0,0,0);
  b.ellipse(x-25,y-15,25,25);
  b.ellipse(x+25,y-15,25,25);
  b.stroke(0,0,0);
  b.strokeWeight(2);
  b.noFill;
  b.arc(x,y+15,50,50,0,3.14);
  
}

b.go(b.MODESILENT);
