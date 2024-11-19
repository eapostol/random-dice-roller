// main.js

  // Scaling factor for dice size
  let scaleFactor = 3; // 3 = 300% larger

  // Function to create an SVG face for a dice with a border and proper spacing
  function createDiceFace(svgElement, value) {
    const size = 100 * scaleFactor; // Scale the size of the dice
    const dotRadius = 10 * scaleFactor; // Scale the size of the dots
    const margin = size * 0.15; // Proportional margin from edges

    // Clear previous dice face
    svgElement.innerHTML = '';

    // Set the SVG viewbox and dimensions
    svgElement.setAttribute('width', size);
    svgElement.setAttribute('height', size);
    svgElement.setAttribute('viewBox', `0 0 ${size} ${size}`);

    // Create a border (square)
    const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    border.setAttribute('x', 0);
    border.setAttribute('y', 0);
    border.setAttribute('width', size);
    border.setAttribute('height', size);
    border.setAttribute('fill', 'white');
    border.setAttribute('stroke', 'black');
    border.setAttribute('stroke-width', 2 * scaleFactor); // Scale border thickness
    svgElement.appendChild(border);

    // Calculate positions for dots with spacing
    const mid = size / 2;
    const positions = {
      1: [[mid, mid]],
      2: [[margin, margin], [size - margin, size - margin]],
      3: [[margin, margin], [mid, mid], [size - margin, size - margin]],
      4: [[margin, margin], [margin, size - margin], [size - margin, margin], [size - margin, size - margin]],
      5: [[margin, margin], [margin, size - margin], [mid, mid], [size - margin, margin], [size - margin, size - margin]],
      6: [[margin, margin], [margin, mid], [margin, size - margin], [size - margin, margin], [size - margin, mid], [size - margin, size - margin]],
    };

    // Create dots for the dice face
    positions[value].forEach(([cx, cy]) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', cy);
      dot.setAttribute('r', dotRadius);
      dot.setAttribute('fill', 'black');
      svgElement.appendChild(dot);
    });
  }

  // Function to roll the dice
  function rollDice() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const totalDisplay = document.getElementById('total');

    // Reset total display
    totalDisplay.textContent = '';

    // Alternate dice faces for 2-6 seconds
    const randomDuration = Math.random() * (6000 - 2000) + 2000;

    const interval = setInterval(() => {
      createDiceFace(dice1, Math.ceil(Math.random() * 6));
      createDiceFace(dice2, Math.ceil(Math.random() * 6));
    }, 100);

    // Stop alternating and show final dice faces
    setTimeout(() => {
      clearInterval(interval);

      const finalDice1 = Math.ceil(Math.random() * 6);
      const finalDice2 = Math.ceil(Math.random() * 6);
      createDiceFace(dice1, finalDice1);
      createDiceFace(dice2, finalDice2);

      // Display total
      totalDisplay.textContent = `Total: ${finalDice1 + finalDice2}`;
    }, randomDuration);
  }

  // Attach roll event to button
  document.getElementById('roll-button').addEventListener('click', rollDice);

  // Initialize dice with random faces
  createDiceFace(document.getElementById('dice1'), Math.ceil(Math.random() * 6));
  createDiceFace(document.getElementById('dice2'), Math.ceil(Math.random() * 6));
