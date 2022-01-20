export const mainLoop = (() => {
  let start = null;
  let prevStep = null;
  let currentLoopId = null;

  const step = (timestamp, onRun, loopId) => {
    if (loopId !== currentLoopId) return;
    if (!start) start = timestamp;
    if (!prevStep) prevStep = timestamp;
    const delta = timestamp - prevStep;
    onRun(delta, start, timestamp, loopId);

    prevStep = timestamp;
    window.requestAnimationFrame(ts => step(ts, onRun, loopId));
  };

  return (loopId, onRun) => {
    currentLoopId = loopId;

    window.requestAnimationFrame(ts => step(ts, onRun, loopId));
  };
})();
