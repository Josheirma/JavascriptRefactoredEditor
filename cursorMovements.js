/// Handles cursor movement across a grid and wraps around borders
// Right and down move two positions per press; left and up move one position per press
class CursorMovementsClass {
  cursorRight() {
    // If cursor is at the far right edge, wrap to the beginning of the next row
    if (horizontalCursorPosition >= (WIDTH - 1) * 5) {
      horizontalCursorPosition = 5;
      verticalCursorPosition += 10;
    } 
    // If cursor is one step before the far right, wrap fully to the next row
    else if (horizontalCursorPosition >= (WIDTH - 1) * 5 - 5) {
      horizontalCursorPosition = 0;
      verticalCursorPosition += 10;
    } 
    // Otherwise, move two steps to the right
    else {
      horizontalCursorPosition += 10;
    }
  }

  cursorRightOneSpace() {
    // If the cursor is on the last column, move to start of next line
    if (horizontalCursorPosition >= WIDTH * 5 - 5) {
      horizontalCursorPosition = 0;
      verticalCursorPosition += 10;
    } 
    // Otherwise, move one step to the right
    else {
      horizontalCursorPosition += 5;
    }
  }

  cursorLeft() {
    // Prevent cursor from moving past the top-left corner
    if (horizontalCursorPosition / 5 <= 0 && verticalCursorPosition / 10 <= 0) {
      return;
    }

    // If at the start of a line, jump to the end of the previous line
    if (horizontalCursorPosition <= 0) {
      horizontalCursorPosition = (WIDTH - 1) * 5;
      verticalCursorPosition -= 10;
    } 
    // Otherwise, move one step to the left
    else {
      horizontalCursorPosition -= 5;
    }
  }

  cursorUp() {
    // Prevent movement above the top row
    if (verticalCursorPosition <= 0) {
      verticalCursorPosition = 0;
      return -3;  // Signal that upward movement is blocked
    }

    // Move one row up
    verticalCursorPosition -= 10;
  }

  cursorDown() {
    // Prevent movement beyond the bottom row
    if (verticalCursorPosition >= (HEIGHT - 1) * 10) {
      return -1;  // Signal that downward movement is blocked
    }

    // If on the second-to-last row, move down by one row
    else if (verticalCursorPosition / 10 === (HEIGHT - 2)) {
      verticalCursorPosition += 10;
    } 
    // Otherwise, move down by two rows
    else {
      verticalCursorPosition += 20;
    }
  }
}