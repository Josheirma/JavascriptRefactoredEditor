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
  //3/5/25 - chatGPT
  createRow(grid, rowIndex) {
  // Define a new row with placeholders ("-") for each column
  const newRow = [
    "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 
    "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"
  ];

  grid.push(newRow);
  
  // Increment HEIGHT to reflect the new row added to the grid
  HEIGHT++;
  // Return the modified grid with the newly added row
  return grid;
}


//3/4/25 chatGPT 
//Finds the last occurrence of a space or dash in the row and splits the row accordingly
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


// 3/3/25 - ChatGPT
// Global Flag Initialization	
// splitAtIndex() Fallback	
// repositionCursor() Call	 
// Infinite Recursion Check	
// newRemainder Reset	

pushWordsDoThisSecond(grid, newRemainder, rowIndex, fromIndex) {
  if (fromIndex) {
    this.FlagForFinalRow = true;
  }
  if (rowIndex >= HEIGHT) return grid; // Base case to stop recursion

  let topRow = grid[rowIndex - 1] || [];
  //!
  let bottomRow = newRemainder[0] !== "" ? [...newRemainder, ...grid[rowIndex]] : grid[rowIndex];

  let { rightSide: wordAtEndOfRowOne } = this.getLastSpaceOrNull(grid, topRow);
  let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;

  //last index of first word used on bottom
  let lastIndexOfFirstWord = this.findLeftmostSpaceOrDash(bottomRow);
  if (lastIndexOfFirstWord === -1) lastIndexOfFirstWord = WIDTH; // Safety fallback

  let [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
  let lengthOfFirstWordBottomRow = firstWordBottomRow.length;

  let remainingNullSpaces = this.countRemainingNullsAndSpaces(grid, rowIndex, lengthOfFirstWordBottomRow);

  //@
  if (remainingNullSpaces === 0 || grid[rowIndex][0] === "-") {
    return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
  }

  if (lengthOfRightWordAtRowOne < remainingNullSpaces) {

    let combined = [...wordAtEndOfRowOne, ...firstWordBottomRow, ...phraseAfterLeftWordBottomRow];
    drawGrid(HEIGHT, WIDTH);
    let [newBottomRow, newRemainder] = this.splitAtIndex(combined, WIDTH);
    
    //!
    newRemainder = this.getLastSpaceOrNull(grid, newRemainder).rightSide || [];
    let lengthOfNewRemainder = newRemainder.length
    let totalLeftSidePhraseLength = lengthOfRightWordAtRowOne + lengthOfFirstWordBottomRow
    let [leftmostTotalWordThatIsRemoved, restOfBottomRowWithoutLeftWord] = this.splitAtIndex(bottomRow, totalLeftSidePhraseLength);
    let combinedLowerRow = [...wordAtEndOfRowOne , ...firstWordBottomRow, ...restOfBottomRowWithoutLeftWord]
    this.repositionCursorForPush(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow);
    grid[rowIndex] = combinedLowerRow;
    drawGrid(HEIGHT, WIDTH);
    this.fillDashesInTopRow(grid, rowIndex, lengthOfRightWordAtRowOne);

    let nextRowIndex = this.FlagForNewEndPush ? rowIndex : rowIndex + 1;
    this.FlagForNewEndPush = false;

    return this.pushWordsDoThisSecond(grid, [""], nextRowIndex, false);
  }


  return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
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
    if (grid[rowIndex][i] !== "-" && grid[rowIndex][i] !== null) {
      break; // Stop counting on non-empty characters
    }
    remaining++;
  }

  return remaining;
}

// - missing functionality
repositionCursorForPush(grid,rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
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
    else if (grid[rowIndex][0] !== "-" && verticalCursorPosition / 10 === rowIndex  && horizontalCursorPosition / 5 === 0) {

      const lengthOfCompleteWordOnBottomLeft =  wordAtEndOfRowOne.length + firstWordBottomRow.length
      horizontalCursorPosition = (lengthOfCompleteWordOnBottomLeft-1) * 5 + 5;
      drawGrid(HEIGHT, WIDTH)
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
      horizontalCursorPosition = (wordAtEndOfRowOne.length + firstWordBottomRow.length) * 5 ; // Move cursor to combined word's end
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

    // Helper function to increment row tracking
    incrementRowTracking() {
      this.tracksRow++;
    }
    
    // Helper function to handle the base case (stop recursion)
    handleBaseCase(rowIndex) {
      return rowIndex >= HEIGHT - 1;
    }
    
    // Helper function to get the current and next row
    getRowsToSplit(grid, rowIndex) {
      const bottomRow = grid[rowIndex];
      const topRow = grid[rowIndex + 1];
      return { bottomRow, topRow };
    }
    
    // Helper function to combine rows with the remainder
    combineRowsWithRemainder(bottomRightRow, topRow, remainder) {
      if (remainder.length > 0 && remainder[0] !== "") {
        return [...remainder, ...topRow];
      } else {
        //!
        return [...bottomRightRow, ...topRow];
      }
    }
    
    // Helper function to adjust the row for width and add dashes
    adjustRowForWidth(buildNextRow) {
      const [oneRowsWorth, newRemainder] = this.splitAtIndex(buildNextRow, WIDTH);
    
      // Fill remaining null spaces with dashes
      for (let i = oneRowsWorth.length; i < WIDTH; i++) {
        oneRowsWorth[i] = "-";
      }
    
      return [oneRowsWorth, newRemainder];
    }
    
    // Helper function to update the grid with the adjusted row
    updateGridRow(grid, rowIndex, oneRowsWorth) {
      grid[rowIndex + 1] = oneRowsWorth;
      drawGrid(HEIGHT, WIDTH);
    }
    
    // Helper function to reposition the cursor
    repositionCursor(rowIndex, oneRowsWorth) {
      if (rowIndex === Math.floor(verticalCursorPosition / 10)) {
        horizontalCursorPosition = oneRowsWorth.length * 5 + 5;
      }
    }
    
    // Helper function to draw the horizontal line
    drawHorizontalLine(grid, rowIndex, colIndex) {
      if (Math.floor(verticalCursorPosition / 10) < HEIGHT) {
        for (let i = colIndex; i < WIDTH; i++) {
          grid[Math.floor(verticalCursorPosition / 10)][i] = "-";
        }
      }
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
      if (rowIndex >  HEIGHT - 1) return grid;
    
      // Create a new row at the specified row index
      this.createRow(grid, rowIndex);
    
      // Only call divideNextRowsAsNeeded if there is a valid remainder or if it's the first-time press
      if (remainder.length > 0 || IsFirstTime) {
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder.length > 0 ? remainder : [""]);
      }
    
      // Reset horizontal cursor position
      horizontalCursorPosition = 0;
    
      //!
      // Move vertical cursor down only if it's not the first-time press
      if (1) {
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

     //3/4/25 - ChatGpt
    // - missing fucnitonality
    // Bounds Checking	
    // Remaining Spaces Filling		✅
    // Cursor Repositioning	
    // Recursive Continuation	
    // Grid Overflow Protection
    divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder) {
      this.incrementRowTracking();
      
      // Handle the base case to stop recursion
      if (this.handleBaseCase(rowIndex)) {
        drawGrid(HEIGHT, WIDTH);
        return grid;
      }
    
      // Get the rows to split
      const { bottomRow, topRow } = this.getRowsToSplit(grid, rowIndex);
    
      // Split the rows at colIndex
      const [bottomLeftRow, bottomRightRow] = this.splitAtIndex(bottomRow, colIndex);
      const [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      // Combine the rows with the remainder
      const buildNextRow = this.combineRowsWithRemainder(bottomRightRow, topRow, remainder);
    
      // Adjust the row for the specified width and add dashes if necessary
      const [oneRowsWorth, newRemainder] = this.adjustRowForWidth(buildNextRow);
    
      // Update the grid with the adjusted row
      this.updateGridRow(grid, rowIndex, oneRowsWorth);
    
      // Reposition the cursor if needed
      this.repositionCursor(rowIndex, oneRowsWorth);
    
      // Recursive call if there is still a remainder
      if (newRemainder.length > 0) {
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
      }
    
      // Draw the horizontal line
      this.drawHorizontalLine(grid, rowIndex, colIndex);
    
      return grid;
    }
    



    ////////////start

    deleteAndPullCharacters(rowIndex, columnIndex, grid) {
      if (rowIndex > HEIGHT - 2) {
        grid = this.handleLastRow(rowIndex, columnIndex, grid);
      } else {
        grid = this.handleOtherRows(rowIndex, columnIndex, grid);
      }
    
      return grid;
    }
    
    //3/7/25
    // handleLastRow(rowIndex, columnIndex, grid) {
    //   let topRow = grid[rowIndex];
    //   let combine = [];
      
    //   if (columnIndex !== 0) {
    //     let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex - 1);
    //     let [leftCharacterRightRow, topRowRightWithoutFirst] = this.splitAtIndex(topRowRight, 1);
    //     combine = [...topRowLeft, ...topRowRightWithoutFirst];
    //   } else {
    //     let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex);
    //     let [leftChrRemoved, rightAfterFirst] = this.splitAtIndex(topRowRight, 1);
    //     combine = [...rightAfterFirst];O
    
    //     grid[HEIGHT - 2][WIDTH - 1] = grid[HEIGHT - 1][0];
    //   }
    
    //   CursorMovements.cursorLeft();
    //   grid[rowIndex] = combine;
    //   grid[HEIGHT - 1][WIDTH - 1] = "-";
      
    //   return grid;
    // }
    //!
    handleOtherRows(rowIndex, columnIndex, grid) {
      let topRow = grid[rowIndex];
      let bottomRow = grid[rowIndex + 1];
      let topLeftRow, topRightRow;
      
      if (columnIndex === 0) {
        [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex);
      } else {
        [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex - 1);
      }
    
      let [leftDiscarded, topRightWithoutFirst] = this.splitAtIndex(topRightRow, 1);
      let combinedRow = [...topLeftRow, ...topRightWithoutFirst];
    
      if (rowIndex !== 0 && columnIndex === 0 && rowIndex === verticalCursorPosition / 10) {
        grid[rowIndex - 1][WIDTH - 1] = grid[rowIndex][0];
      }
    
      grid[rowIndex] = combinedRow;
      CursorMovements.cursorLeft();
    
      this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1, columnIndex, grid);
    
      return grid;
    }

  //////////end


  /////////////start

    // Helper function to split a row at a specific index
    //@
  splitAtIndex(row, index) {
  return [row.slice(0, index), row.slice(index)];
}

// Helper function to remove the leftmost character of a row and return the updated row and the removed character
removeLeftmostCharacter(row) {
  return this.splitAtIndex(row, 1);
}

// Helper function to shift the leftmost character from one row to another
shiftLeftmostCharacter(fromRow, toRow) {
  const [leftCharacter, remainingRow] = this.removeLeftmostCharacter(fromRow);
  return [remainingRow, leftCharacter];
}

// Main function to handle the logic of moving characters between rows
removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex, columnIndex, grid) {
  // Bail out if the row index is out of bounds
  if (rowIndex > HEIGHT - 1) {
    return grid;
  }

  let bottomRow = []
  // Handle the case when we're at the second-to-last row (this will move the character to the right most position of the top row)
  if (rowIndex > HEIGHT - 2) {
    let currentRow = grid[rowIndex - 1];
    let nextRow = grid[rowIndex];
    
    // Remove the leftmost character from both rows
    let [currentRowLeftCharacter, currentRowWithoutLeftChar] = this.splitAtIndex(currentRow,1);
    let [nextRowLeftCharacter, nextRowWithoutLeftChar] = this.splitAtIndex(nextRow, 1);
    
    // Add the character from the bottom row to the rightmost position of the top row
    grid[rowIndex - 1] = [...currentRow, ...nextRowLeftCharacter];
    
    // Set the last character of the current row to the left character of the bottom row
    //grid[rowIndex - 1][WIDTH - 1] = nextRowLeftCharacter[0];
    //grid[rowIndex - 1][WIDTH - 1] = "-";
    // Set the bottom row to the updated row, with the left character removed
    grid[rowIndex] = [...nextRowWithoutLeftChar];
    
    // Mark the new rightmost character in the bottom row as a placeholder dash
    //grid[rowIndex][0] = "-";
    grid[HEIGHT-1][WIDTH-1] = "-";
    drawGrid(HEIGHT, WIDTH)
    
    return grid;
  }

  // For rows that are not the last row
  let topRow = grid[rowIndex - 1];
  bottomRow = grid[rowIndex];
  
  // Get the leftmost character from the bottom row (this will be added to the rightmost side of the top row)
  let leftCharacterOfBottomRow = bottomRow[0];
  
  // If we're on the bottom-most row, replace with a dash
  if (rowIndex === HEIGHT - 1) {
    leftCharacterOfBottomRow = "-";
  }

  // Remove the leftmost character from the bottom row
  const [removedBottomLeftChar, bottomRowWithoutLeftCharacter ] = this.splitAtIndex(bottomRow, 1);
  
  // Remove the rightmost character from the top row
  const [topRowWithoutRightCharacter, removedTopRightChar] = this.splitAtIndex(topRow, topRow.length);

  // Add the removed leftmost character from the bottom row to the end of the top row
  let newTopRow = [...topRowWithoutRightCharacter, leftCharacterOfBottomRow];
  
  // Update the grid with the new top row
  grid[rowIndex - 1] = newTopRow;
  
  if(rowIndex === HEIGHT-1){
    grid[rowIndex] = [...bottomRow]
     
  }
  else{
    // Update the grid with the updated bottom row
    grid[rowIndex] = [...bottomRowWithoutLeftCharacter];
  }
  // Recursively call the function to handle the next row
  this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1, columnIndex, grid);

  return grid;
}

////////////end





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
      
    
      if (rowIndex > HEIGHT - 1) {
        return grid; // Base case: Stop recursion when exceeding grid height
      }
    
      // Edge Case: Create a new row if bottom-right character is not a dash
      if (grid[HEIGHT - 1][WIDTH - 1] !== "-") {
        this.createRow(grid, leftOverChar, rowIndex, colIndex);
        //horizontalCursorPosition = 0;
        //verticalCursorPosition += 10; // Move cursor to new row
        drawGrid(HEIGHT, WIDTH);
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
        return grid
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
  