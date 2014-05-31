/**
 * Copyright by David Kamphausen <david.kamphausen76@googlemail.com>
 *
 * LICENSE under GPLv3
 */

var direction;

var radius=300;
var alpha=0.6;
var step=2.0/radius;
var r=1.4;
var r2=r*0.5;


//Wird aufgerufen, sobald das
// Hauptprogramm die Erfolgsmeldung
// an den Web Worker sendet.
onmessage = function (event) {

  var done = event.data.done;

  if (done) {
  } else {
    alpha+=Math.random()*3;
    step*=-1;
  }

  var dx=Math.cos(alpha)-r2+Math.random()*r;
  var dy=Math.sin(alpha)-r2+Math.random()*r;

  alpha+=step;
  if(Math.abs(dx)<Math.abs(dy)) {
    if(dy<0)
      direction="up";
    else
      direction="down";
  } else {
    if(dx<0)
      direction="left";
    else
      direction="right";
  }
  postMessage({
    id: event.data.id,
    direction: direction
  });
};



