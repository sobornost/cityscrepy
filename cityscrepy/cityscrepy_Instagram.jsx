#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
    
    // setting defaults - units, color mode etc
    const grid = 10;
    const unit = 33;
    const gridHeight = b.height/grid;
    const gridWidth = b.width/grid;
    const unitHeight = b.height/grid/unit;
    const unitWidth = b.width/grid/unit;
    const paddingBottom = 3;
    
    b.units(b.MM);
    b.colorMode(b.CMYK);
    
    // load instagram data
    var data = b.CSV.decode(b.loadString("parks-and-recreation_1_letny.csv"));    
    b.println("loaded "+data.length+" instagram photos");
    
    // setting variables
    var newDate = [];
    var newTime = [];
    var likes = [];
    var comments = [];
    var caption = [];
    var hashtags = [];
//~     var emojis = [];
    var userid = [];
    var locationName;
    var locationURL;
    
    // date parser
     function parseISOString(s) {
     var b = s.split(/\D+/);
     return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
     }

//~         b.println(countWords(caption[i])); 
    
 // sum digits in the id )
 /*   function sumDigits(number) {
          var str = number.toString();
          var sum = 0;
          for (var i = 0; i < str.length; i++) {
                sum += parseInt(str.charAt(i), 10);
          }
    return sum;
    }*/

 // count hashtags in svg column
    function countHashtags(string)  {
        var matchResults = string.match(/(#[a-z0-9][a-z0-9\-_]*)/ig);
        if (string && string.length) {return matchResults.length
            } else { return 0
            };
     }
 
 //function to count emojis in the instagram post caption. to show emojis, just omit .length 
     function countEmojis(string)  {
        var emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
        var matchResults = string.match(emojiRegexp);
        if (!string) {
           return 0
        } else if (!string.length){
            return 0
        } else if (matchResults==null){
            return 0
        } else {return matchResults.length
        };
     }
   
  //count words by 
     function countWords(s){
        s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
        s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
        s = s.replace(/(#[a-z0-9][a-z0-9\-_]*)/ig); // exclude hashtags - T.
        return s.split(' ').filter(function(str){return str!="";}).length;
        //return s.split(' ').filter(String).length; - this can also be used
    }

// coordinates setup      
     function AngleToRadians(angle){
            return (Math.PI / 180) * angle;
            }
 
 
// defining arrays of data from IG 
                for (var i=0; i < data.length; i++){
                        newDate[i] = parseISOString(data[i].pubDate);
                        newTime[i] = newDate[i].getSeconds()+newDate[i].getMinutes()*60+newDate[i].getHours()*3600;
                        likes[i] = parseInt (data[i].likeCount);
                        comments[i] = parseInt (data[i].commentCount);
                        caption[i] = data[i].description;
                        userid[i] = data[i].ownerId;
                        locationName = data[i].location;
                        b.println(locationName);
                        };
                        
                         // defining range for likes etc
                        var maxLikes = Math.max.apply(Math, likes.map(function(a) {return a;}));
                        var maxComments = Math.max.apply(Math, comments.map(function(a) {return a;}));
                        var maxUserId = Math.max.apply(Math, userid.map(function(a) {return a;}));
                        var minUserId = Math.min.apply(Math, userid.map(function(a) {return a;})); 
 
 
                var l = 0; //steps control init
 
 
// drawing
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 3; x++) {
            
                for (var i = 0; i < data.length; i++) {             
                    
                    if (i>1 && data[i].location == data[i-1].location && data[i].location) {
                        
                        // setting drawing parameters     
                        //~         var y = b.map(likes[i],0,maxLikes,0,b.height/2);
                        //~         var y = b.map(userid[i],minUserId,maxUserId,b.height-unitHeight,1);
                        //~         var x = b.map(comments[i],0,maxComments,0, b.width/2);
                        var xAngle = b.map(newTime[i],0,86400,0,360);
                        var dist = b.map(likes[i],0,maxLikes,unitHeight*0.5,unitHeight*33);
                        var commentsSize = b.map(comments[i],0,maxComments,0,20);
                        //~         var emojisSize = b.map(countEmojis(caption[i]),1,10,unitHeight*0.5, b.width-unitWidth);
                        //~         var wordsSize = b.map(countWords(caption[i]),1,100,unitHeight*0.5, b.width-unitWidth);
                        //~         var ellipseTint = b.map(comments[i],0,maxComments,30,100);
                        //~         var colorC = b.map(countHashtags(caption[i]),0,20,0,100);
                        //~         var colorM = b.map(likes[i],0,maxLikes,0,100);
                        //~         var colorY = b.map(countEmojis(caption[i]),0,10,0,100);
                        //~         var colorK = b.map(countWords(caption[i]),0,440,0,100);
                        
                        // drawing
                        //squares
                        //~         b.fill(0,0,255-Math.round(ellipseColorB));
                        //~         var createdCaption = b.rect(b.width/2,b.height/2,emojisSize,wordsSize);
                        //~         createdCaption.absoluteRotationAngle = 360-xAngle;

                        // comments - outline
                        //~         b.fill(255-Math.round(ellipseColorR),0,0);
                        //~         b.fillTint (ellipseTint);
                        //~         b.ellipse (x,y,commentsSize,commentsSize);

                        // likes - fill + width - caption, rotation - time
                        //~         b.fill(0,Math.round(ellipseColorG),0);
                        //~         b.fillTint (ellipseTint);
                        //~         var like = b.ellipse (x,y,likesSize,likesSize);
                        //~         b.itemWidth(like, wordsSize);
                        //~         like.absoluteRotationAngle = xAngle;
        
                        // lines
                        var x1 = x0+dist*Math.cos(AngleToRadians(xAngle));
                        var y1 = y0+dist*Math.sin(AngleToRadians(xAngle)); 
                        
                        b.strokeWeight(commentsSize);
                        //~         b.stroke(colorC,colorM,colorY,colorK);
                        b.line (x0,y0,x1,y1);
                        x0=x1;
                        y0=y1;
                      
                        }
                    else {
                        //write caption, move to next cell
                         // location caption init and setup 
                        var posX = x*gridWidth;
                        var posY = y*(gridHeight+paddingBottom);
                        
                        b.textSize(6);
                        b.textAlign(Justification.CENTER_ALIGN);
                        b.text (data[i].location, posX,posY+gridHeight, gridWidth, 10);
                        l++;
                        
                       
                        var x0 = posX+gridWidth/2;
                        var y0 = posY+gridHeight;
                        
                //~     locationURL = data[i].query;
                    };
                
                // stop drawing if no more rows are available
                if (l > 3) break; 
                
                };
            };
        };
    }; 
//~  
b.go(/*b.MODESILENT*/);