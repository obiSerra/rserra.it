import React, { useRef, useEffect, useState } from "react";
import { mainLoop } from "./stage";
import { simulationParams } from "./params";
import { generateBoids } from "./boids";
import "./boids.scss";

import Slider, { Checkbox, Number } from "./Slider";

const render = ($canvas, ctx, boids) => {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);

  if (simulationParams.debug) {
    const bSize = simulationParams.borderSize;
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "tomato";
    ctx.rect(bSize, bSize, $canvas.width - bSize * 2, $canvas.height - bSize * 2);
    ctx.stroke();
  }
  for (let boid of boids) {
    boid.render(ctx);
  }
};

const avoidBorders = ($canvas, boid) => {
  if (boid.x < simulationParams.borderSize) {
    boid.updateDeltaX(simulationParams.borderDirectionChange);
  }
  if (boid.x > $canvas.width - simulationParams.borderSize) {
    boid.updateDeltaX(-simulationParams.borderDirectionChange);
  }
  if (boid.y < simulationParams.borderSize) {
    boid.updateDeltaY(simulationParams.borderDirectionChange);
  }
  if (boid.y > $canvas.height - simulationParams.borderSize) {
    boid.updateDeltaY(-simulationParams.borderDirectionChange);
  }
};

const getDistance = (x, y, x1, y1) => Math.sqrt(Math.pow(Math.abs(x - x1), 2) + Math.pow(Math.abs(y - y1), 2));

const cohesion = (flock, boid) => {
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

const separation = (flock, boid) => {
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

const colors = [
  'white',
  'blue',
  'lime',
  'purple'
];

function Boids() {
  let boids = [];
  const cvsRef = useRef(null);
  const [group1Num, setGroup1Num] = useState(10);
  const [group2Num, setGroup2Num] = useState(5);
  const [group3Num, setGroup3Num] = useState(5);
  const [group4Num, setGroup4Num] = useState(5);

  const startSimulation = () => {
    const $canvas = cvsRef.current;
    const ctx = $canvas.getContext("2d");

    boids = generateBoids(simulationParams.maxAllowedSpeed, group1Num, $canvas, colors[0], "a");
    boids = [...boids, ...generateBoids(simulationParams.maxAllowedSpeed, group2Num, $canvas, colors[1], "b")];
    boids = [...boids, ...generateBoids(simulationParams.maxAllowedSpeed, group3Num, $canvas, colors[2], "c")];
    boids = [...boids, ...generateBoids(simulationParams.maxAllowedSpeed, group4Num, $canvas, colors[3], "c")];

    console.log("boids", boids.length);

    mainLoop(Math.random() * 10000, (delta, start, timestamp) => {
      for (let boid of boids) {
        cohesion(boids, boid);
        separation(boids, boid);
        avoidBorders($canvas, boid);
        boid.move(delta);
      }
      console.log("new loop id", boids.length);

      render($canvas, ctx, boids);
    });
  };

  useEffect(() => {
    startSimulation();
  }, []);

  const makeLabel = color => (
    <>
      Group{" "}
      <span
        style={{
          width: 20,
          height: 20,
          display: "inline-block",
          backgroundColor: color,
          borderRadius: 10,
          position: "relative",
          bottom: -5,
          border: '1px solid #000'
        }}
      ></span>
    </>
  );

  return (
    <div className="text-center">
      <h1>Boids</h1>
      <div className="d-flex mt-5">
        <div className="d-flex flex-column p-3 boid">
          <div>
            <canvas width="600" height="600" ref={cvsRef} />
          </div>
          <form className="boid-form d-flex flex-column p-3">
            <div className="d-flex flex-row tool-panel">
              <Number name="group1" label={makeLabel(colors[0])} onUpdate={setGroup1Num} startVal={group1Num} />
              <Number name="group2" label={makeLabel(colors[1])} onUpdate={setGroup2Num} startVal={group2Num} />
              <Number name="group3" label={makeLabel(colors[2])} onUpdate={setGroup3Num} startVal={group3Num} />
              <Number name="group4" label={makeLabel(colors[3])} onUpdate={setGroup4Num} startVal={group4Num} />
            </div>
            <div className="d-flex flex-column tool-panel">
              <div className="d-flex flex-column">
                <Slider name="borderSize" label="Border Size" />
                <Slider
                  name="borderDirectionChange"
                  label="Border direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal="2"
                />
              </div>
              <div className="d-flex flex-column">
                <Slider name="cohesionRange" label="Cohesion range" />
                <Slider
                  name="cohesionDirectionChange"
                  label="Cohesion direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal="2"
                />
              </div>
              <div className="d-flex flex-column">
                <Slider name="separationRange" label="Separation range" />
                <Slider
                  name="separationDirectionChange"
                  label="Separation direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal="2"
                />
              </div>
              <div className="d-flex flex-column">
                <Checkbox name="debug" label="Debug Mode" onUpdate={startSimulation} />
                <Checkbox name="debugAll" label="Debug All" onUpdate={startSimulation} />
              </div>
            </div>
            <div className="d-flex flex-column tool-panel">
              <button type="button" className="btn btn-light" onClick={startSimulation}>
                Regenerate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Boids;
