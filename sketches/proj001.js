const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1920 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#F3E9CE';
    context.fillRect(0, 0, width, height);

    // List of colours
    const rect_list_colours = ['#001219', '#005F73', '#0A9396', '#94D2BD'];
    const circ_list_colours = ['#EE9B00','#CA6702','#BB3E03','#AE2012'];


    for (let i = 0; i < rect_list_colours.length; i++){

      // Random positions and dimensions - Rectangles
      let rect_x = width * random.range(0,1);
      let rect_y = height * random.range(0.1,0.6);
      let w = width * random.range(0.2,1);
      let h =height*random.range(0.1,0.5);
      // Draw
      context.beginPath();
      context.fillStyle = rect_list_colours[i];
      context.strokeStyle = 'black';
      context.lineWidth = width*0.015;
      context.rect(rect_x, rect_y, w,h);
      context.stroke();
      context.fill();

      // Random positions and dimensions -  Circles
      let circ_x = width * random.range(0,1);
      let circ_y = height * random.range(0,0.5);
      let radius = width * random.range(0.1,0.5);
      // Draw
      context.beginPath();
      context.fillStyle = circ_list_colours[i]
      context.arc(circ_x, circ_y, radius, 0, 2*Math.PI);
      context.stroke();
      context.fill();
    }

    // T I T L E
    // Style settings
    const font_size = width * 0.04;
    context.fillStyle = 'black';
    context.font = `${font_size}px Trebuchet MS`;
    context.textBaseline = 'top';
    context.textAlign = 'center';
    
    // Write title
    context.save();
    context.translate(width * 0.5, height*0.92);
    context.fillText('Out Of Context Figures: Circles and Rectangles', 0,0);
    context.fillText('by @unisaacarroyov',0,height*0.025)
    context.restore();
  };
};

canvasSketch(sketch, settings);
