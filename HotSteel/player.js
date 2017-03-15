
function PTank(x,y) {

  this.id=tankId;
  tankId++;

  this.alive=true;
  this.towerLoose=false;
  this.inSmoke=false;

  this.x=x;
  this.y=y;

  if(terrain==0){
  this.imgP=pointer;
  }else{
  this.imgP=pointer2;
  }

  this.imgB=rusa;
  this.imgT=rusb;

  // upgrades
  this.numArt=artCalls;
  this.gunSpeed=gunSpeedG;// 300,250,200,150,100
  if(bonus){
    this.gunSpeed=7;
  }
  this.mgSpeed=mgSpeedG; // 10,8,6,5,4
  this.sights=sightsG;  // 1,2,3
  this.numBullet=numBulletG; // 12, 24, 36, 48, 60
  this.numBullet2=numBullet2G; // 8, 16, 24, 32, 40
  this.numFlames=numFlamesG; // 200, 400, 600, 800, 1000
  this.numMgBullets=numMgBulletsG; // 150, 300, 450, 600, 750
  this.numSmoke=numSmokeG; // 1,2,3,4,5
  this.numMines=numMinesG; // 6, 12, 18, 24, 30
  this.hp=hpG; // 80, 120, 180, 240, 300
  this.vMax=vMaxG; // 0.8, 1, 1.2, 1.4, 1.6
  this.acceleration=accelerationG; // constant
  this.secondMg=secondMgG; // or false if not mounted
  this.flamethrower=flamethrowerG; // or false if not mounted

  // artilery
  this.artBusy=false;
  this.artSpeed=-100;
  this.artShots=0;

  this.mineSpeed=40;
  this.ammoType = 1;
  this.speed = 0;
  this.trackTimer=0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;
  this.turrentMoving=false;

  this.previousX=this.x;
  this.previousY=this.y;

  this.reloadTime = this.gunSpeed;
  this.reloadTimeF = 0;
  this.reloadTimeM = 0;
  this.reloadTimeM2 = 0;
  this.reloadTimeMine = 0;
  this.reloadTimeSmoke = 0;

  this.gunReload = new Audio('sounds/gunReload.mp3');
  this.flame = new Audio('sounds/flame.mp3');
  this.move = new Audio('sounds/move.mp3');
  this.moveT = new Audio('sounds/moveT.mp3');
  this.radio= new Array();
  this.radio[0] = new Audio('sounds/radio1.mp3');
  this.radio[1] = new Audio('sounds/radio2.mp3');
  this.radio[2] = new Audio('sounds/radio3.mp3');

  this.newPos = function() {
  if(this.alive){
      // if player is in smoke cover, cannot see the pointer
      this.inSmoke=false;
      for(var i = 0; i < smoke.length; i++) {
        if(Math.abs(pTank.x-smoke[i].x)<70 && Math.abs(pTank.y-smoke[i].y)<70){
          this.inSmoke=true;
        }
      }

      // ammo choosing
      if (this.ammoType != 1 && myGameArea.keys && myGameArea.keys[49] && this.numBullet>0){
        this.ammoType = 1;
        this.reloadTime=this.gunSpeed;
      }
      if (this.ammoType != 2 && myGameArea.keys && myGameArea.keys[50] && this.numBullet2>0){
        this.ammoType = 2;
        this.reloadTime=this.gunSpeed;
      }
      // switching when type of ammo is empty
      if(this.numBullet==0&&this.numBullet2>0){
        this.ammoType = 2;
      }
      if(this.numBullet2==0&&this.numBullet>0){
        this.ammoType = 1;
      }


      // start position zeroing
      this.moveAngleB = 0;
      this.moveAngleT = 0;
      this.turrentMoving=false;


      // body rotation, turrent static
      if (myGameArea.keys && myGameArea.keys[37]){
        this.moveAngleB = -this.vMax;
        this.moveAngleT = -this.vMax;
      }
      if (myGameArea.keys && myGameArea.keys[39]){
        this.moveAngleB = this.vMax;
        this.moveAngleT = this.vMax;
      }

      // turrent rotation
      if (myGameArea.keys && myGameArea.keys[65]){
        this.moveAngleT = -1;
        this.turrentMoving=true;
      }
      if (myGameArea.keys && myGameArea.keys[68]){
        this.moveAngleT = 1;
        this.turrentMoving=true;
      }

      // turrent + body rotation
      if (myGameArea.keys && myGameArea.keys[65] && myGameArea.keys[37]){
        this.moveAngleT = -1-this.vMax;
        this.turrentMoving=true;
      }
      if (myGameArea.keys && myGameArea.keys[68] && myGameArea.keys[39]){
        this.moveAngleT = 1+this.vMax;
        this.turrentMoving=true;
      }
      if (myGameArea.keys && myGameArea.keys[65] && myGameArea.keys[39]){
        this.moveAngleT = -1+this.vMax;
        this.turrentMoving=true;
      }
      if (myGameArea.keys && myGameArea.keys[68] && myGameArea.keys[37]){
        this.moveAngleT = 1-this.vMax;
        this.turrentMoving=true;
      }




      // acceleration
      if (myGameArea.keys && myGameArea.keys[38]){
        if(this.speed<this.vMax){
          this.speed+=this.acceleration;
        }
      }

      if (myGameArea.keys && myGameArea.keys[40]){
        if(this.speed>-this.vMax){
          this.speed-=this.acceleration;
        }
      }

      // slowing down
      if (myGameArea.keys && !myGameArea.keys[40] && !myGameArea.keys[38]){
        if(this.speed>0){
          this.speed-=this.acceleration;
        }
        if(this.speed<0){
          this.speed+=this.acceleration;
        }
        if(Math.abs(this.speed-this.acceleration)<this.acceleration){
          this.speed=0;
        }
      }


      // sound of movement

      // body
        if(this.speed!=0||this.moveAngleB!=0){
          if(sound){
            this.move.play();
          }
        }else{
          this.move.load();
        }

      // turrent
      if(this.turrentMoving){
        if(sound){
          this.moveT.play();
        }
      }else{
        this.moveT.load();
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

/*
mgBulletsP.push(new MgBullet(
this.x+(25 * Math.sin(this.angleB))- 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
this.y-(25 * Math.cos(this.angleB))+ 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
this.reloadTimeM=this.mgSpeed;
*/


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
              this.speed=0;
            }
      }

      // touching obstacles by player
      for(var j = 0; j < obstacles.length; j++) {
          if(
            this.x>obstacles[j].x &&
            this.x<obstacles[j].x+obstacles[j].width &&
            this.y>obstacles[j].y &&
            this.y<obstacles[j].y+obstacles[j].height
          ){
            this.x=this.previousX;
            this.y=this.previousY;
            this.speed=0;
          }
      }

      for(var t = 0; t < aiTanks.length; t++) {
        // touching enemy tanks
        if((Math.abs(aiTanks[t].x-pTank.x)<30)&&(Math.abs(aiTanks[t].y-pTank.y)<30)){
          pTank.x=pTank.previousX;
          pTank.y=pTank.previousY;
          this.speed=0;
        }
      }



      // weapons

      // calling artillery, will be working after tank death
      if (myGameArea.keys && myGameArea.keys[82] && this.numArt>0 && this.artBusy==false){
        this.artBusy=true;
        this.numArt--;
        if(sound){
          this.radio[Math.floor(Math.random()*3)].play();
        }
      }


      // setting up smoke
      if(this.reloadTimeSmoke>0){
        this.reloadTimeSmoke--;
      }
      if (myGameArea.keys && myGameArea.keys[69] && this.numSmoke>0 && this.reloadTimeSmoke==0){
        smoke.push(new Smoke(this.x,this.y));
        this.numSmoke--;
        this.reloadTimeSmoke=50;
      }

      // setting up mines
      if(this.reloadTimeMine>0){
        this.reloadTimeMine--;
      }
      if (myGameArea.keys && myGameArea.keys[70] && this.numMines>0 && this.reloadTimeMine==0){
        mines.push(new Mine(
        this.x-(35 * Math.sin(this.angleB)),
        this.y+(35 * Math.cos(this.angleB))
        ));
        this.numMines--;
        this.reloadTimeMine=this.mineSpeed;
      }

      // detection if player tank is on the mine and trigering it
      for(var i = 0; i < mines.length; i++) {
        if(Math.abs(mines[i].x-pTank.x)<15 && Math.abs(mines[i].y-pTank.y)<15){
          pTank.hp=pTank.hp-100;
          explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
          for(var q=0; q<20; q++){
            pieces.push(new Piece(mines[i].x, mines[i].y));
          }
          mines.splice(i,1);
        }
      }

      // main gun
      if (myGameArea.keys && myGameArea.keys[32] && this.reloadTime==0){
        if(bonus){
          bulletsP.push(new Bullet3(
          this.x+(27 * Math.sin(this.angleT)),
          this.y-(27 * Math.cos(this.angleT)),
          this.angleT+((Math.round(Math.random() * (10)) - 5) * Math.PI / 180),
          this.ammoType));
          this.reloadTime=this.gunSpeed;
        }else{
        if(this.ammoType==1 && this.numBullet>0){
          this.numBullet--;
          bulletsP.push(new Bullet(
          this.x+(27 * Math.sin(this.angleT)),
          this.y-(27 * Math.cos(this.angleT)),
          this.angleT,
          this.ammoType));
          this.reloadTime=this.gunSpeed;
        }else if(this.ammoType==2 && this.numBullet2>0){
          this.numBullet2--;
          bulletsP.push(new Bullet2(
          this.x+(27 * Math.sin(this.angleT)),
          this.y-(27 * Math.cos(this.angleT)),
          this.angleT,
          this.ammoType));
          this.reloadTime=this.gunSpeed;
        }
        }
      }
      //reloading
      if(this.numBullet>0||this.numBullet2>0||bonus){
        if(this.reloadTime>0){
          this.reloadTime--;
        }
        // sound of reload
        if(sound){
          if(this.reloadTime==20){
            this.gunReload.play();
          }
        }
      }

      // machinegun
      if(this.flamethrower==false){

      if (myGameArea.keys && myGameArea.keys[87] && this.reloadTimeM==0 && this.numMgBullets>0){
        this.numMgBullets--;
        mgBulletsP.push(new MgBullet(
        this.x+(25 * Math.sin(this.angleB))- 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(25 * Math.cos(this.angleB))+ 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
        this.reloadTimeM=this.mgSpeed;
      }
      if(this.reloadTimeM>0){
        this.reloadTimeM--;
      }

      }

      // machinegun 2
      if(this.secondMg){

      if (myGameArea.keys && myGameArea.keys[83] && this.reloadTimeM2==0 && this.numMgBullets>0){
        this.numMgBullets--;
        mgBulletsP.push(new MgBullet(
        this.x+(15 * Math.sin(this.angleT))- 4 * (Math.sin(this.angleT+90 * Math.PI / 180)),
        this.y-(15 * Math.cos(this.angleT))+ 4 * (Math.cos(this.angleT+90 * Math.PI / 180)),
        this.angleT + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
        this.reloadTimeM2=this.mgSpeed;
      }
      if(this.reloadTimeM2>0){
        this.reloadTimeM2--;
      }

      }

      // flamethrower
      if(this.flamethrower){

      if (myGameArea.keys && myGameArea.keys[87] && this.reloadTimeF==0 && this.numFlames>0){
        if(sound){
          this.flame.play();
        }
        this.numFlames--;
        flames.push(new Flame(
        this.x+(25 * Math.sin(this.angleB))- 7 * (Math.sin(this.angleB+90 * Math.PI / 180)),
        this.y-(25 * Math.cos(this.angleB))+ 7 * (Math.cos(this.angleB+90 * Math.PI / 180)),
        this.angleB + ((Math.round(Math.random() * (10)) - 5) * Math.PI / 180)));
        this.reloadTimeF=1;
      }
      if(this.reloadTimeF>0){
        this.reloadTimeF--;
      }
      if(!(myGameArea.keys&&myGameArea.keys[87])||this.numFlames<=0){
        this.flame.pause();
        this.flame.load();
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

  } // end of alive condition

  }


  this.update = function() {
  if(!this.alive){
    // drawing the body
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angleB);
    ctx.drawImage(rusaw, -20, -30);
    ctx.restore();
    // drawing the tower
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angleT);
    ctx.drawImage(rusbw, -20, -30);
    ctx.restore();
  }
  if(this.alive){
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

    // sights
    ctx.globalAlpha = 1;
    if(this.sights==1||this.sights==2||this.sights==3){
      // drawing the pointer
      if(this.inSmoke==false){
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.drawImage(this.imgP, -64*0.25, -150, 128*0.25, 128*0.25);
      ctx.restore();
      // drawing the loading time
      if(!bonus){
      ctx = myGameArea.context;
      if(terrain==0){
      ctx.strokeStyle = "red";
      }else{
      ctx.strokeStyle = "black";
      }
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.translate(0, -134);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(0, 0, 18, 0, ((2*Math.PI)*(this.gunSpeed-this.reloadTime))/this.gunSpeed);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      }
      }
    }
    if(this.sights==2||this.sights==3){
      // drawing the pointer
      if(this.inSmoke==false){
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.drawImage(this.imgP, -64*0.25, -300, 128*0.25, 128*0.25);
      ctx.restore();
      // drawing the loading time
      if(!bonus){
      ctx = myGameArea.context;
      if(terrain==0){
      ctx.strokeStyle = "red";
      }else{
      ctx.strokeStyle = "black";
      }
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.translate(0, -284);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(0, 0, 18, 0, ((2*Math.PI)*(this.gunSpeed-this.reloadTime))/this.gunSpeed);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      }
      }
    }
    if(this.sights==3){
      // drawing the pointer
      if(this.inSmoke==false){
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.drawImage(this.imgP, -64*0.25, -450, 128*0.25, 128*0.25);
      ctx.restore();
      // drawing the loading time
      if(!bonus){
      ctx = myGameArea.context;
      if(terrain==0){
      ctx.strokeStyle = "red";
      }else{
      ctx.strokeStyle = "black";
      }
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angleT);
      ctx.translate(0, -434);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(0, 0, 18, 0, ((2*Math.PI)*(this.gunSpeed-this.reloadTime))/this.gunSpeed);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      }
      }
    }
    ctx.globalAlpha = 1;
  } // end of alive condition
  } // end of update function
}
