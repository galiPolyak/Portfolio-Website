// setup:
const imageSources = ['images/bubbleImg.png', 'images/bubbleImg2.png', 'images/bubbleImg3.png'];

// Create an array to store the Image objects
const bubbleImages = [];

bubbleImages[0] = new Image();
bubbleImages[1] = new Image();
bubbleImages[2] = new Image();

bubbleImages[0].src = 'images/bubbleImg.png';
bubbleImages[1].src= 'images/bubbleImg2.png';
bubbleImages[2].src= 'images/bubbleImg3.png';


const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 80;

let mouse = {
    x: undefined,
    y: undefined
};


let gravity = 0.8;
let yFriction = 0.75;
let xFriction = 0.75;



window.addEventListener("mousemove", function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80;
    // Uncomment the below line if you want to reinitialize the bubbles when the window is resized
    // init();
});

//bubble functions

function Bubble(x, y, velX, velY, radius) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.bubbleImageIndex = randomIntInRange(0, bubbleImages.length - 1);

    this.update = function() {

        if (this.y + this.radius + this.velY > canvas.height) {
            this.velY = -this.velY * yFriction;
        } else {
            this.velY += gravity;
        }

        if (this.x + this.radius + this.velX > canvas.width || 
            this.x - this.radius + this.velX < 0) {
            this.velX = -this.velX * xFriction;
        }

        // Hover over to bounce the bubbles
        if (mouse.x > (this.x - this.radius) && mouse.x < (this.x + this.radius) && 
            mouse.y > (this.y - this.radius) && mouse.y < (this.y + this.radius)) {
            this.velX = randomIntInRange(-10, 10);
            this.velY = -15;
        }

        this.x += this.velX;
        this.y += this.velY;

        this.draw();
    };

    this.draw = function() {
        c.drawImage(bubbleImages[this.bubbleImageIndex], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    };
}

//helper functions:

function randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// main program:

var bubbleArray = [];

function init() {
    bubbleArray = [];
    for (let i = 0; i < 100; i++) {
        let radius = randomIntInRange(10, 80);
        let x = randomIntInRange(radius, canvas.width - radius);
        let y = randomIntInRange(0, canvas.height - radius);
        let velX = randomIntInRange(-1, 1);
        let velY = randomIntInRange(-1, 1);
        bubbleArray.push(new Bubble(x, y, velX, velY, radius));
    }   
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bubbleArray.length; i++) {
        bubbleArray[i].update();
    }
}

init();
animate();
