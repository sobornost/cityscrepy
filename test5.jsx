#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw(){
    b.clear(b.doc);
    b.units(b.MM);
    
    var doc = b.doc();
    doc.documentPreferences.properties = {pageWidth:200, pageHeight:200};
    
    b.textSize(144);
    b.textAlign(Justification.CENTER_JUSTIFIED, VerticalJustification.CENTER_ALIGN);
    var textFrame = b.text("Trofim",0,0,b.width,b.height);
    b.characters(textFrame, function(character, loopCount){
        character.properties = {
            strikeThru: true,
            strikeThroughColor: 'Paper',
            strikeThroughWeight: 144/3,
            strikeThroughOffset: (b.random(70))
            }
        });
    // -------
    var fname = File($.fileName).parent.fsName + '/' + ($.fileName.split('/')[$.fileName.split('/').length - 1]).split(".")[0]+".indd";
    doc.save(fname, false, 'Trofim', true);
    b.println(fname);
    b.savePNG('out.png');
}

b.go();