﻿// @include "basil.js";// @include "./lib/underscore.js";function draw() {  b.units(b.PT);  // get selection, filtered by TextFrame  var selection = b.selections();  selection = _.filter(    selection,    function(item) { return item.constructor.name === "TextFrame"}  );  if (selection.length === 0) { alert("Please select some TextFrames") };  // process selection  _.each(selection, function(textFrame) {    _.each(textFrame.words, function(word, i) {      var bbox = b.bounds(word);      var t = b.text(        i+1, // start at 1        bbox.left,        bbox.bottom,        10,        5      );      b.typo(t, "pointSize", 6);    })  });}b.go(b.MODESILENT);