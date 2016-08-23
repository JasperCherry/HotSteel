/*
// ai tank vars
var aiBody = new Body("gray", 1050, 300, gera);
var aiTower = new Tower(10, 3, 40, "black", 1050, 300, gerb);
var aiBullet;
var aiReloadTime = 250;
var aiReloadTimeM = 0;
var aiX="none";
var aiY="none";
var aiDestinationAngle="none";
var aiTargetAngle;
var shotReady=false;
var shotReady2=false;
var shotReadyTimer=10;
var mgShotReady=false;
var aiPreviousX;
var aiPreviousY;
var aiMgBullets = new Array();


*/


function PTank(x,y,imgB,imgT) {

  this.x=x;
  this.y=y;
  this.imgB=imgB;
  this.imgT=imgT;

  this.numMines = 10;
  this.numBullet = 20;
  this.numMgBullets = 200;
  this.hp = 100;

  this.speed = 0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.reloadTime = 250;
  this.reloadTimeM = 0;
  this.reloadTimeMine = 0;

  this.newPos = function() {

      // start position zeroing
      this.moveAngleB = 0;
      this.moveAngleT = 0;
      this.speed = 0;

      // body rotation, turrent static
      if (myGameArea.keys && myGameArea.keys[37]){
        this.moveAngleB = -1;
        this.moveAngleT = -1;
      }
      if (myGameArea.keys && myGameArea.keys[39]){
        this.moveAngleB = 1;
        this.moveAngleT = 1;
      }
      if (myGameArea.keys && myGameArea.keys[38]){
        this.speed=1;
      }
      if (myGameArea.keys && myGameArea.keys[40]){
        this.speed=-1;
      }

      // turrent rotation
      if (myGameArea.keys && myGameArea.keys[65]){
        this.moveAngleT = -1;
      }
      if (myGameArea.keys && myGameArea.keys[68]){
        this.moveAngleT = 1;
      }

      // turrent + body rotation
      if (myGameArea.keys && myGameArea.keys[65] && myGameArea.keys[37]){
        this.moveAngleT = -2;
      }
      if (myGameArea.keys && myGameArea.keys[68] && myGameArea.keys[39]){
        this.moveAngleT = 2;
      }
      if (myGameArea.keys && myGameArea.keys[65] && myGameArea.keys[39]){
        this.moveAngleT = 0;
      }
      if (myGameArea.keys && myGameArea.keys[68] && myGameArea.keys[37]){
        this.moveAngleT = 0;
      }

      // map control
      if(this.x>=fieldMapX){
        this.x-=2;
      }
      if(this.x<=0){
        this.x+=2;
      }
      if(this.y>=fieldMapY){
        this.y-=2;
      }
      if(this.y<=0){
        this.y+=2;
      }

      // touching dead tanks by player
      for(var i = 0; i < kills.length; i++) {
            if((Math.abs(kills[i].x-this.x)<30)&&(Math.abs(kills[i].y-this.y)<30)){
              this.x=this.previousX;
              this.y=this.previousY;
            }
      }

      // weapons

      // setting up mines
      if(this.reloadTimeMine>0){
        this.reloadTimeMine--;
      }
      if (myGameArea.keys && myGameArea.keys[71] && this.numMines>0 && this.reloadTimeMine==0){
        mines.push(new Mine(
        this.x-(35 * Math.sin(this.angleB)),
        this.y+(35 * Math.cos(this.angleB))
        ));
        this.numMines--;
        this.reloadTimeMine=50;
      }

      // detection if player tank is on the mine and trigering it
      for(var i = 0; i < mines.length; i++) {
        if(Math.abs(mines[i].x-pTank.x)<15 && Math.abs(mines[i].y-pTank.y)<15){
          pTank.hp=pTank.hp-100;
          mines.splice(i,1);
        }
      }

      // main gun
      if (myGameArea.keys && myGameArea.keys[32] && this.reloadTime==0 && this.numBullet>0){
        this.numBullet--;
        bulletP = new Bullet(
        this.x+(40 * Math.sin(this.angleT)),
        this.y-(40 * Math.cos(this.angleT)),
        this.angleT);
        // not precision shooting
        //bullet.angle = tower.angle+( (Math.round(Math.random() * (30)) - 15) * Math.PI / 180);
        this.reloadTime=250;
      }
      if(this.reloadTime>0){
        this.reloadTime--;
      }

      // machinegun
      if (myGameArea.keys && myGameArea.keys[87] && this.reloadTimeM==0 && this.numMgBullets>0){
        this.numMgBullets--;
        mgBulletsP.push(new MgBullet(
        this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
        this.reloadTimeM=8;
      }
      if(this.reloadTimeM>0){
        this.reloadTimeM--;
      }

      // dead tank hit by player by gun
      for(var i = 0; i < kills.length; i++) {
        if(bulletP!=null && Math.abs(kills[i].x-bulletP.x)<15 && Math.abs(kills[i].y-bulletP.y)<15) {
          bulletP=null;
        }
      }

      // detection if player hits dead tank by machinegun
      for(var j = 0; j < kills.length; j++) {
       for(var i = 0; i < mgBulletsP.length; i++) {
        if(Math.abs(mgBulletsP[i].x-kills[j].x)<15 && Math.abs(mgBulletsP[i].y-kills[j].y)<15){
           mgBulletsP.splice(i,1);
        }
       }
      }

      // interactions with ai tanks /////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(var t = 0; t < aiTanks.length; t++) {
          // touching enemy tank
          if((Math.abs(aiTanks[t].x-pTank.x)<30)&&(Math.abs(aiTanks[t].y-pTank.y)<30)){
            pTank.x=pTank.previousX;
            pTank.y=pTank.previousY;
          }

          // gun
          // detection if player hits  ai tank
          if(bulletP!=null){
            if(Math.abs(bulletP.x-aiTanks[t].x)<15 && Math.abs(bulletP.y-aiTanks[t].y)<15){
                aiTanks[t].hp=aiTanks[t].hp-50;
                bulletP=null;
            }
          }

          // machinegun
          // detection if player hits  ai tank
          for(var i = 0; i < mgBulletsP.length; i++) {
            if(Math.abs(mgBulletsP[i].x-aiTanks[t].x)<15 && Math.abs(mgBulletsP[i].y-aiTanks[t].y)<15){
              mgBulletsP.splice(i,1);
              aiTanks[t].hp=aiTanks[t].hp-5;
            }
          }

          // ai kill detection
          if(aiTanks[t].hp<=0){

             if(aiTanks[t].type=='one'){
               kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT, geraw, gerbw));
             }
             if(aiTanks[t].type=='two'){
               kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT, geraw2, gerbw2));
             }

             killsFire.push(new DeadBodyFire(aiTanks[t].x, aiTanks[t].y));

             aiTanks.splice(t,1);
           }

      }

      // player kill detection
      if(this.hp<=0){
         kills.push(new DeadBody(this.x, this.y, this.angleB, this.angleB, rusaw, rusbw));
         killsFire.push(new DeadBodyFire(this.x, this.y));
         pTank = new PTank(100,300,rusa,rusb);
       }

      // body and tower new position
      // body
      this.previousX=this.x;
      this.previousY=this.y;
      this.angleB += this.moveAngleB * Math.PI / 180;
      this.x += this.speed * Math.sin(this.angleB);
      this.y -= this.speed * Math.cos(this.angleB);
      // tower
      this.angleT += this.moveAngleT * Math.PI / 180;

  }


  this.update = function() {
      // drawing the body
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleB);
      ctx.drawImage(this.imgB, -20, -30);
      ctx.restore();
      // drawing the tower
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.drawImage(this.imgT, -20, -30);
      ctx.restore();

  }


}




function AiTank(x,y) {

  this.type="one";
  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 250;
  this.reloadTimeM = 0;

  this.numBullet = 20;
  this.numMgBullets = 200;
  this.hp = 100;

  this.x=x;
  this.y=y;
  this.imgB=gera;
  this.imgT=gerb;

  this.speed = 0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.newPos = function() {

    // start position zeroing
    this.moveAngleB = 0;
    this.speed = 0;

    // if destination was reached
    if(Math.abs(this.aiX-this.x)<15&&Math.abs(this.aiY-this.y)<15){
      this.aiX="none";
      this.aiY="none";
    }

    // touching dead tanks by ai tank
    for(var i = 0; i < kills.length; i++) {
        if((Math.abs(kills[i].x-this.x)<30)&&(Math.abs(kills[i].y-this.y)<30)){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
        }
    }

    // moving around the map
    // pick up destination
    if(this.aiX=="none"&&this.aiY=="none"){
      this.aiX=Math.round(Math.random()*fieldMapX);
      this.aiY=Math.round(Math.random()*fieldMapY);
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
      this.speed=1;
    }
    // change angle of body and move
    if(Math.abs(this.angleB-this.aiDestinationAngle)<0.03){
      this.speed=1;
      this.angleB=this.aiDestinationAngle;
      this.moveAngleB=0;
    }else if(Math.abs(this.angleB-this.aiDestinationAngle)>0.03){
      this.speed=0;
      if(this.angleB<this.aiDestinationAngle){
        this.moveAngleB=1;
      }else if(this.angleB>this.aiDestinationAngle){
        this.moveAngleB=-1;
      }
    }

    // destination target
    /*
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.aiX, this.aiY);
    ctx.fillStyle ="red";
    ctx.fillRect(20 / -2, 20 / -2, 20, 20);
    ctx.restore();
    */

    // weapons

    // mines
    // detection if ai tank is on the mine and trigering it
    for(var i = 0; i < mines.length; i++) {
      if(Math.abs(mines[i].x-this.x)<15 && Math.abs(mines[i].y-this.y)<15){
        this.hp=this.hp-100;
        mines.splice(i,1);
      }
    }

    // shooting
    // main gun
    if(this.reloadTime>0&&this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady){
      bulletsAi.push(new Bullet(this.x+(40 * Math.sin(this.angleT)),
      this.y-(40 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTime=250;
    }

    // mg
    if (this.reloadTimeM==0 && this.numMgBullets>0 && this.mgShotReady){
      this.numMgBullets--;
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=8;
    }
    if(this.reloadTimeM>0){
      this.reloadTimeM--;
    }

    // interactions with other ai tanks /////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // touching other ai tanks
    for(var t=0; t<aiTanks.length; t++){
      if(aiTanks[t].x!=this.x){
        if((Math.abs(aiTanks[t].x-this.x)<30)&&(Math.abs(aiTanks[t].y-this.y)<30)){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
        }
      }
    }

    // interactions with players tank /////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // touching player tank
    if((Math.abs(pTank.x-this.x)<30)&&(Math.abs(pTank.y-this.y)<30)){
      this.x=this.previousX;
      this.y=this.previousY;
      this.aiX="none";
      this.aiY="none";
    }

    // ai shooting and timing

    // ai moving the tower
    this.aiTargetAngle=Math.atan2(this.y - pTank.y, this.x - pTank.x)+(-90 * Math.PI / 180);

    // detecting if player tank is aimed by cannon
    if(Math.abs(this.angleT-this.aiTargetAngle)<0.03){
      this.angleT=this.aiTargetAngle;
      this.shotReady=true;
    }else if(Math.abs(this.angleT-this.aiTargetAngle)>0.03){
      this.shotReady=false;
      if(this.angleT<this.aiTargetAngle){
        this.moveAngleT=1;
      }else if(this.angleT>this.aiTargetAngle){
        this.moveAngleT=-1;
      }
    }



    // targeting player tank for mg
    if( (Math.abs(pTank.x-this.x)<600 && Math.abs(pTank.y-this.y)<600)
    && ( (Math.round((this.aiTargetAngle+2*Math.PI) * 3) / 3) == (Math.round(this.angleB * 3) / 3) )
    ){
      this.mgShotReady=true;
    }else{
      this.mgShotReady=false;
    }


    // gun
    // detection if ai hits player tank

    // detection if ai hits player
    for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-pTank.x)<15 && Math.abs(bulletsAi[i].y-pTank.y)<15){
        bulletsAi.splice(i,1);
        pTank.hp=pTank.hp-20;
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-kills[j].x)<15 && Math.abs(bulletsAi[i].y-kills[j].y)<15){
         bulletsAi.splice(i,1);
      }
     }
    }

    // machinegun
    // detection if ai hits player
    for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-pTank.x)<15 && Math.abs(mgBulletsAi[i].y-pTank.y)<15){
        mgBulletsAi.splice(i,1);
        pTank.hp=pTank.hp-5;
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-kills[j].x)<15 && Math.abs(mgBulletsAi[i].y-kills[j].y)<15){
         mgBulletsAi.splice(i,1);
      }
     }
    }


      // body and tower new position
      // body
      this.previousX=this.x;
      this.previousY=this.y;
      this.angleB += this.moveAngleB * Math.PI / 180;
      this.x += this.speed * Math.sin(this.angleB);
      this.y -= this.speed * Math.cos(this.angleB);
      // tower
      this.angleT += this.moveAngleT * Math.PI / 180;
      this.moveAngleT=0;
  }

  this.update = function() {
      // drawing the body
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleB);
      ctx.drawImage(this.imgB, -20, -30);
      ctx.restore();
      // drawing the tower
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.drawImage(this.imgT, -20, -30);
      ctx.restore();

  }

}



function AiTank2(x,y) {

  this.type="two";

  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 250;
  this.reloadTimeM = 0;

  this.numBullet = 20;
  this.numMgBullets = 200;
  this.hp = 100;

  this.x=x;
  this.y=y;
  this.imgB=gera2;
  this.imgT=gerb2;

  this.speed = 0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.newPos = function() {

    // start position zeroing
    this.moveAngleB = 0;
    this.speed = 0;

    // if destination was reached
    if(Math.abs(this.aiX-this.x)<15&&Math.abs(this.aiY-this.y)<15){
      this.aiX="none";
      this.aiY="none";
    }

    // touching dead tanks by ai tank
    for(var i = 0; i < kills.length; i++) {
        if((Math.abs(kills[i].x-this.x)<30)&&(Math.abs(kills[i].y-this.y)<30)){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
        }
    }

    // moving around the map
    // pick up destination
    if(this.aiX=="none"&&this.aiY=="none"){
      this.aiX=Math.round(Math.random()*fieldMapX);
      this.aiY=Math.round(Math.random()*fieldMapY);
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
      this.speed=1;
    }
    // change angle of body and move
    if(Math.abs(this.angleB-this.aiDestinationAngle)<0.03){
      this.speed=1;
      this.angleB=this.aiDestinationAngle;
      this.moveAngleB=0;
    }else if(Math.abs(this.angleB-this.aiDestinationAngle)>0.03){
      this.speed=0;
      if(this.angleB<this.aiDestinationAngle){
        this.moveAngleB=1;
      }else if(this.angleB>this.aiDestinationAngle){
        this.moveAngleB=-1;
      }
    }

    // destination target
    /*
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.aiX, this.aiY);
    ctx.fillStyle ="red";
    ctx.fillRect(20 / -2, 20 / -2, 20, 20);
    ctx.restore();
    */

    // weapons

    // mines
    // detection if ai tank is on the mine and trigering it
    for(var i = 0; i < mines.length; i++) {
      if(Math.abs(mines[i].x-this.x)<15 && Math.abs(mines[i].y-this.y)<15){
        this.hp=this.hp-100;
        mines.splice(i,1);
      }
    }

    // shooting
    // main gun
    if(this.reloadTime>0&&this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady){
      bulletsAi.push(new Bullet(this.x+(40 * Math.sin(this.angleT)),
      this.y-(40 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTime=250;
    }

    // mg
    if (this.reloadTimeM==0 && this.numMgBullets>0 && this.mgShotReady){
      this.numMgBullets--;
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=8;
    }
    if(this.reloadTimeM>0){
      this.reloadTimeM--;
    }

    // interactions with other ai tanks /////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // touching other ai tanks
    for(var t=0; t<aiTanks.length; t++){
      if(aiTanks[t].x!=this.x){
        if((Math.abs(aiTanks[t].x-this.x)<30)&&(Math.abs(aiTanks[t].y-this.y)<30)){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
        }
      }
    }

    // interactions with players tank /////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // touching player tank
    if((Math.abs(pTank.x-this.x)<30)&&(Math.abs(pTank.y-this.y)<30)){
      this.x=this.previousX;
      this.y=this.previousY;
      this.aiX="none";
      this.aiY="none";
    }

    // ai shooting and timing

    // ai moving the tower
    this.aiTargetAngle=Math.atan2(this.y - pTank.y, this.x - pTank.x)+(-90 * Math.PI / 180);

    // detecting if player tank is aimed by cannon
    if(Math.abs(this.angleT-this.aiTargetAngle)<0.03){
      this.angleT=this.aiTargetAngle;
      this.shotReady=true;
    }else if(Math.abs(this.angleT-this.aiTargetAngle)>0.03){
      this.shotReady=false;
      if(this.angleT<this.aiTargetAngle){
        this.moveAngleT=1;
      }else if(this.angleT>this.aiTargetAngle){
        this.moveAngleT=-1;
      }
    }



    // targeting player tank for mg
    if( (Math.abs(pTank.x-this.x)<600 && Math.abs(pTank.y-this.y)<600)
    && ( (Math.round((this.aiTargetAngle+2*Math.PI) * 3) / 3) == (Math.round(this.angleB * 3) / 3) )
    ){
      this.mgShotReady=true;
    }else{
      this.mgShotReady=false;
    }


    // gun
    // detection if ai hits player tank

    // detection if ai hits player
    for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-pTank.x)<15 && Math.abs(bulletsAi[i].y-pTank.y)<15){
        bulletsAi.splice(i,1);
        pTank.hp=pTank.hp-20;
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-kills[j].x)<15 && Math.abs(bulletsAi[i].y-kills[j].y)<15){
         bulletsAi.splice(i,1);
      }
     }
    }

    // machinegun
    // detection if ai hits player
    for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-pTank.x)<15 && Math.abs(mgBulletsAi[i].y-pTank.y)<15){
        mgBulletsAi.splice(i,1);
        pTank.hp=pTank.hp-5;
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-kills[j].x)<15 && Math.abs(mgBulletsAi[i].y-kills[j].y)<15){
         mgBulletsAi.splice(i,1);
      }
     }
    }


      // body and tower new position
      // body
      this.previousX=this.x;
      this.previousY=this.y;
      this.angleB += this.moveAngleB * Math.PI / 180;
      this.x += this.speed * Math.sin(this.angleB);
      this.y -= this.speed * Math.cos(this.angleB);
      // tower
      this.angleT += this.moveAngleT * Math.PI / 180;
      this.moveAngleT=0;
  }

  this.update = function() {
      // drawing the body
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleB);
      ctx.drawImage(this.imgB, -20, -30);
      ctx.restore();
      // drawing the tower
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.translate(0, -3);
      ctx.drawImage(this.imgT, -20, -30);
      ctx.restore();

  }

}



//////////////////////// end of enemy

function DeadBodyFire(x,y){

    this.phase=1;
    this.phaseTimer=250;
    this.fireLoop=0;
    this.delayTime=0;
    this.x=x;
    this.y=y;

    // drawing the fire
    this.update = function() {
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x-64, this.y-110);

//      console.log(this.phaseTimer);

      if(this.phase==1){
        ctx.drawImage(document.getElementById("s"+this.fireLoop), 0, 0);
        this.delayTime++;
        if(this.delayTime==3){
          this.delayTime=0;
          this.fireLoop++;
          if(this.fireLoop==8){
          this.fireLoop=0;
          this.phase=2;
          }
        }
      }else if(this.phase==2){
        ctx.drawImage(document.getElementById("l"+this.fireLoop), 0, 0);
        this.delayTime++;
        if(this.delayTime==3){
          this.delayTime=0;
          this.fireLoop++;
          this.phaseTimer--;
          if(this.fireLoop==10){
          this.fireLoop=0;
          }
          if(this.phaseTimer==0){
            this.phase=3;
          }
        }
      }else if(this.phase==3){
        ctx.drawImage(document.getElementById("e"+this.fireLoop), 0, 0);
        this.delayTime++;
        if(this.delayTime==3){
          this.delayTime=0;
          this.fireLoop++;
          if(this.fireLoop==6){
          this.fireLoop=0;
          this.phase=4;
          }
        }
      }else if(this.phase==4){

      }

      ctx.restore();
    }

}


function DeadBody(x, y, angle1, angle2, img1, img2) {

    this.img1=img1;
    this.img2=img2;

    this.widthBody = 30;
    this.heightBody = 50;
    this.heightTower = 40;
    this.widthTower = 3;

    this.color = "black";
    this.angleBody = angle1;
    this.angleTower = angle2;
    this.x = x;
    this.y = y;

    this.update = function() {
        // drawing the body
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleBody);
        ctx.drawImage(this.img1, -20, -30);
        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.widthBody / -2, this.heightBody / -2, this.widthBody, this.heightBody);
        ctx.restore();

        // drawing the tower
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleTower);
        // tower of grey tank with long barrel should be in different position
        if(this.img2==gerbw2){
          ctx.translate(0, -3);
          ctx.drawImage(this.img2, -20, -30);
        }else{
          ctx.drawImage(this.img2, -20, -30);
        }
        ctx.restore();

    }
}



function Bullet(x, y, angle) {

    this.radius = 2;
    this.speed = 20;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = b;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.drawImage(this.img, -34, -47);
        /*
        ctx.fillStyle = "red";
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        */
        ctx.restore();
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}


function MgBullet(x, y, angle) {

    this.radius = 1;
    this.speed = 15;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = mgb;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.drawImage(this.img, -19, -19);
        /*
        ctx.fillStyle = "red";
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        */
        ctx.restore();
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function Mine(x, y) {

    this.radius = 6;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.fillStyle = "black";
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}
