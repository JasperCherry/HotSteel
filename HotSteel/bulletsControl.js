function bulletsControl() {

  //////////////////////////////////////////////  bullets conditions

  ///////////////////////////////////////////////////////////// player


  // detection if player hits ai tanks

    for(var t = 0; t < aiTanks.length; t++) {

      // gun
      // detection if player hits  ai tank
      for(var i = 0; i < bulletsP.length; i++) {
       if(bulletsP[i].x>0-50&&bulletsP[i].x<fieldMapX+50&&bulletsP[i].y>0-50&&bulletsP[i].y<fieldMapY+50){
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
               if(aiTanks[t].id==bulletsP[i].hits[x]){
                 inArray=true;
               }
             }
             // if tank wasnt hit before
             if(inArray==false){
               bulletsP[i].hits.push(aiTanks[t].id);
              aiTanks[t].hp=aiTanks[t].hp-50;
               explosionsH.push(new ExplosionH(bulletsP[i].x, bulletsP[i].y));
             }
          }
          // losing tower , 25% possible when 50 or less hp after shot
          if( Math.floor(Math.random() * 4)==0 && (aiTanks[t].hp<=50) ){
            aiTanks[t].towerLoose=true;
          }
        }
       }
      }


      // machinegun
      // detection if player hits  ai tank
      for(var i = 0; i < mgBulletsP.length; i++) {
       if(mgBulletsP[i].x>0-50&&mgBulletsP[i].x<fieldMapX+50&&mgBulletsP[i].y>0-50&&mgBulletsP[i].y<fieldMapY+50){
        if(Math.abs(mgBulletsP[i].x-aiTanks[t].x)<15 && Math.abs(mgBulletsP[i].y-aiTanks[t].y)<15){
          mgBulletsP[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
          mgBulletsP[i].liveTime=(Math.round(Math.random() * (5))+5);
          mgBulletsP[i].rico++;
          if(mgBulletsP[i].active){
            aiTanks[t].hp=aiTanks[t].hp-2;
            mgBulletsP[i].active=false;
          }
        }
       }
      }


      // flamethrower
      // detection if player hits  ai tank
      for(var i = 0; i < flames.length; i++) {
        if(flames[i].x>0-50&&flames[i].x<fieldMapX+50&&flames[i].y>0-50&&flames[i].y<fieldMapY+50){
        if(Math.abs(flames[i].x-aiTanks[t].x)<15 && Math.abs(flames[i].y-aiTanks[t].y)<15){
          flames.splice(i,1);
          aiTanks[t].fireProtect--;
          if(aiTanks[t].fireProtect<=0){
            aiTanks[t].onFire=true;
          }
        }
       }
      }

  }

  // hitting dead tanks

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
         // checks alive tanks as well to avoid dobule hit on alive and dead tank
         for(var x=0; x<bulletsP[i].hits.length; x++){
           if(kills[j].id==bulletsP[i].hits[x]){
             inArray=true;
           }
         }
         // checking dead tanks
         for(var x=0; x<bulletsP[i].hitsDead.length; x++){
           if(kills[j].id==bulletsP[i].hitsDead[x]){
             inArray=true;
           }
         }
         // if tank wasnt hit before
         if(inArray==false){
           bulletsP[i].hitsDead.push(kills[j].id);
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
       mgBulletsP[i].rico++;
       if(mgBulletsP[i].active){
         kills[j].hp=kills[j].hp-5;
         mgBulletsP[i].active=false;
       }
    }
   }
  }

  // detection if player hits  dead tank by flamethrower
  for(var j = 0; j < kills.length; j++) {
    for(var i = 0; i < flames.length; i++) {
      if(Math.abs(flames[i].x-kills[j].x)<15 && Math.abs(flames[i].y-kills[j].y)<15){
        flames.splice(i,1);
      }
    }
  }

  //////////////////////////// hitting obstacles

  // gun
  for(var j = 0; j < obstacles.length; j++) {
   for(var i = 0; i < bulletsP.length; i++) {
     if(
       bulletsP[i].x>obstacles[j].x &&
       bulletsP[i].x<obstacles[j].x+obstacles[j].width &&
       bulletsP[i].y>obstacles[j].y &&
       bulletsP[i].y<obstacles[j].y+obstacles[j].height
     ){
       explosionsH.push(new ExplosionH(bulletsP[i].x, bulletsP[i].y));
       bulletsP.splice(i,1);
     }
   }
  }

  // mg
  for(var j = 0; j < obstacles.length; j++) {
   for(var i = 0; i < mgBulletsP.length; i++) {
     if(
       mgBulletsP[i].x>obstacles[j].x &&
       mgBulletsP[i].x<obstacles[j].x+obstacles[j].width &&
       mgBulletsP[i].y>obstacles[j].y &&
       mgBulletsP[i].y<obstacles[j].y+obstacles[j].height
     ){
       mgBulletsP[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
       mgBulletsP[i].liveTime=(Math.round(Math.random() * (5))+5);
       mgBulletsP[i].rico++;
       if(mgBulletsP[i].active){
         mgBulletsP[i].active=false;
       }
     }
   }
  }

  // flamethrower
  for(var j = 0; j < obstacles.length; j++) {
   for(var i = 0; i < flames.length; i++) {
     if(
       flames[i].x>obstacles[j].x &&
       flames[i].x<obstacles[j].x+obstacles[j].width &&
       flames[i].y>obstacles[j].y &&
       flames[i].y<obstacles[j].y+obstacles[j].height
     ){
       flames.splice(i,1);
     }
   }
  }

  /////////////////////////////////////////////////////////////// ai


  // hiiting player tank

  // gun
  // detection if ai hits player
  for(var i = 0; i < bulletsAi.length; i++) {
    if(Math.abs(bulletsAi[i].x-pTank.x)<15 && Math.abs(bulletsAi[i].y-pTank.y)<15){
      explosionsH.push(new ExplosionH(bulletsAi[i].x, bulletsAi[i].y));
      if(bulletsAi[i].type=="one"){
        pTank.hp=pTank.hp-15;
      }
      if(bulletsAi[i].type=="two"){
        pTank.hp=pTank.hp-40;
      }
      if(bulletsAi[i].type=="three"){
        pTank.hp=pTank.hp-60;
      }
      bulletsAi.splice(i,1);
    }
  }

  // machinegun
  // detection if ai hits player
  for(var i = 0; i < mgBulletsAi.length; i++) {
    if(Math.abs(mgBulletsAi[i].x-pTank.x)<15 && Math.abs(mgBulletsAi[i].y-pTank.y)<15){
      mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
      mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
      mgBulletsAi[i].rico++;
      if(mgBulletsAi[i].active){
        pTank.hp=pTank.hp-2;
        mgBulletsAi[i].active=false;
      }
    }
  }

  // gun
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

  // mg
  // detection if ai hits dead tank
  for(var j = 0; j < kills.length; j++) {
   for(var i = 0; i < mgBulletsAi.length; i++) {
    if(Math.abs(mgBulletsAi[i].x-kills[j].x)<15 && Math.abs(mgBulletsAi[i].y-kills[j].y)<15){
      mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
      mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
      mgBulletsAi[i].rico++;
      if(mgBulletsAi[i].active){
        kills[j].hp=kills[j].hp-5;
        mgBulletsAi[i].active=false;
      }
    }
   }
  }

  //////////////////////////// hitting obstacles

  // gun
  for(var j = 0; j < obstacles.length; j++) {
   for(var i = 0; i < bulletsAi.length; i++) {
     if(
       bulletsAi[i].x>obstacles[j].x &&
       bulletsAi[i].x<obstacles[j].x+obstacles[j].width &&
       bulletsAi[i].y>obstacles[j].y &&
       bulletsAi[i].y<obstacles[j].y+obstacles[j].height
     ){
       explosionsH.push(new ExplosionH(bulletsAi[i].x, bulletsAi[i].y));
       bulletsAi.splice(i,1);
     }
   }
  }

  // mg
  for(var j = 0; j < obstacles.length; j++) {
   for(var i = 0; i < mgBulletsAi.length; i++) {
     if(
       mgBulletsAi[i].x>obstacles[j].x &&
       mgBulletsAi[i].x<obstacles[j].x+obstacles[j].width &&
       mgBulletsAi[i].y>obstacles[j].y &&
       mgBulletsAi[i].y<obstacles[j].y+obstacles[j].height
     ){
       mgBulletsAi[i].angle+=(180 - (Math.round(Math.random() * (60)) - 30) * Math.PI / 180);
       mgBulletsAi[i].liveTime=(Math.round(Math.random() * (5))+5);
       mgBulletsAi[i].rico++;
       if(mgBulletsAi[i].active){
         mgBulletsAi[i].active=false;
       }
     }
   }
  }




  ///////////////////////////////////// kills detection

  // player kill detection
  if(pTank.hp<=0&&pTank.alive){
     if(terrain==0){
       kills.push(new DeadBody(pTank.x, pTank.y, pTank.angleB, pTank.angleB, rusaw, rusbw, pTank.towerLoose, pTank.id));
     }else if(terrain==1){
       kills.push(new DeadBody(pTank.x, pTank.y, pTank.angleB, pTank.angleB, srusaw, srusbw, pTank.towerLoose, pTank.id));
     }
     pTank.flame.pause();
     pTank.move.pause();
     pTank.moveT.pause();
     pTank.alive=false;
     points-=100;
     // pTank = new PTank(100,300,rusa,rusb);
   }

  // ai kill detection
  for(var t = 0; t < aiTanks.length; t++) {

  if(aiTanks[t].hp<=0){

     if(aiTanks[t].type=='one'){
       if(terrain==0){
         kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT,
         geraw, gerbw, aiTanks[t].towerLoose, aiTanks[t].id));
       }else if(terrain==1){
         kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT,
         sgeraw, sgerbw, aiTanks[t].towerLoose, aiTanks[t].id));
       }
       points+=30;
     }
     if(aiTanks[t].type=='two'){
       if(terrain==0){
         kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT,
         geraw2, gerbw2, aiTanks[t].towerLoose, aiTanks[t].id));
       }else if(terrain==1){
         kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT,
         sgeraw2, sgerbw2, aiTanks[t].towerLoose, aiTanks[t].id));
       }
       points+=50;
     }
     if(aiTanks[t].type=='three'){
       if(terrain==0){
         kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT,
         geraw3, gerbw3, aiTanks[t].towerLoose, aiTanks[t].id));
       }else if(terrain==1){
         kills.push(new DeadBody(aiTanks[t].x, aiTanks[t].y, aiTanks[t].angleB, aiTanks[t].angleT,
         sgeraw3, sgerbw3, aiTanks[t].towerLoose, aiTanks[t].id));
       }
       points+=150;
     }
     aiTanks.splice(t,1);
   }

  }

}
