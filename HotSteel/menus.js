function menus(){

  // time between pressing keys
    if(cTimer>0){
      cTimer--;
    }

/*
  if(level==0){ // level 0 // first screen
    ctx = myGameArea.context;
    ctx.drawImage(garage, 0, 0);
    ctx.font = "bold 50px Courier New";
    ctx.fillStyle = "black";
    ctx.fillText("Press enter",140,130);
    if (myGameArea.keys && myGameArea.keys[13]){
      cTimer=20;
      level=1;
    }
  } // end of level 0 // first screen
*/


  if(level==1){ // level 1 // menu
    setCookies();
    levelCreator=true;
    endLevel=150;

    // playing sound of the tanks in the menu
    if(sound){
      menuTanks.play();
    }else{
      menuTanks.load();
    }

    ctx = myGameArea.context;
    ctx.drawImage(menu, 0, 0);
    ctx.drawImage(logo, 90, 130, 698*0.7, 112*0.7);

    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "white";
    ctx.fillText("Cash : "+totalPoints,760,100);

    ctx.font = "bold 30px Courier New";

    if(cButton==0){
      ctx.fillStyle = "red";
      ctx.fillText("Play",690,190);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Play",690,190);
    }

    if(cButton==1){
      ctx.fillStyle = "red";
      ctx.fillText("Upgrades",690,270);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Upgrades",690,270);
    }

    if(cButton==2){
      ctx.fillStyle = "red";
      ctx.fillText("Manual",690,350);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Manual",690,350);
    }

    if(sound){
      if(cButton==3){
        ctx.fillStyle = "red";
        ctx.fillText("Sound on",690,430);
      }else{
        ctx.fillStyle = "white";
        ctx.fillText("Sound on",690,430);
      }
    }else{
      if(cButton==3){
        ctx.fillStyle = "red";
        ctx.fillText("Sound off",690,430);
      }else{
        ctx.fillStyle = "white";
        ctx.fillText("Sound off",690,430);
      }
    }

    if(cButton==4){
      ctx.fillStyle = "red";
      ctx.fillText("Author",690,510);
    }else{
      ctx.fillStyle = "white";
      ctx.fillText("Author",690,510);
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
    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==0){
      cTimer=20;
      cButton=0;
      level=100;
      clearLevel();
      menuTanks.load();
    }

    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==1){
      cTimer=20;
      cButton=0;
      level=2;
      clearLevel();
      menuTanks.load();
    }

    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==2){
      cTimer=20;
      cButton=0;
      level=3;
      clearLevel();
      menuTanks.load();
    }

    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==3){
      cTimer=20;
      sound=!sound;
    }

    if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==4){
      cTimer=20;
      cButton=0;
      level=4;
      clearLevel();
      menuTanks.load();
    }

    // preload the sounds
    if(createMenuTanks){
    var s1=new Audio('sounds/art1.mp3');
    s1.load();
    var s2=new Audio('sounds/blast.mp3');
    s2.load();
    var s3=new Audio('sounds/exmd.mp3');
    s3.load();
    var s4=new Audio('sounds/flame.mp3');
    s4.load();
    var s5=new Audio('sounds/gun.mp3');
    s5.load();
    var s6=new Audio('sounds/gunReload.mp3');
    s6.load();
    var s7=new Audio('sounds/menuTanks.mp3');
    s7.load();
    var s8=new Audio('sounds/mg.mp3');
    s8.load();
    var s9=new Audio('sounds/move.mp3');
    s9.load();
    var s10=new Audio('sounds/moveT.mp3');
    s10.load();
    var s11=new Audio('sounds/radio1.mp3');
    s11.load();
    var s12=new Audio('sounds/radio2.mp3');
    s12.load();
    var s13=new Audio('sounds/radio3.mp3');
    s13.load();
    var s14=new Audio('sounds/smoke.mp3');
    s14.load();
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
    ctx.drawImage(garage2, 320, 30, 1060*0.65, 774*0.65);

    ctx.font = "bold 30px Courier New";
    ctx.fillStyle = "white";
    ctx.fillText("Press enter to upgrade",460,620);

    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "white";
    ctx.fillText("Press esc to return",20,40);

    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "white";
    ctx.fillText("Press R to reset achievements",20,630);

    ctx.fillStyle = "white";
    ctx.font = "bold 30px Courier New";
    ctx.fillText("Price:",450,70);
    ctx.fillText(upgradePrice,570,70);

    ctx.fillStyle = "white";
    ctx.font = "bold 30px Courier New";
    ctx.fillText("Cash:",730,70);
    ctx.fillText(totalPoints,830,70);

    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "white";
    ctx.fillText("Basics:",100,100);


    if(cButton==0){
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(750, 230, 35, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
      if(hpG==100){
        upgradePrice=200;
        ctx.fillText("1/5",350,140);
      }
      if(hpG==180){
        upgradePrice=300;
        ctx.fillText("2/5",350,140);
      }
      if(hpG==260){
        upgradePrice=400;
        ctx.fillText("3/5",350,140);
      }
      if(hpG==340){
        upgradePrice=500;
        ctx.fillText("4/5",350,140);
      }
      if(hpG==420){
        upgradePrice="Max";
        ctx.fillText("5/5",350,140);
      }
    }else{
      ctx.fillStyle = "white";
      if(hpG==100){
        ctx.fillText("1/5",350,140);
      }
      if(hpG==180){
        ctx.fillText("2/5",350,140);
      }
      if(hpG==260){
        ctx.fillText("3/5",350,140);
      }
      if(hpG==340){
        ctx.fillText("4/5",350,140);
      }
      if(hpG==420){
        ctx.fillText("5/5",350,140);
      }
    }
    ctx.fillText("Armor",100,140);


    if(cButton==1){
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(790, 150, 35, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
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
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(630, 240, 35, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
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
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(635, 320, 35, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
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
    ctx.fillText("MG reload time",100,260);


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
        ctx.fillText("5/5",350,360);
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
        ctx.fillText("5/5",350,360);
      }
    }
    ctx.fillText("HEAT",100,360);


    if(cButton==5){
      ctx.fillStyle = "red";
      if(numBullet2G==0){
        ctx.fillText("0/5",350,400);
        upgradePrice=100;
      }
      if(numBullet2G==10){
        ctx.fillText("1/5",350,400);
        upgradePrice=200;
      }
      if(numBullet2G==20){
        ctx.fillText("2/5",350,400);
        upgradePrice=300;
      }
      if(numBullet2G==30){
        ctx.fillText("3/5",350,400);
        upgradePrice=400;
      }
      if(numBullet2G==40){
        ctx.fillText("4/5",350,400);
        upgradePrice=500;
      }
      if(numBullet2G==50){
        ctx.fillText("5/5",350,400);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numBullet2G==0){
        ctx.fillText("0/5",350,400);
      }
      if(numBullet2G==10){
        ctx.fillText("1/5",350,400);
      }
      if(numBullet2G==20){
        ctx.fillText("2/5",350,400);
      }
      if(numBullet2G==30){
        ctx.fillText("3/5",350,400);
      }
      if(numBullet2G==40){
        ctx.fillText("4/5",350,400);
      }
      if(numBullet2G==50){
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
      if(numSmokeG==2){
        ctx.fillText("1/5",350,520);
        upgradePrice=200;
      }
      if(numSmokeG==4){
        ctx.fillText("2/5",350,520);
        upgradePrice=300;
      }
      if(numSmokeG==6){
        ctx.fillText("3/5",350,520);
        upgradePrice=400;
      }
      if(numSmokeG==8){
        ctx.fillText("4/5",350,520);
        upgradePrice=500;
      }
      if(numSmokeG==10){
        ctx.fillText("5/5",350,520);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(numSmokeG==0){
        ctx.fillText("0/5",350,520);
      }
      if(numSmokeG==2){
        ctx.fillText("1/5",350,520);
      }
      if(numSmokeG==4){
        ctx.fillText("2/5",350,520);
      }
      if(numSmokeG==6){
        ctx.fillText("3/5",350,520);
      }
      if(numSmokeG==8){
        ctx.fillText("4/5",350,520);
      }
      if(numSmokeG==10){
        ctx.fillText("5/5",350,520);
      }
    }
    ctx.fillText("Smoke",100,520);

    if(flamethrowerG){
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
    }

    ctx.fillStyle = "white";
    ctx.fillText("Extras:",540,440);

    if(!extUnlock){
      if(cButton==10){
        ctx.fillStyle = "red";
        upgradePrice=1000;
      }else{
        ctx.fillStyle = "white";
      }
      ctx.fillText("UNLOCK",543,520);

    }else{

    if(cButton==10){
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(640, 170, 15, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(694, 187, 15, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
      if(sightsG==1){
        ctx.fillText("1/3",640,480);
        upgradePrice=500;
      }
      if(sightsG==2){
        ctx.fillText("2/3",640,480);
        upgradePrice=500;
      }
      if(sightsG==3){
        ctx.fillText("3/3",640,480);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(sightsG==1){
        ctx.fillText("1/3",640,480);
      }
      if(sightsG==2){
        ctx.fillText("2/3",640,480);
      }
      if(sightsG==3){
        ctx.fillText("3/3",640,480);
      }
    }
    ctx.fillText("Sights",470,480);


    if(cButton==11){
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(645, 238, 15, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
      if(!secondMgG){
        ctx.fillText("Mount",640,520);
        upgradePrice=1000;
      }else{
        ctx.fillText("Mounted",640,520);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(!secondMgG){
        ctx.fillText("Mount",640,520);
      }else{
        ctx.fillText("Mounted",640,520);
      }
    }
    ctx.fillText("Tower MG",470,520);


    if(cButton==12){
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.arc(635, 320, 35, 0, (2*Math.PI));
      ctx.stroke();
      ctx.closePath();
      if(!flamethrowerG){
        ctx.fillText("Mount",640,560);
        upgradePrice=1000;
      }else{
        ctx.fillText("Mounted",640,560);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(!flamethrowerG){
        ctx.fillText("Mount",640,560);
      }else{
        ctx.fillText("Mounted",640,560);
      }
    }
    ctx.fillText("Flamethrower",470,560);

    }// end of extras unlock

    ctx.fillStyle = "white";
    ctx.fillText("Artillery:",790,440);

    if(!artUnlock){
      if(cButton==13){
        ctx.fillStyle = "red";
        upgradePrice=1500;
      }else{
        ctx.fillStyle = "white";
      }
      ctx.fillText("UNLOCK",810,520);

    }else{

    if(cButton==13){
      ctx.fillStyle = "red";
      if(artCalls==0){
        ctx.fillText("0/5",910,480);
        upgradePrice=100;
      }
      if(artCalls==1){
        ctx.fillText("1/5",910,480);
        upgradePrice=200;
      }
      if(artCalls==2){
        ctx.fillText("2/5",910,480);
        upgradePrice=300;
      }
      if(artCalls==3){
        ctx.fillText("3/5",910,480);
        upgradePrice=400;
      }
      if(artCalls==4){
        ctx.fillText("4/5",910,480);
        upgradePrice=500;
      }
      if(artCalls==5){
        ctx.fillText("5/5",910,480);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(artCalls==0){
        ctx.fillText("0/5",910,480);
      }
      if(artCalls==1){
        ctx.fillText("1/5",910,480);
      }
      if(artCalls==2){
        ctx.fillText("2/5",910,480);
      }
      if(artCalls==3){
        ctx.fillText("3/5",910,480);
      }
      if(artCalls==4){
        ctx.fillText("4/5",910,480);
      }
      if(artCalls==5){
        ctx.fillText("5/5",910,480);
      }
    }
    ctx.fillText("Calls",740,480);

    if(cButton==14){
      ctx.fillStyle = "red";
      if(artShots==3){
        ctx.fillText("1/5",910,520);
        upgradePrice=200;
      }
      if(artShots==5){
        ctx.fillText("2/5",910,520);
        upgradePrice=300;
      }
      if(artShots==7){
        ctx.fillText("3/5",910,520);
        upgradePrice=400;
      }
      if(artShots==10){
        ctx.fillText("4/5",910,520);
        upgradePrice=500;
      }
      if(artShots==12){
        ctx.fillText("5/5",910,520);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(artShots==3){
        ctx.fillText("1/5",910,520);
      }
      if(artShots==5){
        ctx.fillText("2/5",910,520);
      }
      if(artShots==7){
        ctx.fillText("3/5",910,520);
      }
      if(artShots==10){
        ctx.fillText("4/5",910,520);
      }
      if(artShots==12){
        ctx.fillText("5/5",910,520);
      }
    }
    ctx.fillText("Rounds",740,520);


    if(cButton==15){
      ctx.fillStyle = "red";
      if(artEffect==3.6){
        ctx.fillText("1/5",910,560);
        upgradePrice=200;
      }
      if(artEffect==3.2){
        ctx.fillText("2/5",910,560);
        upgradePrice=300;
      }
      if(artEffect==2.8){
        ctx.fillText("3/5",910,560);
        upgradePrice=400;
      }
      if(artEffect==2.4){
        ctx.fillText("4/5",910,560);
        upgradePrice=500;
      }
      if(artEffect==2){
        ctx.fillText("5/5",910,560);
        upgradePrice="Max";
      }
    }else{
      ctx.fillStyle = "white";
      if(artEffect==3.6){
        ctx.fillText("1/5",910,560);
      }
      if(artEffect==3.2){
        ctx.fillText("2/5",910,560);
      }
      if(artEffect==2.8){
        ctx.fillText("3/5",910,560);
      }
      if(artEffect==2.4){
        ctx.fillText("4/5",910,560);
      }
      if(artEffect==2){
        ctx.fillText("5/5",910,560);
      }
    }
    ctx.fillText("Accuracy",740,560);

    }// end of artillery unlock

  // reset
  if(myGameArea.keys && myGameArea.keys[82] && cTimer==0){
    resetCookies();
  }

  // control
    if(myGameArea.keys && myGameArea.keys[38] && cTimer==0){
      cTimer=10;
      cButton--;
      if(!flamethrowerG&&cButton==9){
        cButton=8;
      }
      if(!artUnlock&&cButton==-1){
        cButton=13;
      }
      if(!extUnlock&&cButton==12){
        cButton=10;
      }
      if(cButton==-1){
        cButton=15;
      }
    }

    if(myGameArea.keys && myGameArea.keys[40] && cTimer==0){
      cTimer=10;
      cButton++;
      if(!flamethrowerG&&cButton==9){
        cButton=10;
      }
      if(!extUnlock&&cButton==11){
        cButton=13;
      }
      if(!artUnlock&&cButton==14){
        cButton=16;
      }
      if(cButton==16){
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
    if(hpG==100&&totalPoints>=200){
      hpG=180;
      totalPoints-=200;
    }else
    if(hpG==180&&totalPoints>=300){
      hpG=260;
      totalPoints-=300;
    }else
    if(hpG==260&&totalPoints>=400){
      hpG=340;
      totalPoints-=400;
    }else
    if(hpG==340&&totalPoints>=500){
      hpG=420;
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
      numBullet2G=10;
      totalPoints-=100;
    }else
    if(numBullet2G==10&&totalPoints>=200){
      numBullet2G=20;
      totalPoints-=200;
    }else
    if(numBullet2G==20&&totalPoints>=300){
      numBullet2G=30;
      totalPoints-=300;
    }else
    if(numBullet2G==30&&totalPoints>=400){
      numBullet2G=40;
      totalPoints-=400;
    }else
    if(numBullet2G==40&&totalPoints>=500){
      numBullet2G=50;
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
      numSmokeG=2;
      totalPoints-=100;
    }else
    if(numSmokeG==2&&totalPoints>=200){
      numSmokeG=4;
      totalPoints-=200;
    }else
    if(numSmokeG==4&&totalPoints>=300){
      numSmokeG=6;
      totalPoints-=300;
    }else
    if(numSmokeG==6&&totalPoints>=400){
      numSmokeG=8;
      totalPoints-=400;
    }else
    if(numSmokeG==8&&totalPoints>=500){
      numSmokeG=10;
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

  // extras

  // sights
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==10){
    cTimer=20;
    if(!extUnlock&&totalPoints>=1000){
      totalPoints-=1000;
      extUnlock=true;
    }else{
    if(sightsG==1&&totalPoints>=500){
      sightsG=2;
      totalPoints-=500;
    }else
    if(sightsG==2&&totalPoints>=500){
      sightsG=3;
      totalPoints-=500;
    }
    }
  }
  // tower mg
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==11){
    cTimer=20;
    if(secondMgG==false&&totalPoints>=1000){
      secondMgG=true;
      totalPoints-=1000;
    }
  }
  // flamethrower
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==12){
    cTimer=20;
    if(flamethrowerG==false&&totalPoints>=1000){
      flamethrowerG=true;
      totalPoints-=1000;
    }
  }

  // artillery

  // calls
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==13){
    cTimer=20;
    if(!artUnlock&&totalPoints>=1500){
      totalPoints-=1500;
      artUnlock=true;
      artCalls=1;
    }else{
    if(artCalls==0&&totalPoints>=100){
      artCalls=1;
      totalPoints-=100;
    }else
    if(artCalls==1&&totalPoints>=200){
      artCalls=2;
      totalPoints-=200;
    }else
    if(artCalls==2&&totalPoints>=300){
      artCalls=3;
      totalPoints-=300;
    }else
    if(artCalls==3&&totalPoints>=400){
      artCalls=4;
      totalPoints-=400;
    }else
    if(artCalls==4&&totalPoints>=500){
      artCalls=5;
      totalPoints-=500;
    }
    }
  }
  // shots
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==14){
    cTimer=20;
    if(artShots==3&&totalPoints>=200){
      artShots=5;
      totalPoints-=200;
    }else
    if(artShots==5&&totalPoints>=300){
      artShots=7;
      totalPoints-=300;
    }else
    if(artShots==7&&totalPoints>=400){
      artShots=10;
      totalPoints-=400;
    }else
    if(artShots==10&&totalPoints>=500){
      artShots=12;
      totalPoints-=500;
    }
  }
  // rate of fire
  if(myGameArea.keys && myGameArea.keys[13] && cTimer==0 && cButton==15){
    cTimer=20;
    if(artEffect==3.6&&totalPoints>=200){
      artEffect=3.2;
      totalPoints-=200;
    }else
    if(artEffect==3.2&&totalPoints>=300){
      artEffect=2.8;
      totalPoints-=300;
    }else
    if(artEffect==2.8&&totalPoints>=400){
      artEffect=2.4;
      totalPoints-=400;
    }else
    if(artEffect==2.4&&totalPoints>=500){
      artEffect=2;
      totalPoints-=500;
    }
  }

  }// end of level 2 // garage

  if(level==3){ // level 3 // manual
    var ctx = myGameArea.context;
    gameDrawing();
    // exit with esc
    if(myGameArea.keys && myGameArea.keys[27] && cTimer==0){
      cTimer=20;
      clearLevel();
      level=1;
      createMenuTanks=true;
    }
  }// end of level 3 // manual

  if(level==4){ // level 4 // author and references
    var ctx = myGameArea.context;

    ctx.drawImage(author, 0, 0);

    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "white";



    ctx.fillText("It was possible to make this game thanks to:",100,100);
    ctx.fillText("opengameart.org",120,160);
    ctx.fillText("youtube.com",120,200);
    ctx.fillText("w3schools.com",120,240);
    ctx.fillText("Contact author:",600,460);
    ctx.fillText("jasper.cherry7@gmail.com",600,500);
    ctx.fillText("Press esc to return",400,620);

    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(300, 400);
    ctx.rotate(120*Math.PI/180);
    ctx.drawImage(rusa, -20, -30);
    ctx.rotate(-50*Math.PI/180);
    ctx.drawImage(rusb, -20, -30);
    ctx.restore();

    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(560, 220);
    ctx.rotate(-120*Math.PI/180);
    ctx.drawImage(gera2, -20, -30);
    ctx.translate(0, -3);
    ctx.rotate(-10*Math.PI/180);
    ctx.drawImage(gerb2, -20, -30);
    ctx.restore();

    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(670, 310);
    ctx.rotate(-170*Math.PI/180);
    ctx.drawImage(gera, -20, -30);
    ctx.rotate(60*Math.PI/180);
    ctx.drawImage(gerb, -20, -30);
    ctx.restore();

    // exit with esc
    if(myGameArea.keys && myGameArea.keys[27] && cTimer==0){
      cTimer=20;
      clearLevel();
      level=1;
      createMenuTanks=true;
    }

  }// end of level 4 // author and references

  if(level==100){ // level 100 // survival mode



if(levelCreator){
    var mapNumber=Math.floor(Math.random()*4)+1;

    if(mapNumber==1){
      gameMap=map1;
    }
    if(mapNumber==2){
      gameMap=map2;
    }
    if(mapNumber==3){
      gameMap=map3;
    }
    if(mapNumber==4){
      gameMap=map4;
    }

    if(mapNumber==1||mapNumber==2){
      terrain=0;
    }else{
      terrain=1;
    }

    // creating player tank
    pTank = new PTank(500,300);

    // creating obstacles
    var numberObstacles=Math.floor(Math.random()*7)+3;
    for(var x=0; x<numberObstacles; x++){
      do{
        var xOb=Math.floor(Math.random()*880)+30;
        var yOb=Math.floor(Math.random()*480)+30;
      }while(Math.abs(xOb-pTank.x)<70&&Math.abs(yOb-pTank.y)<70)

      obstacles[x] = new Obstacle(xOb,yOb,(Math.floor(Math.random()*3)+1));
    }

    levelCreator=false;
}

// waves of tanks

  if(aiTanks.length==0){
    createWave=true;
    wave++;
  }
  if(createWave){
    createWave=false;
    if(wave==1){
      //aiTanks[0] = new AiTank(300,-200);
      //aiTanks[1] = new AiTank(700,-400);
      aiTanks[0] = new AiTank(1300,300);
      //aiTanks[3] = new AiTank(700,900);
      //aiTanks[4] = new AiTank(300,800);
      //aiTanks[5] = new AiTank(-200,300);
    }
    if(wave==2){
      infoTime=200;
      aiTanks[0] = new AiTank(300,-200);
      //aiTanks[1] = new AiTank(700,-400);
      //aiTanks[2] = new AiTank(1300,300);
      //aiTanks[3] = new AiTank(700,900);
      aiTanks[1] = new AiTank(300,800);
      //aiTanks[5] = new AiTank(-200,300);
    }
    if(wave==3){
      infoTime=200;
      //aiTanks[0] = new AiTank(300,-200);
      //aiTanks[1] = new AiTank(700,-400);
      //aiTanks[2] = new AiTank(1300,300);
      //aiTanks[3] = new AiTank(700,900);
      //aiTanks[4] = new AiTank(300,800);
      aiTanks[0] = new AiTank2(-200,300);
    }
    if(wave==4){
      infoTime=200;
      aiTanks[0] = new AiTank(300,-200);
      //aiTanks[1] = new AiTank(700,-400);
      aiTanks[1] = new AiTank(1300,300);
      //aiTanks[3] = new AiTank(700,900);
      aiTanks[2] = new AiTank2(300,800);
      aiTanks[3] = new AiTank(-200,300);
    }
    if(wave==5){
      infoTime=200;
      //aiTanks[0] = new AiTank(300,-200);
      aiTanks[0] = new AiTank2(700,-400);
      //aiTanks[2] = new AiTank(1300,300);
      aiTanks[1] = new AiTank2(700,900);
      //aiTanks[4] = new AiTank(300,800);
      aiTanks[2] = new AiTank2(-200,300);
    }
    if(wave==6){
      infoTime=200;
      aiTanks[0] = new AiTank(300,-200);
      aiTanks[1] = new AiTank(700,-400);
      aiTanks[2] = new AiTank2(1300,300);
      aiTanks[3] = new AiTank2(700,900);
      aiTanks[4] = new AiTank2(300,800);
      aiTanks[5] = new AiTank(-200,300);
    }
    if(wave==7){
      infoTime=200;
      aiTanks[0] = new AiTank3(300,-200);
      //aiTanks[1] = new AiTank(700,-400);
      //aiTanks[2] = new AiTank(1300,300);
      //aiTanks[3] = new AiTank(700,900);
      //aiTanks[4] = new AiTank(300,800);
      //aiTanks[5] = new AiTank(-200,300);
    }
    if(wave==8){
      infoTime=200;
      aiTanks[0] = new AiTank(300,-200);
      aiTanks[1] = new AiTank(700,-400);
      aiTanks[2] = new AiTank2(1300,300);
      aiTanks[3] = new AiTank(700,900);
      aiTanks[4] = new AiTank3(300,800);
      aiTanks[5] = new AiTank(-200,300);
    }
    if(wave==9){
      infoTime=200;
      //aiTanks[0] = new AiTank(300,-200);
      aiTanks[0] = new AiTank3(700,-400);
      aiTanks[1] = new AiTank2(1300,300);
      aiTanks[2] = new AiTank2(700,900);
      aiTanks[3] = new AiTank2(300,800);
      aiTanks[4] = new AiTank2(-200,300);
    }
    if(wave==10){
      infoTime=200;
      aiTanks[0] = new AiTank3(300,-200);
      aiTanks[1] = new AiTank2(700,-400);
      aiTanks[2] = new AiTank2(1300,300);
      aiTanks[3] = new AiTank3(700,900);
      aiTanks[4] = new AiTank2(300,800);
      aiTanks[5] = new AiTank3(-200,300);
    }
    if(wave==11){
      infoTime=200;
      //aiTanks[0] = new AiTank(300,-200);
      aiTanks[0] = new AiTank2(700,-400);
      //aiTanks[2] = new AiTank(1300,300);
      aiTanks[1] = new AiTank2(700,900);
      aiTanks[2] = new AiTank2(300,800);
      aiTanks[3] = new AiTank4(-200,300);
    }
    if(wave==12){
      infoTime=200;
      aiTanks[0] = new AiTank3(300,-200);
      aiTanks[1] = new AiTank3(700,-400);
      aiTanks[2] = new AiTank4(1300,300);
      aiTanks[3] = new AiTank4(700,900);
      //aiTanks[4] = new AiTank(300,800);
      //aiTanks[5] = new AiTank(-200,300);
    }
    if(wave==13){
      infoTime=200;
      aiTanks[0] = new AiTank4(300,-200);
      aiTanks[1] = new AiTank2(700,-400);
      aiTanks[2] = new AiTank3(1300,300);
      aiTanks[3] = new AiTank2(700,900);
      aiTanks[4] = new AiTank3(300,800);
      aiTanks[5] = new AiTank3(-200,300);
    }
    if(wave==14){
      infoTime=200;
      aiTanks[0] = new AiTank3(300,-200);
      aiTanks[1] = new AiTank4(700,-400);
      aiTanks[2] = new AiTank3(1300,300);
      aiTanks[3] = new AiTank3(700,900);
      aiTanks[4] = new AiTank4(300,800);
      aiTanks[5] = new AiTank3(-200,300);
    }
    if(wave==15){
      infoTime=200;
      aiTanks[0] = new AiTank4(300,-200);
      aiTanks[1] = new AiTank4(700,-400);
      aiTanks[2] = new AiTank4(1300,300);
      aiTanks[3] = new AiTank4(700,900);
      aiTanks[4] = new AiTank4(300,800);
      aiTanks[5] = new AiTank4(-200,300);
    }
    if(wave==16){
      infoTime=200;
      //aiTanks[0] = new AiTank(300,-200);
      aiTanks[0] = new AiTank2(700,-400);
      //aiTanks[2] = new AiTank(1300,300);
      aiTanks[1] = new AiTank2(700,900);
      //aiTanks[4] = new AiTank(300,800);
      //aiTanks[5] = new AiTank(-200,300);
    }
    if(wave>16){
      infoTime=200;
      aiTanks[0] = new AiTank(300,-200);
      aiTanks[1] = new AiTank3(700,-400);
      aiTanks[2] = new AiTank2(1300,300);
      aiTanks[3] = new AiTank2(700,900);
      aiTanks[4] = new AiTank4(300,800);
      aiTanks[5] = new AiTank2(-200,300);

    }
  }// end of creating waves

  // 6 positions
  //aiTanks[0] = new AiTank(300,-200);
  //aiTanks[1] = new AiTank(700,-400);
  //aiTanks[2] = new AiTank(1300,300);
  //aiTanks[3] = new AiTank(700,900);
  //aiTanks[4] = new AiTank(300,800);
  //aiTanks[5] = new AiTank(-200,300);


  if(pTank.alive){
  gameDrawing();
  }else{
    gameDrawing();
    endLevel--;
  }

  if(endLevel==0){
    clearLevel();
    cButton=0;
    level=2;
    clearLevel();
    infoTime=0;
    wave=0;
    createWave=false;
  }

  // information about the waves
  if(infoTime<200){
    infoTime++;
    var ctx = myGameArea.context;
    ctx.font = "bold 40px Courier New";
    if(terrain==0){
      ctx.fillStyle = "red";
    }else{
      ctx.fillStyle = "black";
    }
    ctx.fillText("Destroy 15 waves of enemies",180,150);
  }

  if(infoTime>199&&infoTime<300){
    infoTime++;
    var ctx = myGameArea.context;
    ctx.font = "bold 40px Courier New";
    if(terrain==0){
      ctx.fillStyle = "red";
    }else{
      ctx.fillStyle = "black";
    }
    ctx.fillText("Wave "+wave,430,150);
    if(wave==16){
      ctx.fillText("Congratulations!",320,200);
      ctx.fillText("Bonus weapon unlocked!",240,250);
      bonus=true;
      pTank.gunSpeed=7;
    }
  }


  // exit with esc
  if(myGameArea.keys && myGameArea.keys[27] && cTimer==0){
    cTimer=20;
    clearLevel();
    level=1;
    createMenuTanks=true;
    // wave and info variables
    infoTime=0;
    wave=0;
    createWave=false;
  }

  }// end of level 100 // survival mode

}// end of menus function
