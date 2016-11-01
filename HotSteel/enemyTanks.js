



function AiTank(x,y) {

  this.id=tankId;
  tankId++;

  this.type="one";
  this.name=sTanks[Math.floor(Math.random()*sTanks.length)];
  this.dumb=false;
  this.towerLoose=false;

  // tank on fire
  this.fireProtect=30;
  this.onFire=false;
  this.fireHurtDelay=0;
  this.delayTime=0;
  this.fireLoop=0;
  this.size=1.5;
  this.flameSpeed=1;
  this.flamePhase=0;

  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 300;
  this.reloadTimeM = 0;

  this.hp = 50;

  this.x=x;
  this.y=y;

  this.imgB=gera;
  this.imgT=gerb;


  this.vMax=1.4;
  this.acceleration=0.1;
  this.speed = 0;
  this.trackTimer=0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.setDes = function(x,y) {
      this.aiX=x;
      this.aiY=y;
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
  }

  this.newPos = function() {

    // detecting fire
    if(this.onFire==true){
      if(this.fireHurtDelay==4){
        this.hp--;
        this.fireHurtDelay=0;
      }
      this.fireHurtDelay++;
    }

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
          this.speed=0;
        }
    }

    // touching obstacles by ai
    for(var j = 0; j < obstacles.length; j++) {
        if(
          this.x>obstacles[j].x &&
          this.x<obstacles[j].x+obstacles[j].width &&
          this.y>obstacles[j].y &&
          this.y<obstacles[j].y+obstacles[j].height
        ){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
          this.speed=0;
        }
    }

    // moving around the map
    // pick up destination
    if(this.aiX=="none"&&this.aiY=="none"){
      this.aiX=Math.round(Math.random()*fieldMapX);
      this.aiY=Math.round(Math.random()*fieldMapY);
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
    }


    // change angle of body and move
    if(Math.abs(this.angleB-this.aiDestinationAngle)<0.03){
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
      //this.angleB=this.aiDestinationAngle;
      this.moveAngleB=0;
      if(this.speed<this.vMax){
        this.speed=this.speed+this.acceleration;
      }
    }else if(Math.abs(this.angleB-this.aiDestinationAngle)>0.03){
      // slowing down
      /*
      if(this.speed>0){
        this.speed=this.speed-this.acceleration;
        if(Math.abs(this.speed-this.acceleration)<this.acceleration){
          this.speed=0;
        }
      }
      */
      // turning around
      if(this.angleB<this.aiDestinationAngle){
        this.moveAngleB=this.vMax;
      }
      if(this.angleB>this.aiDestinationAngle){
        this.moveAngleB=-this.vMax;
      }
    }

    // drawing tracks
    if(this.trackTimer>=10){

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))- 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))+ 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))+ 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))- 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      this.trackTimer=0;
    }

    if(this.speed!=0||this.moveAngleB!=0){
      this.trackTimer=this.trackTimer+1.5*this.vMax;
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
        explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
        mines.splice(i,1);
      }
    }

    // shooting
    // in map check
    if(this.x>-50&&this.x<fieldMapX+50&&this.y>-50&&this.y<fieldMapY+50){
    // main gun
    if(this.reloadTime>0){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady&&!this.towerLoose){
      bulletsAi.push(new Bullet(this.x+(17 * Math.sin(this.angleT)),
      this.y-(17 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (40)) - 20) * Math.PI / 180),
      this.type));
      this.reloadTime=300;
    }

    // mg
    if (this.reloadTimeM==0&&this.mgShotReady){
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=10;
    }
    if(this.reloadTimeM>0){
      this.reloadTimeM--;
    }
    }// distance check


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
          this.speed=0;
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
      this.speed=0;
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
    if(this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      if( (Math.abs(pTank.x-this.x)<600 && Math.abs(pTank.y-this.y)<600)
      && ( (Math.round((this.aiTargetAngle+2*Math.PI) * 3) / 3) == (Math.round(this.angleB * 3) / 3) )
      ){
        this.mgShotReady=true;
      }else{
        this.mgShotReady=false;
      }
    }

    // detecting smoke cover
    for(var i = 0; i < smoke.length; i++) {
      if(Math.abs(pTank.x-smoke[i].x)<70 && Math.abs(pTank.y-smoke[i].y)<70){
        this.shotReady=false;
        this.mgShotReady=false;
      }
    }

    if(this.dumb){
      this.shotReady=false;
      this.mgShotReady=false;
      this.moveAngleT=0;
      this.angleT=this.angleB;
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
      if(this.towerLoose==false){
       ctx = myGameArea.context;
       ctx.save();
       ctx.translate(this.x, this.y);
       ctx.rotate(this.angleT);
       ctx.drawImage(this.imgT, -20, -30);
       ctx.restore();
      }
      // drawing the flames
      if(this.onFire){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y+20);

        if(this.flamePhase==0){
          ctx.drawImage(document.getElementById("s"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }

        if(this.flamePhase==1){
          ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }
        ctx.restore();
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          if(this.flamePhase==0){
            if(this.fireLoop==21){
              this.fireLoop=-1;
              this.flamePhase=1;
            }
          }
          if(this.flamePhase==1){
            if(this.fireLoop==20){
              this.fireLoop=-1;
            }
          }
          this.delayTime=0;
          this.fireLoop++;
        }
      }
  }

}



function AiTank2(x,y) {

  this.id=tankId;
  tankId++;

  this.type="two";
  this.name=mTanks[Math.floor(Math.random()*mTanks.length)];
  this.dumb=false;
  this.towerLoose=false;

  // tank on fire
  this.fireProtect=30;
  this.onFire=false;
  this.fireHurtDelay=0;
  this.delayTime=0;
  this.fireLoop=0;
  this.size=1.5;
  this.flameSpeed=1;
  this.flamePhase=0;

  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 250;
  this.reloadTimeM = 0;

  this.hp = 100;

  this.x=x;
  this.y=y;

  this.imgB=gera2;
  this.imgT=gerb2;



  this.vMax=1.1;
  this.acceleration=0.06;
  this.speed = 0;
  this.trackTimer=0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.setDes = function(x,y) {
      this.aiX=x;
      this.aiY=y;
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
  }

  this.newPos = function() {

    // detecting fire
    if(this.onFire==true){
      if(this.fireHurtDelay==4){
        this.hp--;
        this.fireHurtDelay=0;
      }
      this.fireHurtDelay++;
    }

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
          this.speed=0;
        }
    }

    // touching obstacles by ai
    for(var j = 0; j < obstacles.length; j++) {
        if(
          this.x>obstacles[j].x &&
          this.x<obstacles[j].x+obstacles[j].width &&
          this.y>obstacles[j].y &&
          this.y<obstacles[j].y+obstacles[j].height
        ){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
          this.speed=0;
        }
    }

    // moving around the map
    // pick up destination
    if(this.aiX=="none"&&this.aiY=="none"){
      this.aiX=Math.round(Math.random()*fieldMapX);
      this.aiY=Math.round(Math.random()*fieldMapY);
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
    }

    // change angle of body and move
    if(Math.abs(this.angleB-this.aiDestinationAngle)<0.03){
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
      //this.angleB=this.aiDestinationAngle;
      this.moveAngleB=0;
      if(this.speed<this.vMax){
        this.speed=this.speed+this.acceleration;
      }
    }else if(Math.abs(this.angleB-this.aiDestinationAngle)>0.03){
      // slowing down
      /*
      if(this.speed>0){
        this.speed=this.speed-this.acceleration;
        if(Math.abs(this.speed-this.acceleration)<this.acceleration){
          this.speed=0;
        }
      }
      */
      // turning around
      if(this.angleB<this.aiDestinationAngle){
        this.moveAngleB=this.vMax;
      }
      if(this.angleB>this.aiDestinationAngle){
        this.moveAngleB=-this.vMax;
      }
    }

    // drawing tracks
    if(this.trackTimer>=10){

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))- 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))+ 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))+ 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))- 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      this.trackTimer=0;
    }

    if(this.speed!=0||this.moveAngleB!=0){
      this.trackTimer=this.trackTimer+1.5*this.vMax;
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
        explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
        mines.splice(i,1);
      }
    }

    // shooting
    // in map check
    if(this.x>-50&&this.x<fieldMapX+50&&this.y>-50&&this.y<fieldMapY+50){
    // main gun
    if(this.reloadTime>0){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady&&!this.towerLoose){
      bulletsAi.push(new Bullet(this.x+(30 * Math.sin(this.angleT)),
      this.y-(30 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (30)) - 15) * Math.PI / 180),
      this.type));
      this.reloadTime=250;
    }

    // mg
    if (this.reloadTimeM==0&&this.mgShotReady){
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=8;
    }
    if(this.reloadTimeM>0){
      this.reloadTimeM--;
    }
    }// distance check


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
          this.speed=0;
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
      this.speed=0;
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
    if(this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      if( (Math.abs(pTank.x-this.x)<600 && Math.abs(pTank.y-this.y)<600)
      && ( (Math.round((this.aiTargetAngle+2*Math.PI) * 3) / 3) == (Math.round(this.angleB * 3) / 3) )
      ){
        this.mgShotReady=true;
      }else{
        this.mgShotReady=false;
      }
    }

    // detecting smoke cover
    for(var i = 0; i < smoke.length; i++) {
      if(Math.abs(pTank.x-smoke[i].x)<70 && Math.abs(pTank.y-smoke[i].y)<70){
        this.shotReady=false;
        this.mgShotReady=false;
      }
    }

    if(this.dumb){
      this.shotReady=false;
      this.mgShotReady=false;
      this.moveAngleT=0;
      this.angleT=this.angleB;
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
      if(this.towerLoose==false){
       ctx = myGameArea.context;
       ctx.save();
       ctx.translate(this.x, this.y);
       ctx.rotate(this.angleT);
       ctx.translate(0, -3);
       ctx.drawImage(this.imgT, -20, -30);
       ctx.restore();
      }
      // drawing the flames
      if(this.onFire){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y+20);

        if(this.flamePhase==0){
          ctx.drawImage(document.getElementById("s"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }

        if(this.flamePhase==1){
          ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }
        ctx.restore();
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          if(this.flamePhase==0){
            if(this.fireLoop==21){
              this.fireLoop=-1;
              this.flamePhase=1;
            }
          }
          if(this.flamePhase==1){
            if(this.fireLoop==20){
              this.fireLoop=-1;
            }
          }
          this.delayTime=0;
          this.fireLoop++;
        }
      }


  }

}



function AiTank3(x,y) {

  this.id=tankId;
  tankId++;

  this.type="three";
  this.name=lTanks[Math.floor(Math.random()*lTanks.length)];
  this.dumb=false;
  this.towerLoose=false;

  // tank on fire
  this.fireProtect=30;
  this.onFire=false;
  this.fireHurtDelay=0;
  this.delayTime=0;
  this.fireLoop=0;
  this.size=1.5;
  this.flameSpeed=1;
  this.flamePhase=0;

  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 300;
  this.reloadTimeM = 0;


  this.hp = 170;

  this.x=x;
  this.y=y;

  this.imgB=gera3;
  this.imgT=gerb3;


  this.vMax=1.0;
  this.acceleration=0.03;
  this.speed = 0;
  this.trackTimer=0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.setDes = function(x,y) {
      this.aiX=x;
      this.aiY=y;
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
  }

  this.newPos = function() {

    // detecting fire
    if(this.onFire==true){
      if(this.fireHurtDelay==4){
        this.hp--;
        this.fireHurtDelay=0;
      }
      this.fireHurtDelay++;
    }

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
          this.speed=0;
        }
    }

    // touching obstacles by ai
    for(var j = 0; j < obstacles.length; j++) {
        if(
          this.x>obstacles[j].x &&
          this.x<obstacles[j].x+obstacles[j].width &&
          this.y>obstacles[j].y &&
          this.y<obstacles[j].y+obstacles[j].height
        ){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
          this.speed=0;
        }
    }

    // moving around the map
    // pick up destination
    if(this.aiX=="none"&&this.aiY=="none"){
      this.aiX=Math.round(Math.random()*fieldMapX);
      this.aiY=Math.round(Math.random()*fieldMapY);
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
    }

    // change angle of body and move
    if(Math.abs(this.angleB-this.aiDestinationAngle)<0.03){
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
      //this.angleB=this.aiDestinationAngle;
      this.moveAngleB=0;
      if(this.speed<this.vMax){
        this.speed=this.speed+this.acceleration;
      }
    }else if(Math.abs(this.angleB-this.aiDestinationAngle)>0.03){
      // slowing down
      /*
      if(this.speed>0){
        this.speed=this.speed-this.acceleration;
        if(Math.abs(this.speed-this.acceleration)<this.acceleration){
          this.speed=0;
        }
      }
      */
      // turning around
      if(this.angleB<this.aiDestinationAngle){
        this.moveAngleB=this.vMax;
      }
      if(this.angleB>this.aiDestinationAngle){
        this.moveAngleB=-this.vMax;
      }
    }

    // drawing tracks
    if(this.trackTimer>=10){

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))- 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))+ 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))+ 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))- 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      this.trackTimer=0;
    }

    if(this.speed!=0||this.moveAngleB!=0){
      this.trackTimer=this.trackTimer+1.5*this.vMax;
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
        explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
        mines.splice(i,1);
      }
    }

    // shooting
    // in map check
    if(this.x>-50&&this.x<fieldMapX+50&&this.y>-50&&this.y<fieldMapY+50){
    // main gun
    if(this.reloadTime>0){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady&&!this.towerLoose){
      bulletsAi.push(new Bullet(this.x+(23 * Math.sin(this.angleT)),
      this.y-(23 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (16)) - 8) * Math.PI / 180),
      this.type));
      this.reloadTime=300;
    }

    // mg
    if (this.reloadTimeM==0&&this.mgShotReady){
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 6 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 6 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=5;
    }
    if(this.reloadTimeM>0){
      this.reloadTimeM--;
    }
    }// distance check


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
          this.speed=0;
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
      this.speed=0;
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
    if(this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      if( (Math.abs(pTank.x-this.x)<600 && Math.abs(pTank.y-this.y)<600)
      && ( (Math.round((this.aiTargetAngle+2*Math.PI) * 3) / 3) == (Math.round(this.angleB * 3) / 3) )
      ){
        this.mgShotReady=true;
      }else{
        this.mgShotReady=false;
      }
    }

    // detecting smoke cover
    for(var i = 0; i < smoke.length; i++) {
      if(Math.abs(pTank.x-smoke[i].x)<70 && Math.abs(pTank.y-smoke[i].y)<70){
        this.shotReady=false;
        this.mgShotReady=false;
      }
    }

    if(this.dumb){
      this.shotReady=false;
      this.mgShotReady=false;
      this.moveAngleT=0;
      this.angleT=this.angleB;
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
      if(this.towerLoose==false){
       ctx = myGameArea.context;
       ctx.save();
       ctx.translate(this.x, this.y);
       ctx.rotate(this.angleT);
       ctx.translate(0, -16);
       ctx.drawImage(this.imgT, -20, -30);
       ctx.restore();
      }
      // drawing the flames
      if(this.onFire){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y+20);

        if(this.flamePhase==0){
          ctx.drawImage(document.getElementById("s"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }

        if(this.flamePhase==1){
          ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }
        ctx.restore();
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          if(this.flamePhase==0){
            if(this.fireLoop==21){
              this.fireLoop=-1;
              this.flamePhase=1;
            }
          }
          if(this.flamePhase==1){
            if(this.fireLoop==20){
              this.fireLoop=-1;
            }
          }
          this.delayTime=0;
          this.fireLoop++;
        }
      }


  }

}



function AiTank4(x,y) {

  this.id=tankId;
  tankId++;

  this.type="four";
  this.name=lTanks[Math.floor(Math.random()*lTanks.length)];
  this.dumb=false;
  this.towerLoose=false;

  // tank on fire
  this.fireProtect=30;
  this.onFire=false;
  this.fireHurtDelay=0;
  this.delayTime=0;
  this.fireLoop=0;
  this.size=1.5;
  this.flameSpeed=1;
  this.flamePhase=0;

  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 400;
  this.reloadTimeM = 0;


  this.hp = 250;

  this.x=x;
  this.y=y;

  this.imgB=gera4;
  this.imgT=gerb4;


  this.vMax=0.6;
  this.acceleration=0.03;
  this.speed = 0;
  this.trackTimer=0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.setDes = function(x,y) {
      this.aiX=x;
      this.aiY=y;
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
  }

  this.newPos = function() {

    // detecting fire
    if(this.onFire==true){
      if(this.fireHurtDelay==4){
        this.hp--;
        this.fireHurtDelay=0;
      }
      this.fireHurtDelay++;
    }

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
          this.speed=0;
        }
    }

    // touching obstacles by ai
    for(var j = 0; j < obstacles.length; j++) {
        if(
          this.x>obstacles[j].x &&
          this.x<obstacles[j].x+obstacles[j].width &&
          this.y>obstacles[j].y &&
          this.y<obstacles[j].y+obstacles[j].height
        ){
          this.x=this.previousX;
          this.y=this.previousY;
          this.aiX="none";
          this.aiY="none";
          this.speed=0;
        }
    }

    // moving around the map
    // pick up destination
    if(this.aiX=="none"&&this.aiY=="none"){
      this.aiX=Math.round(Math.random()*fieldMapX);
      this.aiY=Math.round(Math.random()*fieldMapY);
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
    }

    // change angle of body and move
    if(Math.abs(this.angleB-this.aiDestinationAngle)<0.03){
      this.aiDestinationAngle=Math.atan2(this.y - this.aiY, this.x - this.aiX)+(-90 * Math.PI / 180)+2*Math.PI;
      //this.angleB=this.aiDestinationAngle;
      this.moveAngleB=0;
      if(this.speed<this.vMax){
        this.speed=this.speed+this.acceleration;
      }
    }else if(Math.abs(this.angleB-this.aiDestinationAngle)>0.03){
      // slowing down
      /*
      if(this.speed>0){
        this.speed=this.speed-this.acceleration;
        if(Math.abs(this.speed-this.acceleration)<this.acceleration){
          this.speed=0;
        }
      }
      */
      // turning around
      if(this.angleB<this.aiDestinationAngle){
        this.moveAngleB=this.vMax;
      }
      if(this.angleB>this.aiDestinationAngle){
        this.moveAngleB=-this.vMax;
      }
    }

    // drawing tracks
    if(this.trackTimer>=10){

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))- 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))+ 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      tracks.push(new Track(
        this.x+(0 * Math.sin(this.angleB))+ 14 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(0 * Math.cos(this.angleB))- 14 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB
        ));

      this.trackTimer=0;
    }

    if(this.speed!=0||this.moveAngleB!=0){
      this.trackTimer=this.trackTimer+1.5*this.vMax;
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
        explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
        mines.splice(i,1);
      }
    }

    // shooting
    // in map check
    if(this.x>-50&&this.x<fieldMapX+50&&this.y>-50&&this.y<fieldMapY+50){
    // main gun
    if(this.reloadTime>0){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady&&!this.towerLoose){
      bulletsAi.push(new Bullet(this.x+(37 * Math.sin(this.angleT)),
      this.y-(37 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (24)) - 12) * Math.PI / 180),
      this.type));
      this.reloadTime=400;
    }

    // mg
    if (this.reloadTimeM==0&&this.mgShotReady){
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=4;
    }
    if(this.reloadTimeM>0){
      this.reloadTimeM--;
    }
    }// distance check


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
          this.speed=0;
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
      this.speed=0;
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
    if(this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      if( (Math.abs(pTank.x-this.x)<600 && Math.abs(pTank.y-this.y)<600)
      && ( (Math.round((this.aiTargetAngle+2*Math.PI) * 3) / 3) == (Math.round(this.angleB * 3) / 3) )
      ){
        this.mgShotReady=true;
      }else{
        this.mgShotReady=false;
      }
    }

    // detecting smoke cover
    for(var i = 0; i < smoke.length; i++) {
      if(Math.abs(pTank.x-smoke[i].x)<70 && Math.abs(pTank.y-smoke[i].y)<70){
        this.shotReady=false;
        this.mgShotReady=false;
      }
    }

    if(this.dumb){
      this.shotReady=false;
      this.mgShotReady=false;
      this.moveAngleT=0;
      this.angleT=this.angleB;
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
      if(this.towerLoose==false){
       ctx = myGameArea.context;
       ctx.save();
       ctx.translate(this.x, this.y);
       ctx.rotate(this.angleT);
       ctx.translate(0, -12);
       ctx.drawImage(this.imgT, -20, -30);
       ctx.restore();
      }
      // drawing the flames
      if(this.onFire){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y+20);

        if(this.flamePhase==0){
          ctx.drawImage(document.getElementById("s"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }

        if(this.flamePhase==1){
          ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
          128*this.size, 128*this.size);
        }
        ctx.restore();
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          if(this.flamePhase==0){
            if(this.fireLoop==21){
              this.fireLoop=-1;
              this.flamePhase=1;
            }
          }
          if(this.flamePhase==1){
            if(this.fireLoop==20){
              this.fireLoop=-1;
            }
          }
          this.delayTime=0;
          this.fireLoop++;
        }
      }


  }

}
