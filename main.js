const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if(!gl){
	throw new Error('WebGL is not supported here!');
}

alert('Everything is ready to go!');

const vertexData = [
	1, 1, 0,
	1, -1, 0,
	-1, -1, 0,
	-1, 1, 0,
];

const colorData = [
	1,0,0,
	0,1,0,
	0,0,1,
	0.25,0.5,0.25,

];

function randomVertex(){
	return [Math.random(),Math.random(),Math.random()];
}

function randomColor(){
	return [Math.random(),Math.random(),Math.random()];
}

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW); //gl.DYNAMIC_DRAW buat rewrite vertexData

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, '
	precision mediump float;

	attribute vec3 position;
	attribute vec3 color;
	varying vec3 vColor;

	void main(){
		vColor = color;
		gl.Position = vec4(position,1);
	}
	');
gl.compile(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader,'
	precision mediump float;

	varying vec3 vcolor;
	void main(){
		gl_FragColor = vec4(vColor,1);
	}
	');
gl.compileShader(fragmentShader);
console.log(gl.getShaderInfoLog(fragmentShader));

const program = gl.createProgram();
gl.attachProgram(program, vertexShader);
gl.attachProgram(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
gl.vertexAttribPointer(positionLocation,4,gl.FLOAT,false,0,0);

const colorLocation = gl.getAttribLocation(program, 'color');
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.vertexAttribPointer(colorLocation,4,gl.FLOAT,false,0,0);

gl.useProgram(program);
gl.drawArrays(gl.POLYGON,0,4);
