#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
        
    var count = 15;
    
    b.doc();
    b.println(b.width+" x "+b.height);
    
    for (var i=0; i<=count; i++){
        var x = b.random(0, b.width);
        var y = b.random(0, b.height);
        var size = b.random(5,500);
        var newRandomColor = b.color( b.random(125,255), b.random(125,255), b.random(125,255));
        var newRandomOpacity = b.random(50,100);
        b.fill (newRandomColor);
        b.ellipse(x, y, size, size);
        b.opacity (newRandomOpacity);
        }
    }  

b.go();