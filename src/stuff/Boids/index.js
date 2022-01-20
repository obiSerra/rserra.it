import React, { useRef, useEffect, useState } from "react";
import { mainLoop } from "./stage";
import { generateBoids } from "./boid";
import "./boids.scss";

import { cohesion, separation, alignment, avoidBorders } from "./behavior";

import Slider, { Checkbox, Number } from "./Slider";

const render = ($canvas, ctx, boids, simulationParams) => {
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

const colors = ["white", "yellow", "lime", "purple"];

function BoidsComponent() {
  let boids = [];
  const cvsRef = useRef(null);
  const [group1Num, setGroup1Num] = useState(10);
  const [group2Num, setGroup2Num] = useState(0);
  const [group3Num, setGroup3Num] = useState(0);
  const [group4Num, setGroup4Num] = useState(0);

  const [params, setParams] = useState({
    debug: true,
    debugAll: false,
    borderSize: 30,
    borderDirectionChange: 3,
    maxAllowedSpeed: 20,
    cohesionRange: 100,
    cohesionDirectionChange: 2,
    separationRange: 20,
    separationDirectionChange: 4,
    alignmentRange: 50,
    alignmentDirectionChange: 1,
  });

  const startSimulation = () => {
    const $canvas = cvsRef.current;
    const ctx = $canvas.getContext("2d");
    setParams(params)

    boids = generateBoids(params, group1Num, $canvas, colors[0], colors[0]);
    boids = [...boids, ...generateBoids(params, group2Num, $canvas, colors[1], colors[1])];
    boids = [...boids, ...generateBoids(params, group3Num, $canvas, colors[2], colors[2])];
    boids = [...boids, ...generateBoids(params, group4Num, $canvas, colors[3], colors[3])];

    mainLoop(Math.random() * 10000, (delta, start, timestamp) => {
      for (let boid of boids) {
        separation(boids, boid, params);
        cohesion(boids, boid, params);
        alignment(boids, boid, params);
        avoidBorders($canvas, boid, params);
        boid.move(delta);
      }

      render($canvas, ctx, boids, params);
    });
  };

  useEffect(() => {
    startSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          border: "1px solid #000",
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
          <form className="boid-form d-flex flex-column p-3 right-col">
            <div className="d-flex flex-row tool-panel">
              <Number name="group1" label={makeLabel(colors[0])} onUpdate={setGroup1Num} startVal={group1Num} />
              <Number name="group2" label={makeLabel(colors[1])} onUpdate={setGroup2Num} startVal={group2Num} />
              <Number name="group3" label={makeLabel(colors[2])} onUpdate={setGroup3Num} startVal={group3Num} />
              <Number name="group4" label={makeLabel(colors[3])} onUpdate={setGroup4Num} startVal={group4Num} />
            </div>
            <div className="d-flex flex-column tool-panel">
              <button type="button" className="btn btn-light" onClick={startSimulation}>
                Regenerate
              </button>
            </div>
          </form>
          <form className="boid-form d-flex flex-column p-3">
            <div className="d-flex flex-column tool-panel">
              <div className="d-flex flex-column">
                <Slider
                  name="borderSize"
                  label="Border Size"
                  startVal={params.borderSize}
                  minVal="0"
                  maxVal="100"
                  onUpdate={value => (params["borderSize"] = value)}
                />
                <Slider
                  name="borderDirectionChange"
                  label="Border direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal={params.borderDirectionChange}
                  onUpdate={value => (params["borderDirectionChange"] = value)}
                />
              </div>
              <div className="d-flex flex-column">
                <Slider
                  name="cohesionRange"
                  label="Cohesion range"
                  minVal="0"
                  maxVal="200"
                  startVal={params.cohesionRange}
                  onUpdate={value => (params["cohesionRange"] = value)}
                />
                <Slider
                  name="cohesionDirectionChange"
                  label="Cohesion direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal={params.cohesionDirectionChange}
                  onUpdate={value => (params["separationRange"] = value)}
                />
              </div>
              <div className="d-flex flex-column">
                <Slider
                  name="separationRange"
                  label="Separation range"
                  minVal="0"
                  maxVal="200"
                  startVal={params.separationRange}
                  onUpdate={value => (params["separationRange"] = value)}
                />
                <Slider
                  name="separationDirectionChange"
                  label="Separation direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal={params.separationDirectionChange}
                  onUpdate={value => (params["separationDirectionChange"] = value)}
                />
              </div>
              <div className="d-flex flex-column">
                <Slider
                  name="alignmentRange"
                  label="Alignment range"
                  minVal="0"
                  maxVal="200"
                  startVal={params.alignmentRange}
                  onUpdate={value => (params["alignmentRange"] = value)}
                />
                <Slider
                  name="alignmentDirectionChange"
                  label="Alignment direction changes"
                  minVal="0"
                  maxVal="10"
                  startVal={params.alignmentDirectionChange}
                  onUpdate={value => (params["alignmentDirectionChange"] = value)}
                />
              </div>
              <div className="d-flex flex-column">
                <Checkbox
                  name="debug"
                  label="Debug Mode"
                  startVal={params["debug"]}
                  onUpdate={value => {
                    params["debug"] = value;
                  }}
                />
                <Checkbox
                  name="debugAll"
                  label="Debug All"
                  startVal={params["debugAll"]}
                  onUpdate={value => {
                    params["debugAll"] = value;
                  }}
                  params={params}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BoidsComponent;
