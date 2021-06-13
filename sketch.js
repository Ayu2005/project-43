var backImage,backgr;
var player, player_running,player_collided;
var ground,ground_img;
var food,food_img;
var obstacle,obstacle_img;
var obstacleGroup,foodGroup;
var gameOver,gameOver_img;
var score = 0;


var SERVE;
var END =0;
var PLAY =1;
var gameState = SERVE;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player_collided = loadAnimation("Monkey_02.png");
  food_img = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  gameOver_img = loadImage("gameOver.png")

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-0;
 


  //creating player
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("collided",player_collided);
  player.scale = 0.1;
  player.setCollider("rectangle",0,0,player.width-50,player.height-50);
  player.debug=false;

  //creating ground
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  //creating gameOver sprite
  gameOver = createSprite(350,200,20,20);
  gameOver.addImage(gameOver_img);
  gameOver.visible=false;
  //creating gropups
  obstacleGroup = createGroup();
  foodGroup = createGroup();

 
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY){

    backgr.velocityX=-4;
    player.changeAnimation("Running",player_running);
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(frameCount%200 === 0){
    spawnFood();
  }

  if(frameCount%300 === 0){
   obsticles();
  }

  //increment score
if(foodGroup.isTouching(player)){
  foodGroup.destroyEach();
  player.scale=player.scale+0.02;
  score=score+2;
}


  if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    //player collided with obstacle

    if(player.isTouching(obstacleGroup)){
      gameState=END;
      
    }

  }

  if(gameState === END){
    
    player.changeAnimation("collided",player_collided);
    backgr.velocityX=0;
    gameOver.visible=true;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);

    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
  }

  drawSprites();

  if(gameState === SERVE){
    player.changeAnimation("collided",player_collided);
    serve();

    if(keyIsDown(13)){
      gameState=PLAY;
    }
    
  }

  //winning
  if(score>=12){
    backgr.velocityX=0;
    obstacleGroup.destroyEach();
    player.changeAnimation("collided",player_collided);
    foodGroup.destroyEach();
    textSize(50);
    fill("orange");
    text("*YOU WIN*",200,200);
    
  }

  textSize(30);
  fill("red");
  text("score :"+score,20,30);
}

//creating function for food
function spawnFood(){

  
    food = createSprite(700,200,20,20);
    food.addImage(food_img);
    food.scale=0.05;
    food.velocityX= -4;
    food.lifetime=200;
    foodGroup.add(food);

}

//creating functioin obsticle 
function obsticles(){
  
    obstacle = createSprite(700,340,10,10);
    obstacle.addImage(obstacle_img);
    obstacle.setCollider("rectangle",0,0,obstacle.width-70,obstacle.height-90);
    obstacle.debug=false;
    obstacle.scale=0.23;
    obstacle.velocityX=-4;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  
}

function serve(){
  textSize(20);
    fill(255);
    text("**EAT BANANA TO WIN**",200,120);
    textSize(30);
    fill("yellow");
    text("press ENTER to statr",200,200);

}