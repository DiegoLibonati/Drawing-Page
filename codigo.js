const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");

const ctx = canvas.getContext("2d");

let size = 30;
let x = undefined;
let y = undefined;
let isPressed = false;
let color = "black";


canvas.addEventListener("mousedown", ()=>{

    isPressed = true;


    x = e.offsetX;
    y = e.offsetY;



});

canvas.addEventListener("mouseup", ()=>{

    isPressed = false;

    x = undefined;
    y = undefined;

});

canvas.addEventListener("mousemove", (e)=>{

    if (isPressed){
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x, y);
        drawLine(x , y, x2, y2);
        x = x2;
        y = y2;
    }

});

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

increaseBtn.addEventListener("click", () =>{

    size += 1

    if (size > 50){
        size = 50;
    }

    updateSizeOnScreen()
});


decreaseBtn.addEventListener("click", () =>{

    size -= 1

    if (size < 1){
        size = 1;
    }

    updateSizeOnScreen()
});

const updateSizeOnScreen = ()=>{

    sizeElement.innerHTML = size;

}

colorElement.addEventListener("change", (e)=>{

    color = e.target.value;

});

clearElement.addEventListener("click", (e)=>{

    ctx.clearRect(0,0, canvas.width, canvas.height);

});