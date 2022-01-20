export class Boid {
  constructor(x, y, deltaX, deltaY, params, color = "black", group = "a", isFirst = false) {
    this.id = Math.random() * 100000;
    this.x = x;
    this.y = y;
    this.deltaX = Math.min(deltaX, params.maxAllowedSpeed);
    this.deltaY = Math.min(deltaY, params.maxAllowedSpeed);
    this.maxAllowedDelta = params.maxAllowedSpeed;
    this.color = color;
    this.params = params;
    this.group = group;
    this.isFirst = isFirst;
  }

  updateDeltaX(deltaX) {
    this.deltaX += deltaX;
    const sign = this.deltaX > 0 ? +1 : -1;
    this.deltaX = Math.min(Math.abs(this.deltaX), this.maxAllowedDelta) * sign;
  }
  updateDeltaY(deltaY) {
    this.deltaY += deltaY;
    const sign = this.deltaY > 0 ? +1 : -1;
    this.deltaY = Math.min(Math.abs(this.deltaY), this.maxAllowedDelta) * sign;
  }

  move(deltaT) {
    if (deltaT > 0) {
      this.x += this.deltaX * (1 / deltaT);
      this.y += this.deltaY * (1 / deltaT);
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "#000";
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    if (this.params.debug && (this.params.debugAll || this.isFirst)) {
      ctx.beginPath();
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.params.cohesionRange, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.params.separationRange, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}

const randomDirection = () => (Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1);

export const generateBoids = (params, num, $canvas, color = "#000", group = "a") => {
  const boids = [];

  for (let i = 0; i < num; i++) {
    const dX = Math.floor(Math.random() * 20) * randomDirection();
    const dY = Math.floor(Math.random() * 20) * randomDirection();

    const x = Math.floor(Math.random() * ($canvas.width - 20)) + 10;
    const y = Math.floor(Math.random() * ($canvas.height - 20)) + 10;
    const boid = new Boid(x, y, dX, dY, params, color, group, i === 0);
    boids.push(boid);
  }
  return boids;
};
