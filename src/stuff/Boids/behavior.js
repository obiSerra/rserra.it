export const avoidBorders = ($canvas, boid, simulationParams) => {
  if (boid.x < simulationParams.borderSize) {
    boid.updateDeltaX(simulationParams.borderDirectionChange);
  } else if (boid.x > $canvas.width - simulationParams.borderSize) {
    boid.updateDeltaX(-simulationParams.borderDirectionChange);
  }
  if (boid.y < simulationParams.borderSize) {
    boid.updateDeltaY(simulationParams.borderDirectionChange);
  } else if (boid.y > $canvas.height - simulationParams.borderSize) {
    boid.updateDeltaY(-simulationParams.borderDirectionChange);
  }
};

const getDistance = (x, y, x1, y1) => Math.sqrt(Math.pow(Math.abs(x - x1), 2) + Math.pow(Math.abs(y - y1), 2));

export const cohesion = (flock, boid, simulationParams) => {
  let avgPoint = [boid.x, boid.y];
  for (let b of flock) {
    if (b.id !== boid.id && b.group === boid.group) {
      if (getDistance(b.x, b.y, boid.x, boid.y) < simulationParams.cohesionRange) {
        avgPoint = [(avgPoint[0] + b.x) / 2, (avgPoint[1] + b.y) / 2];
      }
    }
  }

  if (avgPoint[0] > boid.x) boid.updateDeltaX(simulationParams.cohesionDirectionChange);
  else if (avgPoint[0] < boid.x) boid.updateDeltaX(-simulationParams.cohesionDirectionChange);
  if (avgPoint[1] > boid.y) boid.updateDeltaY(simulationParams.cohesionDirectionChange);
  else if (avgPoint[1] < boid.y) boid.updateDeltaY(-simulationParams.cohesionDirectionChange);
};

export const separation = (flock, boid, simulationParams) => {
  let avgPoint = [boid.x, boid.y];
  for (let b of flock) {
    if (b.id !== boid.id) {
      if (getDistance(b.x, b.y, boid.x, boid.y) < simulationParams.separationRange) {
        avgPoint = [(avgPoint[0] + b.x) / 2, (avgPoint[1] + b.y) / 2];
      }
    }
  }
  if (avgPoint[0] > boid.x) boid.updateDeltaX(-simulationParams.separationDirectionChange);
  else if (avgPoint[0] < boid.x) boid.updateDeltaX(simulationParams.separationDirectionChange);
  if (avgPoint[1] > boid.y) boid.updateDeltaY(-simulationParams.separationDirectionChange);
  else if (avgPoint[1] < boid.y) boid.updateDeltaY(simulationParams.separationDirectionChange);
};

export const alignment = (flock, boid, simulationParams) => {
  let avgPoint = [boid.deltaX, boid.deltaY];
  for (let b of flock) {
    if (b.id !== boid.id && b.group === boid.group) {
      if (getDistance(b.x, b.y, boid.x, boid.y) < simulationParams.alignmentRange) {
        avgPoint = [(avgPoint[0] + b.deltaX) / 2, (avgPoint[1] + b.deltaY) / 2];
      }
    }
  }
  if (avgPoint.length === 1) return null;
  if (avgPoint[0] > boid.deltaX) boid.updateDeltaX(simulationParams.alignmentDirectionChange);
  else if (avgPoint[0] < boid.deltaY) boid.updateDeltaX(-simulationParams.alignmentDirectionChange);
  if (avgPoint[1] > boid.deltaX) boid.updateDeltaY(simulationParams.alignmentDirectionChange);
  else if (avgPoint[1] < boid.deltaY) boid.updateDeltaY(-simulationParams.alignmentDirectionChange);
};
