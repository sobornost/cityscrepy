// @include "basil.js";
// @include "./lib/underscore.js";

function draw() {
  var selectedItems = b.selections();
  // only use first item selected
  
  for (var i = 0; i<selectedItems.length; i++){
      var col =b.color (b.random(0,255),b.random(0,255),b.random(0,255));
      b.typo(selectedItems[i], "fillColor", col);
      
      for (var ii = 0; ii < selectedItems[i].characters.length; ii++){
         b.typo(selectedItems[i].characters[ii], "skew", b.random(-30,30));
          var p = b.map(ii, 0, selectedItems[i].characters.length, 10, 50);
          b.typo(selectedItems[i].characters[ii], "pointSize", b.floor(p));
          }
     }
}

b.go();
