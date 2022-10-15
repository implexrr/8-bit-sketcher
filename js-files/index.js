/* INITIALIZATION */
// Select canvas
let canvas = document.querySelector('#canvas');

// Create box template
let box = document.createElement('div');

// Select pen color picker
let pen_color = document.querySelector('#pen_color');

// Add functionality to background color picker
let background_color = document.querySelector('#background_color');
background_color.addEventListener('change', repaint_canvas);

// Add functionality to grid toggle
let grid_toggle_button = document.querySelector('#grid_toggle');
grid_toggle_button.addEventListener('click', toggle_grid);

// Add functionality to grid size selector
let grid_size_slider = document.querySelector('#grid_size');
grid_size_slider.addEventListener('change', create_grid);
grid_size_slider.addEventListener('input', update_size_text);

// Initialize variables
let grid_size = 16;
let box_width = 500/16;
let box_height = 500/16;

// Add functionality to shade toggle
let toggle_shading = document.querySelector('#shade_mode');
toggle_shading.addEventListener('click', shade);

// Add functionality to lighten toggle
let toggle_lighten = document.querySelector('#lighten_mode');
toggle_lighten.addEventListener('click', lighten);

// Add functionality to rainbow toggle
toggle_rainbow = document.querySelector('#rainbow_mode');
toggle_rainbow.addEventListener('click', rainbow);

// Add functionality to eraser toggle
let eraser_toggle = document.querySelector('#eraser_toggle');
eraser_toggle.addEventListener('click', erase);

// Initialize brightness variable
let new_brightness;

// Initialize mouse state
let mouse_is_down = false;

// Initialize grid
create_grid();




/* FUNCTIONS */
// Create grid
function create_grid (e) {
  get_grid_size();
  remove_grid();
  draw_grid();
  update_size_text();
}




// Get grid size from slider value
function get_grid_size () {
  grid_size = grid_size_slider.value;
  box_width = 500/grid_size;
  box_height = 500/grid_size;
}




// Remove current grid from canvas
function remove_grid () {
  canvas.textContent = '';
}




// Draw new grid on canvas
function draw_grid () {
  for (let i = 0; i < (grid_size * grid_size); i ++) {
    // Create empty box template
    box = document.createElement('div');
    box.classList.add('box');
    box.style.filter = 'brightness(1)';
    box.style.backgroundColor = '';

    // Check if grid toggle is on
    if (grid_toggle_button.checked == false) {
      box.style.border = '0px';
    }

    // Gives each box the ability to be drawn on
    box.addEventListener('mouseover', fill);
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




// Rainbow
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




// Lighten toggle
function lighten (e) {
  if (e.target.checked == true) {
    eraser_toggle.checked = false;
    toggle_rainbow.checked = false;
    toggle_shading.checked = false;
  }
  else {
    console.log('lightoff');
  }
}




// Shade toggle
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




// Eraser toggle
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




// Grid line toggle
function toggle_grid (e) {
  let boxes = document.querySelectorAll('.box');

  // Remove borders from all boxes inside the canvas
  if (e.target.checked == false) {
    for (let i = 0; i < (grid_size * grid_size); i++) {
      boxes[i].style.border = '0px';
      }
  }
  // Add borders to all boxes inside the canvas
  else {
    for (let i = 0; i < (grid_size * grid_size); i++) {
      boxes[i].style.border = '0.05px solid black';
      }
  }
}




// Pen function
function fill (e) {
  // Check if the mouse is held down when entering a box
  e.target.addEventListener('mousedown', () => {mouse_is_down = true});
  e.target.addEventListener('mouseup', () => {mouse_is_down = false});

  if (mouse_is_down == true) {
    // Wipe box color
    if (eraser_toggle.checked == true) {
      e.target.style.backgroundColor = '';
      e.target.style.filter = 'brightness(1)';
    }
    // Randomize box color
    else if (rainbow_mode.checked == true) {
      let r = ((e.offsetX * 69) % 255);
      let g = ((e.offsetY * 69) % 255);
      let b = ((e.offsetY * e.offsetX) % 255);
      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    // Extract box color, then lighten
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
    // Extract box color, then darken
    else if (toggle_shading.checked == true) {
      let old_brightness = e.target.style.filter.toString();
      let new_brightness = parseFloat((old_brightness.slice(11, -1))) - 0.1;
      if (new_brightness > 0) {
        e.target.style.filter = `brightness(${new_brightness})`;
      }
    }
    // Change box color according to value from pen color selector
    else {
      e.target.style.backgroundColor = pen_color.value;
      e.target.style.filter = 'brightness(1)';
    }
  }
}




// Change canvas color to value from background color selector
function repaint_canvas (e) {
  canvas.style.backgroundColor = e.target.value;
}