// Select canvas, create box template
let canvas = document.querySelector('#canvas');
let box = document.createElement('div');

// Change pen color
let color = document.querySelector('#pen_color');

// Change background color
let background_colour = document.querySelector('#background_color');
background_colour.addEventListener('change', repaint_canvas);

// Initial grid toggle
let grid_toggle_button = document.querySelector('#grid_toggle');
grid_toggle_button.addEventListener('click', toggle_grid);

// Initial shade toggle
let toggle_shading = document.querySelector('#shade_mode');
let new_brightness;

// Initial lighten toggle
let toggle_lighten = document.querySelector('#lighten_mode');

// Code for changing grid size
// Add event listener to grid size slider
let grid_size_slider = document.querySelector('#grid_size');
grid_size_slider.addEventListener('change', create_grid);
grid_size_slider.addEventListener('input', update_size_text);

// Create initial grid
let grid_size = 16;
let box_width = 500/16;
let box_height = 500/16;
create_grid();


// Creates grid based on value of grid size
function create_grid (e) {
  get_grid_size();
  remove_grid();
  draw_grid();
  update_size_text();
}

// Get grid size
function get_grid_size () {
  grid_size = grid_size_slider.value;
  box_width = 500/grid_size;
  box_height = 500/grid_size;
}

// Remove current grid from canvas
function remove_grid () {
  canvas.textContent = '';
}

// Draw grid on canvas
function draw_grid () {
  for (let i = 0; i < (grid_size * grid_size); i ++) {
    box = document.createElement('div');
    box.classList.add('box');
    box.style.filter = 'brightness(1)';
    box.style.backgroundColor = '';
    // Check if grid toggle is on
    if (grid_toggle_button.checked == false) {
      box.style.border = '0px';
    }
    // Gives each box the ability to be drawn on
    box.addEventListener('mouseenter', fill);
    box.style.width = box_height + 'px';
    box.style.height = box_height + 'px';
    canvas.appendChild(box);
    }
}

// Update the grid size display below the canvas
function update_size_text (e) {
  grid_size = grid_size_slider.value;
  document.querySelector('#size_text').textContent 
  = `Grid size: ${grid_size} x ${grid_size}`;
}

// Toggle eraser
let eraser_toggle = document.querySelector('#eraser_toggle');

eraser_toggle.addEventListener('click', erase);
function erase (e) {
  if (e.target.checked == true) {
    rainbow_mode.checked = false;
    toggle_lighten.checked = false;
    toggle_shading.checked = false;
    console.log('activated');
  }
  else {
    console.log('inactive');
  }
}

// Pen functionality
let mouse_is_down = false;
function fill (e) {
  e.target.addEventListener('mousedown', () => {mouse_is_down = true});
  e.target.addEventListener('mouseup', () => {mouse_is_down = false});
  if (mouse_is_down == true) {
    if (eraser_toggle.checked == true) {
      e.target.style.backgroundColor = '';
      e.target.style.filter = 'brightness(1)';
    }
    else if (rainbow_mode.checked == true) {
      let r = ((e.offsetX * 69) % 255);
      let g = ((e.offsetY * 69) % 255);
      let b = ((e.offsetY * e.offsetX) % 255);
      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else if (toggle_lighten.checked == true) {
      if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
        e.target.style.backgroundColor = 'rgb(25, 25, 25)';
        console.log(e.target.style.backgroundColor);
      }
      else {
        let old_brightness = e.target.style.filter.toString();
        let new_brightness = parseFloat((old_brightness.slice(11, -1))) + 0.1;
        if (new_brightness > 0) {
          e.target.style.filter = `brightness(${new_brightness})`;
        }
      }
    }
    else if (toggle_shading.checked == true) {
      let old_brightness = e.target.style.filter.toString();
      let new_brightness = parseFloat((old_brightness.slice(11, -1))) - 0.1;
      if (new_brightness > 0) {
        e.target.style.filter = `brightness(${new_brightness})`;
      }
    }
    else {
      e.target.style.backgroundColor = color.value;
      e.target.style.filter = 'brightness(1)';
    }
  }
}

function repaint_canvas (e) {
  canvas.style.backgroundColor = e.target.value;
}

// Toggle grid lines

function toggle_grid (e) {
  let boxes = document.querySelectorAll('.box');
  if (e.target.checked == false) {
    for (let i = 0; i < (grid_size * grid_size); i++) {
      boxes[i].style.border = '0px';
      }
  }
  else {
    for (let i = 0; i < (grid_size * grid_size); i++) {
      boxes[i].style.border = '0.05px solid black';
      }
  }
}


// Shade mode
toggle_shading.addEventListener('click', shade);
function shade (e) {
  if (e.target.checked == true) {
    eraser_toggle.checked = false;
    toggle_lighten.checked = false;
    toggle_rainbow.checked = false;
    console.log('shadeon');
  }
  else {
    console.log('shadeoff');
  }
}

// Lighten mode
toggle_lighten.addEventListener('click', lighten);
function lighten (e) {
  if (e.target.checked == true) {
    eraser_toggle.checked = false;
    toggle_rainbow.checked = false;
    toggle_shading.checked = false;
    console.log('lighton');
  }
  else {
    console.log('lightoff');
  }
}


// Rainbow mode
toggle_rainbow = document.querySelector('#rainbow_mode');
console.log(toggle_rainbow);
toggle_rainbow.addEventListener('click', rainbow);
function rainbow (e) {
  if (e.target.checked == true) {
    console.log('rainbow_on');
    eraser_toggle.checked = false;
    toggle_lighten.checked = false;
    toggle_shading.checked = false;
  }
  else {
    console.log('rainbow_off');
  }
}

