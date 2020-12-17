var virus, virusImg, player, playerImg, bg, virusGroup, score, arrowSound, restart1, restartImg, start, startImg, 
sanitizerImg, sanitizer, sanitizerGroup

var gamestate = 0;

function preload(){
   
    virusImg = loadImage('images/virus.png');
    bg = loadImage('images/bg.jpg');
    playerImg = loadImage('images/plr.png');
    restartImg = loadImage('images/restart.png');
    startImg = loadImage('images/button.png');
    sanitizerImg = loadImage('images/sntz.jpg')

    arrowSound = loadSound('sounds/arrow.mp3');
    
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    player = createSprite(100,windowHeight/2,50,50);    
    player.addImage(playerImg);
    player.scale = 0.3;
    
    virusGroup = createGroup();
    score = 0;

    restart1 = createSprite(windowWidth/2 + 50,windowHeight/2 - 110,50,50);
    restart1.addImage(restartImg);
    restart1.scale = 0.5;

    start = createSprite(windowWidth/2 + 25,100,50,50);
    start.addImage(startImg);
    start.scale = 0.5;

    sanitizerGroup = createGroup();
    
}

function draw(){
    background('green');

    
    imageMode(CENTER);
    image(bg,windowWidth/2, windowHeight/2, windowWidth, windowHeight);

    if(gamestate == 0){

        start.visible = true;
        player.visible = false;
        restart1.visible = false;

        if(mousePressedOver(start) && gamestate == 0){
            startF();
        }

        drawSprites();
    }
    

    if(gamestate == 1){
        
        spawnVirus();
        spawnSanitizer();
        restart1.visible = false;
        start.visible = false;
        player.visible = true; 
        
        score = score + Math.round(getFrameRate()/60);
        textSize(18)
        fill(210,39,48);
        text ("Score: " + score, 50,50);  

        if(player.isTouching(virusGroup)){
            gamestate = 2
        }

        if(player.isTouching(sanitizerGroup)){
            virusGroup.destroyEach();
            sanitizerGroup.destroyEach();
        }

         if(score > 500){
             spawnVirusfromUp();
         }

         if(score > 1000){
            spawnVirusfromDown();
        }

        if(score > 1500){
            spawnVirusfromLeft();
        }

        if(player.x < 0 || player.x > windowWidth || player.y < 0 || player.y > windowHeight){
            gamestate = 2;
        }

        drawSprites();
    }

    if(gamestate == 2){

        start.visible = false;

        virusGroup.destroyEach();
        player.visible = false;

        if(mousePressedOver(restart1) && gamestate == 2){
            restart();
          }

        restart1.visible = true;

        sanitizerGroup.destroyEach();
        
        textSize(28)
        fill(210,39,48);
        text ("Your Score: " + score, windowWidth/2 - 50, windowHeight/2 + 50); 

        textSize(28)
        fill('cyan');
        text('You Lose', windowWidth/2, windowHeight/2 - 50)

        textSize(28)
        fill('yellow');
        text('You have been affected by Covid - 19', windowWidth/2 - 150, windowHeight/2)

        drawSprites();
    }
    
}   

function spawnVirus(){
    if(World.frameCount % 70 == 0){
        virus = createSprite(windowWidth,random(100,windowHeight-100),50,50)
        virus.velocityX = -3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
    }

    
}

function spawnVirusfromUp(){
    if(World.frameCount % 80 == 0){
        virus = createSprite(random(300,windowWidth),0,50,50)
        virus.velocityY = 3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
    }

    
}

function spawnVirusfromDown(){
    if(World.frameCount % 90 == 0){
        virus = createSprite(random(300,windowWidth),windowHeight,50,50)
        virus.velocityY = -3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
    }

    
}

function spawnVirusfromLeft(){
    if(World.frameCount % 90 == 0){
        virus = createSprite(0,random(100,windowHeight-100),50,50)
        virus.velocityX = 3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
    }

    
}

function keyPressed(){
    
    if(keyCode == 39){
        player.velocityX = 4;
        player.velocityY = 0;

        
    }
    
    else if(keyCode == 38){
        player.velocityY = -4;
        player.velocityX = 0;
        
    }

    else if(keyCode == 37){
        player.velocityX = -4;
        player.velocityY = 0;
        
    }

    else if(keyCode == 40){
        player.velocityY = 4;
        player.velocityX = 0;
        
    }
}

function restart(){

    gamestate = 0;
    score = 0;
    player.x = 100;
    player.y = displayHeight/2;
    player.velocityX = 0;
    player.velocityY = 0;
    
}

function startF(){

    gamestate = 1;
    score = 0;
    player.visible = false;
    player.x = 100;
    player.y = displayHeight/2;
    player.velocityX = 0;
    player.velocityY = 0;
    
}

function spawnSanitizer(){

    if(World.frameCount % 1000 == 0 && sanitizerGroup <= 1){
    
    sanitizer = createSprite(random(100,windowWidth - 100), random(100,windowHeight - 100), 50, 50);
    sanitizer.addImage(sanitizerImg);
    sanitizer.scale = 0.15;
    sanitizerGroup.add(sanitizer);
    }
}
