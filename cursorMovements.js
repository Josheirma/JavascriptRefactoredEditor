///controls cursor movement changes and crosses over borders
//right and down is two positions per press, left and up are 1
class CursorMovementsClass {
  cursorRight() {
    // Check if the cursor has reached the maximum allowed position (based on grid width and height)
    if (horizontalCursorPosition / 5 >= (WIDTH - 1) && verticalCursorPosition / 10 >= (HEIGHT - 1)) {
        return;
    }

    // If the horizontal position exceeds the canvas width, reset horizontal position and move down vertically
    if (horizontalCursorPosition >= (WIDTH - 1) * 5) {
        horizontalCursorPosition = 5;
        verticalCursorPosition += 10;
    } 
    // If the horizontal position is near the end of the width, reset horizontal position and move down vertically
    else if (horizontalCursorPosition >= (WIDTH -1) * 5 - 5) {
        horizontalCursorPosition = 0;
        verticalCursorPosition += 10;
    } 
    // Otherwise, simply move the cursor to the right
    else {
        horizontalCursorPosition += 10;
    }
}

cursorRightOneSpace() {
  // Check if the cursor has reached the maximum grid position (based on width and height)
  if (horizontalCursorPosition / 5 >= WIDTH - 1 && verticalCursorPosition / 10 >= HEIGHT - 1) {
      // No action needed if the cursor is at the grid's edge
      
  } 
  // If the horizontal position exceeds the canvas width, reset and move down vertically
  else if (horizontalCursorPosition >= WIDTH * 5) {
      horizontalCursorPosition = 0;
      verticalCursorPosition += 10;
  } 
  // If the horizontal position is near the end of the width, reset and move down vertically
  else if (horizontalCursorPosition >= WIDTH * 5 - 5) {
      horizontalCursorPosition = 0;
      verticalCursorPosition += 10;
  } 
  // Otherwise, simply move the cursor one space to the right
  else {
      horizontalCursorPosition += 5;
  }
}
    
cursorLeft() {
  // Check if the cursor has reached the minimum position (top-left corner of the grid)
  if (horizontalCursorPosition / 5 <= 0 && verticalCursorPosition / 10 <= 0) {
      return;
  }

  // If the cursor is at the leftmost edge, reset to the rightmost position and move up vertically
  if (horizontalCursorPosition <= 0) {
      horizontalCursorPosition = (WIDTH - 1) * 5;
      verticalCursorPosition -= 10;
  } 
  // Otherwise, move the cursor one space to the left
  else {
      horizontalCursorPosition -= 5;
  }
}



cursorUp() {
  // If the cursor is at the top-most position, prevent it from going further up
  if (verticalCursorPosition <= 0) {
      verticalCursorPosition = 0;
      return -3;  // Return a value indicating the cursor can't move up further
  }

  // Otherwise, move the cursor up by 10 units
  verticalCursorPosition -= 10;
}
cursorDown() {
  // If the cursor is at the bottom-most position, prevent it from going further down
  if (verticalCursorPosition >= (HEIGHT - 1) * 10) {
      verticalCursorPosition = (HEIGHT - 1) * 10;
      return -4;  // Return a value indicating the cursor can't move down further
  }

  // If the cursor is near the second-to-last row, move down by 10 units
  if (verticalCursorPosition / 10 === (HEIGHT - 1)) {
      verticalCursorPosition += 20;
  } 
  // If the cursor is on the last but one row, move down by 10 units
  else if (verticalCursorPosition / 10 === (HEIGHT - 2)) {
      verticalCursorPosition += 10;
  } 
  // Otherwise, move the cursor down by 20 units
  else {
      verticalCursorPosition += 20;
  }
}
  }

  