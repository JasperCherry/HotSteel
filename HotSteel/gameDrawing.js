function gameDrawing() {


  ///////////////////////////////////// drawing objects

  // drawing the map
  var ctx = myGameArea.context;
  ctx.drawImage(map2, 0, 0);

  // tracks
  for(var i = 0; i < tracks.length; i++) {
    if(tracks[i].timer<0){
      tracks.splice(i,1);
    }else{
      tracks[i].update();
    }
  }

  // mines
  for(var i = 0; i < mines.length; i++) {
    mines[i].update();
  }

  // drawing obstacles
  for(var i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
  }

  // mines explosions
  for(var i = 0; i < explosionsM.length; i++) {
    explosionsM[i].update();
    if(explosionsM[i].exLoop==11){
      explosionsM.splice(i,1);
    }
  }

  // drawing killed tanks
  for(var i = 0; i < kills.length; i++) {
    kills[i].update();
  }


  /////////////////////////////////////////////////////////////////////////

  ///////////////////////////////// drawing ai tanks
  // new positions
  for(var t = 0; t < aiTanks.length; t++) {
    aiTanks[t].newPos();
  }

  // drawing ai tank and hp info
  for(var t = 0; t < aiTanks.length; t++) {
    aiTanks[t].update();
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(aiTanks[t].name ,aiTanks[t].x-10,aiTanks[t].y-35);
    ctx.fillText(aiTanks[t].hp,aiTanks[t].x-10,aiTanks[t].y-20);
  }

  ///////////////////////////////// drawing player tank
  // new positions
  pTank.newPos();
  // drawing
  pTank.update();

  //////////////////////////////////////////////////////////////// drawing bullets

  //////////////////////////// ai

  for(var i = 0; i < bulletsAi.length; i++) {
    bulletsAi[i].newPos();
    bulletsAi[i].update();
    if(bulletsAi[i].liveTime==0){
      bulletsAi.splice(i,1);
    }
  }

  for(var i = 0; i < mgBulletsAi.length; i++) {
    mgBulletsAi[i].newPos();
    mgBulletsAi[i].update();
    if(mgBulletsAi[i].liveTime==0){
      mgBulletsAi.splice(i,1);
    }else if(mgBulletsAi[i].rico==4){
      mgBulletsAi.splice(i,1);
    }
  }

  ///////////////////////// player

  for(var i = 0; i < flames.length; i++) {
    flames[i].newPos();
    flames[i].update();
    if(flames[i].liveTime==0){
      flames.splice(i,1);
    }
  }

  for(var i = 0; i < bulletsP.length; i++) {
    bulletsP[i].newPos();
    bulletsP[i].update();
    if(bulletsP[i].liveTime==0){
      bulletsP.splice(i,1);
    }
  }

  for(var i = 0; i < mgBulletsP.length; i++) {
    mgBulletsP[i].newPos();
    mgBulletsP[i].update();
    if(mgBulletsP[i].liveTime==0){
      mgBulletsP.splice(i,1);
    }else if(mgBulletsP[i].rico==4){
      mgBulletsP.splice(i,1);
    }
  }


  ////////////////////////////////////// drawing smoke and fire effects

  // fire at dead tanks
  for(var i = 0; i < killsFire.length; i++) {
    killsFire[i].update();
  }
  // dead tank kill detection and switching off fire if dead tank is destroyed
  for(var i = 0; i < kills.length; i++) {
    // deleting dead tank
    if(kills[i].hp<=0){
      // deleting fire object
      for(var j = 0; j < killsFire.length; j++){
        if(kills[i].x==killsFire[j].x&&kills[i].y==killsFire[j].y){
          killsFire.splice(j,1);
        }
      }
      explosionsDead.push(new ExplosionDead(kills[i].x, kills[i].y));
      kills.splice(i,1);
    }
  }


  // hit explosions
  for(var i = 0; i < explosionsH.length; i++) {
    explosionsH[i].update();
    if(explosionsH[i].exLoop==11){
      explosionsH.splice(i,1);
    }
  }

  // dead tank explosions
  for(var i = 0; i < explosionsDead.length; i++) {
    explosionsDead[i].update();
    if(explosionsDead[i].exLoop==11){
      explosionsDead.splice(i,1);
    }
  }

  // smoke covers
  for(var i = 0; i < smoke.length; i++) {
    smoke[i].update();
    if(smoke[i].totalTime==0){
      smoke.splice(i,1);
    }
  }

  // drawing informations about current game

  ctx.fillStyle ="black";
  ctx.fillRect( 0, 600, 1000, 50);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";

  ctx.fillText("Player HP",10,620);
  ctx.fillText(pTank.hp,10,645);


  //////////////// cannon
  ctx.fillText("Cannon",130,620);
  // loading
  if(pTank.reloadTime==0){
    ctx.fillStyle = "red";
    ctx.fillText("ready",130,645);
  }else{
    if(pTank.numBullet>0||pTank.numBullet2>0){
      ctx.fillStyle = "white";
      ctx.fillText("loading",130,645);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("no ammo",130,645);
    }
  }
  // ammo info
  if(pTank.ammoType==1){
    ctx.fillStyle = "red";
    ctx.fillText("HEAT",240,620);
    ctx.fillStyle = "white";
    ctx.fillText("SABOT",320,620);
  }else if(pTank.ammoType==2){
    ctx.fillStyle = "white";
    ctx.fillText("HEAT",240,620);
    ctx.fillStyle = "red";
    ctx.fillText("SABOT",320,620);
  }
  ctx.fillStyle = "white";
  ctx.fillText(pTank.numBullet,240,645);
  ctx.fillText(pTank.numBullet2,320,645);


  ctx.fillStyle = "white";
  ctx.fillText("MG ammo",430,620);
  ctx.fillText(pTank.numMgBullets,430,645);

  ctx.fillText("Mines",570,620);
  ctx.fillText(pTank.numMines,570,645);

  ctx.fillText("Smoke",640,620);
  ctx.fillText(pTank.numSmoke,640,645);

  ctx.fillText("Flamethrower",720,620);
  ctx.fillText(pTank.numFlames,720,645);


  ctx.fillText("Points",900,620);
  ctx.fillText(points,900,645);



}
