/*
if(this.towerLoose==false){
 ctx = myGameArea.context;
 ctx.save();
 ctx.translate(this.x, this.y);
 ctx.rotate(this.angleT);
 ctx.translate(0, -3);
 ctx.drawImage(this.imgT, -20, -30);
 ctx.restore();
}

*/

function AiTank(x,y) {

  this.type="one";

  this.towerLoose=false;

  // tank on fire
  this.fireProtect=50;
  this.onFire=false;
  this.fireHurtDelay=0;
  this.delayTime=0;
  this.fireLoop=0;
  this.size=2;
  this.flameSpeed=2;

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
        explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
        mines.splice(i,1);
      }
    }

    // shooting
    // main gun
    if(this.reloadTime>0&&this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady&&!this.towerLoose){
      bulletsAi.push(new Bullet(this.x+(40 * Math.sin(this.angleT)),
      this.y-(40 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (40)) - 20) * Math.PI / 180)));
      this.reloadTime=250;
    }

    // mg
    console.log(this.mgShotReady);
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

    // gun
    // detection if ai hits player tank

    // detection if ai hits player
    for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-pTank.x)<15 && Math.abs(bulletsAi[i].y-pTank.y)<15){
        explosionsH.push(new ExplosionH(bulletsAi[i].x, bulletsAi[i].y));
        bulletsAi.splice(i,1);
        pTank.hp=pTank.hp-20;
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-kills[j].x)<15 && Math.abs(bulletsAi[i].y-kills[j].y)<15){
         explosionsH.push(new ExplosionH(bulletsAi[i].x, bulletsAi[i].y));
         bulletsAi.splice(i,1);
         kills[j].hp=kills[j].hp-50;
      }
     }
    }

    // machinegun
    // detection if ai hits player
    for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-pTank.x)<15 && Math.abs(mgBulletsAi[i].y-pTank.y)<15){
        mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
        mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
        if(mgBulletsAi[i].active){
          pTank.hp=pTank.hp-2;
          mgBulletsAi[i].active=false;
        }
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-kills[j].x)<15 && Math.abs(mgBulletsAi[i].y-kills[j].y)<15){
        mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
        mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
        if(mgBulletsAi[i].active){
          kills[j].hp=kills[j].hp-5;
          mgBulletsAi[i].active=false;
        }
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
        ctx.translate(this.x, this.y);
        ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
        128*this.size, 128*this.size);
        ctx.restore();
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          this.delayTime=0;
          this.fireLoop++;
          if(this.fireLoop==10){
            this.fireLoop=0;
          }
        }
      }


  }

}



function AiTank2(x,y) {

  this.type="one";

  this.towerLoose=false;

  // tank on fire
  this.fireProtect=50;
  this.onFire=false;
  this.fireHurtDelay=0;
  this.delayTime=0;
  this.fireLoop=0;
  this.size=2;
  this.flameSpeed=2;

  this.aiX="none";
  this.aiY="none";
  this.aiDestinationAngle="none";

  this.aiTargetAngle;
  this.shotReady=false;
  this.mgShotReady=false;
  this.reloadTime = 250;
  this.reloadTimeM = 0;

  this.hp = 150;

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
        explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
        mines.splice(i,1);
      }
    }

    // shooting
    // main gun
    if(this.reloadTime>0&&this.x>0&&this.x<fieldMapX&&this.y>0&&this.y<fieldMapY){
      this.reloadTime--;
    }
    if (this.reloadTime==0&&this.shotReady&&!this.towerLoose){
      bulletsAi.push(new Bullet(this.x+(40 * Math.sin(this.angleT)),
      this.y-(40 * Math.cos(this.angleT)),
      this.angleT+( (Math.round(Math.random() * (30)) - 15) * Math.PI / 180)));
      this.reloadTime=250;
    }

    // mg
    console.log(this.mgShotReady);
    if (this.reloadTimeM==0&&this.mgShotReady){
      mgBulletsAi.push(new MgBullet(
      this.x+(25 * Math.sin(this.angleB))+ 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
      this.y-(25 * Math.cos(this.angleB))- 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
      this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
      this.reloadTimeM=6;
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

    // gun
    // detection if ai hits player tank

    // detection if ai hits player
    for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-pTank.x)<15 && Math.abs(bulletsAi[i].y-pTank.y)<15){
        explosionsH.push(new ExplosionH(bulletsAi[i].x, bulletsAi[i].y));
        bulletsAi.splice(i,1);
        pTank.hp=pTank.hp-20;
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < bulletsAi.length; i++) {
      if(Math.abs(bulletsAi[i].x-kills[j].x)<15 && Math.abs(bulletsAi[i].y-kills[j].y)<15){
         explosionsH.push(new ExplosionH(bulletsAi[i].x, bulletsAi[i].y));
         bulletsAi.splice(i,1);
         kills[j].hp=kills[j].hp-50;
      }
     }
    }

    // machinegun
    // detection if ai hits player
    for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-pTank.x)<15 && Math.abs(mgBulletsAi[i].y-pTank.y)<15){
        mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
        mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
        if(mgBulletsAi[i].active){
          pTank.hp=pTank.hp-2;
          mgBulletsAi[i].active=false;
        }
      }
    }
    // detection if ai hits dead tank
    for(var j = 0; j < kills.length; j++) {
     for(var i = 0; i < mgBulletsAi.length; i++) {
      if(Math.abs(mgBulletsAi[i].x-kills[j].x)<15 && Math.abs(mgBulletsAi[i].y-kills[j].y)<15){
        mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
        mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
        if(mgBulletsAi[i].active){
          kills[j].hp=kills[j].hp-5;
          mgBulletsAi[i].active=false;
        }
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
        ctx.translate(this.x, this.y);
        ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
        128*this.size, 128*this.size);
        ctx.restore();
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          this.delayTime=0;
          this.fireLoop++;
          if(this.fireLoop==10){
            this.fireLoop=0;
          }
        }
      }


  }

}
