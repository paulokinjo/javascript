const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    context.fillStyle = 'blue';

    const { x, y } = this.position;
    context.fillRect(x, y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    const { x, y } = this.position;

    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const map = [
  ['-', '-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', ' ', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-', '-'],
];

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          }),
        );
        break;

      default:
        break;
    }
  });
});

let lastKeyPressed = '';
addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      for (let i = 0; i < boundaries.length; i++) {
        if (
          checkCollision(
            { ...player, velocity: { x: 0, y: -5 } },
            boundaries[i],
          )
        ) {
          player.velocity.y = 0;
          break;
        } else {
          player.velocity.y = -5;
        }
      }

      break;
    case 'a':
      player.velocity = { x: -5, y: 0 };
      break;
    case 's':
      player.velocity = { x: 0, y: 5 };
      break;
    case 'd':
      player.velocity = { x: 5, y: 0 };
      break;
  }
});

function checkCollision(circle, rectangle) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((b) => {
    b.draw();
    if (checkCollision(player, b)) {
      player.velocity = { x: 0, y: 0 };
    }
  });

  player.update();
}

animate();
