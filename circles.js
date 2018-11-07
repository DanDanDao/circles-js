var canvas = document.getElementById('canvas');
c = canvas.getContext('2d');

var innerWidth = window.innerWidth,
  innerHeight = 40,
  TWO_PI = Math.PI * 2,
  circleArray = [],
  NumOfCircles = 10;

canvas.width = innerWidth;
canvas.height = innerHeight;

// Create multi color circles
var colorArray = ['#01D8FE', '#54D169', '#fff290'];

// Function for creating circle
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.radius = radius;

  // Create function for animte circle

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += 3 * this.dx;
    this.y += 3 * this.dy;

    this.draw();
  };

  // Create function for draw circle
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, TWO_PI, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
}

// Run Circle function for creating new circle
// Create multiple circles
for (var i = 0; i < NumOfCircles; i++) {
  var radius = Math.random() * 100 + 50; // Random circle size
  var x = Math.random() * (innerWidth - radius * 2) + radius; // Random X Position
  var y = Math.random() * (innerHeight - radius * 2) + radius; // Random Y position
  var dx = (Math.random() - 0.5) * 2; // Random X velocity
  var dy = (Math.random() - 0.5) * 2; // Random Y velocity
  circleArray.push(new Circle(x, y, dx, dy, radius)); // Create new circle
}

// Function for animte canvas elements
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
