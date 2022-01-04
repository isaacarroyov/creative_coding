const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1284, 2778 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#0d3b66';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
