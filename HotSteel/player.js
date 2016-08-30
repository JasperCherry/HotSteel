
function PTank(x,y,imgB,imgT) {

  this.x=x;
  this.y=y;
  this.imgB=imgB;
  this.imgT=imgT;


  this.ammoType = 1;
  this.numBullet = 20;
  this.numBullet2 = 20;
  this.numMgBullets = 200;
  this.numMgBullets2 = 200;
  this.numSmoke = 3;
  this.hp = 200;
  this.numMines = 10;

  this.speed = 0;
  this.angleB = 0;
  this.moveAngleB = 0;
  this.angleT = 0;
  this.moveAngleT = 0;

  this.previousX=this.x;
  this.previousY=this.y;

  this.reloadTime = 250;
  this.reloadTimeM = 0;
  this.reloadTimeM2 = 0;
  this.reloadTimeMine = 0;
  this.reloadTimeSmoke = 0;

  this.newPos = function() {

      // ammo choosing
      if (myGameArea.keys && myGameArea.keys[49]){
        this.ammoType = 1;
        this.reloadTime=250;
      }
      if (myGameArea.keys && myGameArea.keys[50]){
        this.ammoType = 2;
        this.reloadTime=250;
      }

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
          explosionsM.push(new ExplosionM(mines[i].x, mines[i].y));
          mines.splice(i,1);
        }
      }

      // main gun
      if (myGameArea.keys && myGameArea.keys[32] && this.reloadTime==0){
        if(this.ammoType==1 && this.numBullet>0){
          this.numBullet--;
          bulletsP.push(new Bullet(
          this.x+(40 * Math.sin(this.angleT)),
          this.y-(40 * Math.cos(this.angleT)),
          this.angleT));
          this.reloadTime=250;
        }else if(this.ammoType==2 && this.numBullet2>0){
          this.numBullet2--;
          bulletsP.push(new Bullet2(
          this.x+(40 * Math.sin(this.angleT)),
          this.y-(40 * Math.cos(this.angleT)),
          this.angleT));
          this.reloadTime=250;
        }
      }
      //reloading
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

      if (myGameArea.keys && myGameArea.keys[83] && this.reloadTimeM2==0 && this.numMgBullets2>0){
        this.numMgBullets2--;
        mgBulletsP.push(new MgBullet(
        this.x+(15 * Math.sin(this.angleT))+ 4 * (Math.sin(this.angleT+90 * Math.PI / 180)),
        this.y-(15 * Math.cos(this.angleT))- 4 * (Math.cos(this.angleT+90 * Math.PI / 180)),
        this.angleT + ((Math.round(Math.random() * (20)) - 10) * Math.PI / 180)));
        this.reloadTimeM2=8;
      }
      if(this.reloadTimeM2>0){
        this.reloadTimeM2--;
      }


      // detection if player hits dead tank by gun
      for(var j = 0; j < kills.length; j++) {
       for(var i = 0; i < bulletsP.length; i++) {
        if(Math.abs(bulletsP[i].x-kills[j].x)<15 && Math.abs(bulletsP[i].y-kills[j].y)<15){
           if(bulletsP[i].type==1){
             // heat rounds
             explosionsH.push(new ExplosionH(bulletsP[i].x, bulletsP[i].y));
             bulletsP.splice(i,1);
             kills[j].hp=kills[j].hp-50;
           }else if(bulletsP[i].type==2){
             // sabot rounds
             var inArray=false;
             for(var x=0; x<bulletsP[i].hitsDead.length; x++){
               if(j==bulletsP[i].hitsDead[x]){
                 inArray=true;
               }
             }
             // if tank wasnt hit before
             if(inArray==false){
               bulletsP[i].hitsDead.push(j);
               kills[j].hp=kills[j].hp-50;
               explosionsH.push(new ExplosionH(bulletsP[i].x, bulletsP[i].y));
             }
          }
        }
       }
      }

      // detection if player hits dead tank by machinegun
      for(var j = 0; j < kills.length; j++) {
       for(var i = 0; i < mgBulletsP.length; i++) {
        if(Math.abs(mgBulletsP[i].x-kills[j].x)<15 && Math.abs(mgBulletsP[i].y-kills[j].y)<15){
           mgBulletsP[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
           mgBulletsP[i].liveTime=(Math.round(Math.random() * (5))+5);
           if(mgBulletsP[i].active){
             kills[j].hp=kills[j].hp-5;
             mgBulletsP[i].active=false;
           }
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
           for(var i = 0; i < bulletsP.length; i++) {
            if(Math.abs(bulletsP[i].x-aiTanks[t].x)<15 && Math.abs(bulletsP[i].y-aiTanks[t].y)<15){
               if(bulletsP[i].type==1){
                 // heat rounds
                 explosionsH.push(new ExplosionH(bulletsP[i].x, bulletsP[i].y));
                 bulletsP.splice(i,1);
                 aiTanks[t].hp=aiTanks[t].hp-50;
               }else if(bulletsP[i].type==2){
                 // sabot rounds
                 var inArray=false;
                 for(var x=0; x<bulletsP[i].hits.length; x++){
                   if(t==bulletsP[i].hits[x]){
                     inArray=true;
                   }
                 }
                 // if tank wasnt hit before
                 if(inArray==false){
                   bulletsP[i].hits.push(t);
                  aiTanks[t].hp=aiTanks[t].hp-50;
                   explosionsH.push(new ExplosionH(bulletsP[i].x, bulletsP[i].y));
                 }
              }
            }
           }


          // machinegun
          // detection if player hits  ai tank
          for(var i = 0; i < mgBulletsP.length; i++) {
            if(Math.abs(mgBulletsP[i].x-aiTanks[t].x)<15 && Math.abs(mgBulletsP[i].y-aiTanks[t].y)<15){
              mgBulletsP[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
              mgBulletsP[i].liveTime=(Math.round(Math.random() * (5))+5);
              if(mgBulletsP[i].active){
                aiTanks[t].hp=aiTanks[t].hp-2;
                mgBulletsP[i].active=false;
              }
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
