# Drawing-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

I made a web page in which through canvas you can draw. In this canvas box you can draw with different brush sizes and change the color of the brush. There is also a clear button to clear the whole canvas.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![drawing-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/draw-0.jpg)

![drawing-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/draw-1.jpg)

![drawing-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/draw-2.jpg)

![drawing-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/draw-3.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Drawing%20page`

## Video

https://user-images.githubusercontent.com/99032604/199621616-777a3055-a1dc-4c1d-a0c4-5e04c222aa27.mp4

## Documentation

These two functions such as `drawCircle()` and `drawLine()` will be in charge of generating the drawings on the canvas:

```
const drawCircle = (x, y) =>{

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

}

const drawLine = (x1, y1, x2, y2) =>{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}
```
