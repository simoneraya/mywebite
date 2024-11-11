let t = 0;  // Time variable
let targetPoints = [];  // To store the target positions for the letters
let canvas;

function setup() {
    canvas = createCanvas(400, 400); // Adjust dimensions as needed
    canvas.parent("sketch-container"); // Attach the canvas to the div
    background(220); // Optional: Set a background color for visibility
  
    // Define the target points for the letters of "Simone"
    targetPoints = defineSimonePoints();
}

function draw() {
    background("rgb(160,160,246)");
    noFill();
    stroke(255, 150);
  
    for (let i = 0; i < width; i += 10) {
        beginShape();
        for (let j = 0; j < height; j += 10) {
            let x = i + noise(t + i * 0.01) * 50;
            let y = j + noise(t + j * 0.01) * 50;
          
            // Calculate the distance between the mouse and the point
            let d = dist(mouseX, mouseY, x, y);
          
            // If the mouse is near the point, make it converge toward the "Simone" shape
            if (d < 150) {
                let closestPoint = findClosestPoint(x, y, targetPoints);
                let lerpAmount = map(d, 0, 150, 1, 0);  // Closer points converge more
                x = lerp(x, closestPoint.x, lerpAmount);
                y = lerp(y, closestPoint.y, lerpAmount);
            }

            vertex(x, y);  // Create a vertex at the new x, y position
        }
        endShape();
    }
    t += 0.01;  // Increment time for continuous change
}

// Function to define points for drawing the name "Simone"
function defineSimonePoints() {
    let points = [];
  
    // Define approximate points for each letter in "Simone"
    points.push(createVector(150, 150));  // Starting point of "S"
    points.push(createVector(160, 170));  // Another point in "S"
    // Add more points for "S"...

    points.push(createVector(200, 150));  // Starting point of "I"
    // Add more points for "I"...

    points.push(createVector(250, 150));  // Starting point of "M"
    // Add more points for "M"...

    // Add points for other letters...

    return points;
}

// Function to find the closest point in the targetPoints array
function findClosestPoint(x, y, points) {
    let closest = null;
    let minDist = Infinity;
    for (let pt of points) {
        let d = dist(x, y, pt.x, pt.y);
        if (d < minDist) {
            minDist = d;
            closest = pt;
        }
    }
    return closest;
}
