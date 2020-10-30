#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
	var data = b.CSV.decode(b.loadString('LA_Pools-Pools_per_Hood.csv'));
	b.println(data.length);
	for (var l=0; l<data.length; l++){
		data[l].poolcount = parseFloat(data[l].poolcount);
	};

	b.textSize(6);
	b.textAlign(Justification.CENTER_ALIGN);
	b.units(b.MM);

	var l = 0;
	var gridUnitSize = 40;
	var paddingBottom = 3;

	for (var y = 0; y < 14; y++) {
	    for (var x = 0; x < 10; x++) {
		    var posX = x*gridUnitSize;
		    var posY = y*(gridUnitSize+paddingBottom);

		    var poolcount = data[l].poolcount;
		    var radius =  calcRadiusByArea(poolcount) * 0.5; // scale down
		    var diameter = radius * 2;
		    b.ellipse(posX,posY,diameter,diameter);

		    var hoodname = data[l].hoodname;
		    b.text(hoodname+": "+poolcount,
		           posX-gridUnitSize/2, posY+radius+2,
		           20,10);

		    // stop drawing if no more rows are available
		    if (l > 28) break;

		    l++;
    	};
    };
}


function calcRadiusByArea(A) {
		return Math.sqrt(A/Math.PI);
	}

b.go();