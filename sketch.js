var stretchy;
var egg;
var babyTurtle;

var jellyFish;
var plasticBag;
var straw;
var worm;
var seaCucumber;
var fish;
var fishNet;
var seaweed;
var sponge;
var cap;
var blueFishy;
var purpleFishy;
var blob;
var direction = 90;
var endPage;
var startingPage;


var goodFood;
var goodFoodElements;
var goodFoodSprite;
var badFood;
var badFoodElements;
var badFoodSprite;
var goodFoodFlags = [];
var badFoodFlags = [];

let bg;

var goodScore;
var badScore;

var turtleAnimation;

function preload() {
  oceanSound = loadSound('assets/ocean.mp3');
  bg = loadImage('assets/underwater-2615376.jpg');
  egg = loadImage('assets/face.png');
  jellyFish = loadImage('assets/Jelly Fish.png');
  plasticBag = loadImage('assets/Plastic Bag.png');
  straw = loadImage('assets/Straw.png');
  seaCucumber = loadImage('assets/Sea Cucumber.png');
  seaweed = loadImage('assets/seaweed.png');
  fish = loadImage('assets/fish.png');
  fishNet = loadImage('assets/net.png');
  blueFishy = loadImage('assets/bluefishy.png');
  sponge = loadImage('assets/sponge.png');
  startingPage = loadImage('assets/startingPage.png');
  endPage = loadImage('assets/endpage.png');
  worm = loadImage('assets/Worm_1.png');
  cap = loadImage('assets/cap.png');
  purpleFishy = loadImage('assets/purpleFishy.png');
  blob = loadImage('assets/blob.png');
  eatSound = loadSound('assets/chew.wav');
  backgroundmusic = loadSound('assets/ocean.mp3');

}

function setup() {
  fullscreen();
  createCanvas(windowWidth, windowHeight);

  document.getElementById('textbox').showModal();
  backgroundmusic.loop();

  goodFoodElements = [jellyFish, fish, seaCucumber, blueFishy, seaweed, worm, purpleFishy];
  badFoodElements = [straw, plasticBag, sponge, fishNet, cap, blob];
  goodFoodLabels = ['jellyFish', 'fish', 'seaCucumber', 'blueFishy', 'seaweed', 'worm', 'purpleFishy'];
  badFoodLabels = ['straw', 'plasticBag', 'sponge', 'fishNet', 'cap', 'blob'];

  reset();
}

// Reset all the variables and drawings to default values.
function reset() {
  if (stretchy) {
    stretchy.remove();
  }
  if (goodFood) {
    goodFood.removeSprites();
  }
  if (badFood) {
    badFood.removeSprites();
  }
  goodFoodFlags = [0, 0, 0, 0, 0, 0, 0]
  badFoodFlags = [0, 0, 0, 0, 0, 0];
  goodScore = 0;
  badScore = 0;

  stretchy = createSprite(400, 200, 10, 10);
  stretchy.addImage('egg', egg);
  stretchy.addAnimation('normal', 'assets/babyTurtle.png', 'assets/babyTurtle.png', 'assets/BabyTurtle_2.png', 'assets/BabyTurtle_2.png');
  stretchy.changeImage(egg);
  stretchy.debug = false;
  stretchy.setDefaultCollider();
  stretchy.maxSpeed = 10;

  goodFood = new Group();
  for(var i=0; i<10; i++)
  {
    var randomNum = getRandomInt(0,7);
    var goodFoodSprite = createSprite(random(0, width), random(0, height));
    goodFoodSprite.addImage(goodFoodLabels[randomNum], goodFoodElements[randomNum]);
    goodFoodSprite.debug = false;
    goodFoodSprite.setDefaultCollider();
    goodFood.add(goodFoodSprite);
  }

  badFood = new Group();
  for(var i=0; i<18; i++)
  {
    var randomNum = getRandomInt(0,6);
    var badFoodSprite = createSprite(random(0, width), random(0, height));
    badFoodSprite.addImage(badFoodLabels[randomNum], badFoodElements[randomNum]);
    badFoodSprite.debug = false;
    badFoodSprite.setDefaultCollider();
    badFood.add(badFoodSprite);
  }

  var textImage = document.getElementById("textboxImage");
  var modal = document.getElementById('textbox');
  textImage.src = "assets/startingPage.png";
  // Remove the event listener from previous game.
  modal.removeEventListener('click', onClickResetGame);
  modal.addEventListener('click', onClickCloseDialog);
  noLoop();
  // Call draw() to initalize all the sprites in new game.
  draw();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
  background(bg);
  //document.addEventListener('keydown', healthScore);


  stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
  stretchy.velocity.y = (mouseY-stretchy.position.y)/10;

  stretchy.overlap(goodFood, collect);
  stretchy.overlap(badFood, collect);

  drawMoreFood();
  drawSprites();

  checkGameStatus();

}


function collect(stretchy, collected) {
  console.log(collected.getAnimationLabel());
  scoreBoard(collected);
  console.log("Good Score:" + goodScore);
  console.log("Bad Score:" + badScore);
  collected.remove();
  insert(collected);
  eatSound.play();

}


function scoreBoard(collected) {
  if (goodFoodLabels.indexOf(collected.getAnimationLabel()) > -1) {
    goodScore++;
  }
  if (badFoodLabels.indexOf(collected.getAnimationLabel()) > -1) {
    badScore++;
  }
}

function drawMoreFood() {
  if (goodFood.size() <= 2) {
      var randomNum = getRandomInt(0,7);
      var goodFoodSprite = createSprite(random(0, width), random(0, height));
      goodFoodSprite.addImage(goodFoodLabels[randomNum], goodFoodElements[randomNum]);
      goodFoodSprite.debug = false;
      goodFoodSprite.setDefaultCollider();
      goodFood.add(goodFoodSprite);
  }

  if (badFood.size() <= 13) {
      var randomNum = getRandomInt(0,6);
      var badFoodSprite = createSprite(random(0, width), random(0, height));
      badFoodSprite.addImage(badFoodLabels[randomNum], badFoodElements[randomNum]);
      badFoodSprite.debug = false;
      badFoodSprite.setDefaultCollider();
      badFood.add(badFoodSprite);
  }
}

// goodfood starts here

function insert(collected) {
  var textImage = document.getElementById("textboxImage");
  var modal = document.getElementById('textbox');

  if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 0
      && goodFoodFlags[0] === 0 && modal.open === false) {
    goodFoodFlags[0] = 1;
    textImage.src = "assets/jellyfishText.png";
    modal.showModal();
    noLoop();
}


  else if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 1
      && goodFoodFlags[1] === 0 && modal.open === false) {
    goodFoodFlags[1] = 1;
    textImage.src = "assets/fishText.png";
    modal.showModal();
    noLoop();
  }

  else if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 2
      && goodFoodFlags[2] === 0 && modal.open === false) {
    goodFoodFlags[2] = 1;
    textImage.src = "assets/cucumberText.png";
    modal.showModal();
    noLoop();
  }

  else if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 3
      && goodFoodFlags[3] === 0 && modal.open === false) {
    goodFoodFlags[3] = 1;
    textImage.src = "assets/fishText.png";
    modal.showModal();
    noLoop();
  }

  else if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 4
      && goodFoodFlags[4] === 0 && modal.open === false) {
    goodFoodFlags[4] = 1;
    textImage.src = "assets/SeaweedText.png";
    modal.showModal();
    noLoop();
  }

  else if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 5
      &&goodFoodFlags[5] === 0 && modal.open === false) {
    goodFoodFlags[5] = 1;
    textImage.src = "assets/wormsText.png";
    modal.showModal();
    noLoop();
  }

  else if (goodFoodLabels.indexOf(collected.getAnimationLabel()) === 6
      && goodFoodFlags[6] === 0 && modal.open === false) {
    goodFoodFlags[6] = 1;
    textImage.src = "assets/fishText.png";
    modal.showModal();
    noLoop();
  }

  // bad food starts Here

  else if (badFoodLabels.indexOf(collected.getAnimationLabel()) === 0
      && badFoodFlags[0] === 0 && modal.open === false) {
    badFoodFlags[0] = 1;
    textImage.src = "assets/StrawText.png";
    modal.showModal();
    noLoop();
  }

  else if (badFoodLabels.indexOf(collected.getAnimationLabel()) === 1
      && badFoodFlags[1] === 0 && modal.open === false) {
    badFoodFlags[1] = 1;
    textImage.src = "assets/PlasticBagText.png";
    modal.showModal();
    noLoop();
  }

  else if (badFoodLabels.indexOf(collected.getAnimationLabel()) === 2
      && badFoodFlags[2] === 0 && modal.open === false) {
    badFoodFlags[2] = 1;
    textImage.src = "assets/SpongeText.png";
    modal.showModal();
    noLoop();
  }

  else if (badFoodLabels.indexOf(collected.getAnimationLabel()) === 3
      && badFoodFlags[3] === 0 && modal.open === false) {
    badFoodFlags[3] = 1;
    textImage.src = "assets/textbox_net.png";
    modal.showModal();
    noLoop();
  }

  else if (badFoodLabels.indexOf(collected.getAnimationLabel()) === 4
      && badFoodFlags[4] === 0 && modal.open === false) {
    badFoodFlags[4] = 1;
    textImage.src = "assets/CapText.png";
    modal.showModal();
    noLoop();
  }

  else if (badFoodLabels.indexOf(collected.getAnimationLabel()) === 5
      && badFoodFlags[5] === 0 && modal.open === false) {
    badFoodFlags[5] = 1;
    textImage.src = "assets/BlobText.png";
    modal.showModal();
    noLoop();
  }
}

// Check the status of game, see if game ends.
function checkGameStatus() {
  var textImage = document.getElementById("textboxImage");
  var modal = document.getElementById('textbox');

  // Change ball to turtle.
  if (goodScore >= 5) {
    stretchy.changeAnimation('normal');
  }

  // Game over.
  if (badScore >= 15 && modal.open === false) {
    noLoop();
    textImage.src = "assets/endpage.png";
    modal.addEventListener('click', onClickResetGame);
    modal.showModal();
  }
}

var onClickCloseDialog = (event) => {
  document.getElementById('textbox').close();
  loop();
}
var onClickResetGame = (event) => {
  reset();
}
