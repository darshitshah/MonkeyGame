var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1

  ground = createSprite(400,350,900,10)
  ground.velocityX=-4
  ground.x = ground.width/2;
  console.log(ground.x)
  
    
  //create Obstacle and Food Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {
  
  background(180);
  
  
  var surviavltime=0;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,100,50);  
  
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
   }
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  spawnObstacles();
  
  spawnFood();
  
  drawSprites();
  
}


function spawnFood() {
  //write code here to spawn food
  if (frameCount % 80 === 0) {
    var food = createSprite(300,20,10,10);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.18;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
     //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
      
    //add each food to the group
    FoodGroup.add(food);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,310,10,40);
   obstacle.velocityX = -6 
   obstacle.addImage(obstaceImage)
    
   //assign scale and lifetime to the obstacle   
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
       
    //adjust the depth
    obstacle.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


