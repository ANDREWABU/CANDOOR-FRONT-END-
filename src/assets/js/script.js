// particle.min.js hosted on GitHub (https://github.com/JulianLaval/canvas-particle-network)

var canvasDiv = document.getElementById('particle-canvas');
var options = {
  particleColor: '#bb14ce',
 
  interactive: true,
  speed: 'slow',
  density: 'high'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);