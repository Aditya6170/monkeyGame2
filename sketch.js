var PLAY=1;
var END=0;
var gameState= PLAY;

var ground;
var bananaImage;
var banana,FoodGroup;
var obstacleImage;
var obstacle,obstacleGroup;
var score;
var groundImage;
var monkey;
var player_running;
var platform;

function preload(){
  groundImage=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(500, 400);
  
  //adding value initial to score  
  score=0;
  
  //creating background image as sprite
  ground = createSprite(300,180,600,30);
  ground.addImage("ground", groundImage);
  ground.scale=1;
  ground.velocityX=-3;
  
  //creating monkey sprite
  monkey = createSprite(40,200,10,10);
  monkey.addAnimation("animation",player_running);
  monkey.scale=0.1;
  
  //creating groundsprite
  platform=createSprite(250,380,500,10);
  
  //making new groups for food and obstacles
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}
  
  

function draw() {
  background(220);
  
  //making ground invisible
  platform.visible=false;
  
  if(gameState===PLAY){
    
    //ressetting ground
    if(ground.x<0){
    ground.x=300;
    ground.y=180; 
    }
    
    //calling functions in play state only
     Food();
     Stones();
  
    //property if monkey touches food
      if(monkey.isTouching(FoodGroup)){
        score=score+2;
        FoodGroup.destroyEach();
      }
    
    //jump monkey if space pressed
   if(keyDown("space") && monkey.y>=344){
     monkey.velocityY=-6;
   }
  
  //adding gravity to monkey
    monkey.velocityY=monkey.velocityY+0.12;
    
    //property if monkey touches obstacles
      if(monkey.isTouching(obstacleGroup)){
        gameState=END;
      }  
  }
   
  if(gameState===END){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
    ground.x=300;
    monkey.y=900;
    
    
  }
  if (keyDown("r") && gameState===END){
    gameState=PLAY;
    monkey.x=40;
    monkey.y=200;
    
  }
  
  
  //logging position y of monkey
    console.log(monkey.y);
  
   //monkey should collide invisible ground
    monkey.collide(platform);
  
    drawSprites();
  
  //displaying score text
   stroke("white");
   textSize(20);
   fill("white");
   text("score:"+score,20,20)
   
  
  //displaying text when game is over
  if (gameState===END){
     stroke("white");
     textSize(20);
     fill("white");
     text("Game Over....press r to restart",130,200);
  }
   
}



function Food(){
 if (frameCount % 100 === 0){
     banana = createSprite(600,300,10,10);
     banana.y = Math.round(random(200,300));
     banana.velocityX=-7;
     banana.addImage("image",bananaImage);
     banana.scale=0.1;
     banana.lifetime = 100;
     banana.depth=monkey.depth;
     monkey.depth=monkey.depth+1;
     FoodGroup.add(banana);
   } 
}

function Stones(){
  if (frameCount % 150 === 0){
     obstacle =createSprite(600,360,20,10);
     obstacle.velocityX=-7;
     obstacle.addImage("obstacle",obstacleImage);
     obstacle.scale=0.1;
     obstacle.lifetime = 100;
     obstacleGroup.add(obstacle);
    
   }
  
  
  
  
  
}