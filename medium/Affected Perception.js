#includepath "~/Documents/;%USERPROFILE%Documents"; 
#include "basiljs/bundle/basil.js";

function draw() {
   
    var impWords1 = ["human", "beings", "listen", "speak", "read", "write", "digital", "reality", "programs", "programmed", "landscape", "software", "Program", "access", "control", "panel", "digital", "technologies", "Computers", "networks", "living", "things", "technology",  "future", "programming", "cooperation", "blueprint", "design", "progress", "knowledge", "civilization"]; 
    var impWords2 = ["language", "literacy ", "choice", "tools", "instructions", "characterize", "shaping", "possibilities", "ability"];
    var impWords3 = ["acquired", "learned", "gained", "use", "increasingly", "make", "emerging", "create", "Choose", "ways", "natural", "means", "way", "live", "work", "world", "creating", "collective", "social", "economic", "practical", "artistic", "spiritual", "tremendous", "gave", "shared", "inconceivably", "conceivable", "entirely", "engaged","connected", "responding", "unpredictably", "opposed", "interactive", "incapable", "learn", "works", "give"];
    var impWords4 = ["move", "highly", "simple", "former", "latter", "real", "get", "many", "growth", "went", "markedly", "different", "more", "mere", "comes", "come", "take", "increasingly", "important", "explicit", "matters", "together"];
    var impWords5 = ["not", " just", "into", "must", "but", "ahead,", "will", "really", "gain", "could", "last", "make", "while", "out", "before", "like", "Unlike", "even", "also", "as", " such", "After", "pass", "now"];
    var impWords6 = ["rake", "pen", "jackhammer", "words", "people", "call", "role"];
    var impWords7 = ["When", "we", "how", "them", "you", "be", "it", "are", "what", "They", "themselves", "with", "itself", "our", "will", "both", "without", "why", "We", "they"];
    var impWords8 = ["to", "And", "In", "an", "or", "It´s", "the", "and", "For", "than", "a", "This", "is", "it", "its", "of", "on", "it's", "itself.", "in", "That's", "that,", "them.", "themselves", "that", "That´s", "this", "The", "for", "to",  "so"];

    var story = b.doc().stories[0]; // first story in document

    var words = b.words( story );

    b.layer("generated");

    for( var i = 0; i < words.length; i++ ) {

        if(!words[i].isValid) {
            b.warning("ungültiges Wort, vermutlich ausserhalb der TextFrames!");
            return;
        }

        var tf = words[i].parentTextFrames[0];
        b.page(tf);
        
        var bounds = b.bounds(words[i]); 
        var newTf = b.text(words[i].contents, bounds.left, bounds.top, bounds.width + 3, bounds.height);

        try{
            lookUpWord(words[i], newTf, impWords1, "imp1");
            lookUpWord(words[i], newTf, impWords2, "imp2");
            lookUpWord(words[i], newTf, impWords3, "imp3");
            lookUpWord(words[i], newTf, impWords4, "imp4");
            lookUpWord(words[i], newTf, impWords5, "imp5");
            lookUpWord(words[i], newTf, impWords6, "imp6");
            lookUpWord(words[i], newTf, impWords7, "imp7");
            lookUpWord(words[i], newTf, impWords8, "imp8");
        } catch(exception) {
            continue; // gehe zum nächsten wort
        }

}


function lookUpWord(word, newTf, stringArray, objStyleName){

    for( var q = 0; q < stringArray.length; q++ ) {

        if(  stringArray[q] === word.contents ){ 
            b.println(objStyleName); 
            var style = b.doc().objectStyles.itemByName(objStyleName);
            newTf.applyObjectStyle(style); 
            throw new Exception();
            } 
        }

    }
        
}


b.go(); 

