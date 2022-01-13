const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [ 1080, 1080 ],
  //animate: true,
};

const sketch = ({width, height}) => {
  // Create list of bars and arcs
  const number_objects = 15;
  const width_rect  = width * 0.015;
  const height_rect = height * 0.1;
  const radius_arc = width * 0.2;

  const bars = [];
  const arcs = [];
  for (let i = 0; i < number_objects; i++){
    bars.push(new Bar(0, 0, width_rect,height_rect, 4));
    arcs.push(new Arc(0, 0, radius_arc, 4));
  }


  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const radius_array = width * 0.1;
    const center_x = width * 0.5;
    const center_y = height * 0.5;
    const inner_angle = math.degToRad(360/number_objects);

    for (let i = 0; i < number_objects; i++){
      let angle_object = inner_angle * i;
      let x_component = radius_array * Math.sin(angle_object);
      let y_component = radius_array * Math.cos(angle_object);
      let x = center_x + x_component;
      let y = center_y + y_component;

      let bar = bars[i];
      let arc = arcs[i];

      context.save();
      context.translate(x,y);
      context.rotate(-angle_object);
      bar.draw(context, 'white');
      context.restore();

      context.save();
      context.translate(center_x, center_y);
      context.rotate(angle_object);
      arc.draw(context, 'white');
      context.restore();
    }

    bars.forEach(bar => {
      bar.update();
      bar.changes_width_height();
    })
    
    





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
    this.width = width;
    this.height = height;
    this.first_height = height;
    this.first_width = width
    this.velocity = new Vector(random.range(1, mag_vel),random.range(1, mag_vel));
  }

  draw(context, fill_colour){
    context.beginPath();
    context.fillStyle = fill_colour;
    context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update(){
    this.height += this.velocity.y;
    this.width  += this.velocity.x;
  }

  changes_width_height(){
    if (this.height > 3 * this.first_height){
      this.velocity.y *= -1;
    } else if (this.height < -0.9 * this.first_height){
      this.velocity.y *= -1;
    }
    if (this.width > 1.1 * this.first_width){
      this.velocity.x *= -1;
    } else if (this.width < -0.8 * this.first_width){
      this.velocity.x *= -1;
    }
  }
}

class Arc{
  constructor(cx, cy, radius, mag_vel){
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.begin = random.range(-1.5,0) * Math.PI;
    this.end   = random.range(0, 1.5) * Math.PI;
    this.proximity_radius = 1;
    this.width = radius * 0.02;
    this.initial_width = radius * 0.02;
    this.velocity = new Vector(random.range(1, mag_vel),random.range(1, mag_vel));
  }

  draw(context, stroke_colour){
    context.beginPath();
    context.strokeStyle = stroke_colour;
    context.lineWidth = this.width;
    context.arc(this.cx, this.cy, this.radius * this.proximity_radius, this.begin, this.end);
    context.stroke();
  }
}


