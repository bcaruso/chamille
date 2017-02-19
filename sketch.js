var speech;

var backgroundColor = '#FFFFFF ';
var goodColor = true;

function setup() {
  tracking.ColorTracker.registerColor('red', function(r, g, b) {
    if (r > 200 && g < 50 && b < 50 ) {
    return true;
    }
    return false;
    }
  );

  tracking.ColorTracker.registerColor('green', function(r, g, b) {
    if (r < 50 && g > 200 && b < 50 ) {
    return true;
    }
    return false;
    }
  );

  tracking.ColorTracker.registerColor('blue', function(r, g, b) {
    if (r < 50 && g < 50 && b > 200 ) {
    return true;
    }
    return false;
    }
  );

  tracking.ColorTracker.registerColor('purple', function(r, g, b) {
    if (r > 200 && g < 50 && b > 200 ) {
    return true;
    }
    return false;
    }
  );

  var colors = new tracking.ColorTracker(['purple','red','green','blue']);

  colors.on('track', function(event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        backgroundColor = rect.color
        });
    }
  });

 tracking.track('#camera', colors, {camera: true});

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
