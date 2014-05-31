
var direction;

var radius=100;
var alpha=0.6;
var step=2.0/radius;
var r=1.4;
var r2=r*0.5;

var x=0,y=0;

var mx=0,my=0,weight=1.0,count=1.0;

//Wird aufgerufen, sobald das
// Hauptprogramm die Erfolgsmeldung
// an den Web Worker sendet.
onmessage = function (event) {

  // Die Erfolgsmeldung wird mit dem
  // Feld 'done' (true | false) gesendet.
  var done = event.data.done;

  // Neue Richtung bestimmen.
  if (done) {

    /*    direction =
    holdOrChangeDirection(direction);
    */
    switch(direction) {
      case "up": y-=1; break;
      case "down": y+=1; break;
      case "left": x-=1; break;
      case "right": x+=1; break;
    }

    var ncount=count+1.0;
    mx=(mx/count)*ncount+1.0*x/ncount;
    my=(my/count)*ncount+1.0*y/ncount;
    count=ncount;

  } else {
    alpha+=Math.random();
    step*=-1;
    //    direction = getRandomDirection();
  }

  var dx=Math.cos(alpha)-r2+Math.random()*r;
  var dy=Math.sin(alpha)-r2+Math.random()*r;

  var ix=mx-x;
  var iy=my-y;
  var dm=Math.sqrt(ix*ix+iy*iy);

  var f=1-dm/radius;
  if(f<0.5)
    f=0.5;
    if(f>1)
    f=1;
  alpha+=step*f;
  if(Math.random()<0.05)
    alpha+=10*step;

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


  // Teilt dem Hauptprogramm die neue
  // Richtung mit. Die Richtung wird
  // mit dem Feld 'direction' gesendet.
  // Die zu wiederholende Id wird mit
  // dem Feld 'id' gesendet.
  postMessage({
    id: event.data.id,
    direction: direction
  });
};
