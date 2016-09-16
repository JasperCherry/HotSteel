function menus(){


  // time between pressing keys
    if(cTimer>0){
      cTimer--;
    }


  if(level==0){ // level 0 // first screen
    ctx = myGameArea.context;
    ctx.drawImage(wall, 0, 0);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Press enter to start",170,120);
    if (myGameArea.keys && myGameArea.keys[13]){
      cTimer=20;
      level=1;
    }
  } // end of level 0 // first screen



  if(level==1){ // level 1 // menu

    // playing sound of the tanks in the menu
    if(sound){
      menuTanks.play();
    }else{
      menuTanks.load();
    }

    ctx = myGameArea.context;
    ctx.drawImage(menu, 0, 0);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Cash : "+totalPoints,750,50);

    ctx.font = "30px Arial";

    if(cButton==0){
      ctx.fillStyle = "red";
      ctx.fillText("Campaign",650,150);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Campaign",650,150);
    }

    if(cButton==1){
      ctx.fillStyle = "red";
      ctx.fillText("Survival Mode",650,230);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Survival Mode",650,230);
    }

    if(cButton==2){
      ctx.fillStyle = "red";
      ctx.fillText("Upgrades",650,310);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Upgrades",650,310);
    }

    if(sound){
      if(cButton==3){
        ctx.fillStyle = "red";
        ctx.fillText("Sound on",650,390);
      }else{
        ctx.fillStyle = "white";
        ctx.fillText("Sound on",650,390);
      }
    }else{
      if(cButton==3){
        ctx.fillStyle = "red";
        ctx.fillText("Sound off",650,390);
      }else{
        ctx.fillStyle = "white";
        ctx.fillText("Sound off",650,390);
      }
    }

    if(cButton==4){
      ctx.fillStyle = "red";
      ctx.fillText("Author",650,470);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Author",650,470);
    }

    if(myGameArea.keys && myGameArea.keys[38] && cTimer==0){
      cTimer=10;
      cButton--;
      if(cButton==-1){
        cButton=4;
      }
    }

    if(myGameArea.keys && myGameArea.keys[40] && cTimer==0){
      cTimer=10;
      cButton++;
      if(cButton==5){
        cButton=0;
      }
    }



    // using main menu options
    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==1){
      cTimer=20;
      cButton=0;
      level=100;
      clearLevel();
      menuTanks.load();
    }

    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==2){
      cTimer=20;
      cButton=0;
      level=2;
      clearLevel();
      menuTanks.load();



    }

    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==3){
      cTimer=20;
      sound=!sound;
    }




    //// tanks going around
    if(createMenuTanks){
      aiTanks[0] = new AiTank(200,700);
      aiTanks[0].dumb=true;
      aiTanks[1] = new AiTank(143,900);
      aiTanks[1].dumb=true;

      aiTanks[2] = new AiTank3(900,800);
      aiTanks[2].dumb=true;



      createMenuTanks=false;
    }

    // moving in circle1 around
    for(var t = 0; t < aiTanks.length; t++) {

      if(aiTanks[t].type=="one"){

        if(aiTanks[t].y<2000&&aiTanks[t].y>650){
          aiTanks[t].setDes(300,450);
          aiTanks[t].angleB=aiTanks[t].aiDestinationAngle;
        }

        if(aiTanks[t].y<470){
          aiTanks[t].setDes(220,100);
        }
        if(aiTanks[t].y<120){
          aiTanks[t].setDes(-100,-200);
        }
        if(aiTanks[t].y<-150){
          aiTanks[t] = new AiTank(200,800);
          aiTanks[t].dumb=true;
        }
      }

      if(aiTanks[t].type=="three"){

        if(aiTanks[t].y<2000&&aiTanks[t].y>650){
          aiTanks[t].setDes(450,550);
          aiTanks[t].angleB=aiTanks[t].aiDestinationAngle;
        }

        if(aiTanks[t].y<570){
          aiTanks[t].setDes(350,200);
        }
        if(aiTanks[t].y<220){
          aiTanks[t].setDes(400,-200);
        }
        if(aiTanks[t].y<-150){
          aiTanks[t] = new AiTank3(900,800);
          aiTanks[t].dumb=true;
        }
      }

    }

      //////////////////////////// ai tanks drawing
      // tracks
      for(var i = 0; i < tracks.length; i++) {
        if(tracks[i].timer<0){
          tracks.splice(i,1);
        }else{
          tracks[i].update();
        }
      }
      // new positions
      for(var t = 0; t < aiTanks.length; t++) {
        aiTanks[t].newPos();
      }
      // drawing ai tank
      for(var t = 0; t < aiTanks.length; t++) {
        aiTanks[t].update();
      }



  }// end of level 1 // menu


  if(level==2){ // level 2 // garage
    var ctx = myGameArea.context;
    ctx.drawImage(garage, 0, 0);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press enter to upgrade",350,620);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press esc to return",20,40);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Price:",450,100);
    ctx.fillText(upgradePrice,550,100);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Cash:",650,100);
    ctx.fillText(totalPoints,750,100);


    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Basics:",100,100);


    if(cButton==0){
      ctx.fillStyle = "red";
      if(hpG==80){
        upgradePrice=200;
        ctx.fillText("1/5",350,140);
      }
      if(hpG==120){
        upgradePrice=300;
        ctx.fillText("2/5",350,140);
      }
      if(hpG==180){
        upgradePrice=400;
        ctx.fillText("3/5",350,140);
      }
      if(hpG==240){
        upgradePrice=500;
        ctx.fillText("4/5",350,140);
      }
      if(hpG==300){
        upgradePrice="Max";
        ctx.fillText("5/5",350,140);
      }
    }else{
      ctx.fillStyle = "white";
      if(hpG==80){
        ctx.fillText("1/5",350,140);
      }
      if(hpG==120){
        ctx.fillText("2/5",350,140);
      }
      if(hpG==180){
        ctx.fillText("3/5",350,140);
      }
      if(hpG==240){
        ctx.fillText("4/5",350,140);
      }
      if(hpG==300){
        ctx.fillText("5/5",350,140);
      }
    }
    ctx.fillText("Armor",100,140);


    if(cButton==1){
      ctx.fillStyle = "red";
      if(vMaxG==0.8){
        ctx.fillText("1/5",350,180);
        upgradePrice=200;
      }
      if(vMaxG==1.0){
        ctx.fillText("2/5",350,180);
        upgradePrice=300;
      }
      if(vMaxG==1.2){
        ctx.fillText("3/5",350,180);
        upgradePrice=400;
      }
      if(vMaxG==1.4){
        ctx.fillText("4/5",350,180);
        upgradePrice=500;
      }
      if(vMaxG==1.6){
        ctx.fillText("5/5",350,180);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(vMaxG==0.8){
        ctx.fillText("1/5",350,180);
      }
      if(vMaxG==1.0){
        ctx.fillText("2/5",350,180);
      }
      if(vMaxG==1.2){
        ctx.fillText("3/5",350,180);
      }
      if(vMaxG==1.4){
        ctx.fillText("4/5",350,180);
      }
      if(vMaxG==1.6){
        ctx.fillText("5/5",350,180);
      }
    }
    ctx.fillText("Engine",100,180);


    if(cButton==2){
      ctx.fillStyle = "red";
      if(gunSpeedG==300){
        ctx.fillText("1/5",350,220);
        upgradePrice=200;
      }
      if(gunSpeedG==250){
        ctx.fillText("2/5",350,220);
        upgradePrice=300;
      }
      if(gunSpeedG==200){
        ctx.fillText("3/5",350,220);
        upgradePrice=400;
      }
      if(gunSpeedG==150){
        ctx.fillText("4/5",350,220);
        upgradePrice=500;
      }
      if(gunSpeedG==100){
        ctx.fillText("5/5",350,220);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(gunSpeedG==300){
        ctx.fillText("1/5",350,220);
      }
      if(gunSpeedG==250){
        ctx.fillText("2/5",350,220);
      }
      if(gunSpeedG==200){
        ctx.fillText("3/5",350,220);
      }
      if(gunSpeedG==150){
        ctx.fillText("4/5",350,220);
      }
      if(gunSpeedG==100){
        ctx.fillText("5/5",350,220);
      }
    }
    ctx.fillText("Cannon reload time",100,220);


    if(cButton==3){
      ctx.fillStyle = "red";
      if(mgSpeedG==10){
        ctx.fillText("1/5",350,260);
        upgradePrice=200;
      }
      if(mgSpeedG==8){
        ctx.fillText("2/5",350,260);
        upgradePrice=300;
      }
      if(mgSpeedG==6){
        ctx.fillText("3/5",350,260);
        upgradePrice=400;
      }
      if(mgSpeedG==5){
        ctx.fillText("4/5",350,260);
        upgradePrice=500;
      }
      if(mgSpeedG==4){
        ctx.fillText("5/5",350,260);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(mgSpeedG==10){
        ctx.fillText("1/5",350,260);
      }
      if(mgSpeedG==8){
        ctx.fillText("2/5",350,260);
      }
      if(mgSpeedG==6){
        ctx.fillText("3/5",350,260);
      }
      if(mgSpeedG==5){
        ctx.fillText("4/5",350,260);
      }
      if(mgSpeedG==4){
        ctx.fillText("5/5",350,260);
      }
    }
    ctx.fillText("Machinegun reload time",100,260);


    ctx.fillStyle = "white";
    ctx.fillText("Ammunition:",100,320);


    if(cButton==4){
      ctx.fillStyle = "red";
      if(numBulletG==12){
        ctx.fillText("1/5",350,360);
        upgradePrice=200;
      }
      if(numBulletG==24){
        ctx.fillText("2/5",350,360);
        upgradePrice=300;
      }
      if(numBulletG==36){
        ctx.fillText("3/5",350,360);
        upgradePrice=400;
      }
      if(numBulletG==48){
        ctx.fillText("4/5",350,360);
        upgradePrice=500;
      }
      if(numBulletG==60){
        ctx.fillText("1/5",350,360);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numBulletG==12){
        ctx.fillText("1/5",350,360);
      }
      if(numBulletG==24){
        ctx.fillText("2/5",350,360);
      }
      if(numBulletG==36){
        ctx.fillText("3/5",350,360);
      }
      if(numBulletG==48){
        ctx.fillText("4/5",350,360);
      }
      if(numBulletG==60){
        ctx.fillText("1/5",350,360);
      }
    }
    ctx.fillText("HEAT",100,360);


    if(cButton==5){
      ctx.fillStyle = "red";
      if(numBullet2G==0){
        ctx.fillText("0/5",350,400);
        upgradePrice=100;
      }
      if(numBullet2G==8){
        ctx.fillText("1/5",350,400);
        upgradePrice=200;
      }
      if(numBullet2G==16){
        ctx.fillText("2/5",350,400);
        upgradePrice=300;
      }
      if(numBullet2G==24){
        ctx.fillText("3/5",350,400);
        upgradePrice=400;
      }
      if(numBullet2G==32){
        ctx.fillText("4/5",350,400);
        upgradePrice=500;
      }
      if(numBullet2G==40){
        ctx.fillText("5/5",350,400);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numBullet2G==0){
        ctx.fillText("0/5",350,400);
      }
      if(numBullet2G==8){
        ctx.fillText("1/5",350,400);
      }
      if(numBullet2G==16){
        ctx.fillText("2/5",350,400);
      }
      if(numBullet2G==24){
        ctx.fillText("3/5",350,400);
      }
      if(numBullet2G==32){
        ctx.fillText("4/5",350,400);
      }
      if(numBullet2G==40){
        ctx.fillText("5/5",350,400);
      }
    }
    ctx.fillText("SABOT",100,400);


    if(cButton==6){
      ctx.fillStyle = "red";
      if(numMgBulletsG==150){
        ctx.fillText("1/5",350,440);
        upgradePrice=200;
      }
      if(numMgBulletsG==300){
        ctx.fillText("2/5",350,440);
        upgradePrice=300;
      }
      if(numMgBulletsG==450){
        ctx.fillText("3/5",350,440);
        upgradePrice=400;
      }
      if(numMgBulletsG==600){
        ctx.fillText("4/5",350,440);
        upgradePrice=500;
      }
      if(numMgBulletsG==750){
        ctx.fillText("5/5",350,440);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numMgBulletsG==150){
        ctx.fillText("1/5",350,440);
      }
      if(numMgBulletsG==300){
        ctx.fillText("2/5",350,440);
      }
      if(numMgBulletsG==450){
        ctx.fillText("3/5",350,440);
      }
      if(numMgBulletsG==600){
        ctx.fillText("4/5",350,440);
      }
      if(numMgBulletsG==750){
        ctx.fillText("5/5",350,440);
      }
    }
    ctx.fillText("Machinegun",100,440);


    if(cButton==7){
      ctx.fillStyle = "red";
      if(numMinesG==0){
        ctx.fillText("0/5",350,480);
        upgradePrice=100;
      }
      if(numMinesG==6){
        ctx.fillText("1/5",350,480);
        upgradePrice=200;
      }
      if(numMinesG==12){
        ctx.fillText("2/5",350,480);
        upgradePrice=300;
      }
      if(numMinesG==18){
        ctx.fillText("3/5",350,480);
        upgradePrice=400;
      }
      if(numMinesG==24){
        ctx.fillText("4/5",350,480);
        upgradePrice=500;
      }
      if(numMinesG==30){
        ctx.fillText("5/5",350,480);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numMinesG==0){
        ctx.fillText("0/5",350,480);
      }
      if(numMinesG==6){
        ctx.fillText("1/5",350,480);
      }
      if(numMinesG==12){
        ctx.fillText("2/5",350,480);
      }
      if(numMinesG==18){
        ctx.fillText("3/5",350,480);
      }
      if(numMinesG==24){
        ctx.fillText("4/5",350,480);
      }
      if(numMinesG==30){
        ctx.fillText("5/5",350,480);
      }
    }
    ctx.fillText("Mines",100,480);


    if(cButton==8){
      ctx.fillStyle = "red";
      if(numSmokeG==0){
        ctx.fillText("0/5",350,520);
        upgradePrice=100;
      }
      if(numSmokeG==1){
        ctx.fillText("1/5",350,520);
        upgradePrice=200;
      }
      if(numSmokeG==2){
        ctx.fillText("2/5",350,520);
        upgradePrice=300;
      }
      if(numSmokeG==3){
        ctx.fillText("3/5",350,520);
        upgradePrice=400;
      }
      if(numSmokeG==4){
        ctx.fillText("4/5",350,520);
        upgradePrice=500;
      }
      if(numSmokeG==5){
        ctx.fillText("5/5",350,520);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numSmokeG==0){
        ctx.fillText("0/5",350,520);
      }
      if(numSmokeG==1){
        ctx.fillText("1/5",350,520);
      }
      if(numSmokeG==2){
        ctx.fillText("2/5",350,520);
      }
      if(numSmokeG==3){
        ctx.fillText("3/5",350,520);
      }
      if(numSmokeG==4){
        ctx.fillText("4/5",350,520);
      }
      if(numSmokeG==5){
        ctx.fillText("5/5",350,520);
      }
    }
    ctx.fillText("Smoke",100,520);


    if(cButton==9){
      ctx.fillStyle = "red";
      if(numFlamesG==0){
        ctx.fillText("0/5",350,560);
        upgradePrice=100;
      }
      if(numFlamesG==200){
        ctx.fillText("1/5",350,560);
        upgradePrice=200;
      }
      if(numFlamesG==400){
        ctx.fillText("2/5",350,560);
        upgradePrice=300;
      }
      if(numFlamesG==600){
        ctx.fillText("3/5",350,560);
        upgradePrice=400;
      }
      if(numFlamesG==800){
        ctx.fillText("4/5",350,560);
        upgradePrice=500;
      }
      if(numFlamesG==1000){
        ctx.fillText("5/5",350,560);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numFlamesG==0){
        ctx.fillText("0/5",350,560);
      }
      if(numFlamesG==200){
        ctx.fillText("1/5",350,560);
      }
      if(numFlamesG==400){
        ctx.fillText("2/5",350,560);
      }
      if(numFlamesG==600){
        ctx.fillText("3/5",350,560);
      }
      if(numFlamesG==800){
        ctx.fillText("4/5",350,560);
      }
      if(numFlamesG==1000){
        ctx.fillText("5/5",350,560);
      }
    }
    ctx.fillText("Flamethrower fuel",100,560);


    ctx.fillStyle = "white";
    ctx.fillText("Extras:",820,460);

    if(cButton==10){
      ctx.fillStyle = "red";
      if(sightsG==1){
        ctx.fillText("1/3",920,500);
        upgradePrice=500;
      }
      if(sightsG==2){
        ctx.fillText("2/3",920,500);
        upgradePrice=500;
      }
      if(sightsG==3){
        ctx.fillText("3/3",920,500);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(sightsG==1){
        ctx.fillText("1/3",920,500);
      }
      if(sightsG==2){
        ctx.fillText("2/3",920,500);
      }
      if(sightsG==3){
        ctx.fillText("3/3",920,500);
      }
    }
    ctx.fillText("Sights",770,500);


    if(cButton==11){
      ctx.fillStyle = "red";
      if(!secondMgG){
        ctx.fillText("Mount",920,540);
        upgradePrice=2000;
      }else{
        ctx.fillText("Mounted",920,540);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(!secondMgG){
        ctx.fillText("Mount",920,540);
      }else{
        ctx.fillText("Mounted",920,540);
      }
    }
    ctx.fillText("Tower MG",770,540);


    if(cButton==12){
      ctx.fillStyle = "red";
      if(!flamethrowerG){
        ctx.fillText("Mount",920,580);
        upgradePrice=2000;
      }else{
        ctx.fillText("Mounted",920,580);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(!flamethrowerG){
        ctx.fillText("Mount",920,580);
      }else{
        ctx.fillText("Mounted",920,580);
      }
    }
    ctx.fillText("Flamethrower",770,580);



  // control
    if(myGameArea.keys && myGameArea.keys[38] && cTimer==0){
      cTimer=10;
      cButton--;
      if(cButton==-1){
        cButton=12;
      }
    }

    if(myGameArea.keys && myGameArea.keys[40] && cTimer==0){
      cTimer=10;
      cButton++;
      if(cButton==13){
        cButton=0;
      }
    }

  // exiting with esc
  if(myGameArea.keys && myGameArea.keys[27] && cTimer==0){
    cButton=0;
    cTimer=20;
    clearLevel();
    level=1;
    createMenuTanks=true;
  }



  // upgrading
  // armor
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==0){
    cTimer=20;
    if(hpG==80&&totalPoints>=200){
      hpG=120;
      totalPoints-=200;
    }else
    if(hpG==120&&totalPoints>=300){
      hpG=180;
      totalPoints-=300;
    }else
    if(hpG==180&&totalPoints>=400){
      hpG=240;
      totalPoints-=400;
    }else
    if(hpG==240&&totalPoints>=500){
      hpG=300;
      totalPoints-=500;
    }
  }
  // engine
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==1){
    cTimer=20;
    if(vMaxG==0.8&&totalPoints>=200){
      vMaxG=1.0;
      totalPoints-=200;
    }else
    if(vMaxG==1.0&&totalPoints>=300){
      vMaxG=1.2;
      totalPoints-=300;
    }else
    if(vMaxG==1.2&&totalPoints>=400){
      vMaxG=1.4;
      totalPoints-=400;
    }else
    if(vMaxG==1.4&&totalPoints>=500){
      vMaxG=1.6;
      totalPoints-=500;
    }
  }
  // cannon reload time
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==2){
    cTimer=20;
    if(gunSpeedG==300&&totalPoints>=200){
      gunSpeedG=250;
      totalPoints-=200;
    }else
    if(gunSpeedG==250&&totalPoints>=300){
      gunSpeedG=200;
      totalPoints-=300;
    }else
    if(gunSpeedG==200&&totalPoints>=400){
      gunSpeedG=150;
      totalPoints-=400;
    }else
    if(gunSpeedG==150&&totalPoints>=500){
      gunSpeedG=100;
      totalPoints-=500;
    }
  }
  // mg reload time
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==3){
    cTimer=20;
    if(mgSpeedG==10&&totalPoints>=200){
      mgSpeedG=8;
      totalPoints-=200;
    }else
    if(mgSpeedG==8&&totalPoints>=300){
      mgSpeedG=6;
      totalPoints-=300;
    }else
    if(mgSpeedG==6&&totalPoints>=400){
      mgSpeedG=5;
      totalPoints-=400;
    }else
    if(mgSpeedG==5&&totalPoints>=500){
      mgSpeedG=4;
      totalPoints-=500;
    }
  }
  // HEAT ammo
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==4){
    cTimer=20;
    if(numBulletG==12&&totalPoints>=200){
      numBulletG=24;
      totalPoints-=200;
    }else
    if(numBulletG==24&&totalPoints>=300){
      numBulletG=36;
      totalPoints-=300;
    }else
    if(numBulletG==36&&totalPoints>=400){
      numBulletG=48;
      totalPoints-=400;
    }else
    if(numBulletG==48&&totalPoints>=500){
      numBulletG=60;
      totalPoints-=500;
    }
  }
  // SABOT ammo
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==5){
    cTimer=20;
    if(numBullet2G==0&&totalPoints>=100){
      numBullet2G=8;
      totalPoints-=100;
    }else
    if(numBullet2G==8&&totalPoints>=200){
      numBullet2G=16;
      totalPoints-=200;
    }else
    if(numBullet2G==16&&totalPoints>=300){
      numBullet2G=24;
      totalPoints-=300;
    }else
    if(numBullet2G==24&&totalPoints>=400){
      numBullet2G=32;
      totalPoints-=400;
    }else
    if(numBullet2G==32&&totalPoints>=500){
      numBullet2G=40;
      totalPoints-=500;
    }
  }
  // Mg ammo
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==6){
    cTimer=20;
    if(numMgBulletsG==150&&totalPoints>=200){
      numMgBulletsG=300;
      totalPoints-=200;
    }else
    if(numMgBulletsG==300&&totalPoints>=300){
      numMgBulletsG=450;
      totalPoints-=300;
    }else
    if(numMgBulletsG==450&&totalPoints>=400){
      numMgBulletsG=600;
      totalPoints-=400;
    }else
    if(numMgBulletsG==600&&totalPoints>=500){
      numMgBulletsG=750;
      totalPoints-=500;
    }
  }
  // mines ammo
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==7){
    cTimer=20;
    if(numMinesG==0&&totalPoints>=100){
      numMinesG=6;
      totalPoints-=100;
    }else
    if(numMinesG==6&&totalPoints>=200){
      numMinesG=12;
      totalPoints-=200;
    }else
    if(numMinesG==12&&totalPoints>=300){
      numMinesG=18;
      totalPoints-=300;
    }else
    if(numMinesG==18&&totalPoints>=400){
      numMinesG=24;
      totalPoints-=400;
    }else
    if(numMinesG==24&&totalPoints>=500){
      numMinesG=30;
      totalPoints-=500;
    }
  }
  // smoke ammo
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==8){
    cTimer=20;
    if(numSmokeG==0&&totalPoints>=100){
      numSmokeG=1;
      totalPoints-=100;
    }else
    if(numSmokeG==1&&totalPoints>=200){
      numSmokeG=2;
      totalPoints-=200;
    }else
    if(numSmokeG==2&&totalPoints>=300){
      numSmokeG=3;
      totalPoints-=300;
    }else
    if(numSmokeG==3&&totalPoints>=400){
      numSmokeG=4;
      totalPoints-=400;
    }else
    if(numSmokeG==4&&totalPoints>=500){
      numSmokeG=5;
      totalPoints-=500;
    }
  }
  // fuel ammo
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==9){
    cTimer=20;
    if(numFlamesG==0&&totalPoints>=100){
      numFlamesG=200;
      totalPoints-=100;
    }else
    if(numFlamesG==200&&totalPoints>=200){
      numFlamesG=400;
      totalPoints-=200;
    }else
    if(numFlamesG==400&&totalPoints>=300){
      numFlamesG=600;
      totalPoints-=300;
    }else
    if(numFlamesG==600&&totalPoints>=400){
      numFlamesG=800;
      totalPoints-=400;
    }else
    if(numFlamesG==800&&totalPoints>=500){
      numFlamesG=1000;
      totalPoints-=500;
    }
  }
  // sights
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==10){
    cTimer=20;
    if(sightsG==1&&totalPoints>=500){
      sightsG=2;
      totalPoints-=500;
    }else
    if(sightsG==2&&totalPoints>=500){
      sightsG=3;
      totalPoints-=500;
    }
  }
  // tower mg
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==11){
    cTimer=20;
    if(secondMgG==false&&totalPoints>=2000){
      secondMgG=true;
      totalPoints-=2000;
    }
  }
  // flamethrower
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==12){
    cTimer=20;
    if(flamethrowerG==false&&totalPoints>=2000){
      flamethrowerG=true;
      totalPoints-=2000;
    }
  }



  }// end of level 2 // garage



  if(level==100){ // level 100 // survival mode


    obstacles[0] = new Obstacle(800,150,1);
    obstacles[1] = new Obstacle(220,110,2);
    obstacles[2] = new Obstacle(230,160,1);
    obstacles[3] = new Obstacle(540,370,2);
    obstacles[4] = new Obstacle(100,300,3);
    obstacles[5] = new Obstacle(210,330,1);
    obstacles[6] = new Obstacle(170,540,3);

  if(aiTanks.length==0){
    aiTanks[0] = new AiTank(600,-300);
    aiTanks[1] = new AiTank(1400,500);
    aiTanks[2] = new AiTank2(2500,400);
    aiTanks[3] = new AiTank2(3600,100);
    aiTanks[4] = new AiTank3(600,-3500);
  }



  if(pTank.alive){
  bulletsControl();
  gameDrawing();
  }else{
    clearLevel();
    level=1;
    createMenuTanks=true;
  }

  if(myGameArea.keys && myGameArea.keys[27] && cTimer==0){
    cTimer=20;
    clearLevel();
    level=1;
    createMenuTanks=true;
  }

  }// end of level 100 // survival mode





}
