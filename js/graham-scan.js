/**

 Graham's scan implementation

 from Algorithms in a Nutshell 2nd Edition, O'Reilly
 (page 43)

 To run, just open the index.html with a browser

*/


(function() {
  /**
     Setup code
   */
  const randomPoints = true;
  const cvs = document.querySelector("canvas");
  const ctx = cvs.getContext("2d");
  const defaultColor = 'orange';
    ctx.font = '12px serif';

  function colorPoint(p, color = defaultColor) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, cvs.height - p.y, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.fillStyle = defaultColor;
  }

  function readPoints () {
    return [].slice.call(document.querySelectorAll("li.point"))
        .map(p => p.innerText.replace(/[\s:xy]/g, "").split(",").map(c => parseInt(c, 10)))
        .map((pc, i) => ({x: pc[0], y: pc[1], label: i}));
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function drawGraph(points, color=defaultColor) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[points.length-1].x, cvs.height - points[points.length-1].y);
    for(let i=0; i<points.length;i++){
      ctx.lineTo(points[i].x, cvs.height - points[i].y);
    }
    ctx.stroke();
    ctx.strokeStyle = defaultColor;
  }

  function setup () {
    if (randomPoints) {
      const pointContainer = document.querySelector(".point-list");
      [].slice.call(document.querySelectorAll("li.point")).forEach(p => pointContainer.removeChild(p));

      for (let i=0; i<20; i++){
        const el = document.createElement("li");
        el.className = "point";
        el.innerText = `${getRandomInt(500) + 50}, y: ${getRandomInt(500) + 50}`;
        pointContainer.appendChild(el);
      }
    }

    readPoints()
      .forEach((p) => {
        colorPoint(p);
        ctx.fillText(p.label, p.x + 2, cvs.height - p.y - 2);
      });
  }

  // Generating the points
  setup();


  /**
  *   Algorithm implementation
  */

  const pointList = readPoints();
  function polarAngle(base, p){
    return Math.atan2(p.y - base.y, p.x - base.x);
  }

  function isTurnLeft(p1, p2 ,p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
  }

  function grahamScan (points){
    // Let's deep clone the point list
    let pts = JSON.parse(JSON.stringify(points));
    // Find the point with the lowest y
    let low = pts.reduce((acc, v) => v.y < acc.y ? v : acc);
    // and remove it from the point list
    pts = pts.filter(p => p.x !== low.x && p.y !== low.y);
    // Order the remaining points based on their polar angle
    let ordered = pts.map(p => {
      p.angle = polarAngle(low, p);
      return p;
    }).sort((p1, p2) => p1.angle < p2.angle);

    let hull = [ordered[ordered.length-1], low];

    for (let i=0; i<ordered.length; i++){
      if(hull.length > 2){
        while(isTurnLeft(hull[hull.length-2], hull[hull.length-1], ordered[i])){
          hull.pop();
        }
      }
      hull.push(ordered[i]);
    }
    hull.pop();
    return hull;
  }


  const hull = grahamScan(pointList);

  drawGraph(hull)

}());
