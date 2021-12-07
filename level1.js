let video;
let poseNet;
let pose;
let skeleton;
let img;

function setup() {
  createCanvas(windowWidth, windowWidth * 0.625);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowWidth * 0.625);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  frameRate(100);
  bodyPart = 0;
  errorAlpha = 0;
  carwidth = 50;
  level1complete = false;
  level2complete = false;
  level3complete = false;
  level4complete = false;
  level5complete = false;
  gameStarted = false;
  dead = false;
  intro1Played = false;
  intro2Played = false;
  backgroundImage = loadImage("Images/plain bg@2x.png");
  chickenImage = loadImage("Images/big-chicken.png");
  carupImage = loadImage("Images/carup.png");
  cardownImage = loadImage("Images/cardown.png");
  gameOverImage = loadImage("Images/gameover.png");
  startImage = loadImage("Images/start.png");
  endImage = loadImage("Images/end.png");
  deadImage = loadImage("Images/dead.png");
  introImage = loadImage("Images/intro.png");
  instructionsImage = loadImage("Images/getacross.png");
  speedImage = loadImage("Images/speed.png");

  //level 1 cars
  rng1_1 = random();
  dir1_1 = 1;
  if (rng1_1 > 0.5) {
    dir1_1 = -1;
  }
  car1_1y = int(random(0, windowWidth * 0.625));
  car1_1x = windowWidth / 2;
  car1_1speed = int(random(3, 8)) * dir1_1;

  //level 2 cars
  rng2_1 = random();
  dir2_1 = 1;
  if (rng2_1 > 0.5) {
    dir2_1 = -1;
  }
  car2_1y = int(random(0, windowWidth * 0.625));
  car2_1x = windowWidth / 2 - 150;
  car2_1speed = int(random(3, 8)) * dir2_1;

  rng2_2 = random();
  dir2_2 = 1;
  if (rng2_2 > 0.5) {
    dir2_2 = -1;
  }
  car2_2y = int(random(0, windowWidth * 0.625));
  car2_2x = windowWidth / 2;
  car2_2speed = int(random(3, 8)) * dir2_2;

  rng2_3 = random();
  dir2_3 = 1;
  if (rng2_3 > 0.5) {
    dir2_3 = -1;
  }
  car2_3y = int(random(0, windowWidth * 0.625));
  car2_3x = windowWidth / 2 + 150;
  car2_3speed = int(random(3, 8)) * dir2_3;

  //level 3 cars
  rng3_1 = random();
  dir3_1 = 1;
  if (rng3_1 > 0.5) {
    dir3_1 = -1;
  }
  car3_1y = int(random(0, windowWidth * 0.625));
  car3_1x = windowWidth / 2 - 250;
  car3_1speed = int(random(3, 8)) * dir3_1;

  rng3_2 = random();
  dir3_2 = 1;
  if (rng3_2 > 0.5) {
    dir3_2 = -1;
  }
  car3_2y = int(random(0, windowWidth * 0.625));
  car3_2x = windowWidth / 2 - 125;
  car3_2speed = int(random(3, 8)) * dir3_2;

  rng3_3 = random();
  dir3_3 = 1;
  if (rng3_3 > 0.5) {
    dir3_3 = -1;
  }
  car3_3y = int(random(0, windowWidth * 0.625));
  car3_3x = windowWidth / 2;
  car3_3speed = int(random(3, 8)) * dir3_3;

  rng3_4 = random();
  dir3_4 = 1;
  if (rng3_4 > 0.5) {
    dir3_4 = -1;
  }
  car3_4y = int(random(0, windowWidth * 0.625));
  car3_4x = windowWidth / 2 + 125;
  car3_4speed = int(random(3, 8)) * dir3_4;

  rng3_5 = random();
  dir3_5 = 1;
  if (rng3_5 > 0.5) {
    dir3_5 = -1;
  }
  car3_5y = int(random(0, windowWidth * 0.625));
  car3_5x = windowWidth / 2 + 250;
  car3_5speed = int(random(3, 8)) * dir3_5;

  //level 4 cars
  rng4_1 = random();
  dir4_1 = 1;
  if (rng4_1 > 0.5) {
    dir4_1 = -1;
  }
  car4_1y = int(random(0, windowWidth * 0.625));
  car4_1x = windowWidth / 2 - 250;
  car4_1speed = int(random(3, 8)) * dir3_1;

  rng4_2 = random();
  dir4_2 = 1;
  if (rng4_2 > 0.5) {
    dir4_2 = -1;
  }
  car4_2y = int(random(0, windowWidth * 0.625));
  car4_2x = windowWidth / 2 - 170;
  car4_2speed = int(random(3, 8)) * dir4_2;

  rng4_3 = random();
  dir4_3 = 1;
  if (rng4_3 > 0.5) {
    dir4_3 = -1;
  }
  car4_3y = int(random(0, windowWidth * 0.625));
  car4_3x = windowWidth / 2 - 90;
  car4_3speed = int(random(3, 8)) * dir4_3;

  rng4_4 = random();
  dir4_4 = 1;
  if (rng4_4 > 0.5) {
    dir4_4 = -1;
  }
  car4_4y = int(random(0, windowWidth * 0.625));
  car4_4x = windowWidth / 2 - 10;
  car4_4speed = int(random(3, 8)) * dir4_4;

  rng4_5 = random();
  dir4_5 = 1;
  if (rng4_5 > 0.5) {
    dir4_5 = -1;
  }
  car4_5y = int(random(0, windowWidth * 0.625));
  car4_5x = windowWidth / 2 + 70;
  car4_5speed = int(random(3, 8)) * dir4_5;

  rng4_6 = random();
  dir4_6 = 1;
  if (rng4_6 > 0.5) {
    dir4_6 = -1;
  }
  car4_6y = int(random(0, windowWidth * 0.625));
  car4_6x = windowWidth / 2 + 150;
  car4_6speed = int(random(3, 8)) * dir4_6;

  rng4_7 = random();
  dir4_7 = 1;
  if (rng4_7 > 0.5) {
    dir4_7 = -1;
  }
  car4_7y = int(random(0, windowWidth * 0.625));
  car4_7x = windowWidth / 2 + 230;
  car4_7speed = int(random(3, 8)) * dir4_7;

  //level 5 cars
  dir5_1 = 1;
  dir5_2 = 1;
  dir5_3 = 1;
  dir5_4 = 1;
  dir5_5 = 1;
  dir5_6 = 1;
  dir5_7 = 1;
  if (random() > 0.5) {
    dir5_1 = -1;
  }
  if (random() > 0.5) {
    dir5_2 = -1;
  }
  if (random() > 0.5) {
    dir5_3 = -1;
  }
  if (random() > 0.5) {
    dir5_4 = -1;
  }
  if (random() > 0.5) {
    dir5_5 = -1;
  }
  if (random() > 0.5) {
    dir5_6 = -1;
  }
  if (random() > 0.5) {
    dir5_7 = -1;
  }
  car5_1speed = int(random(6, 10)) * dir5_1;
  car5_2speed = int(random(6, 10)) * dir5_2;
  car5_3speed = int(random(6, 10)) * dir5_3;
  car5_4speed = int(random(6, 10)) * dir5_4;
  car5_5speed = int(random(6, 10)) * dir5_5;
  car5_6speed = int(random(6, 10)) * dir5_6;
  car5_7speed = int(random(6, 10)) * dir5_7;
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  if (pose) {
    translate(windowWidth, 0);
    scale(-1, 1);

    image(video, 0, 0, windowWidth, windowWidth * 0.625);

    fill(255, 255, 255);

    //get coordinates
    let x = pose.keypoints[bodyPart].position.x;
    let y = pose.keypoints[bodyPart].position.y;

    //     let x = mouseX;
    //     let y = mouseY;

    //fit coordinates to screen
    // if (x > windowWidth || x < 0 || y > windowWidth*0.625 || y < 0) {
    //   x = undefined;
    //   y = undefined;
    // }

    //INTRO STUFF
    if (intro1Played == false) {
      image(introImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(chickenImage, x - 25, y - 25, 50, 50);
      if (y > 700 && y < 850 && x < 250 && x > 100) {
        intro1Played = true;
      }
    }

    if (intro2Played == false && intro1Played == true) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(instructionsImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(chickenImage, x - 25, y - 25, 50, 50);

      if (y > 820 && y < 970 && x < 740 && x > 590) {
        intro2Played = true;
      }
    }

    //START SCREEN
    if (gameStarted == false && intro1Played == true && intro2Played == true) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(startImage, 0, 0, windowWidth, windowWidth * 0.625);

      image(chickenImage, x - 25, y - 25, 50, 50);

      if (x < windowWidth / 10) {
        gameStarted = true;
      }
    }

    //LEVEL 1

    if (gameStarted == true && level1complete == false && dead == false) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);

      //generate car height
      let car1_1height = 100;

      //check if car is hit
      if (
        y < car1_1y + car1_1height &&
        x > car1_1x &&
        y > car1_1y &&
        x < car1_1x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      }

      //if car is not hit
      else if (
        x >= 0 &&
        x <= windowWidth &&
        y >= 0 &&
        y <= windowWidth * 0.625
      ) {
        errorAlpha = 0;
      }

      //draw and move car
      // fill(255, 255, 255);
      // rect(car1_1x, car1_1y, carwidth, car1_1height);
      if (car1_1speed > 0) {
        image(cardownImage, car1_1x, car1_1y, carwidth, car1_1height);
      } else {
        image(carupImage, car1_1x, car1_1y, carwidth, car1_1height);
      }
      car1_1y = car1_1y + car1_1speed;
      if (car1_1y > windowWidth * 0.625 + 10) {
        car1_1y = -100;
      }
      if (car1_1y < -110) {
        car1_1y = windowWidth * 0.625;
      }

      //error rectangle drawing
      // fill(color('rgba(100%, 0%, 0%,' + errorAlpha + ')'));
      // rect(550, 390, windowWidth/9, windowWidth/9);

      //start
      // fill(255, 255, 255);
      // rect(0, 0, windowWidth/9, windowWidth*0.625);

      //end
      // fill(0, 0, 255);
      // rect(windowWidth-windowWidth/9, 0, windowWidth/9, windowWidth*0.625);

      //nose tracker circle
      image(chickenImage, x - 25, y - 25, 50, 50);

      //if reach end
      if (x > windowWidth - windowWidth / 10) {
        level1complete = true;
      }
    }

    //LEVEL 2

    if (level1complete == true && level2complete == false && dead == false) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);

      //generate car height
      let car2_1height = 100;
      let car2_2height = 100;
      let car2_3height = 100;

      //check if car is hit
      if (
        y < car2_1y + car2_1height &&
        x > car2_1x &&
        y > car2_1y &&
        x < car2_1x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car2_2y + car2_2height &&
        x > car2_2x &&
        y > car2_2y &&
        x < car2_2x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car2_3y + car2_3height &&
        x > car2_3x &&
        y > car2_3y &&
        x < car2_3x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      }

      //if car is not hit
      else if (
        x >= 0 &&
        x <= windowWidth &&
        y >= 0 &&
        y <= windowWidth * 0.625
      ) {
        errorAlpha = 0;
      }

      //draw and move cars
      if (car2_1speed > 0) {
        image(cardownImage, car2_1x, car2_1y, carwidth, car2_1height);
      } else {
        image(carupImage, car2_1x, car2_1y, carwidth, car2_1height);
      }
      car2_1y = car2_1y + car2_1speed;
      if (car2_1y > windowWidth * 0.625 + 10) {
        car2_1y = -100;
      }
      if (car2_1y < -110) {
        car2_1y = windowWidth * 0.625;
      }

      if (car2_2speed > 0) {
        image(cardownImage, car2_2x, car2_2y, carwidth, car2_2height);
      } else {
        image(carupImage, car2_2x, car2_2y, carwidth, car2_2height);
      }
      car2_2y = car2_2y + car2_2speed;
      if (car2_2y > windowWidth * 0.625 + 10) {
        car2_2y = -100;
      }
      if (car2_2y < -110) {
        car2_2y = windowWidth * 0.625;
      }

      if (car2_3speed > 0) {
        image(cardownImage, car2_3x, car2_3y, carwidth, car2_3height);
      } else {
        image(carupImage, car2_3x, car2_3y, carwidth, car2_3height);
      }
      car2_3y = car2_3y + car2_3speed;
      if (car2_3y > windowWidth * 0.625 + 10) {
        car2_3y = -100;
      }
      if (car2_3y < -110) {
        car2_3y = windowWidth * 0.625;
      }

      //error rectangle drawing
      // fill(color('rgba(100%, 0%, 0%,' + errorAlpha + ')'));
      // rect(550, 390, windowWidth/9, windowWidth/9);

      //start
      // fill(255, 255, 255);
      // rect(0, 0, windowWidth/9, windowWidth*0.625);

      //end
      // fill(0, 0, 255);
      // rect(windowWidth-windowWidth/9, 0, windowWidth/9, windowWidth*0.625);

      //nose tracker circle
      image(chickenImage, x - 25, y - 25, 50, 50);

      //if reach end
      if (x < windowWidth / 10) {
        level2complete = true;
      }
    }

    //LEVEL 3

    if (
      level1complete == true &&
      level2complete == true &&
      level3complete == false &&
      dead == false
    ) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);

      //generate car height
      let car3_1height = 100;
      let car3_2height = 100;
      let car3_3height = 100;
      let car3_4height = 100;
      let car3_5height = 100;

      //check if car is hit
      if (
        y < car3_1y + car3_1height &&
        x > car3_1x &&
        y > car3_1y &&
        x < car3_1x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car3_2y + car3_2height &&
        x > car3_2x &&
        y > car3_2y &&
        x < car3_2x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car3_3y + car3_3height &&
        x > car3_3x &&
        y > car3_3y &&
        x < car3_3x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car3_4y + car3_4height &&
        x > car3_4x &&
        y > car3_4y &&
        x < car3_4x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car3_5y + car3_5height &&
        x > car3_5x &&
        y > car3_5y &&
        x < car3_5x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      }

      //if car is not hit
      else if (
        x >= 0 &&
        x <= windowWidth &&
        y >= 0 &&
        y <= windowWidth * 0.625
      ) {
        errorAlpha = 0;
      }

      //draw and move cars
      if (car3_1speed > 0) {
        image(cardownImage, car3_1x, car3_1y, carwidth, car3_1height);
      } else {
        image(carupImage, car3_1x, car3_1y, carwidth, car3_1height);
      }
      car3_1y = car3_1y + car3_1speed;
      if (car3_1y > windowWidth * 0.625 + 10) {
        car3_1y = -100;
      }
      if (car3_1y < -110) {
        car3_1y = windowWidth * 0.625;
      }

      if (car3_2speed > 0) {
        image(cardownImage, car3_2x, car3_2y, carwidth, car3_2height);
      } else {
        image(carupImage, car3_2x, car3_2y, carwidth, car3_2height);
      }
      car3_2y = car3_2y + car3_2speed;
      if (car3_2y > windowWidth * 0.625 + 10) {
        car3_2y = -100;
      }
      if (car3_2y < -110) {
        car3_2y = windowWidth * 0.625;
      }

      if (car3_3speed > 0) {
        image(cardownImage, car3_3x, car3_3y, carwidth, car3_3height);
      } else {
        image(carupImage, car3_3x, car3_3y, carwidth, car3_3height);
      }
      car3_3y = car3_3y + car3_3speed;
      if (car3_3y > windowWidth * 0.625 + 10) {
        car3_3y = -100;
      }
      if (car3_3y < -110) {
        car3_3y = windowWidth * 0.625;
      }

      if (car3_4speed > 0) {
        image(cardownImage, car3_4x, car3_4y, carwidth, car3_4height);
      } else {
        image(carupImage, car3_4x, car3_4y, carwidth, car3_4height);
      }
      car3_4y = car3_4y + car3_4speed;
      if (car3_4y > windowWidth * 0.625 + 10) {
        car3_4y = -100;
      }
      if (car3_4y < -110) {
        car3_4y = windowWidth * 0.625;
      }

      if (car3_5speed > 0) {
        image(cardownImage, car3_5x, car3_5y, carwidth, car3_5height);
      } else {
        image(carupImage, car3_5x, car3_5y, carwidth, car3_5height);
      }
      car3_5y = car3_5y + car3_5speed;
      if (car3_5y > windowWidth * 0.625 + 10) {
        car3_5y = -100;
      }
      if (car3_5y < -110) {
        car3_5y = windowWidth * 0.625;
      }

      //       //error rectangle drawing
      //       fill(color('rgba(100%, 0%, 0%,' + errorAlpha + ')'));
      //       rect(550, 390, windowWidth/9, windowWidth/9);

      //       //start
      //       fill(255, 255, 255);
      //       rect(0, 0, windowWidth/9, windowWidth*0.625);

      //       //end
      //       fill(0, 0, 255);
      //       rect(windowWidth-windowWidth/9, 0, windowWidth/9, windowWidth*0.625);

      //nose tracker circle
      image(chickenImage, x - 25, y - 25, 50, 50);

      //if reach end
      if (x > windowWidth - windowWidth / 10) {
        level3complete = true;
      }
    }

    //LEVEL 4

    if (
      level1complete == true &&
      level2complete == true &&
      level3complete == true &&
      level4complete == false &&
      dead == false
    ) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);

      //generate car height
      let car4_1height = 100;
      let car4_2height = 100;
      let car4_3height = 100;
      let car4_4height = 100;
      let car4_5height = 100;
      let car4_6height = 100;
      let car4_7height = 100;

      //check if car is hit
      if (
        y < car4_1y + car4_1height &&
        x > car4_1x &&
        y > car4_1y &&
        x < car4_1x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_2y + car4_2height &&
        x > car4_2x &&
        y > car4_2y &&
        x < car4_2x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_3y + car4_3height &&
        x > car4_3x &&
        y > car4_3y &&
        x < car4_3x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_4y + car4_4height &&
        x > car4_4x &&
        y > car4_4y &&
        x < car4_4x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_5y + car4_5height &&
        x > car4_5x &&
        y > car4_5y &&
        x < car4_5x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_6y + car4_6height &&
        x > car4_6x &&
        y > car4_6y &&
        x < car4_6x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_7y + car4_7height &&
        x > car4_7x &&
        y > car4_7y &&
        x < car4_7x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      }

      //if car is not hit
      else if (
        x >= 0 &&
        x <= windowWidth &&
        y >= 0 &&
        y <= windowWidth * 0.625
      ) {
        errorAlpha = 0;
      }

      //draw and move cars
      if (car4_1speed > 0) {
        image(cardownImage, car4_1x, car4_1y, carwidth, car4_1height);
      } else {
        image(carupImage, car4_1x, car4_1y, carwidth, car4_1height);
      }
      car4_1y = car4_1y + car4_1speed;
      if (car4_1y > windowWidth * 0.625 + 10) {
        car4_1y = -100;
      }
      if (car4_1y < -110) {
        car4_1y = windowWidth * 0.625;
      }

      if (car4_2speed > 0) {
        image(cardownImage, car4_2x, car4_2y, carwidth, car4_2height);
      } else {
        image(carupImage, car4_2x, car4_2y, carwidth, car4_2height);
      }
      car4_2y = car4_2y + car4_2speed;
      if (car4_2y > windowWidth * 0.625 + 10) {
        car4_2y = -100;
      }
      if (car4_2y < -110) {
        car4_2y = windowWidth * 0.625;
      }

      if (car4_3speed > 0) {
        image(cardownImage, car4_3x, car4_3y, carwidth, car4_3height);
      } else {
        image(carupImage, car4_3x, car4_3y, carwidth, car4_3height);
      }
      car4_3y = car4_3y + car4_3speed;
      if (car4_3y > windowWidth * 0.625 + 10) {
        car4_3y = -100;
      }
      if (car4_3y < -110) {
        car4_3y = windowWidth * 0.625;
      }

      if (car4_4speed > 0) {
        image(cardownImage, car4_4x, car4_4y, carwidth, car4_4height);
      } else {
        image(carupImage, car4_4x, car4_4y, carwidth, car4_4height);
      }
      car4_4y = car4_4y + car4_4speed;
      if (car4_4y > windowWidth * 0.625 + 10) {
        car4_4y = -100;
      }
      if (car4_4y < -110) {
        car4_4y = windowWidth * 0.625;
      }

      if (car4_5speed > 0) {
        image(cardownImage, car4_5x, car4_5y, carwidth, car4_5height);
      } else {
        image(carupImage, car4_5x, car4_5y, carwidth, car4_5height);
      }
      car4_5y = car4_5y + car4_5speed;
      if (car4_5y > windowWidth * 0.625 + 10) {
        car4_5y = -100;
      }
      if (car4_5y < -110) {
        car4_5y = windowWidth * 0.625;
      }

      if (car4_6speed > 0) {
        image(cardownImage, car4_6x, car4_6y, carwidth, car4_6height);
      } else {
        image(carupImage, car4_6x, car4_6y, carwidth, car4_6height);
      }
      car4_6y = car4_6y + car4_6speed;
      if (car4_6y > windowWidth * 0.625 + 10) {
        car4_6y = -100;
      }
      if (car4_6y < -110) {
        car4_6y = windowWidth * 0.625;
      }

      if (car4_7speed > 0) {
        image(cardownImage, car4_7x, car4_7y, carwidth, car4_7height);
      } else {
        image(carupImage, car4_7x, car4_7y, carwidth, car4_7height);
      }
      car4_7y = car4_7y + car4_7speed;
      if (car4_7y > windowWidth * 0.625 + 10) {
        car4_7y = -100;
      }
      if (car4_7y < -110) {
        car4_7y = windowWidth * 0.625;
      }

      //       //error rectangle drawing
      //       fill(color('rgba(100%, 0%, 0%,' + errorAlpha + ')'));
      //       rect(550, 390, windowWidth/9, windowWidth/9);

      //       //start
      //       fill(255, 255, 255);
      //       rect(0, 0, windowWidth/9, windowWidth*0.625);

      //       //end
      //       fill(0, 0, 255);
      //       rect(windowWidth-windowWidth/9, 0, windowWidth/9, windowWidth*0.625);

      //nose tracker circle
      image(chickenImage, x - 25, y - 25, 50, 50);

      //if reach end
      if (x < windowWidth / 10) {
        level4complete = true;
      }
    }

    //LEVEL 5

    if (
      level1complete == true &&
      level2complete == true &&
      level3complete == true &&
      level4complete == true &&
      level5complete == false &&
      dead == false
    ) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(speedImage, 0, 0, windowWidth, windowWidth * 0.625);

      //generate car height
      let car4_1height = 100;
      let car4_2height = 100;
      let car4_3height = 100;
      let car4_4height = 100;
      let car4_5height = 100;
      let car4_6height = 100;
      let car4_7height = 100;

      //check if car is hit
      if (
        y < car4_1y + car4_1height &&
        x > car4_1x &&
        y > car4_1y &&
        x < car4_1x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_2y + car4_2height &&
        x > car4_2x &&
        y > car4_2y &&
        x < car4_2x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_3y + car4_3height &&
        x > car4_3x &&
        y > car4_3y &&
        x < car4_3x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_4y + car4_4height &&
        x > car4_4x &&
        y > car4_4y &&
        x < car4_4x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_5y + car4_5height &&
        x > car4_5x &&
        y > car4_5y &&
        x < car4_5x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_6y + car4_6height &&
        x > car4_6x &&
        y > car4_6y &&
        x < car4_6x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      } else if (
        y < car4_7y + car4_7height &&
        x > car4_7x &&
        y > car4_7y &&
        x < car4_7x + carwidth
      ) {
        errorAlpha = 1;
        dead = true;
      }

      //if car is not hit
      else if (
        x >= 0 &&
        x <= windowWidth &&
        y >= 0 &&
        y <= windowWidth * 0.625
      ) {
        errorAlpha = 0;
      }

      //draw and move cars
      if (car5_1speed > 0) {
        image(cardownImage, car4_1x, car4_1y, carwidth, car4_1height);
      } else {
        image(carupImage, car4_1x, car4_1y, carwidth, car4_1height);
      }
      car4_1y = car4_1y + car5_1speed;
      if (car4_1y > windowWidth * 0.625 + 10) {
        car4_1y = -100;
      }
      if (car4_1y < -110) {
        car4_1y = windowWidth * 0.625;
      }

      if (car5_2speed > 0) {
        image(cardownImage, car4_2x, car4_2y, carwidth, car4_2height);
      } else {
        image(carupImage, car4_2x, car4_2y, carwidth, car4_2height);
      }
      car4_2y = car4_2y + car5_2speed;
      if (car4_2y > windowWidth * 0.625 + 10) {
        car4_2y = -100;
      }
      if (car4_2y < -110) {
        car4_2y = windowWidth * 0.625;
      }

      if (car5_3speed > 0) {
        image(cardownImage, car4_3x, car4_3y, carwidth, car4_3height);
      } else {
        image(carupImage, car4_3x, car4_3y, carwidth, car4_3height);
      }
      car4_3y = car4_3y + car5_3speed;
      if (car4_3y > windowWidth * 0.625 + 10) {
        car4_3y = -100;
      }
      if (car4_3y < -110) {
        car4_3y = windowWidth * 0.625;
      }

      if (car5_4speed > 0) {
        image(cardownImage, car4_4x, car4_4y, carwidth, car4_4height);
      } else {
        image(carupImage, car4_4x, car4_4y, carwidth, car4_4height);
      }
      car4_4y = car4_4y + car5_4speed;
      if (car4_4y > windowWidth * 0.625 + 10) {
        car4_4y = -100;
      }
      if (car4_4y < -110) {
        car4_4y = windowWidth * 0.625;
      }

      if (car5_5speed > 0) {
        image(cardownImage, car4_5x, car4_5y, carwidth, car4_5height);
      } else {
        image(carupImage, car4_5x, car4_5y, carwidth, car4_5height);
      }
      car4_5y = car4_5y + car5_5speed;
      if (car4_5y > windowWidth * 0.625 + 10) {
        car4_5y = -100;
      }
      if (car4_5y < -110) {
        car4_5y = windowWidth * 0.625;
      }

      if (car5_6speed > 0) {
        image(cardownImage, car4_6x, car4_6y, carwidth, car4_6height);
      } else {
        image(carupImage, car4_6x, car4_6y, carwidth, car4_6height);
      }
      car4_6y = car4_6y + car5_6speed;
      if (car4_6y > windowWidth * 0.625 + 10) {
        car4_6y = -100;
      }
      if (car4_6y < -110) {
        car4_6y = windowWidth * 0.625;
      }

      if (car5_7speed > 0) {
        image(cardownImage, car4_7x, car4_7y, carwidth, car4_7height);
      } else {
        image(carupImage, car4_7x, car4_7y, carwidth, car4_7height);
      }
      car4_7y = car4_7y + car5_7speed;
      if (car4_7y > windowWidth * 0.625 + 10) {
        car4_7y = -100;
      }
      if (car4_7y < -110) {
        car4_7y = windowWidth * 0.625;
      }

      //       //error rectangle drawing
      //       fill(color('rgba(100%, 0%, 0%,' + errorAlpha + ')'));
      //       rect(550, 390, windowWidth/9, windowWidth/9);

      //       //start
      //       fill(255, 255, 255);
      //       rect(0, 0, windowWidth/9, windowWidth*0.625);

      //       //end
      //       fill(0, 0, 255);
      //       rect(windowWidth-windowWidth/9, 0, windowWidth/9, windowWidth*0.625);

      //nose tracker circle
      image(chickenImage, x - 25, y - 25, 50, 50);

      //if reach end
      if (x > windowWidth - windowWidth / 10) {
        level5complete = true;
      }
    }

    if (dead == true) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(gameOverImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(deadImage, x - 25, y - 25, 50, 50);

      //play again
      if (x < windowWidth / 10) {
        intro1Played = true;
        intro2Played = true;
        gameStarted = false;
        dead = false;
        level1complete = false;
        level2complete = false;
        level3complete = false;
        level4complete = false;
        level5complete = false;
      }

      //quit
      if (x > windowWidth - 270 && x < windowWidth - 70 && y > 855 && y < 955) {
        intro1Played = false;
        intro2Played = false;
        gameStarted = false;
        dead = false;
        level1complete = false;
        level2complete = false;
        level3complete = false;
        level4complete = false;
        level5complete = false;
      }
    }

    if (level5complete == true) {
      image(backgroundImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(endImage, 0, 0, windowWidth, windowWidth * 0.625);
      image(chickenImage, x - 25, y - 25, 50, 50);

      //play again
      if (x < windowWidth / 10) {
        intro1Played = true;
        intro2Played = true;
        gameStarted = false;
        dead = false;
        level1complete = false;
        level2complete = false;
        level3complete = false;
        level4complete = false;
        level5complete = false;
      }

      //quit
      if (x > windowWidth - 270 && x < windowWidth - 70 && y > 855 && y < 955) {
        intro1Played = false;
        intro2Played = false;
        gameStarted = false;
        dead = false;
        level1complete = false;
        level2complete = false;
        level3complete = false;
        level4complete = false;
        level5complete = false;
      }
    }
  }
}
