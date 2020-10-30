﻿﻿#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";
// this sketch shows how to create dialogs
// for interaction with the user
function draw() {
  // code goes here -----------
  var doc = b.doc(); // get the doc
  b.clear(doc);// clear it
  b.units(b.MM); // set it to MM
  doc.documentPreferences.properties = {
      pageWidth:200,
      pageHeight:200
    };
  var dialog = app.dialogs.add(); // create the dialog
  var column = dialog.dialogColumns.add();// add a column
  var text = column.staticTexts.add();// add a label
  text.staticLabel = "Hello World";// add some text to the label
  // add a dropdown with some possibilities
  var dropdown = column.dropdowns.add({
    stringList: ["\u02e8\u02e9\u02e7\u02e5\u02e6", "\u02e5\u02e7\u02e6\u02e9\u02e8"], /* the strings to show */
    selectedIndex: 0 /* it is better to select seomthing or we get a -1 */
  });
  var tf = null; // will hold the textframe
  var x = doc.marginPreferences.left; // coordinates
  var y = doc.marginPreferences.top;  // coordinates
  var w = b.width - (doc.marginPreferences.right + doc.marginPreferences.left); // the tf width
  var h = b.height - (doc.marginPreferences.top + doc.marginPreferences.bottom); // the tf height
  // now show the dialog and exectue actions only
  // if the user hits ok
  if (dialog.show() === true) {
    b.println('you pressed ok'); // woohoo! \o/
    // now we can work with the selection
    // if nothing is selected we jump to the else
    // this is why we set the selectedIndex on creation
    if (dropdown.selectedIndex === 0) {
      b.println('The user selected "Hello"'); // proof it
      // the nect line could be done later on
      // we have it here to show the slected index
      // but we could just ask
      // if(dropdown.selectedIndex !== -1){}
      // and then call the tf creation only once
      // DRY Code
      tf = b.text(dropdown.stringList[dropdown.selectedIndex], x,y,w,h);
    } else if (dropdown.selectedIndex === 1) {
      b.println('The user selected "World"'); // proof it
      // same as in dropdown.selectedIndex === 0
      tf = b.text(dropdown.stringList[dropdown.selectedIndex], x,y,w,h);
    } else {
      b.println('There was nothing selected. No selectedIndex set');
      b.println("dropdown.selectedIndex is: " + dropdown.selectedIndex);
      alert('Nothing selected');
    }
    dialog.destroy();
    // from this point on the script can continue to work on things
    // we should remove the dialog after the user clicked something or he will
    // have the dialog infront of the things that are happening
    if (tf !== null) {
      tf.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
      tf.paragraphs.everyItem().justification = Justification.CENTER_JUSTIFIED;
      tf.paragraphs.everyItem().hyphenation = false;
      tf.paragraphs.everyItem().appliedFont = 'Arial\tBold';
      while (tf.overflows !== true) {
        tf.paragraphs.everyItem().pointSize = tf.paragraphs.everyItem().pointSize + 1;
      }
      while (tf.overflows === true) {
        tf.paragraphs.everyItem().pointSize = tf.paragraphs.everyItem().pointSize - 1;
      }
    }
  } else {
    b.println('You pressed cancel');
  }
  // end of your code ---------
   // the next lines save the file and create an PNG
  var fname = File($.fileName).parent.fsName + '/' + ($.fileName.split('/')[$.fileName.split('/').length - 1]).split('.')[0] + '.indd';
  b.println(fname);
  doc.save(fname, false, 'basil', true);
  b.savePNG('out.png');
}
b.go();

You want to know more? Follow us on or take a look at the source code on . Build with jekyll, fontawesome and by Fabian Morón Zirfas for University of Applied Sciences Potsdam (Germany)
