// @include "basil.js";
// @include "./lib/underscore.js";

function draw() {
  var pageCount = 5;

  b.textFont("Arial", "Bold");
  b.textAlign(Justification.CENTER_ALIGN);

  for (var i = 0; i < pageCount; i++) {
    // animated pagination
    b.fill(0);
    var y = b.map(i, 0,pageCount, 0,b.height-100);
    var pointSize = b.map(i, 0,pageCount, 10,100);
    b.textSize(pointSize);
    b.text(i + 1, 0, y, b.width, 100);

    // put konfetti code in here
    // start
    for(var ii = 0; ii < 3; ii++) {
      b.fill(b.random(0, 255), b.random(0, 255), b.random(0, 255));
      b.ellipse(b.random(b.width), b.random(b.height), 20, 20);
    }
    // end

    // add new page
    if (i < pageCount-1) {
      b.addPage();
    }
  }

}

b.go(b.MODESILENT);
