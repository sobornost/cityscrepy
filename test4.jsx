﻿#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
        var tileCount = 15;
        var randomX = b.random(0,b.width);
        var randomY = b.random(0,b.height);
        
        b.strokeWeight (0);
        
        for (var gridY = 0; gridY <= tileCount; gridY++) {
            for (var gridX = 0; gridX <= tileCount; gridX++){
                var posX = b.width/tileCount*gridX;
                var posY = b.height/tileCount*gridY;
                b.line(posX, posY, randomX, randomY);
        }
    }
}

b.go();