import React, { useRef, useEffect } from "react";
import "./Graham.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function applyCvs(pointCnt, cvs, ctx, defaultColor) {
  function colorPoint(p, color = defaultColor) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, cvs.height - p.y, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.fillStyle = defaultColor;
  }

  function drawGraph(points, color = defaultColor) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(
      points[points.length - 1].x,
      cvs.height - points[points.length - 1].y
    );
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(points[i].x, cvs.height - points[i].y);
    }
    ctx.stroke();
    ctx.strokeStyle = defaultColor;
  }

  function setup() {
    const points = [];
    for (let i = 0; i < pointCnt; i++) {
      points.push({
        x: getRandomInt(500) + 50,
        y: getRandomInt(500) + 50,
        label: i
      });
    }
    return points;
  }

  return { colorPoint, drawGraph, setup };
}

function polarAngle(base, p) {
  return Math.atan2(p.y - base.y, p.x - base.x);
}

function isTurnLeft(p1, p2, p3) {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
}

function grahamScan(points) {
  // Let's deep clone the point list
  const pts = points.map(x => JSON.parse(JSON.stringify(x)));
  console.log("pts", JSON.stringify(pts));
  // Find the point with the lowest y
  let low = pts.reduce((acc, v) => (v.y < acc.y ? v : acc));

  let ordered = points
    .map(p => {
      p.angle = polarAngle(low, p);
      return p;
    })
    .sort((p1, p2) => p2.angle - p1.angle);
  // and remove it from the point list
  //const pts = pts.filter(p => p.x !== low.x && p.y !== low.y);
  // Order the remaining points based on their polar angle
  console.log("ordered", JSON.stringify(ordered), ordered);
  let hull = [ordered[ordered.length - 1], low];

  for (let i = 0; i < ordered.length; i++) {
    if (hull.length > 2) {
      while (
        isTurnLeft(hull[hull.length - 2], hull[hull.length - 1], ordered[i])
      ) {
        hull.pop();
      }
    }
    hull.push(ordered[i]);
  }
  hull.pop();
  return hull;
}

function Stuff() {
  let pointCnt = 30;
  const cvsRef = useRef(null);
  const generateGraph = () => {
    const cvs = cvsRef.current;

    const ctx = cvs.getContext("2d");
    const defaultColor = "tomato";
    ctx.font = "12px serif";
    const fns = applyCvs(pointCnt, cvs, ctx, defaultColor);
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const pointList = fns.setup();

    pointList.forEach(p => {
      fns.colorPoint(p);
      ctx.fillText(p.label, p.x + 2, cvs.height - p.y - 2);
    });

    const hull = grahamScan(pointList);

    fns.drawGraph(hull);
  };
  useEffect(() => {
    generateGraph();
  });

  return (
    <div className="text-center">
      <h1>Graham Scan</h1>
      <div className="d-flex mt-5">
        <div className="d-flex flex-column p-3">
          <h3 className="m-3">Graham Scam Algorithm </h3>
          <div className="text-left">
            <p>
              Graham's scan is a method of finding the convex hull of a finite
              set of points in the plane with time complexity O(n log n). It is
              named after Ronald Graham, who published the original algorithm in
              1972.[1] The algorithm finds all vertices of the convex hull
              ordered along its boundary. It uses a stack to detect and remove
              concavities in the boundary efficiently.
              <br />
              source:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Graham_scan"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://en.wikipedia.org/wiki/Graham_scan
              </a>
            </p>
            <br />
            <p>
              Based on the explanation from{" "}
              <a
                href="http://shop.oreilly.com/product/0636920032885.do"
                target="_blank"
                rel="noopener noreferrer"
              >
                Algorithms in a Nutshell, 2nd Edition{" "}
              </a>
            </p>
            <br />
            <p>
              Code written by me (Roberto Serra);{" "}
              <a
                href="https://github.com/obiSerra/algorithms/blob/master/graham-scan/graham-scan.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                original source
              </a>
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-light"
              onClick={generateGraph}
            >
              Generate new
            </button>
            <br />
            <small>All Points are generated randomly</small>
          </div>
        </div>

        <div>
          <canvas width="600" height="600" ref={cvsRef} />
        </div>
      </div>
    </div>
  );
}

export default Stuff;
