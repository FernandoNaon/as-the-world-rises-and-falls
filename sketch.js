let n = 350;
let nodes = [];
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB);
  for (let i = 0; i < n * 10; i++) {
    let angle = random(TWO_PI);
    let radius = random(min(windowWidth, windowHeight) * 0.4);
    nodes.push({
      x: radius * cos(angle),
      y: radius * sin(angle),
      noiseOffsetX: random(5000),
      noiseOffsetY: random(2000),
      noiseScale: random(50, 200),
    });
  }
  strokeWeight(0.001);
  frameRate(500);
}

function draw() {
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  let maxRadius = min(windowWidth, windowHeight) * 0.4;

  fill(5, 0.05);
  stroke((t * 99) % 256, 255, 255, 200);

  for (let i = 0; i < n; i++) {
    let node = nodes[i];
    let d = dist(node.x, node.y, 0, 0);

    node.x +=
      6 -
      12 *
        noise(
          node.x / node.noiseScale + node.noiseOffsetX,
          d / node.noiseScale,
          t
        );
    node.y +=
      4 -
      8 *
        noise(
          node.y / node.noiseScale + node.noiseOffsetY,
          d / node.noiseScale,
          t
        );

    if (dist(node.x, node.y, 0, 0) > maxRadius) {
      let angle = atan2(node.y, node.x);
      node.x = maxRadius * cos(angle);
      node.y = maxRadius * sin(angle);
    }

    let x = node.x + centerX;
    let y = node.y + centerY;

    point(x, y);
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let x1 = nodes[i].x + centerX;
      let y1 = nodes[i].y + centerY;
      let x2 = nodes[j].x + centerX;
      let y2 = nodes[j].y + centerY;
      let distance = dist(x1, y1, x2, y2);

      if (distance < 2) {
        strokeWeight(0.2);
        line(x1, y1, x2, y2);
      }
    }
  }
  

  t += 0.009;
}


