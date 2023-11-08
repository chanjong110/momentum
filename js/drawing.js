const fillBtn = document.getElementById("Fill-btn");
const saveBtn = document.getElementById("saveimage");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const fontWidth = document.getElementById("font-size");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const fontFamilyInput = document.getElementById("font-styles");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.linewidth = lineWidth.value;
ctx.lineCap = "round";
let isDrawing = false;
let isPainting = false;
let isBgfilling = false;
let fontsize = "25";
let fontFamily = "Arial";

// 선+펜 작업
function onMove(event){
    if(isBgfilling){}
    else if(isDrawing && isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.fill();
        return;
    }
    else if(isDrawing){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return; 
    };
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isDrawing = true; 
}

function cancelPainting(){
    isDrawing = false;
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// 선 모드
function onModeClick(){
    if(isPainting){
        isPainting = false
        modeBtn.innerText = "Bold Draw🎨"
    } else{isPainting = true 
        modeBtn.innerText = "Stroke🎨"};
    }
    modeBtn.addEventListener("click", onModeClick);

// 선 굵기
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
lineWidth.addEventListener("change", onLineWidthChange);

// 색상 
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
color.addEventListener("change", onColorChange);

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

// 그림판 전체 색
function onCanvasClick(){
    if(isBgfilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
canvas.addEventListener("click", onCanvasClick);

// 전체 지우개
function onDestroyClick(){
    if(confirm("Are you sure to Reset Page?")){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    } else{alert("Keep Drawing!")};
}
destroyBtn.addEventListener("click", onDestroyClick);

// 부분 지우개
function onEraserClick(){
    isPainting = false;
    ctx.strokeStyle = "white";
}
eraserBtn.addEventListener("click", onEraserClick);

// 캔버스 전체 색 채우기
function onFillClick(){
    if(isBgfilling){
        isBgfilling = false
        fillBtn.innerText = "Draw Paint🖍️"
    } else{
        isBgfilling = true
        fillBtn.innerText = "Now Filling Mode🏮"
    };
}

function onFill(event){
}
fillBtn.addEventListener("click", onFillClick);


// 이미지 캔버스에 올리기
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
fileInput.addEventListener("change", onFileChange);

// 이미지 저장
function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "my Drawing.png";
    a.click();
}
saveBtn.addEventListener("click", onSaveClick);

// 텍스트 입력
function onDoubleClick(event){
    const text = textInput.value;
    if(text !==""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${fontsize}px ${fontFamily}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
}
}
canvas.addEventListener("dblclick", onDoubleClick);

// 폰트 사이즈
function onFontWidth(event){
    fontsize = event.target.value;
}
fontWidth.addEventListener("change", onFontWidth);

// 폰트 종류 변경
function onFontChange(event){  
    fontFamily = event.target.value;
}
fontFamilyInput.addEventListener("change", onFontChange);