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
getLastSpaceOrNull(grid, topRow) {  
  // Get the index of the last dash and the last space in the row
  const lastIndexOfDash = topRow.lastIndexOf("-");
  const lastIndexOfSpace = topRow.lastIndexOf(" ");

  // Determine the index of the last significant character (either dash or space)
  let maxIndex = -1;

  // Choose the rightmost character (dash or space)
  if (lastIndexOfSpace >= lastIndexOfDash) {
    maxIndex = lastIndexOfSpace;
  } else {
    maxIndex = lastIndexOfDash;
  }

  // Split the row at the position after the chosen character (space or dash)
  const [leftSide, rightSide] = this.splitAtIndex(topRow, maxIndex + 1);

  // Return the split parts: left side and the remaining part after the chosen character
  return { leftSide, rightSide };
}


//3/4/25  ChatGPT
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
pushWordsToNextRow(grid, newRemainder, rowIndex, fromIndex) {
  // Set flag if coming from previous row
  if (fromIndex) {
    this.FlagForFinalRow = true;
  }

  // Base case: Stop recursion if row index exceeds grid height
  if (rowIndex >= HEIGHT) return grid;

  let topRow = grid[rowIndex - 1];
  let bottomRow = newRemainder[0] !== "" ? [...newRemainder, ...grid[rowIndex]] : grid[rowIndex];

  // Get word at the end of the top row
  let { rightSide: wordAtEndOfRowOne } = this.getLastSpaceOrNull(grid, topRow);
  let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;

  // Find index of the rightmost space or dash in the bottom row
  let lastIndexOfFirstWord = this.findRightmostSpaceOrDash(bottomRow);

  // Split bottom row at the found index
  const [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
  let lengthOfFirstWordBottomRow = firstWordBottomRow.length;

  // Calculate remaining null spaces in the bottom row
  let remainingNullSpaces = this.countRemainingNullsAndSpaces(grid, rowIndex, lengthOfFirstWordBottomRow);

  // If no space is left or first cell is a dash, recurse to the next row
  if (remainingNullSpaces === 0 || grid[rowIndex][0] === "-") {
    return this.pushWordsToNextRow(grid, [""], rowIndex + 1, false);
  }

  // If the word fits, combine and split rows
  if (lengthOfRightWordAtRowOne < remainingNullSpaces) {
    let combined = [...wordAtEndOfRowOne, ...firstWordBottomRow, ...phraseAfterLeftWordBottomRow];
    drawGrid(HEIGHT, WIDTH);

    let [newBottomRow, newRemainder] = this.splitAtIndex(combined, WIDTH);
    newRemainder = this.getLastSpaceOrNull(grid, newRemainder).rightSide;

    this.repositionCursor(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow);

    grid[rowIndex] = newBottomRow;
    drawGrid(HEIGHT, WIDTH);
    this.fillDashesInTopRow(grid, rowIndex, lengthOfRightWordAtRowOne);

    let nextRowIndex = this.FlagForNewEndPush ? rowIndex : rowIndex + 1;
    this.FlagForNewEndPush = false;

    return this.pushWordsToNextRow(grid, newRemainder, nextRowIndex, false);
  }

  // If word doesn't fit, recurse to the next row
  return this.pushWordsToNextRow(grid, [""], rowIndex + 1, false);
}

findRightmostSpaceOrDash(row) {
  return [row.indexOf(" "), row.indexOf("-")]
    .map(index => index === -1 ? WIDTH : index)
    .reduce((min, curr) => Math.min(min, curr));
}

countRemainingNullsAndSpaces(grid, rowIndex, startIdx) {
  let remaining = 0;
  if (rowIndex !== HEIGHT) {
    for (let i = startIdx; i < WIDTH; i++) {
      if (grid[rowIndex][i] !== "-" && grid[rowIndex][i] !== " ") break;
      remaining++;
    }
  }
  return remaining;
}

repositionCursor(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
  if (this.handleCursorInTopRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow)) return;
  this.handleCursorInBottomRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow);
}

handleCursorInTopRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
  for (let i = WIDTH - wordAtEndOfRowOne.length; i < WIDTH; i++) {
    if (grid[rowIndex][0] !== "-" && verticalCursorPosition / 10 === rowIndex - 1 && horizontalCursorPosition / 5 === i + 1) {
      verticalCursorPosition = rowIndex * 10;
      horizontalCursorPosition = (wordAtEndOfRowOne.length + firstWordBottomRow.length) * 5;
      return true;
    }
  }
  return false;
}

handleCursorInBottomRow(grid, rowIndex, wordAtEndOfRowOne, firstWordBottomRow) {
  for (let i = 0; i < firstWordBottomRow.length; i++) {
    if (grid[rowIndex - 1][WIDTH - 1] !== "-" && verticalCursorPosition / 10 === rowIndex && horizontalCursorPosition / 5 === i + 1) {
      horizontalCursorPosition = (wordAtEndOfRowOne.length + firstWordBottomRow.length) * 5;
      break;
    }
  }
}

fillDashesInTopRow(grid, rowIndex, length) {
  grid[rowIndex - 1].fill("-", WIDTH - length, WIDTH);
}

splitAtIndex(arr, index) {
  return [arr.slice(0, index), arr.slice(index)];
}




    //3/4/25 - ChatGpt
    divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder) {
      // Increment the row tracking counter to keep track of the row state
      this.tracksRow++;
    
      // Get the current (bottomRow) and next (topRow) rows from the grid
      const bottomRow = grid[rowIndex];
      const topRow = grid[rowIndex + 1];
    
      // Base case: Stop recursion if we're at the last row of the grid
      if (rowIndex > HEIGHT - 2) {
        drawGrid(HEIGHT, WIDTH); // Draw the final grid
        return grid;
      }
    
      // Split the current row (bottomRow) at the specified column index (colIndex)
      const [bottomLeftRow, bottomRightRow] = this.splitAtIndex(bottomRow, colIndex);
    
      // Split the next row (topRow) at the same column index
      const [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      // Initialize the next row's content based on remainder
      let buildNextRow = "";
    
      // If there's no remainder, concatenate the right part of the current row with the entire next row
      if (remainder === "") {
        buildNextRow = [...bottomRightRow, ...topRow];
      } else {
        // Otherwise, prepend the remainder to the next row (Last In First Out behavior)
        buildNextRow = [...remainder, ...topRow];
      }
    
      // Split the concatenated row into a fixed width row and a remainder (if any)
      const [oneRowsWorth, newRemainder] = this.splitAtIndex(buildNextRow, WIDTH);
    
      // Update the grid with the newly built row
      grid[rowIndex + 1] = oneRowsWorth;
      drawGrid(HEIGHT, WIDTH); // Draw the grid after modification
    
      // If there's any remaining content, recurse with the new remainder
      if (newRemainder.length > 0) {
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
      }
    
      // Draw a horizontal line across the grid starting from the specified column index (colIndex)
      for (let i = colIndex; i < WIDTH; i++) {
        grid[Math.floor(verticalCursorPosition / 10)][i] = "-"; // Mark the grid with horizontal line
      }
    
      // Return the modified grid
      return grid;
    }

    //3/4/25 ChatGPT
    pressedEnter(grid, rowIndex, colIndex, remainder, IsFirstTime, counter) {
      // Create a new row at the specified index in the grid
      this.createRow(grid, rowIndex);
    
      // Split the rows as needed, starting from the given column index and row index
      // Pass an empty array as the remainder to initialize the process
      this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, [""]);
    
      // Reset the horizontal cursor position to the starting point
      horizontalCursorPosition = 0;
    
      // Increment the vertical cursor position to move it down by 10 units
      verticalCursorPosition = verticalCursorPosition + 10;
    
      // Redraw the cursor at the new position, adjusting for any offset values (HOFFSET, VOFFSET)
      drawCursor(
        horizontalCursorPosition + HOFFSET,
        verticalCursorPosition + VOFFSET
      );
    
      // Return the modified grid after processing the "Enter" key press
      return grid;
    }

// 3/4/25 ChatGPT
deleteAndPullCharacters(rowIndex, columnIndex, grid) {
      // Handle last row case
if (rowIndex > HEIGHT - 2) {
  let topRow = grid[rowIndex];
  let combine = [];

  // If columnIndex is not at the far left (0), handle split and combine logic
  if (columnIndex !== 0) {
    // Split the top row at the column index - 1 and the right part of the row
    let [topRowLeftOfColumn, topRowRightOfColumn] = this.splitAtIndex(
      topRow, columnIndex - 1
    );

    // Split the right part of the row and remove the first character
    let [leftCharacterRightRow, topRowRightOfColumnWithoutFirstCharacter] =
      this.splitAtIndex(topRowRightOfColumn, 1);

    // Combine the left part of the top row with the modified right part
    combine = [
      ...topRowLeftOfColumn,
      ...topRowRightOfColumnWithoutFirstCharacter,
    ];
  }
  // If columnIndex is at the far left, handle split and removal of the first character
  else {
    // Split the row into left and right parts at the current column index
    let [topRowLeftOfColumn, topRowRightOfColumn] = this.splitAtIndex(
      topRow, columnIndex
    );

    // Remove the first character from the right part of the row
    let [lastRowLeftChracterRemoved, lastRowRightSideAfterFirstColumn] =
      this.splitAtIndex(topRowRightOfColumn, 1);

    // Set the combined result as just the right part (after removing first character)
    combine = [...lastRowRightSideAfterFirstColumn];

    // Update the second-to-last row's rightmost character with the last row's first character
    grid[HEIGHT - 2][WIDTH - 1] = grid[HEIGHT - 1][0];
  }

  // Move the cursor left
  CursorMovements.cursorLeft();

  // Update the current row with the combined result
  grid[rowIndex] = combine;

  // Replace the last character of the last row with a dash (indicating deletion)
  grid[HEIGHT - 1][WIDTH - 1] = "-";

  return grid;
}

// Handle non-last rows
let topRow = grid[rowIndex];
let bottomRow = grid[rowIndex + 1];
let bottomRowLeftmostCharacter = bottomRow[0];
let topLeftRow = [];
let topRightRow = [];

// If the cursor is at the first column, split the row at the specified column index
if (horizontalCursorPosition === 0) {
  [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex);
} else {
  // Split the row at column index - 1 if not at the first column
  [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex - 1);
}

// Remove the first character from the right side of the top row (character to be deleted)
let [leftOnecharacterDiscarded, topRightRowNoFirstCharacter] = this.splitAtIndex(topRightRow, 1);

// Combine the left part of the row with the modified right part
let combinedRow = [...topLeftRow, ...topRightRowNoFirstCharacter];

// If on the current row's first column and verticalCursorPosition is aligned with rowIndex
if (rowIndex !== 0 && columnIndex === 0 && rowIndex == verticalCursorPosition / 10) {
  // Move the character from the current row's leftmost part to the rightmost part of the previous row
  let character = grid[rowIndex][0];
  grid[rowIndex - 1][WIDTH - 1] = character;
}

// Update the current row with the combined result
grid[rowIndex] = combinedRow;

// Move the cursor left
CursorMovements.cursorLeft();

// Call the recursive function to update the next row
this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(
  rowIndex + 1, columnIndex, grid
);

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
    initialInsertDoThisFirst(rowIndex, colIndex, grid, leftOverChar, fromIndex) {
      drawGrid(HEIGHT, WIDTH)
      if (rowIndex > HEIGHT - 1) {
      return grid;
      }
      //for displaying
      let horizString = (horizontalCursorPosition / 5).toString();
      let vertString = (verticalCursorPosition / 10).toString();
      //when bottom row on right end has a character tha create ana additional row
      if(grid[HEIGHT-1][WIDTH-1] != "-"){
        this.createRow(grid, leftOverChar, rowIndex, colIndex);
      }
      //these are the two rows we are using
      let topRow = grid[rowIndex];
      let lowerRow = grid[rowIndex + 1];
      //get both sides of row, broken at cursor
      let [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
      let combineTopRow = []
      //this function run is from the call at index, not a recursive call!
      if (fromIndex){
      //insert character at index
      //leftovervhar is the character being inserted (from index)
      CursorMovements.cursorRightOneSpace();
      combineTopRow = [...leftTopRow, ...leftOverChar,  ...rightTopRow];
      if(verticalCursorPosition/10 == HEIGHT-1){
        if(horizontalCursorPosition/5 === WIDTH-1){
          this.createRow(grid, leftOverChar, rowIndex, colIndex);
        }
        console.log("1")
      }
      }else{
        //leftoverchar is now remiander, so it is added to the fromt
      combineTopRow = [...leftOverChar, ...leftTopRow,  ...rightTopRow];
    }
      //get the firstt row of characters and the remiander to pass into the recursion
      let [finishedTopRow, leftOver] = this.splitAtIndex(combineTopRow, WIDTH);
      //set row
      grid[rowIndex] = finishedTopRow;
      //call for next row
      this.initialInsertDoThisFirst(rowIndex+1, colIndex, grid, leftOver, false) 
      return grid;
    }
  }
  