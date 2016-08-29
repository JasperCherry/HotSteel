
function DeadBodyFire(x,y){

    this.phase=1;
    this.phaseTimer=400;
    this.fireLoop=0;
    this.delayTime=0;
    this.x=x;
    this.y=y;
    this.size=1.8;
    this.flameSpeed=2;

    // drawing the fire
    this.update = function() {
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);

//ctx.drawImage(document.getElementById("sm"+this.exLoop),
//-128*this.width, -128*this.height, 256*this.width, 255*this.height);

      if(this.phase==1){
        ctx.drawImage(document.getElementById("s"+this.fireLoop), -64*this.size, -110*this.size,
        128*this.size, 128*this.size);
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          this.delayTime=0;
          this.fireLoop++;
          if(this.fireLoop==8){
          this.fireLoop=0;
          this.phase=2;
          }
        }
      }else if(this.phase==2){
        ctx.drawImage(document.getElementById("l"+this.fireLoop), -64*this.size, -110*this.size,
        128*this.size, 128*this.size);
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          this.delayTime=0;
          this.fireLoop++;
          this.phaseTimer--;
          if(this.fireLoop==10){
          this.fireLoop=0;
          }
          if(this.phaseTimer==0){
            this.phase=3;
          }
        }
      }else if(this.phase==3){
        ctx.drawImage(document.getElementById("e"+this.fireLoop), -64*this.size, -110*this.size,
        128*this.size, 128*this.size);
        this.delayTime++;
        if(this.delayTime==this.flameSpeed){
          this.delayTime=0;
          this.fireLoop++;
          if(this.fireLoop==6){
          this.fireLoop=0;
          this.phase=4;
          }
        }
      }else if(this.phase==4){

      }

      ctx.restore();
    }

}


function DeadBody(x, y, angle1, angle2, img1, img2) {

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
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleTower);
        // tower of grey tank with long barrel should be in different position
        if(this.img2==gerbw2){
          ctx.translate(0, -3);
          ctx.drawImage(this.img2, -20, -30);
        }else{
          ctx.drawImage(this.img2, -20, -30);
        }
        ctx.restore();

    }
}



function Bullet(x, y, angle) {

    this.gun = new Audio('sounds/gun.mp3');
    this.playSound=true;

    this.liveTime=100;
    this.radius = 2;
    this.speed = 20;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = b;

    if(this.playSound){
      this.gun.play();
      this.playSound=false;
    }

    this.update = function() {

        this.liveTime--;
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.drawImage(this.img, -34, -47);
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


function MgBullet(x, y, angle) {

    this.mg = new Audio('sounds/mg.mp3');
    this.playSound=true;

    this.active=true;
    this.liveTime=100;
    this.radius = 1;
    this.speed = 15;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.img = mgb;

    if(this.playSound){
      this.mg.play();
      this.playSound=false;
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

function ExplosionM(x, y) {

    this.x = x;
    this.y = y;
    this.exLoop=0;
    this.delayTime=0;

    this.exmd = new Audio('sounds/exmd.mp3');
    this.playSound=true;

        this.update = function() {
          if(this.playSound){
            this.exmd.play();
            this.playSound=false;
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
            this.exmd.play();
            this.playSound=false;
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
            this.smoke.play();
            this.playSound=false;
          }
          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          this.delayTime++;
          if(this.totalTime>0){

            ctx.drawImage(document.getElementById("sm"+this.exLoop),
            -128*this.width, -128*this.height, 256*this.width, 255*this.height);
            ctx.drawImage(document.getElementById("sm"+this.exLoop),
            -128*this.width, -128*this.height, 256*this.width, 255*this.height);

            /*
            ctx.fillStyle = "red";
            ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
            */

            if(this.delayTime==2){
              this.exLoop++;
              this.delayTime=0;
              if(this.exLoop==30){
                this.exLoop=1;
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
