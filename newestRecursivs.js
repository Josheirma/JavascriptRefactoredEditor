//3/1/25 - took from jseditor - remote - is now : 5:20 PM
//This will be refactored.
//newest to refactor, copy this into recursiverightbefore...
//save and merge
class RecursiveClass {
    constructor() {
      this.lastRowIndexToPushOn = -1;
      this.bottomRow = -1;
      this.bottomRowFromLastRound = [];
      this.tracksRow = 0;
      this.hasBeenInZeroHorizPosition = false;
      this.FlagForFinalRow = true;
    }
    // Deletes a row from the array at the specified rowNumber index
deleteRow(arr, rowNumber) {
  // Ensure rowNumber is within valid bounds
  if (rowNumber >= 0 && rowNumber < arr.length) {
    arr.splice(rowNumber, 1); // Remove the row at the specified index
  } else {
    console.error("Invalid row number: out of bounds"); // Error handling for invalid index
  }

  return arr; // Return the modified array
}


  // Adds a new row with placeholder values to the grid at the specified rowIndex
  createRow(grid, rowIndex) {
  // Define a new row with placeholders ("-") for each column
  const newRow = [
    "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 
    "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"
  ];

  // Insert the new row at the specified rowIndex
  grid.splice(rowIndex, 0, newRow);

  // Increment HEIGHT to reflect the new row added to the grid
  HEIGHT++;

  // Optionally, trigger the drawGrid function if necessary (currently commented out)
  // drawGrid(HEIGHT, WIDTH);

  // Return the modified grid with the newly added row
  return grid;
}


//3/4/25 chatGPT 

  //row does not have a space or dash
  //   if (maxIndexOfNullOrString === -1) {
  //     const left = ""
  //     const rightWordAtEndOfRowOne = ""
  //     for(let i = 0; i < WIDTH-1; i++ )
  //     rightWordAtEndOfRowOne[i] = "-"
  //   }

// Finds the last occurrence of a space or dash in the row and splits the row accordingly
//3/4/25 ChatGpt - fixed too
getLastSpaceOrNull(grid, topRow) {
  // Get the index of the last dash and the last space
  const lastIndexOfDash = topRow.lastIndexOf("-");
  const lastIndexOfSpace = topRow.lastIndexOf(" ");

  // Determine the rightmost index or default to full row length if none found
  const maxIndex = Math.max(lastIndexOfDash, lastIndexOfSpace, -1) === -1 ? topRow.length : Math.max(lastIndexOfDash, lastIndexOfSpace);

  // Split at the position after the found dash or space
  const [leftSide, rightSide] = this.splitAtIndex(topRow, maxIndex + 1);

  return { leftSide, rightSide };
}


//3/4/25  ChatGPT - presently, not used.  If needed, search missing functuality with code!
// Merges the right word from the top row with the left word from the bottom row
// and adjusts the grid accordingly
lastLineWorkings(grid, rowIndex) {
  // Return grid if the rowIndex is out of bounds
  if (rowIndex <= 0 || rowIndex >= grid.length) return grid;

  // Get the rows involved: top row and bottom row
  const topRow = grid[rowIndex - 1];
  const bottomRow = grid[rowIndex];

  // Find the index of the last dash in the top row (start of the right word)
  const lastIndexOfDashOnTopRow = topRow.lastIndexOf("-");

  // Split the top row into left part and the right word
  const [leftOfWordTopRow, rightWordTopRow] = this.splitAtIndex(
    topRow,
    lastIndexOfDashOnTopRow + 1
  );

  // Find the index of the first dash in the bottom row (start of the left word)
  const firstIndexOfDashOnBottomRow = bottomRow.indexOf("-");

  // Split the bottom row into left word and the remaining right side
  const [leftWordBottomRow, rightSide] = this.splitAtIndex(
    bottomRow,
    firstIndexOfDashOnBottomRow
  );

  // Combine the right word from the top row and the left word from the bottom row
  const combinedRow = [...rightWordTopRow, ...leftWordBottomRow];
  
  // Update the bottom row with the combined result
  grid[rowIndex] = combinedRow;

  // Set the horizontal cursor position based on the combined row length
  horizontalCursorPosition = combinedRow.length * 5;

  // Fill the rest of the bottom row with dashes after the combined word
  for (let i = combinedRow.length; i < WIDTH; i++) {
    grid[rowIndex][i] = "-";
  }

  // Replace the part of the top row where the word was, with dashes
  for (let i = WIDTH - rightWordTopRow.length; i < WIDTH; i++) {
    grid[rowIndex - 1][i] = "-";
  }

  return grid;
}
    






// 3/3/25 - ChatGPT
// Global Flag Initialization	
// splitAtIndex() Fallback	
// repositionCursor() Call	 
// Infinite Recursion Check	
// newRemainder Reset	

pushWordsToNextRow(grid, newRemainder, rowIndex, fromIndex) {
  if (fromIndex) {
    this.FlagForFinalRow = true;
  }

  if (rowIndex >= HEIGHT) return grid; // Base case to stop recursion

  let topRow = grid[rowIndex - 1] || [];
  let bottomRow = newRemainder[0] !== "" ? [...newRemainder, ...grid[rowIndex]] : grid[rowIndex];

  let { rightSide: wordAtEndOfRowOne } = this.getLastSpaceOrNull(grid, topRow);
  let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;

  let lastIndexOfFirstWord = this.findLeftmostSpaceOrDash(bottomRow);
  if (lastIndexOfFirstWord === -1) lastIndexOfFirstWord = WIDTH; // Safety fallback

  let [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
  let lengthOfFirstWordBottomRow = firstWordBottomRow.length;

  let remainingNullSpaces = this.countRemainingNullsAndSpaces(grid, rowIndex, lengthOfFirstWordBottomRow);

  if (remainingNullSpaces === 0 || grid[rowIndex][0] === "-") {
    return this.pushWordsToNextRow(grid, [""], rowIndex + 1, false);
  }

  if (lengthOfRightWordAtRowOne < remainingNullSpaces) {
    let combined = [...wordAtEndOfRowOne, ...firstWordBottomRow, ...phraseAfterLeftWordBottomRow];
    drawGrid(HEIGHT, WIDTH);

    let [newBottomRow, newRemainder] = this.splitAtIndex(combined, WIDTH);
    newRemainder = this.getLastSpaceOrNull(grid, newRemainder).rightSide || [];

    this.repositionCursor(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow);
    grid[rowIndex] = newBottomRow;
    drawGrid(HEIGHT, WIDTH);

    this.fillDashesInTopRow(grid, rowIndex, lengthOfRightWordAtRowOne);

    let nextRowIndex = this.FlagForNewEndPush ? rowIndex : rowIndex + 1;
    this.FlagForNewEndPush = false;

    return this.pushWordsToNextRow(grid, newRemainder, nextRowIndex, false);
  }

  return this.pushWordsToNextRow(grid, [""], rowIndex + 1, false);
}

// - missing functionality
findLeftmostSpaceOrDash(row) {
  return [row.indexOf(" "), row.indexOf("-")]
    .map(index => index === -1 ? WIDTH : index)
    .reduce((min, curr) => Math.min(min, curr));
}

// - missing functionality
countRemainingNullsAndSpaces(grid, rowIndex, startIdx) {
  if (rowIndex >= HEIGHT || !grid[rowIndex]) return 0; // Prevent out-of-bounds access

  let remaining = 0;

  for (let i = startIdx; i < WIDTH; i++) {
    if (grid[rowIndex][i] !== "-" && grid[rowIndex][i] !== " " && grid[rowIndex][i] !== null) {
      break; // Stop counting on non-empty characters
    }
    remaining++;
  }

  return remaining;
}

// - missing functionality
repositionCursor(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
  if (this.handleCursorInTopRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow)) return;
  this.handleCursorInBottomRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow);
}
// - missing functionality
handleCursorInTopRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
  // Ensure we're within bounds of the top row and the cursor is properly aligned
  for (let i = WIDTH - wordAtEndOfRowOne.length; i < WIDTH; i++) {
    if (grid[rowIndex][0] !== "-" && verticalCursorPosition / 10 === rowIndex - 1 && horizontalCursorPosition / 5 === i + 1) {
      verticalCursorPosition = rowIndex * 10;
      horizontalCursorPosition = (wordAtEndOfRowOne.length + firstWordBottomRow.length) * 5;  // Move cursor after combined word
      return true;
    }
  }
  return false;
}
// - missing functionality
handleCursorInBottomRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
  // Ensure cursor placement in the bottom row
  for (let i = 0; i < firstWordBottomRow.length; i++) {
    // Check if we're in the right position and not in a dash
    if (grid[rowIndex - 1][WIDTH - 1] !== "-" && verticalCursorPosition / 10 === rowIndex && horizontalCursorPosition / 5 === i + 1) {
      horizontalCursorPosition = (wordAtEndOfRowOne.length + firstWordBottomRow.length) * 5; // Move cursor to combined word's end
      break;
    }
  }
}

// - missing functionality
// Optional overflow boundary handling
handleCursorOverflow() {
  // Ensure the cursor never exceeds the row width
  if (horizontalCursorPosition >= WIDTH) {
    horizontalCursorPosition = WIDTH - 1;
  }
  // Ensure vertical cursor doesn't exceed the grid height
  if (verticalCursorPosition >= HEIGHT) {
    verticalCursorPosition = HEIGHT - 1;
  }
}



fillDashesInTopRow(grid, rowIndex, length) {
  grid[rowIndex - 1].fill("-", WIDTH - length, WIDTH);
}

splitAtIndex(arr, index) {
  return [arr.slice(0, index), arr.slice(index)];
}




    //3/4/25 - ChatGpt
    // - missing fucnitonality
    // Bounds Checking	
    // Remaining Spaces Filling		✅
    // Cursor Repositioning	
    // Recursive Continuation	
    // Grid Overflow Protection
    divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder) {
      // Increment the row tracking counter to keep track of the row state
      this.tracksRow++;
    
      // Base case: Stop recursion if row exceeds grid height
      if (rowIndex >= HEIGHT - 1) {
        drawGrid(HEIGHT, WIDTH);
        return grid;
      }
    
      // Get the current row (bottomRow) and next row (topRow)
      const bottomRow = grid[rowIndex];
      const topRow = grid[rowIndex + 1];
    
      // Split the current row at colIndex
      const [bottomLeftRow, bottomRightRow] = this.splitAtIndex(bottomRow, colIndex);
      const [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      let buildNextRow = [];
    
      // Append remainder only if it's not empty
      if (remainder.length > 0) {
        buildNextRow = [...remainder, ...topRow];
      } else {
        buildNextRow = [...bottomRightRow, ...topRow];
      }
    
      // Split the combined row into what fits and the remainder
      const [oneRowsWorth, newRemainder] = this.splitAtIndex(buildNextRow, WIDTH);
    
      // Fill remaining null spaces with dashes
      for (let i = oneRowsWorth.length; i < WIDTH; i++) {
        oneRowsWorth[i] = "-";
      }
    
      // Update the grid row
      grid[rowIndex + 1] = oneRowsWorth;
      drawGrid(HEIGHT, WIDTH);
    
      // Cursor repositioning
      if (rowIndex === Math.floor(verticalCursorPosition / 10)) {
        horizontalCursorPosition = oneRowsWorth.length * 5;
      }
    
      // Recursive call if remainder still exists
      if (newRemainder.length > 0) {
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
      }
    
      // Draw the horizontal line
      if (Math.floor(verticalCursorPosition / 10) < HEIGHT) {
        for (let i = colIndex; i < WIDTH; i++) {
          grid[Math.floor(verticalCursorPosition / 10)][i] = "-";
        }
      }
    
      return grid;
    }
    

    //3/4/25 ChatGPT
    // - missing fucnitonality
    // Grid Overflow	
    // First-Time Handling	
    // Cursor Reset	
    // Remainder Safety	
    // Recursion Stop Condition
    pressedEnter(grid, rowIndex, colIndex, remainder, IsFirstTime, counter) {
      // Base case: Prevent overflow if the cursor moves beyond grid height
      if (rowIndex >= HEIGHT - 1) return grid;
    
      // Create a new row at the specified row index
      this.createRow(grid, rowIndex);
    
      // Only call divideNextRowsAsNeeded if there is a valid remainder or if it's the first-time press
      if (remainder.length > 0 || IsFirstTime) {
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder.length > 0 ? remainder : [""]);
      }
    
      // Reset horizontal cursor position
      horizontalCursorPosition = 0;
    
      // Move vertical cursor down only if it's not the first-time press
      if (!IsFirstTime) {
        verticalCursorPosition += 10;
      }
    
      // Ensure cursor stays within grid boundaries
      verticalCursorPosition = Math.min(verticalCursorPosition, (HEIGHT - 1) * 10);
    
      // Draw the cursor at the new position
      drawCursor(horizontalCursorPosition + HOFFSET, verticalCursorPosition + VOFFSET);
    
      // Stop recursion if no remainder is left
      if (remainder.length === 0) {
        return grid;
      }
    
      // Recursive call if content still remains
      return this.pressedEnter(grid, rowIndex + 1, colIndex, remainder, false, counter + 1);
    }
    

// 3/4/25 ChatGPT
// - missing funtionality
// Recursive Pulling	
// Top Row Cursor Fix	
// Multiple Row Deletions	
// Grid Overflow Safety
// First Row Edge Case
deleteAndPullCharacters(rowIndex, columnIndex, grid) {
  // Handle last row case
  if (rowIndex > HEIGHT - 2) {
    let topRow = grid[rowIndex];
    let combine = [];

    if (columnIndex !== 0) {
      // Split the row at columnIndex - 1
      let [topRowLeftOfColumn, topRowRightOfColumn] = this.splitAtIndex(
        topRow, columnIndex - 1
      );

      // Remove the character immediately after the cursor
      let [, topRowRightOfColumnWithoutFirstCharacter] = this.splitAtIndex(
        topRowRightOfColumn, 1
      );

      // Combine both sides
      combine = [...topRowLeftOfColumn, ...topRowRightOfColumnWithoutFirstCharacter];

      // Move cursor left
      CursorMovements.cursorLeft();
    } 
    // If deleting at index 0, pull character from previous row if available
    else if (rowIndex > 0) {
      let previousRow = grid[rowIndex - 1];
      let lastCharPrevRow = previousRow[WIDTH - 1];

      // Remove first character from current row
      let [, topRowRightOfColumnWithoutFirstCharacter] = this.splitAtIndex(
        topRow, 1
      );

      // Merge last character from previous row with current row
      combine = [...previousRow.slice(0, WIDTH - 1), "-", ...topRowRightOfColumnWithoutFirstCharacter];

      // Move cursor to the end of the previous row
      horizontalCursorPosition = (WIDTH - 1) * 5;
      verticalCursorPosition -= 10;

      // Replace last character in the previous row
      grid[rowIndex - 1][WIDTH - 1] = "-";
    } 
    else {
      combine = [...topRow.slice(1)];
    }

    // Update grid row with combined content
    grid[rowIndex] = combine;

    // Replace last character of the last row with a dash
    grid[HEIGHT - 1][WIDTH - 1] = "-";
  }

  return grid;
}
 

  displayGridAndCursor() {
      drawGrid(HEIGHT, WIDTH)
      drawCursor(
        horizontalCursorPosition + HOFFSET,
        verticalCursorPosition + VOFFSET
      );
    }
    //3/4/25 ChatGPT
    // - missing funcitonality
    // Automatic Row Creation	
    // Cursor Overflow Protection	
    // Recursive Remainder Cascade	
    // Edge Case Clamping
    initialInsertDoThisFirst(rowIndex, colIndex, grid, leftOverChar, fromIndex) {
      drawGrid(HEIGHT, WIDTH); // Always redraw grid on initial call
    
      if (rowIndex > HEIGHT - 1) {
        return grid; // Base case: Stop recursion when exceeding grid height
      }
    
      // Edge Case: Create a new row if bottom-right character is not a dash
      if (grid[HEIGHT - 1][WIDTH - 1] !== "-") {
        this.createRow(grid, leftOverChar, rowIndex, colIndex);
        horizontalCursorPosition = 0;
        verticalCursorPosition += 10; // Move cursor to new row
      }
    
      let topRow = grid[rowIndex];
      let lowerRow = grid[rowIndex + 1] ?? [];
      let [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      let combinedRow = [];
    
      if (fromIndex) {
        CursorMovements.cursorRightOneSpace();
        combinedRow = [...leftTopRow, ...leftOverChar, ...rightTopRow];
      } else {
        combinedRow = [...leftOverChar, ...leftTopRow, ...rightTopRow];
      }
    
      let [finishedRow, remainder] = this.splitAtIndex(combinedRow, WIDTH);
    
      // Update grid with the finished row
      grid[rowIndex] = finishedRow;
    
      // Recursive Call to Next Row with Remainder
      if (remainder.length > 0) {
        this.initialInsertDoThisFirst(rowIndex + 1, 0, grid, remainder, false);
      }
    
      // Prevent cursor from going beyond grid boundaries
      horizontalCursorPosition = Math.min(horizontalCursorPosition, WIDTH * 5 - 5);
    
      drawCursor(
        horizontalCursorPosition + HOFFSET,
        verticalCursorPosition + VOFFSET
      );
    
      return grid;
    }
  }
  