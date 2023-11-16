---
title: HTML5 canvas optimization
date: "2023-07-14"
description: "Discovering and testing canvas optimization while preparing for the js13kgames 2023"
---

<style> img {max-width: 600px}</style>

## Introduction

Almost every year around July, I start preparing for the [js13kgames](https://js13kgames.com/), a game dev competition that requires creating an HTML5 game that compressed weight at most 13kb. There are many ad-hoc engines that allow the participants to focus on the game instead of everything else; the problem is, I find this "everything else" at least as interesting as working on the game itself, so every year I start working on a new engine from scratch, and 90% of the time I'm not able to finish my game in time...

This year I started yet another engine/setup from scratch using TypeScript, but I decided to record here all the optimization, improvements, or anything else I found along the way, to avoid losing all this knowledge.
All the code can be found [here](https://github.com/obiSerra/jsk13k-2023-engine)

## Prerendering complex paths

For this first optimization I'm trying to render and move around the canvas a slightly complex canvas path, without adding any logic such collision detection, physic or similar.
I'm using `requestAnimationFrame` for the render loop and `setTimeout` for the update loop
In both cases I'm using this function render a mushroom shape:

```ts
const drawMush = (ctx, pos) => {
  let [x, y] = pos
  x = Math.round(x)
  y = Math.round(y)
  const m = new Path2D()
  const w = 8
  const tw = 12
  const sr = 3
  // bottom part
  m.moveTo(x - w, y)
  m.arc(x, y, w, 0, Math.PI, false)
  ctx.fillStyle = "#fff"
  ctx.fill(m)
  ctx.stroke(m)
  // Top part
  const mt = new Path2D()
  mt.moveTo(x - tw, y)
  mt.arc(x, y, tw, 0, Math.PI, true)
  ctx.fillStyle = "red"
  ctx.fill(mt)
  ctx.stroke(mt)
  ctx.save()
  ctx.clip(mt)
  const ms = new Path2D()
  spots.forEach(p => {
    const [vx, vy] = p
    ms.moveTo(x + vx + sr, y + vy)
    ms.arc(x + vx, y + vy, sr, 0, 2 * Math.PI, false)
  })
  ctx.fillStyle = "#fff"
  ctx.fill(ms)
  ctx.stroke(ms)
  ctx.restore()
}
```

As we can see the in following image, the rendering frame rate (_uFPS_) drops below 10 with 400 shapes

![not optimized](./not-optimized.gif)

The only optimization used in this case is to pre-render the shape inside a temporary canvas, get the content as an image and then render it to the final canvas using `ctx.drawImage`

```ts
export const preRender = (dim: IVec, renderFn: RenderFn) => {
  const prC = document.createElement("canvas")
  const [w, h] = dim
  prC.width = w
  prC.height = h
  const ctx = prC.getContext("2d")
  renderFn(ctx, [prC.width / 2, prC.height / 2])
  const imgSrc = prC.toDataURL("image/png")
  const img = document.createElement("img")
  img.src = imgSrc
  return img
}
```

![optimized](./optimized.gif)

After this optimization, the rendering framerate remain around 60 FPS.

**NOTE: this post is a work in progress, I'll add new tips and optmization as I found them**
