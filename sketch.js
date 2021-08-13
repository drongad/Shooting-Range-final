var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var lives, scoreBoard
var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2

  lives = createElement("h1")
  scoreBoard = createElement("h1")

  bulletGroup = createGroup();   
  redBubbleGroup = createGroup();   
  blueBubbleGroup = createGroup()
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreBoard.html("Score: "+score)
  scoreBoard.style('color:black')
  scoreBoard.position(width-200,20)

  lives.html("Lives: "+life)
  lives.style('color:red')
  lives.position(width-400,20)


  if(gameState===1){
    gun.y=mouseY  
    
    if(keyDown("space")){
      shootBullets()
    }
    if(frameCount % 80 === 0){
      drawBlueBubble()
    }
    if(frameCount % 100 === 0){
      drawRedBubble()
    }
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup)
    }
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup)
    }
    if(blueBubbleGroup.collide(backBoard)){
       handleGameOver(blueBubbleGroup)
    }
    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup)
   }
    
    drawSprites();
  }
     
}

function shootBullets(){
  bullet = createSprite(100,gun.y)
  bullet.velocityX = 5
  bullet.addImage(bulletImg)
  bullet.scale = 0.2
  bullet.lifetime = 300
  bulletGroup.add(bullet)
}
function drawBlueBubble(){
  bluebubble = createSprite(random(700,800),random(100,800))
  bluebubble.velocityX = -5
  bluebubble.addImage(blueBubbleImg)
  bluebubble.scale = 0.09
  bluebubble.lifetime = 300
  blueBubbleGroup.add(bluebubble)
}

function drawRedBubble(){
  redbubble = createSprite(random(700,800),random(100,800))
  redbubble.velocityX = -5
  redbubble.addImage(redBubbleImg)
  redbubble.scale = 0.09
  redbubble.lifetime = 300
  redBubbleGroup.add(redbubble)
}
function handleBubbleCollision(BubbleGroup){
  if(life>0){
    score = score+1
  }
  var blast = createSprite(bullet.x,bullet.y)
    blast.addImage(blastImg)
    blast.scale = 0.3
    blast.lifetime= 20
    BubbleGroup.destroyEach()
    bulletGroup.destroyEach()
  
}
function handleGameOver(BubbleGroup){
  life-=1
  BubbleGroup.destroyEach()
  if(life === 0){
    gameState = 2
  swal({
    title:`Game Over`,
    text:"YOU LOST",
    text:"Your Final Score Was: "+score,
    imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize:"100x100",
    confirmButtonText: "Thanks for Playing"

  })
}
}