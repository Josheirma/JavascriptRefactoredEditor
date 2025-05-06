

findLeftmostSpaceOrDash(row) {
    return [row.indexOf(" "), row.indexOf("-")]
      .map(index => index === -1 ? WIDTH : index)
      .reduce((min, curr) => Math.min(min, curr));
  }

  fillDashesInTopRow(grid, rowIndex, length) {
    grid[rowIndex - 1].fill("-", WIDTH - length, WIDTH);
  }
  
  splitAtIndex(arr, index) {
    return [arr.slice(0, index), arr.slice(index)];
  }

  // Function to initialize the canvas size and appearance
//3/5/25 - add any missing funtionality, comment, and refactor 
function makeCanvas(verticalSize = 190, horizontalSize = 200) {
  alert("here")
  // Set canvas display size
  canvas.style.width = `${horizontalSize}px`;
  canvas.style.height = `${verticalSize}px`;

  // For crisper imaging on high DPI screens
  const scale = window.devicePixelRatio;

  // Set the canvas' internal resolution to match the display size, scaled for better display
  canvas.width = horizontalSize * scale;
  canvas.height = verticalSize * scale;

  // Apply scaling to match the display resolution
  ctx.scale(scale, scale);

  // Set canvas background to white
  ctx.fillStyle = '#ffffff';

  // Clear canvas (white background)
  ctx.fillRect(0, 0, 200, 200);

  // Set font and text alignment
  ctx.font = '10px Monospace';
  ctx.textAlign = 'center';
}
