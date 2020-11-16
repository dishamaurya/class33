const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score = 0;
var bird2,bird3,bird4;
var birds = [];


var gameState = "onSling";

function preload() {
    getbgImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,170);
    bird3 = new Bird(100,170);
    bird4 = new Bird(50,170);

    //arrayname.push(object_name);
    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

}

function draw(){

    if(backgroundImg)

    background(backgroundImg);

    textSize(30);
    fill("white");
    text("Score: " + score,1000,50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
    //log6.display();
    slingshot.display();    
    getbgImg();
}

function mouseDragged(){
    //if (gameState!=="launched"){

    //bird = birds[birds.length-1]
    Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});

        // Matter.Body.applyForce(bird.body   ,bird.body.position  ,  {x:+ve,y:-ve})
        Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position),{x:+5, y:-5}
    //}
}


function mouseReleased(){
    slingshot.fly();

    //pop() removes the last element (bird) from the array (birds)
    birds.pop();
    
    gameState = "launched";
    return false;
}

function keyPressed(){
    if(keyCode === 32 && gameState==="launched"){
        if(birds.length >= 0){
       slingshot.attach(birds[birds.length-1].body);
       Matter.Body.setPosition(birds[birds.length-1].body, {x: 200 , y: 50});
       this.trajectory =[];
       gameState = "onSling";
        }
    }
}

async function getbgImg(){
//request the API call using fetch() inside a vble called response
var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

//to store the JSON values of the response variable inside the responseJSON variable
var responseJSON = await response.json()

var datetime = responseJSON.datetime;
var hour = datetime.slice(11,13);

if(hour >= 06 && hour <=18 ){
    bg = "sprites/bg.png"
}
else{
    bg = "sprites/bg2.jpg"
}
backgroundImg = loadImage(bg);
}