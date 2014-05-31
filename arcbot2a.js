var direction;

var radius=300;
var alpha=0.6;
var step=2.0/radius;
var r=1.4;
var r2=r*0.5;

var x=0,y=0;
var nx=0,ny=0;

var mx=0,my=0,weight=1.0,count=1.0;

var stack=[];
var doneh={};
var blocked={};
var failed=0;

function writeHash(hash,px,py,stackpos) {
  var s=""+px+"_"+py;
  hash[s]=stackpos;
}
function inHash(hash,px,py) {
  var s=""+px+"_"+py;
  return hash[s];
}


//Wird aufgerufen, sobald das
// Hauptprogramm die Erfolgsmeldung
// an den Web Worker sendet.
onmessage = function (event) {

  // Die Erfolgsmeldung wird mit dem
  // Feld 'done' (true | false) gesendet.
  var done = event.data.done;
  var trials=0;
  do {

    // Neue Richtung bestimmen.
    if (done) {
      x+=nx;
      y+=ny;
        if(!inHash(doneh,x,y)) {
          stack.push([x,y]);
          writeHash(doneh,x,y,stack.length-1);
          failed=0;
        }else {
          failed+=1;
        }
    } else {
      writeHash(blocked,x+nx,y+ny,true);
      alpha+=Math.random()*3;
      step*=-1;
      failed+=2;
      //    direction = getRandomDirection();
    }
    var dx,dy;
    if(failed<0)
      failed=0;
    //console.log("failed "+failed);

    if(failed>30) {
      //console.log("POP");
      stack.pop();
      var pos=stack.pop();
      if(pos) {
        var stackPos=inHash(doneh,pos[0],pos[1]);
        if(stackPos<stack.length)
          stack=stack.slice(0,stackPos-1);
        dx=pos[0]-x;
        dy=pos[1]-y;
      } else {
        dx=Math.random()*2-1;
        dy=Math.random()*2-1;
        failed=0;
      }
    }
    else {
      dx=Math.cos(alpha)-r2+Math.random()*r;
      dy=Math.sin(alpha)-r2+Math.random()*r;

      alpha+=step;
      if(Math.random()<0.05)
        alpha+=10*step;
    }
    if(Math.abs(dx)<Math.abs(dy)) {
      nx=0;
      if(dy<0) {
        ny=-1;
        direction="up";
      } else {
        ny+=1;
        direction="down";
      }
    } else {
      ny=0;
      if(dx<0) {
        nx=-1;
        direction="left";
      } else {
        nx=1;
        direction="right";
      }
    }
    trials+=1;
  }while(trials<20 && inHash(blocked,x+nx,y+ny));

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
