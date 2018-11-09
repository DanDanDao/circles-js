window.onload = function () {
    var canvas = document.getElementById('canvas');
    c = canvas.getContext('2d');

    var innerWidth = window.innerWidth - 17,
        innerHeight = window.innerHeight - 20,
        TWO_PI = Math.PI * 2,
        circleArray = [],
        NumOfCircles = 100;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

// Create multi color circles
//     var colorArray = new Array();
    var colorArray = ['#FFDF40', '#54D169', '#15EDED', '#FF7C6E'];


// Function for add colors
    var params = location.search.replace(/^\?/, '').split('&');
    for (var i = 0; i < params.length; i += 1) {
        var key_val = params[i].split('=');
        if (key_val.length >= 2) {
            colorArray.push("#" + key_val[1]);
        }
    }

    for (var i = 0; i < colorArray.length; i += 1) {
        var btn = document.createElement("BUTTON");

        btn.style.backgroundColor = colorArray[i];
        btn.style.height = "40px";
        btn.style.width = "40px";
        btn.style.margin = "5px";
        btn.style.border = "1px solid var(--main-border-color)";
        btn.style.borderRadius = "5px";
        btn.classList.add("color");

        var addedColors = document.getElementById("added-colors");
        addedColors.appendChild(btn);
        btn.onclick = function () {
            colorArray.splice(0, 1);
            console.log(colorArray);

        }
    }

// Function for creating circle
    function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.radius = radius;

        // Create function for animate circle

        this.update = function () {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += 2 * this.dx;
            this.y += 2 * this.dy;

            this.draw();
        };

        // Create function for draw circle
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, TWO_PI, false);
            c.strokeStyle = 'var(--main-border-color)';
            c.fillStyle = this.color;
            c.stroke();
            c.fill();
            c.closePath();
        };
    }

// Run Circle function for creating new circle
// Create multiple circles
    for (var i = 0; i < NumOfCircles; i++) {
        var radius = Math.random() * 50; // Random circle size
        var x = Math.random() * (innerWidth - radius * 2) + radius; // Random X Position
        var y = Math.random() * (innerHeight - radius * 2) + radius; // Random Y position
        var dx = (Math.random() - 0.5) * 2; // Random X velocity
        var dy = (Math.random() - 0.5) * 2; // Random Y velocity
        circleArray.push(new Circle(x, y, dx, dy, radius)); // Create new circle
    }

// Function for animate canvas elements
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);

        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    }

    animate();
}
