﻿// @include "basil.js";// @include "./lib/underscore.js";function draw() {  // get selection, filtered by TextFrame  var selection = b.selections();  selection = _.filter(    selection,    function(item) { return item.constructor.name === "TextFrame"}  );  if (selection.length === 0) { alert("Please select some TextFrames") };  // process selection  var tintStart = 100;  var tintEnd = 5;  var cycle = 9;  _.each(selection, function(textFrame) {    _.each(textFrame.words, function(word, index) {      var i = index % cycle;      word.fillTint = b.map(i, 0,cycle-1, tintStart,tintEnd);    })  });}b.go(b.MODESILENT);