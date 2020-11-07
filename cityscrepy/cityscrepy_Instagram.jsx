#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
    
    // defiing grid
    const gridSize = 50;
    const unitHeight = b.height/gridSize;
    const unitWidth = b.width/gridSize;
    b.noStroke();
    
     //     load instagram data
    var data = b.CSV.decode( b.loadString("02_Сад Андрея Петрова.csv") );
    b.println("loaded "+data.length+" instagram photos");
   
    var newDate = [];
    var newTime = [];
    var likes = [];
    var comments = [];
    var caption = [];
    var hashtags = [];
//~     var emojis = [];
    var userid = [];
 
 // defining arrays of data from IG 
    for (var i=0; i < data.length; i++) {
        newDate[i] = new Date(data[i].date);
        newTime[i] = newDate[i].getSeconds()+newDate[i].getMinutes()*60+newDate[i].getHours()*3600;
        likes[i] = parseInt (data[i].likes_count);
        comments[i] = parseInt (data[i].comments_count);
        caption[i] = data[i].caption;
//~         emojis[i] = data[i].caption;
        hashtags[i] = data[i].hashtags;
        userid[i] = data[i].user_id;
    };
 
 // defining range for likes etc
    var maxLikes = Math.max.apply(Math, likes.map(function(a) {return a;}));
    var maxComments = Math.max.apply(Math, comments.map(function(a) {return a;}));
    var maxUserId = Math.max.apply(Math, userid.map(function(a) {return a;}));
    var minUserId = Math.min.apply(Math, userid.map(function(a) {return a;}));
    
 // sum digits in the id )
    function sumDigits(number) {
          var str = number.toString();
          var sum = 0;
          for (var i = 0; i < str.length; i++) {
                sum += parseInt(str.charAt(i), 10);
          }
    return sum;
    }
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
// setting drawing parameters
    for (var i = 0; i < data.length; i++) {
        var y = b.map(sumDigits(userid[i]),0,100,b.height-unitHeight,1);
//~         var y = b.map(userid[i],minUserId,maxUserId,b.height-unitHeight,1);
        var x = b.map(newTime[i],0,86400,1,b.width-unitWidth);
        var xAngle = b.map(newTime[i],0,86400,0,360);
        var likesSize = b.map(likes[i],0,maxLikes,unitHeight*0.5,unitHeight*10);
        var commentsSize = b.map(comments[i],0,maxComments,likesSize+unitHeight*1,likesSize+unitHeight*2);
        var emojisSize = b.map(countEmojis(caption[i]),1,10,unitHeight*0.5, b.width-unitWidth);
        var wordsSize = b.map(countWords(caption[i]),1,100,unitHeight*0.5, b.width-unitWidth);
//~       var ellipseTint = b.map(comments[i],0,maxComments,30,100);
        var ellipseColorR = b.map(comments[i],0,maxComments,0,255);
        var ellipseColorG = b.map(countEmojis(caption[i]),0,10,0,255);
        var ellipseColorB = b.map(comments[i],maxComments,0,255,0);

// drawing fugures
//squares
        b.fill(0,0,255-Math.round(ellipseColorB));
        var createdCaption = b.rect(b.width/2,b.height/2,emojisSize,wordsSize);
        createdCaption.absoluteRotationAngle = 360-xAngle;

// comments - outline
        b.fill(255-Math.round(ellipseColorR),0,0);
//~         b.fillTint (ellipseTint);
        b.ellipse (x,y,commentsSize,commentsSize);

// likes - fill + width - caption, rotation - time
        b.fill(0,Math.round(ellipseColorG),0);
//~         b.fillTint (ellipseTint);
        var like = b.ellipse (x,y,likesSize,likesSize);
        b.itemWidth(like, wordsSize);
        like.absoluteRotationAngle = xAngle;
        
//~         b.println(newTime[i]);
        b.println(countWords(caption[i]));
        }
 }    

b.go();