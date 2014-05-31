var direction;

var radius=300;
var alpha=0.6;
var step=2.0/radius;
var r=1.4;
var r2=r*0.5;
var steps=0;

var x=100,y=0;
var hithead=0;

var board=[];
for(var i=0;i<201;i++) {
  board[i]={};
}

var dirmap={up:"right",
  right:"down",
  down:"left",
  left:"up"
};
var rdirmap={up:"left",
  right:"up",
  down:"right",
  left:"down"
};

var val=1;
board[x][y]=val;

var xmap={up:0,down:0,left:-1,right:1};
var ymap={up:-1,down:1,left:0,right:0};

var fails=0;
//Wird aufgerufen, sobald das
// Hauptprogramm die Erfolgsmeldung
// an den Web Worker sendet.
onmessage = function (event) {

  var done = event.data.done;
  var stepdone=false;

  if(done) {
    x+=xmap[direction]; 
    y+=ymap[direction];
    if(!board[x][y]) {
      fails=0;
    }
    else
    fails+=1;
    board[x][y]=val;
  }
  else if(direction){
    board[x+xmap[direction]][y+ymap[direction]]=-1;
    fails+=2;
  }


  steps+=1;

  if(hithead>15) {
    var dx,dy;
    var cdir=rdirmap[direction];
    var nextdir;
    var mindir,minval=101000;
    for(var i=0;i<4;i++) {
      dx=xmap[cdir];
      dy=ymap[cdir];
      if(!board[x+dx][y+dy]) {
        if(!nextdir)
          nextdir=cdir;
      } else {
        var xval=board[x+dx][y+dy];
        if(xval>0) {
          if(xval<minval) {
            minval=xval;
            mindir=cdir;
          }
        }
      }
      cdir=dirmap[cdir];
    }
    if(nextdir) {
      stepdone=true;
      direction=nextdir;
      val+=1;
    } else if(mindir && fails>100 && minval>5 && minval<val) {
      direction=mindir;
      stepdone=true;
    } else if(i==4) {
      direction=cdir;
    }
    /*
    if(!board[x-1][y]) {
    direction="left"; stepdone=true;
    } else if(!board[x][y-1]) {
    direction="up"; stepdone=true;
    } else if(!board[x+1][y]) {
    direction="right"; stepdone=true;
    } else if(!board[x][y+1]) {
    direction="down"; stepdone=true;
    } */
    /* if(!done) {
      direction=dirmap[direction];
      }*/

  } 
  if(!stepdone) {


    // Neue Richtung bestimmen.
    if (done) {
    } else {
      alpha+=Math.random()*3;
      step*=-1;
      hithead+=1;
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
    val+=1;
  }
  postMessage({
    id: event.data.id,
    direction: direction
  });
};





