/* INITIALIZATION */
// Select canvas
let canvas = document.querySelector('#canvas');

// Create box template
let box = document.createElement('div');

// Select pen color picker
let penColor = document.querySelector('#pen_color');

// Add functionality to background color picker
let canvasColor = document.querySelector('#background_color');
canvasColor.addEventListener('change', repaint_canvas);

// Add functionality to grid toggle
let toggleGrid = document.querySelector('#grid_toggle');
toggleGrid.addEventListener('click', activateGrid);

// Add functionality to grid size selector
let gridSizeSlider = document.querySelector('#grid_size');
gridSizeSlider.addEventListener('change', create_grid);
gridSizeSlider.addEventListener('input', update_size_text);

// Add functionality to shade toggle
let toggleShading = document.querySelector('#shade_mode');
toggleShading.addEventListener('click', shade);

// Add functionality to lighten toggle
let toggleLighten = document.querySelector('#lighten_mode');
toggleLighten.addEventListener('click', lighten);

// Add functionality to rainbow toggle
let toggleRainbow = document.querySelector('#rainbow_mode');
toggleRainbow.addEventListener('click', rainbow);

// Add functionality to eraser toggle
let toggleEraser = document.querySelector('#eraser_toggle');
toggleEraser.addEventListener('click', erase);

// Initialize mouse state
let mouseIsDown = false;

// Initialize grid/box length variables
let GRID_LENGTH = 16;
let BOX_LENGTH = 500/16;

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
  GRID_LENGTH = gridSizeSlider.value;
  BOX_LENGTH = 500/GRID_LENGTH;
}




// Remove current grid from canvas
function remove_grid () {
  canvas.textContent = '';
}




// Draw new grid on canvas
function draw_grid () {
  const GRID_SIZE = GRID_LENGTH * GRID_LENGTH;
  for (let i = 0; i < GRID_SIZE; i ++) {
    // Create empty box template
    box = document.createElement('div');
    box.classList.add('box');

    // Check if grid toggle is on
    if (toggleGrid.checked == false) {
      box.style.border = '0px';
    }

    // Gives each box the ability to be drawn on
    box.addEventListener('mouseover', fill);
    box.style.width = BOX_LENGTH + 'px';
    box.style.height = BOX_LENGTH + 'px';
    canvas.appendChild(box);
    }
}




// Update the grid size display below the canvas
function update_size_text (e) {
  GRID_LENGTH = gridSizeSlider.value;
  document.querySelector('#size_text').textContent 
  = `Grid size: ${GRID_LENGTH} x ${GRID_LENGTH}`;
}




// Rainbow
function rainbow (e) {
  if (e.target.checked == true) {
    console.log('rainbow_on');
    toggleEraser.checked = false;
    toggleLighten.checked = false;
    toggleShading.checked = false;
  }
  else {
    console.log('rainbow_off');
  }
}




// Lighten toggle
function lighten (e) {
  if (e.target.checked == true) {
    toggleEraser.checked = false;
    toggleRainbow.checked = false;
    toggleShading.checked = false;
  }
  else {
    console.log('lightoff');
  }
}




// Shade toggle
function shade (e) {
  if (e.target.checked == true) {
    toggleEraser.checked = false;
    toggleLighten.checked = false;
    toggleRainbow.checked = false;
    console.log('shadeon');
  }
  else {
    console.log('shadeoff');
  }
}




// Eraser toggle
function erase (e) {
  if (e.target.checked == true) {
    toggleRainbow.checked = false;
    toggleLighten.checked = false;
    toggleShading.checked = false;
    console.log('activated');
  }
  else {
    console.log('inactive');
  }
}




// Grid line toggle
function activateGrid (e) {
  let boxes = document.querySelectorAll('.box');
  const GRID_SIZE = GRID_LENGTH * GRID_LENGTH;
  // Remove borders from all boxes inside the canvas
  if (e.target.checked == false) {
    for (let i = 0; i < (GRID_SIZE); i++) {
      boxes[i].style.border = '0px';
      }
  }
  // Add borders to all boxes inside the canvas
  else {
    for (let i = 0; i < (GRID_SIZE); i++) {
      boxes[i].style.border = '0.05px solid black';
      }
  }
}




// Pen function
function fill (e) {
  // Check if the mouse is held down when entering a box
  e.target.addEventListener('mousedown', () => {mouseIsDown = true});
  e.target.addEventListener('mouseup', () => {mouseIsDown = false});

  if (mouseIsDown == true) {
    // Wipe box color
    if (toggleEraser.checked == true) {
      e.target.style.backgroundColor = '';
      e.target.style.filter = 'brightness(1)';
    }
    // Randomize box color
    else if (toggleRainbow.checked == true) {
      let r = ((e.offsetX * 69) % 255);
      let g = ((e.offsetY * 69) % 255);
      let b = ((e.offsetY * e.offsetX) % 255);
      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    // Extract box color, then lighten
    else if (toggleLighten.checked == true) {
      if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
        e.target.style.backgroundColor = 'rgb(25, 25, 25)';
        console.log(e.target.style.backgroundColor);
      }
      else {
        let old_brightness = e.target.style.filter.toString();
        let newBrightness = parseFloat((old_brightness.slice(11, -1))) + 0.1;
        if (newBrightness > 0) {
          e.target.style.filter = `brightness(${newBrightness})`;
        }
      }
    }
    // Extract box color, then darken
    else if (toggleShading.checked == true) {
      let old_brightness = e.target.style.filter.toString();
      let newBrightness = parseFloat((old_brightness.slice(11, -1))) - 0.1;
      if (newBrightness > 0) {
        e.target.style.filter = `brightness(${newBrightness})`;
      }
    }
    // Change box color according to value from pen color selector
    else {
      e.target.style.backgroundColor = penColor.value;
      e.target.style.filter = 'brightness(1)';
    }
  }
}




// Change canvas color to value from background color selector
function repaint_canvas (e) {
  canvas.style.backgroundColor = e.target.value;
}