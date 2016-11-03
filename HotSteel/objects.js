


function DeadBody(x, y, angle1, angle2, img1, img2, tower, id) {

    this.id = id;
    this.towerLoose=tower;
    this.hp = 100;
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
        ctx.restore();

        // drawing the tower
        if(this.towerLoose==false){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleTower);
        // tower of grey tanks with long barrel should be in different position
        if(this.img2==gerbw2){
          ctx.translate(0, -3);
          ctx.drawImage(this.img2, -20, -30);
        }else if(this.img2==gerbw3){
          ctx.translate(0, -14);
          ctx.drawImage(this.img2, -20, -30);
        }else if(this.img2==gerbw4){
          ctx.translate(0, -16);
          ctx.drawImage(this.img2, -20, -30);
        }else{
          ctx.drawImage(this.img2, -20, -30);
        }
        ctx.restore();
        }

    }
}



function Bullet(x, y, angle, type) {

    this.gun = new Audio('sounds/gun.mp3');
    this.playSound=true;

    this.type=type;
    this.liveTime=100;
    this.radius = 2;
    this.speed = 20;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = b;

    if(sound){
      if(this.playSound){
        this.gun.play();
        this.playSound=false;
      }
    }

    this.update = function() {

        this.liveTime--;
        if(this.liveTime<99){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(0, 0);
        ctx.drawImage(this.img, -35, -30);

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
        }
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function Bullet2(x, y, angle, type) {

    this.gun = new Audio('sounds/gun.mp3');
    this.playSound=true;

    this.hits=new Array();
    this.hitsDead=new Array();

    this.type=2;
    this.liveTime=100;
    this.radius = 2;
    this.speed = 20;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = b2;

    if(sound){
      if(this.playSound){
        this.gun.play();
        this.playSound=false;
      }
    }

    this.update = function() {

        this.liveTime--;
        if(this.liveTime<99){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(0, 0);
        ctx.drawImage(this.img, -35, -30);
        /*
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        */
        ctx.restore();
        }
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function Bullet3(x, y, angle, type) {

    this.gun = new Audio('sounds/blast.mp3');
    this.playSound=true;

    this.hits=new Array();
    this.hitsDead=new Array();

    this.type=3;
    this.liveTime=100;
    this.radius = 2;
    this.speed = 20;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = b3;

    if(sound){
      if(this.playSound){
        this.gun.play();
        this.playSound=false;
      }
    }

    this.update = function() {

        this.liveTime--;
        if(this.liveTime<99){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(0, 0);
        ctx.drawImage(this.img, -35, -30);
        /*
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        */
        ctx.restore();
        }
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}


function MgBullet(x, y, angle) {

    this.mg = new Audio('sounds/mg.mp3');
    this.playSound=true;

    this.rico=0;
    this.active=true;
    this.liveTime=100;
    this.radius = 1;
    this.speed = 15;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = mgb;

    if(sound){
      if(this.playSound){
        this.mg.play();
        this.playSound=false;
      }
    }

    this.update = function() {
        this.liveTime--;
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

function Flame(x, y, angle) {

    this.liveTime=40;
    this.radius = 3;
    this.speed = 7;
    this.angle = angle;
    this.x = x;
    this.y = y;

    this.fLoop=0;
    this.delayTime=0;
    this.size=0.1;

    this.update = function() {
        this.liveTime--;

        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);

        ctx.drawImage(document.getElementById("f"+this.fLoop), -128*this.size,
        -128*this.size, 256*this.size, 256*this.size);

        this.delayTime++;
        if(this.delayTime==1){
          this.fLoop++;
          this.delayTime=0;
          if(this.fLoop==10){
            this.fLoop=0;
          }
        }
        this.size+=0.01;
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

function Track(x, y, angle) {

    this.scale=0.04

    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = track;

    this.timer=150;
    this.opacity=0.5+0.5/150;


    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.img, -200*this.scale, -150*this.scale, 400*this.scale, 300*this.scale);
        ctx.globalAlpha = 1;
        ctx.restore();

        this.opacity=this.opacity-0.5/150;
        this.timer--;
    }

}

function Obstacle(x, y, type) {

    this.type = type;
    this.x = x;
    this.y = y;


    if(this.type==1){
      this.width = 65;
      this.height = 50;
      this.img=ob1;
    }else if(this.type==2){
      this.width = 60;
      this.height = 60;
      this.img=ob2;
    }else if(this.type==3){
      this.width = 50;
      this.height = 50;
      this.img=ob3;
    }


    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        //ctx.fillStyle = "black";
        if(this.type==1){
          //ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x-10, this.y-10, 84, 70);
        }

        if(this.type==2){
          //ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x-15, this.y-5, 84, 70);
        }

        if(this.type==3){
          //ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x-15, this.y-10, 84, 70);
        }
        //ctx.fillRect(this.x, this.y, 10, 10);
        ctx.restore();
    }

}

function ExplosionA(x, y) {

    this.x = x;
    this.y = y;
    this.exLoop=0;
    this.delayTime=0;

    this.art1 = new Audio('sounds/art1.mp3');
    this.playSound=true;

        this.update = function() {
          if(this.playSound){
            if(sound){
              this.art1.play();
              this.playSound=false;
            }
          }
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          this.delayTime++;
          if(this.exLoop!=90){
            ctx.drawImage(document.getElementById("art"+this.exLoop), -80*1, -60*1, 160*1, 120*1);
            if(this.delayTime==1){
              this.exLoop++;
              this.delayTime=0;
            }
          }
          ctx.restore();
        }

}


function ExplosionM(x, y) {

    this.x = x;
    this.y = y;
    this.exLoop=0;
    this.delayTime=0;

    this.exmd = new Audio('sounds/exmd.mp3');
    this.playSound=true;

        this.update = function() {
          if(this.playSound){
            if(sound){
              this.exmd.play();
              this.playSound=false;
            }
          }
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          this.delayTime++;
          if(this.exLoop!=11){
            ctx.drawImage(document.getElementById("ex"+this.exLoop), -64*0.8, -64*0.8, 128*0.8, 128*0.8);
            if(this.delayTime==1){
              this.exLoop++;
              this.delayTime=0;
            }
          }
          ctx.restore();
        }

}

function ExplosionH(x, y) {

    this.x = x;
    this.y = y;
    this.exLoop=0;
    this.delayTime=0;

        this.update = function() {
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          this.delayTime++;
          if(this.exLoop!=11){
            ctx.drawImage(document.getElementById("ex"+this.exLoop), -64*0.4, -64*0.4, 128*0.4, 128*0.4);
            if(this.delayTime==1){
              this.exLoop++;
              this.delayTime=0;
            }
          }
          ctx.restore();
        }

}

function ExplosionDead(x, y) {

    this.x = x;
    this.y = y;
    this.exLoop=0;
    this.delayTime=0;

    this.exmd = new Audio('sounds/exmd.mp3');
    this.playSound=true;

        this.update = function() {
          if(this.playSound){
            if(sound){
              this.exmd.play();
              this.playSound=false;
            }
          }
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          this.delayTime++;
          if(this.exLoop!=11){
            ctx.drawImage(document.getElementById("ex"+this.exLoop), -64*1, -64*1, 128*1, 128*1);
            if(this.delayTime==1){
              this.exLoop++;
              this.delayTime=0;
            }
          }
          ctx.restore();
        }

}

function Smoke(x, y) {

    this.radius = 70;
    this.x = x;
    this.y = y;
    this.width=0;
    this.height=0;
    this.exLoop=1;
    this.delayTime=0;
    this.totalTime=1000;

    this.smoke = new Audio('sounds/smoke.mp3');
    this.playSound=true;

        this.update = function() {
          if(this.playSound){
            if(sound){
              this.smoke.play();
              this.playSound=false;
            }
          }
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          this.delayTime++;
          if(this.totalTime>0){

            ctx.drawImage(document.getElementById("sm"+this.exLoop),
            -128*this.width, -128*this.height, 256*this.width, 256*this.height);

            /*
            ctx.fillStyle = "red";
            ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
            */

            if(this.delayTime==2){
              this.exLoop++;
              this.delayTime=0;
              if(this.exLoop==90){
                this.exLoop=0;
              }
            }
            // showing up
            if(this.width<2&&this.totalTime>960){
              this.width+=0.05;
              this.height+=0.05;
            }
            // hiding
            if(this.totalTime<42&&this.width>0){
              this.width-=0.05;
              this.height-=0.05;
            }
            this.totalTime--;
          }
          ctx.restore();
        }

}



// remove all objects function
function clearLevel() {

  pTank.flame.pause();
  pTank.move.pause();
  pTank.moveT.pause();

  terrain=0;

  kills = new Array();
  killsFire = new Array();
  tanksFire = new Array();
  flames = new Array();
  mines = new Array();
  explosionsA = new Array();
  explosionsM = new Array();
  explosionsH = new Array();
  explosionsDead = new Array();
  smoke = new Array();
  tracks = new Array();
  obstacles = new Array();
  pieces = new Array();

  bulletsP = new Array();
  mgBulletsP = new Array();
  aiTanks = new Array();
  bulletsAi = new Array();
  mgBulletsAi = new Array();

  pTank = new PTank(500,300);

  totalPoints+=points;
  points=0;
  gameKills=0;

}

function Piece(x, y) {

    this.x = x;
    this.y = y;
    this.pause = 50;
    this.time = 110
    this.angle = ((Math.round(Math.random() * (360)) - 0) * Math.PI / 180);
    this.speed=(Math.random()*8)+6;
    this.size=2;

    this.r=255;
    this.g=0;
    this.gControl=256;
    this.b=0;
    this.a=1;
    this.a2=0;

    this.hide=false;

        this.update = function() {

          this.g=Math.floor(Math.random()*this.gControl);
          // first ball
          if(this.a2<0.99&&!this.hide){
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.fillStyle = "rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")";
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, 2*Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          }
          // covering first ball with second ball
          if(this.speed==0){
            if(this.a2<1&&!this.hide){
              this.a2+=0.05;
            }
            ctx = myGameArea.context;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = "rgba(0, 0, 0, "+this.a2+")";
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }

          if(this.a2>0.99&&this.pause>0){
            this.pause--;
          }

          if(this.pause==0){
            this.hide=true;
            this.time--;
            if(this.a2-0.01>0){
              this.a2=this.a2-0.01;
            }else{
              this.a2=0.00;
            }

          }

          // speed
          if((this.speed-0.1)>0){
            this.speed-=0.5;
          }else{
            this.speed=0;
          }
          // vector movement
          this.x += this.speed * Math.sin(this.angle);
          this.y -= this.speed * Math.cos(this.angle);

        }

}
