

  
const lineData = [
    
]
const colorLineData = [
    
]
function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = ((event.clientX - rect.left) - canvas.width/2)/(canvas.width/2);
    let y = (canvas.height/2 - (event.clientY - rect.top))/(canvas.height/2);
    return [x,y]
} 
first = true
const canvas = document.getElementById('mycanvas')
canvas.addEventListener("mousedown", function(e) { 
    const gl = canvas.getContext('webgl2')
    if (!gl) {
    alert('Your browser does not support WebGL')
    }
    gl.clearColor(1,1,1,1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    const vert = `attribute vec2 a_pos;
    void main() {
    gl_Position = vec4(a_pos, 0, 1);
    }`

    const frag = `precision mediump float;

    uniform vec4 u_fragColor;
    void main() {
    gl_FragColor = u_fragColor;
    }`

    const vertShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertShader, vert)
    gl.compileShader(vertShader)

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragShader, frag)
    gl.compileShader(fragShader)

    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertShader)
    gl.attachShader(shaderProgram, fragShader)
    gl.linkProgram(shaderProgram)
    const vertBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineData), gl.DYNAMIC_DRAW)

    // Begin of shader program
    gl.useProgram(shaderProgram)
    const vertexPos = gl.getAttribLocation(shaderProgram, 'a_pos')
    const uniformCol = gl.getUniformLocation(shaderProgram, 'u_fragColor')
    gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0)
    len = lineData.length
    gl.enableVertexAttribArray(vertexPos)
    var j =0
    for(var i = 0; i < len/2; i = i+2) {
        gl.uniform4fv(uniformCol, colorLineData[j])
        gl.drawArrays(gl.LINES, i, 2)
        j++
    }
    if(first) {
        first = false
        let x,y
        [x,y] = getMousePosition(canvas,e)
        lineData.push(x)
        lineData.push(y)
        colorLineData.push([0.0,1.0,0.0,1.0])
    }
    else {
        first = true;
        [x,y] = getMousePosition(canvas,e)
        lineData.push(x)
        lineData.push(y)

    }
});
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        len = lineData.length
        console.log("enter")
        gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(vertexPos)
        var j =0
        for(var i = 0; i < len/2 - 2; i = i+2) {
            gl.uniform4fv(uniformCol, colorLineData[j])
            gl.drawArrays(gl.LINES, i, 1)
            j++
        }
    }
});