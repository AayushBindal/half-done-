var dog;
var dogImage1, dogImage2;
var food = 20;
var database, foodValue;

function preload(){
  dogImage1 = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 650);
  dog = createSprite(width/2 +100, height/2 +40);
  dog.scale = 0.2;
  dog.addImage("dogImg", dogImage1);

  var foodValue = database.ref('foodValue');
  foodValue.on("value", readValue, showError);
}

function showError(){
  console.log("this is error message");
}

function draw() {  
  background(46, 139, 87);
  fill(255);
  textSize(20);
  textFont("algerian");
  text("press up arrow key to feed the pet", width/2-180, 100);
  text("food remaining: "+food, width/2-150, height/2-100);
  
  if(keyIsDown(UP_ARROW)){
    dog.addImage("dogImg", dogImage2);
    writeValue(-1);
  }
/*  else if(food < 10){
    food = writeValue(19);
  }*/
  drawSprites();
}

function readValue(data){
  food = data.val();
}

function writeValue(x){
  database.ref('/').update({
    'foodValue': foodValue -x
    })
  }