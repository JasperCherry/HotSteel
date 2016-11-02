function gameDrawing() {


  ///////////////////////////////////// drawing objects

  // drawing the map
  var ctx = myGameArea.context;
  ctx.drawImage(gameMap, 0, 0);

  if(level==3){
    gameMap=manual;

    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "white";

    ctx.fillText("Press esc to return",400,30);

    ctx.fillText("Use arrows to move and turn your tank",70,100);

    ctx.fillText("A and D to turn your turent",100,140);

    ctx.fillText("Hit SPACE to fire cannon",650,100);

    ctx.fillText("Press 1 and 2 to switch ammo type",550,140);

    ctx.fillText("W - body machinegun / flamethrower",70,380);
    ctx.fillText("S - turent machinegun",70,420);
    ctx.fillText("E - smoke cover",70,460);
    ctx.fillText("F - mines",70,500);
    ctx.fillText("R - artillery call",70,540);

    ctx.fillText("SABOT can penetrate multiple tanks",540,380);
    ctx.fillText("Smoke cover suspends enemy fire",570,420);
    ctx.fillText("but also your aiming sights",620,460);
    ctx.fillText("Flamethrower can set up enemies on fire",480,500);
    ctx.fillText("but is replacing body machinegun",570,540);
  }




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

  // pieces
  for(var i = 0; i < pieces.length; i++) {
    pieces[i].update();
    if(pieces[i].time==0){
      pieces.splice(i,1);
    }
  }

  // drawing killed tanks
  for(var i = 0; i < kills.length; i++) {
    kills[i].update();
    // destroying dead tanks outside map
    if(!(kills[i].x>0&&kills[i].x<fieldMapX&&kills[i].y>0&&kills[i].y<fieldMapY)){
      kills[i].hp--;
    }
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
    ctx.font = "13px Arial";
    ctx.fillText(aiTanks[t].name ,aiTanks[t].x-10,aiTanks[t].y-35);
    ctx.fillText(aiTanks[t].hp,aiTanks[t].x-10,aiTanks[t].y-20);
  }

  ///////////////////////////////// drawing player tank
  // new positions
  pTank.newPos();
  // drawing
  pTank.update();

  // bullet control and some other map objects
  // has to be here becouse tanks updates are creating bullets
  bulletsControl();

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
    }else if(mgBulletsAi[i].rico>=4){
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
    }else if(mgBulletsP[i].rico>=4){
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
      for(var q=0; q<60; q++){
        pieces.push(new Piece(kills[i].x, kills[i].y));
      }
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

  // artillery explosions
  for(var i = 0; i < explosionsA.length; i++) {
    explosionsA[i].update();
    if(explosionsA[i].exLoop==90){
      explosionsA.splice(i,1);
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


  ctx.drawImage(stat, 0, 600);
  ctx.fillStyle ="black";
  ctx.fillRect( 0, 600, 1000, 2);

  ctx.font = "bold 20px Courier New";
  ctx.fillStyle = "white";

  ctx.fillText("Armor",10,620);
  ctx.fillText(pTank.hp,10,645);


  //////////////// cannon
  if(!bonus){
  ctx.fillText("Cannon",100,620);
  }else{
  ctx.fillText("Blaster",100,620);
  }
  // loading
  if(!bonus){
  if(pTank.reloadTime==0){
    ctx.fillStyle = "red";
    ctx.fillText("ready",100,645);
  }else{
    if(pTank.numBullet>0||pTank.numBullet2>0){
      ctx.fillStyle = "white";
      ctx.fillText("loading",100,645);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("no ammo",100,645);
    }
  }
  }
  // ammo info
  if(!bonus){
  if(pTank.ammoType==1){
    ctx.fillStyle = "red";
    ctx.fillText("HEAT",230,620);
    ctx.fillStyle = "white";
    ctx.fillText("SABOT",310,620);
  }else if(pTank.ammoType==2){
    ctx.fillStyle = "white";
    ctx.fillText("HEAT",230,620);
    ctx.fillStyle = "red";
    ctx.fillText("SABOT",310,620);
  }
  ctx.fillStyle = "white";
  ctx.fillText(pTank.numBullet,230,645);
  ctx.fillText(pTank.numBullet2,310,645);
  }

  ctx.fillStyle = "white";
  ctx.fillText("MG ammo",400,620);
  ctx.fillText(pTank.numMgBullets,400,645);

  ctx.fillText("Mines",510,620);
  ctx.fillText(pTank.numMines,510,645);

  ctx.fillText("Smoke",590,620);
  ctx.fillText(pTank.numSmoke,590,645);

  if(flamethrowerG){
  ctx.fillText("Fuel",670,620);
  ctx.fillText(pTank.numFlames,670,645);
  }

  if(artCalls>0){
  ctx.fillText("Calls",740,620);
  ctx.fillText(pTank.numArt,740,645);
  }

  ctx.fillText("Kills",840,620);
  ctx.fillText(gameKills,840,645);

  ctx.fillText("Cash",920,620);
  ctx.fillText(points,920,645);



}
