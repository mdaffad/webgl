function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
    return "coordinate x : " + x + " coordinate y : " + y
} 

let canvasElem = document.getElementById("mycanvas");
  
canvasElem.addEventListener("mousedown", function(e) 
{ 
   
    document.getElementById("coordinate").innerHTML = getMousePosition(canvasElem, e); 
});
