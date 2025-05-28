///controls cursor movement changes and crosses over borders
//right and down is two positions per press, left and up are 1
class CursorMovementsClass {
  cursorRight() {
    // Check if the cursor has reached the maximum allowed position (based on grid width and height)
    //if (horizontalCursorPosition / 5 >= (WIDTH - 2) && verticalCursorPosition / 10 >= (HEIGHT - 1)) {
    //    return;
    //}

   
    
    
    /*horizontal is on last loctaion to top right and going over border with this press*/
    if (horizontalCursorPosition >= (WIDTH - 1) * 5) {
        horizontalCursorPosition = 5;
        verticalCursorPosition += 10;
    } 
    // If the horizontal position is 2nd to end, and this press is two positions
    else if (horizontalCursorPosition >= (WIDTH -1) * 5 - 5) {
        horizontalCursorPosition = 0;
        verticalCursorPosition += 10;
    } 
    // Otherwise, simply move the cursor to the right - 2 positions forward, one for back 
    else {
        horizontalCursorPosition += 10;
    }
}

//for insert
cursorRightOneSpace() {
    /*
  // Check if the cursor has reached the maximum grid position (based on width and height)
  if (horizontalCursorPosition / 5 >= WIDTH - 1 && verticalCursorPosition / 10 >= HEIGHT - 1) {
      // No action needed if the cursor is at the grid's edge
      
  } 
  // If the horizontal position exceeds the canvas width, reset and move down vertically
  else if (horizontalCursorPosition >= WIDTH * 5) {
      horizontalCursorPosition = 0;
      verticalCursorPosition += 10;
  } 
*/

  /* If the horizontal position is on the last character and than press, reset and move down vertically*/
  if (horizontalCursorPosition >= WIDTH * 5 - 5) {
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

  // If the cursor is at the start of the line, move it to the end of the previous line
  if (horizontalCursorPosition <= 0) {
      horizontalCursorPosition = (WIDTH - 1) * 5;
      verticalCursorPosition -= 10;
  } 
  // Otherwise, move the cursor one character to the left (standard behavior)
  else {
      horizontalCursorPosition -= 5;
  }
}



cursorUp() {
  // If the cursor is on the first line, do not move it upward
  if (verticalCursorPosition <= 0) {
      verticalCursorPosition = 0;
      return -3;  // Return a value indicating the cursor can't move up further
  }

  // Move the cursor 10 steps up, unless already at the top
  verticalCursorPosition -= 10;
}


cursorDown() {
  // Check if the cursor is at the maximum allowed position (highest row and column)
  // If it's at the last row and column, prevent further movement in the downward direction
  if (verticalCursorPosition >= (HEIGHT - 1) * 10) {
      //verticalCursorPosition = (HEIGHT - 1) * 10;
      // Return a value indicating the cursor can't move down further
      return -1; 
    }



  // If the cursor is near the second-to-last row, move down by 10 units
  //if (verticalCursorPosition / 10 === (HEIGHT - 1)) {
  //    verticalCursorPosition += 20;
  //} 





  // // If the cursor is on the second-to-last row, move it down by 10 units (half of the standard movement distance)
  else if (verticalCursorPosition / 10 === (HEIGHT - 2)) {
      verticalCursorPosition += 10;
  } 



  // If the cursor is not on the second-to-last row, move it down by the standard distance of 20 units
  else {
      verticalCursorPosition += 20;
  }
}
  }

  