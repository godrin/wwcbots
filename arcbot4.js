
var direction;

var radius=300;
var alpha=0.6;
var step=2.0/radius;
var r=1.4;
var r2=r*0.5;
var steps=0;

var x=100,y=0;

var board=[];
for(var i=0;i<201;i++) {
  board[i]={};
}

var dirmap={up:"right",
  right:"down",
  down:"left",
  left:"up"
};

board[x][y]=1;

var xmap={up:0,down:0,left:-1,right:1};
var ymap={up:-1,down:1,left:0,right:0};

//Wird aufgerufen, sobald das
// Hauptprogramm die Erfolgsmeldung
// an den Web Worker sendet.
onmessage = function (event) {

  var done = event.data.done;
  var stepdone=false;

  if(done) {
    x+=xmap[direction]; 
    y+=ymap[direction]; 
    board[x][y]=1;
  }
  else if(direction){
    board[x+xmap[direction]][y+ymap[direction]]=-1;
  }

  steps+=1;

  if(steps>1000) {
    var dx,dy;
    for(var i=0;i<3;i++) {
      dx=xmap[direction];
      dy=ymap[direction];
      if(!board[x+dx][y+dy]) {
        stepdone=true;
        break;
      }
      direction=dirmap[direction];
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
  }
  postMessage({
    id: event.data.id,
    direction: direction
  });
};




