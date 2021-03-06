var speech;

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
    if (event.data.length != 0) {
      event.data.forEach(function(rect) {
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        document.getElementById("svgContainer").className.baseVal = rect.color;
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

 if (words.length >= 1 && words[0] == 'Camille') {
   var command = words.splice(1);
   if(command[0] == 'add' ){
     var pattern = command.splice(1).join('').toLowerCase();
     if(pattern == 'polkadots' || pattern == 'dots' || pattern == 'circles'){
       console.log('Polka Dots');
       changePattern('dots');
     }else if(pattern == 'stripes'){
       console.log('Stripes');
       changePattern('stripes');
     }else if(pattern == 'stars'){
       console.log('Stars');
       changePattern('stars');
     }

   }else if(command.length >= 3 && command[0]=='I' && command[1]=='love' && command[2]=='you'){
      console.log('Hearts');
      changePattern('hearts');
   }else if(command.length >= 2 && command[0]=='clean' && command[1]=='up' || command[1]=='cleanup'){
      console.log('Clean Up');
      changePattern('nopattern');
      document.getElementById("svgContainer").className.baseVal = 'white';
   }

 }
}

function changePattern(p){
  document.getElementById("pattern").style.opacity = 0;
  setTimeout(function(){document.getElementById("pattern").className.baseVal = p;document.getElementById("pattern").style.opacity = 1},500);
}

function draw() {
  //Doing alot of stuff with CSS and SVGs.
}
