var speech;

var backgroundColor = '#FFFFFF ';
var goodColor = true;

function setup() {
 createCanvas(windowWidth, windowHeight);
 speech = new p5.SpeechRec();
 speech.continuous = true;
 speech.onResult = setColor;
 speech.start();

 createCanvas(windowWidth, windowHeight); // Use the full browser window
 // Additional setup goes here
}

function setColor(){
 var words = speech.resultString.split(' ');
 console.log('SPEECH', words);

 if (words.length >= 4 && words[0] == 'set' && words[1] == 'color' && words[2] == 'to') {
   var colorName = words.splice(3).join('');
   var colorVal = color(colorName);

   console.log('Color: ',colorName);

   if(isWhite(colorVal) && colorName != 'white'){
      console.log('Bad Color:',colorName);
      goodColor = false
   }else{
     goodColor = true;
   }

   if(goodColor) backgroundColor = colorName;
 }
}

function draw() {
 background(backgroundColor);
}

function isWhite(color){
  return red(color) == 255 && green(color) == 255 && blue(color) == 255
}
