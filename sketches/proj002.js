const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [ 1080, 1920 ],
  animate: true,
};

const sketch = ({width, height}) => {
  // Create list of bars and arcs
  const number_objects = 15;
  const width_rect  = width * 0.015;
  const height_rect = height * 0.1;
  const radius_arc = width * 0.3;

  const bars = [];
  const arcs = [];
  for (let i = 0; i < number_objects; i++){
    bars.push(new Bar(0, 0, width_rect,height_rect, 3));
    arcs.push(new Arc(0, 0, radius_arc, 0.003));
  }


  return ({ context, width, height }) => {
    context.fillStyle = '#f1faee';
    context.fillRect(0, 0, width, height);
    
    // Polar grid settings (bars)
    const radius_array = width * 0.1;
    const center_x = width * 0.5;
    const center_y = height * 0.5;
    const inner_angle = math.degToRad(360/number_objects);

    for (let i = 0; i < number_objects; i++){
      // Location of elements (Bars)
      let angle_object = inner_angle * i;
      let x_component = radius_array * Math.sin(angle_object);
      let y_component = radius_array * Math.cos(angle_object);
      let x = center_x + x_component;
      let y = center_y + y_component;

      // Draw elements
      let bar = bars[i];
      let arc = arcs[i];

      context.save();
      context.translate(x,y);
      context.rotate(-angle_object);
      bar.draw(context, '#e63946');
      context.restore();

      context.save();
      context.translate(center_x, center_y);
      context.rotate(angle_object);
      arc.draw(context, '#457b9d');
      context.restore();
    }

    // Animate elements
    bars.forEach(bar => {
      bar.update();
      bar.changes_width_height();
    })
    arcs.forEach(arc => {
      arc.update();
    })

    // T I T L E
    // Style settings
    const font_size = width * 0.04;
    context.fillStyle = '#1d3557';
    context.font = `${font_size}px Trebuchet MS`;
    context.textBaseline = 'top';
    context.textAlign = 'center';
    
    // Write title
    context.save();
    context.translate(width * 0.5, height*0.92);
    context.fillText('Out Of Context Figures: Animated Arcs + Bars', 0,0);
    context.fillText('by @unisaacarroyov',0,height*0.025)
    context.restore();


  };
};

canvasSketch(sketch, settings);



/* C L A S S E S */
class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Bar{
  constructor(x,y, width, height, mag_vel){
    this.pos = new Vector(x,y);
    this.line_width = width;
    this.height = height;
    this.first_height = height;
    this.first_width = width
    this.velocity = new Vector(random.range(1, mag_vel),random.range(1, mag_vel));
  }
  draw(context, fill_colour){
    context.beginPath();
    context.fillStyle = fill_colour;
    context.fillRect(this.pos.x, this.pos.y, this.line_width, this.height);
  }
  update(){
    this.height += this.velocity.y;
    this.line_width  += this.velocity.x;
  }
  changes_width_height(){
    if (this.height > 3 * this.first_height){
      this.velocity.y *= -1;
    } else if (this.height < -0.9 * this.first_height){
      this.velocity.y *= -1;
    }
    if (this.line_width > 1.1 * this.first_width){
      this.velocity.x *= -1;
    } else if (this.line_width < -0.8 * this.first_width){
      this.velocity.x *= -1;
    }
  }
}

class Arc{
  constructor(cx, cy, radius, mag_vel){
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.line_width = radius * random.range(0.02,0.08);
    this.proximity_radius = random.range(0.8,2);
    this.velocity = mag_vel;
    this.begin = random.range(-1,0);
    this.end   = random.range(0, 1);
  }
  draw(context, stroke_colour){
    context.beginPath();
    context.strokeStyle = stroke_colour;
    context.lineWidth = this.line_width;
    context.arc(this.cx, this.cy, this.radius * this.proximity_radius, this.begin * Math.PI, this.end * Math.PI);
    context.stroke();
  }
  update(){
    this.begin += this.velocity;
    this.end += this.velocity;
  }
}