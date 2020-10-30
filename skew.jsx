// @include "basil.js";
// @include "./lib/underscore.js";

function draw() {
  b.units(b.PT);
  var selectedItems = b.selections();
  // only use first item selected
  
  for (var i = 0; i<selectedItems.length; i++){
      var col =b.color (b.random(0,255),b.random(0,255),b.random(0,255));
      b.typo(selectedItems[i], "fillColor", col);
      
      for (var ii=0; ii<selectedItems[i].characters.length; ii++){
          b.typo(selectedItems[i].characters[ii], "skew", b.random(-20,20));
          b.typo(slectedItems[i].characters[ii], "pointSize", 5+11*5);
          }
      }
}

b.go();
