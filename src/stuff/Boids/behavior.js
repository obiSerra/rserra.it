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

export const getDistance = ({ x, y }, { x: x1, y: y1 }) => {
  return Math.sqrt(Math.pow(Math.abs(x - x1), 2) + Math.pow(Math.abs(y - y1), 2));
};

export const cohesion = (flock, boid, simulationParams) => {
  const points = [];
  for (let [distance, b] of flock) {
    if (b.group === boid.group) {
      if (distance < simulationParams.cohesionRange) {
        points.push([b.x, b.y]);
      }
    }
  }
  if (!points.length) return;
  let avgPoint = [0, 0];
  for (const point of points) {
    avgPoint = [avgPoint[0] + point[0], avgPoint[1] + point[1]];
  }
  avgPoint = [avgPoint[0] / points.length, avgPoint[1] / points.length];
  if (avgPoint[0] > boid.x) boid.updateDeltaX(simulationParams.cohesionDirectionChange);
  else if (avgPoint[0] < boid.x) boid.updateDeltaX(-simulationParams.cohesionDirectionChange);
  if (avgPoint[1] > boid.y) boid.updateDeltaY(simulationParams.cohesionDirectionChange);
  else if (avgPoint[1] < boid.y) boid.updateDeltaY(-simulationParams.cohesionDirectionChange);
};

export const separation = (flock, boid, simulationParams) => {
  const points = [];
  for (let [distance, b] of flock) {
    if (distance < simulationParams.separationRange) {
      points.push([b.x, b.y]);
    }
  }
  if (!points.length) return;
  let avgPoint = [0, 0];
  for (const point of points) {
    avgPoint = [avgPoint[0] + point[0], avgPoint[1] + point[1]];
  }
  avgPoint = [avgPoint[0] / points.length, avgPoint[1] / points.length];

  if (avgPoint[0] > boid.x) boid.updateDeltaX(-simulationParams.separationDirectionChange);
  else if (avgPoint[0] < boid.x) boid.updateDeltaX(simulationParams.separationDirectionChange);
  if (avgPoint[1] > boid.y) boid.updateDeltaY(-simulationParams.separationDirectionChange);
  else if (avgPoint[1] < boid.y) boid.updateDeltaY(simulationParams.separationDirectionChange);
};

export const alignment = (flock, boid, simulationParams) => {
  const points = [];
  for (let [distance, b] of flock) {
    if (b.group === boid.group) {
      if (distance < simulationParams.alignmentRange) {
        points.push([b.deltaX, b.deltaY]);
      }
    }
  }
  if (!points.length) return;
  let avgPoint = [0, 0];
  for (const point of points) {
    avgPoint = [avgPoint[0] + point[0], avgPoint[1] + point[1]];
  }
  avgPoint = [avgPoint[0] / points.length, avgPoint[1] / points.length];

  if (avgPoint[0] > boid.deltaX) boid.updateDeltaX(simulationParams.alignmentDirectionChange);
  else if (avgPoint[0] < boid.deltaY) boid.updateDeltaX(-simulationParams.alignmentDirectionChange);
  if (avgPoint[1] > boid.deltaX) boid.updateDeltaY(simulationParams.alignmentDirectionChange);
  else if (avgPoint[1] < boid.deltaY) boid.updateDeltaY(-simulationParams.alignmentDirectionChange);
};
