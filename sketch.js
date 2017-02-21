var speech;

var backgroundColor = '#FFFFFF ';
var goodColor = true;
var threshold = 50;
function setup() {
  var supportedColors = ['hotpink','red','green','blue','darkorange','aquamarine'];


  tracking.ColorTracker.registerColor('red', function(r, g, b) {
    return r > 200 && g < 50 && b < 50;
  }
  );

  tracking.ColorTracker.registerColor('green', function(r, g, b) {
    return r < 50 && g > 78 && g < 178 && b < 50;
  }
  );

  tracking.ColorTracker.registerColor('blue', function(r, g, b) {
    return r < 50 && g < 50 && b > 200;
  }
  );


  tracking.ColorTracker.registerColor('hotpink', function(r, g, b) {
    //255,105,180
    return r > 200 && g > 50 && g < 150 && b > 130 && b < 230
  }
  );

  tracking.ColorTracker.registerColor('darkorange', function(r, g, b) {
    //255,140,0
    return r > 200 && g > 90 && g < 190 && b < 50
    }
  );

  tracking.ColorTracker.registerColor('aquamarine', function(r, g, b) {
    //127,255,212
    return r > 77 && r < 177 && g > 200 && b >200
    }
  );

  var colors = new tracking.ColorTracker(supportedColors);

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
