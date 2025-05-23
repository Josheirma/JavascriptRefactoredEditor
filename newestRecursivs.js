class RecursiveClass {
    constructor() {
      this.lastRowIndexToPushOn = -1;
      this.bottomRow = -1;
      this.bottomRowFromLastRound = [];
     
      this.hasBeenInZeroHorizPosition = false;
      
    }


  
  // Deletes a row from the array at the specified rowNumber index
  deleteRow(arr, rowNumber) {
  // Ensure rowNumber is within valid bounds
  if (rowNumber >= 0 && rowNumber < arr.length) {
    // Remove the row at the specified index
    arr.splice(rowNumber, 1); 
  } else {
    // Error handling for invalid index
    console.error("Invalid row number: out of bounds"); 
  }

  // Return the modified array
  return arr; 
}


  // Adds a new row with placeholder values to the grid at the specified rowIndex
  
  createRow(grid) {
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



//Finds the last occurrence of a space or dash in the row and splits the row accordingly

getLastSpaceOrDash(grid, topRow) {
  // Get the index of the last dash and the last space
  const lastIndexOfDash = topRow.lastIndexOf("-");
  const lastIndexOfSpace = topRow.lastIndexOf(" ");

  
  // Determine the rightmost index or default to full row length if none found
  const maxIndex = Math.max(lastIndexOfDash, lastIndexOfSpace, -1) === -1 ? topRow.length : Math.max(lastIndexOfDash, lastIndexOfSpace);

  
  // Split at the position after the found dash or space 0 if no spaces or dashes, right side is entire row
  // this could be moved to next row 
  const [leftSide, rightSide] = this.splitAtIndex(topRow, maxIndex + 1);

  return { leftSide, rightSide };
}

//if a word overlaps the right border and there is space below, move it totally to next row 
pushWordsDoThisSecond(grid, newRemainder, rowIndex, fromIndex) {
 
  // Base case to stop recursion
  if (rowIndex >= HEIGHT) return grid; 


  let topRow = grid[rowIndex - 1] || [];
  
  
  let bottomRow = []
  
 
  
  bottomRow = grid[rowIndex]

  //if no space or null, right side (wordatendofrowone) will be entire row.
  let { rightSide: wordAtEndOfRowOne } = this.getLastSpaceOrDash(grid, topRow);
  let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;

  //last index of first word used on bottom
  let lastIndexOfFirstWord = this.findLeftmostSpaceOrDash(bottomRow);
  

  //no space or dash
  if (lastIndexOfFirstWord === -1) lastIndexOfFirstWord = WIDTH; 
  let [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
  let lengthOfFirstWordBottomRow = firstWordBottomRow.length;

  //count nulls after lengthoffirsteordbottomrow 
  let remainingNullSpaces = this.countRemainingNullsAndSpaces(grid, rowIndex, lengthOfFirstWordBottomRow);

  
  //if the first column space is a dash than there is no character to cause overlap, so just get next row
  //ready to be checked for overlap again.  Is enough space is below this block.
  //handels no length too.
  //@
  if (grid[rowIndex][0] === "-") {
    return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
  }



  //is it enough space?
  
  if (lengthOfRightWordAtRowOne <= remainingNullSpaces && lengthOfRightWordAtRowOne != 0) {

    
    

    //there needs to be a word on left, so that the wrap will work.
    let totalLeftSidePhraseLength = lengthOfRightWordAtRowOne + lengthOfFirstWordBottomRow
    //the left side is a word followed by null spaces for inserting
    let [leftmostTotalWordThatIsRemoved, restOfBottomRowWithoutLeftWord] = this.splitAtIndex(bottomRow, totalLeftSidePhraseLength);
    let combinedLowerRow = [...wordAtEndOfRowOne , ...firstWordBottomRow, ...restOfBottomRowWithoutLeftWord]
    
    
    
    grid[rowIndex] = combinedLowerRow;
    
    this.replaceTopRowOnlyWithDashes(grid, rowIndex, lengthOfRightWordAtRowOne);
    drawGrid(HEIGHT, WIDTH);
    
    

    return this.pushWordsDoThisSecond(grid, [""], rowIndex+1, false);
  }
  else{

    return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);

  }

  



 
  
}

//on left sode of top row
findLeftmostSpaceOrDash(row) {
  return [row.indexOf(" "), row.indexOf("-")]
    .map(index => index === -1 ? WIDTH : index)
    .reduce((min, curr) => Math.min(min, curr));
}


//checking for space after word to move into from top left
//(count nulls after lengthoffirsteordbottomrow) 
countRemainingNullsAndSpaces(grid, rowIndex, startIdx) {
  // Prevent out-of-bounds access
  if (rowIndex >= HEIGHT || !grid[rowIndex]) return 0; 

  let remaining = 0;

  for (let i = startIdx; i < WIDTH; i++) {
    if (grid[rowIndex][i] !== "-" && grid[rowIndex][i] !== null) {
      // Stop counting on non-empty characters
      break; 
    }
    remaining++;
  }

  return remaining;
}

//for replacing variable that was drawn to below, with dashes
replaceTopRowOnlyWithDashes(grid, rowIndex, length) {
  grid[rowIndex - 1].fill("-", WIDTH - length - 1, WIDTH);
}


//splits right before index
splitAtIndex(arr, index) {
  return [arr.slice(0, index), arr.slice(index)];
}

    
    // Helper function to handle the base case (stop recursion)
    handleBaseCase(rowIndex) {
      return rowIndex >= HEIGHT - 1;
    }
    
    // Helper function to split into the bottom anf top and row
    getRowsToSplit(grid, rowIndex) {
      const bottomRow = grid[rowIndex];
      const topRow = grid[rowIndex + 1];
      return { bottomRow, topRow };
    }
    
    //see  divideNextRowsAsNeeded comment before the function call, for this! 
    // Helper function to combine rows with the remainder

    combineRowsWithRemainder(topRightRow, bottomRow, remainder) {
      if (remainder.length > 0 && remainder[0] !== "") {
        
       //is remainder 
       //remainder is what was left over from top row after cutting down to width
        return [...remainder, ...bottomRow];
      } else {
        //is no remainder, easy enough - first run  through
        return [...topRightRow, ...bottomRow];
      }
    }

    

    // Helper function to adjust the row for width and add dashes
    adjustRowForWidth(buildNextRow) {
      const [oneRowsWorth, newRemainder] = this.splitAtIndex(buildNextRow, WIDTH);
    
      return [oneRowsWorth, newRemainder];
    }
    
    // Helper function to update the grid with the adjusted row
    updateGridRow(grid, rowIndex, oneRowsWorth) {
      
      grid[rowIndex+1] = oneRowsWorth;
      
    }
    
    // Helper function to reposition the cursor
    repositionCursor(rowIndex, oneRowsWorth) {
      
      //if (rowIndex === Math.floor(verticalCursorPosition / 10)) {
        horizontalCursorPosition = oneRowsWorth.length * 5 + 5;
      //}
    }
    

    //This is for top right word that is moved down to bottom left, it replaces the upper word with dashes
     replaceDashesWithOldWord(grid, rowIndex, colIndex) {

      
      if ((verticalCursorPosition / 10) < HEIGHT) {
        for (let i = colIndex; i < WIDTH; i++) {
          grid[(verticalCursorPosition / 10)][i] = "-";
        }
      }
    }
    

    
    pressedEnter(grid, rowIndex, colIndex, remainder, IsFirstTime, counter) {

      //let IsConnectedFlag = true;
      // Base case: Prevent overflow if the cursor moves beyond grid height
      if (rowIndex >  HEIGHT - 1) return grid;
    
      // Create a new row at the specified row index
      this.createRow(grid, rowIndex);
    
      // Reset horizontal cursor position - adjust cursor
      horizontalCursorPosition = 0;

      //@ - removed this code in multiple areas
      //if there are characters next to top right row without dashes, set flag - space?  if is set flag to put cursor on second column
      //IsConnectedFlag = this.checkIfInWordAgainstRightSide(colIndex, grid, rowIndex, IsConnectedFlag);

      // Only call divideNextRowsAsNeeded if there is a valid remainder or if it's the first-time press
      //@
      //if (remainder.length > 0 || IsFirstTime) {
        // Merges rows into new entries whenever the Enter key is pressed
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder.length > 0 ? remainder : [""]);
      //}
    
      
         horizontalCursorPosition = 0;
        verticalCursorPosition += 10;
     
      // Draw the cursor at the new position
      drawCursor(horizontalCursorPosition + HOFFSET, verticalCursorPosition + VOFFSET);
    
      
      return grid;
      
    }

    //checks to see if in a word against right hand margin
    // checkIfInWordAgainstRightSide(colIndex, grid, rowIndex, IsConnectedFlag){
      
    //   for(let i = colIndex; i < WIDTH-1 ; i++){
    //     if (grid[rowIndex][i] === "-"){
    //       IsConnectedFlag = false;
    //       break;

    //     }
        
    //   }

    //   return IsConnectedFlag
    // }

    
    /*
     On the first pass, there is no remainder, so checkIfInWordAgainstRightSide tacks from the top-right to the bottom — straightforward. At this point, the resulting string is longer than the grid's width. It is sliced at the width limit, and the overflow becomes the newRemainder string. The portion that fits — oneRowsWorth — is copied into the grid, character by character.

    The newRemainder is then returned through the recursive call. The top section was already filled during the previous step, and now the bottom section is ready to be populated again. From this point forward, combineRowsWithRemainder will attach the function's remainder to the bottom on every call. Since the bottom is always the full width, there will always be overflow — and therefore always a new remainder passed along.
    
    adjustRowForWidth will again produce a row of the specified width along with a new remainder. This new remainder is passed recursively and becomes the next input for the following step. The process continues until there are no more characters left to fill additional rows.
    
    its like the same length word that is combined and removed produces a new string with the remainder.  In a run of the function, the remainder and newremainder is just (respectively) added to the front and removed from back, same length string, like a sliding window (could chat with Chatbot, i.e., ChatGPT)*/

    //divides rows for enter
    divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder = []) {
    
      
      // Handle the base case to stop recursion
      if (this.handleBaseCase(rowIndex)) {
        drawGrid(HEIGHT, WIDTH);
        return grid;
      }
    
    
      let topRow = grid[rowIndex] 
      let bottomRow = grid[rowIndex+1]
      // Split the rows at colIndex
      const [bottomLeftRow, bottomRightRow] = this.splitAtIndex(bottomRow, colIndex);
      const [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      // Combine the rows with the remainder
      //top right row , bottom row, remainder
      
      const buildNextRow = this.combineRowsWithRemainder(rightTopRow, bottomRow, remainder);
    
      // Adjust the row for the specified width and add dashes if necessary
      //remainder is what is left after first top row
      const [oneRowsWorth, newRemainder] = this.adjustRowForWidth(buildNextRow);
    
      // Update the grid with the adjusted row
      this.updateGridRow(grid, rowIndex, oneRowsWorth);
    
      //@Reposition the cursor if needed
      //this.repositionCursor(rowIndex, oneRowsWorth);
      
    
      // Recursive call if there is still a remainder (there always is until last line)
      if (newRemainder.length > 0) {
      this.replaceDashesWithOldWord(grid, rowIndex, colIndex);
        return this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
      }
    
      
    
      return grid;
    }
    

    //after delete, move all character once to left including over border
    deleteAndPullCharacters(rowIndex, columnIndex, grid) {
      // Apply special handling if this is the last row based on its height
      if (rowIndex > HEIGHT - 2) {
        grid = this.handleLastRow(rowIndex, columnIndex, grid);
      } else {
        grid = this.handleOtherRows(rowIndex, columnIndex, grid);
      }
    
      return grid;
    }
    
    //for deleting and than pulling and than a new dash is added to final postion
    handleLastRow(rowIndex, columnIndex, grid) {
      let topRow = grid[rowIndex];
      let combine = [];
      //is the column index not on the first character
      if (columnIndex !== 0) {
        
        let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex - 1);
        let [leftCharacterRightRow, topRowRightWithoutFirstCharacter] = this.splitAtIndex(topRowRight, 1);
        
        //missing first character in top row is combine - deleted character,
        combine = [...topRowLeft, ...topRowRightWithoutFirstCharacter];
      } else {
        //cursor is on first column, so toprowrightwith... is complete row
    
        let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex);
        //renove first character
        let [leftChrRemoved, topRowRightWithLeftCharacterRemoved] = this.splitAtIndex(topRowRight, 1);
        //dont forget to put dash on last row and column
        combine = [...topRowRightWithLeftCharacterRemoved];
        //delete on lower left , deletes upper right hand side character
        grid[HEIGHT - 2][WIDTH - 1] = grid[HEIGHT - 1][0];
      }
    
      CursorMovements.cursorLeft();
      grid[rowIndex] = combine;
      //final character was deleted so add dash
      grid[HEIGHT - 1][WIDTH - 1] = "-";
      
      return grid;
    }

    //called by deleteandpull, setup before putting pullig up character
    handleOtherRows(rowIndex, columnIndex, grid) {
      let topRow = grid[rowIndex];
      let bottomRow = grid[rowIndex + 1];
      let topLeftRow, topRightRow;
      // deletes the character on the top right, so this will be handled below
      
      if (columnIndex === 0) {
        //@
        //toprightrow is entire row!  In a moment, remove the deleted character, in front
        [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex);
      } else {
        
        // Split, with character on toprightrow, is removed below
        [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex - 1);
      }
    
      //remove the inserted character from toprightrow
      let [leftCharacterTopRowDiscarded, topRightWithoutFirstCharacter] = this.splitAtIndex(topRightRow, 1);
      
     
      //could be an entire row
      //missing one character, to add onto the end
      let combinedRow = [...topLeftRow, ...topRightWithoutFirstCharacter];
    
      //the current row is created without the last character 
      grid[rowIndex] = combinedRow;
      CursorMovements.cursorLeft();
      
      //this function puts a character on end of row
      this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1, columnIndex, grid);
    
      return grid;
    }


  
  splitAtIndex(row, index) {
  return [row.slice(0, index), row.slice(index)];
}

//returns two arrays
removeLeftmostCharacter(row) {
  return this.splitAtIndex(row, 1);
}

// Helper function to shift the leftmost character from one row to another
//@
// shiftLeftmostCharacter(fromRow, toRow) {
//   const [leftCharacter, remainingRow] = this.removeLeftmostCharacter(fromRow);
//   return [remainingRow, leftCharacter];
// }

// Main function to handle the logic of moving characters between rows
removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex, columnIndex, grid) {
  
  //even on start, the leftmost chracter is not available and needs to be replaced (bottom row)
  let bottomRow = []
  
  
  // If this is the last row (based on total height), apply special handling
  if (rowIndex > HEIGHT - 1) {

    
    
    
   
    let topRow = grid[rowIndex - 1];

    //top row
    let [topRowLeftCharacter, topRowWithoutLeftChar] = this.splitAtIndex(topRow,1);
   
    //bottom
    grid[rowIndex] = [...topRowWithoutLeftChar];



    
    // place a dash on final character of grid
    grid[HEIGHT-1][WIDTH-1] = "-";
    drawGrid(HEIGHT, WIDTH)
    
    return grid;
  }

 

  let topRow = grid[rowIndex - 1];
  bottomRow = grid[rowIndex];

  
  // Get the leftmost character from the bottom row (this will be added to the rightmost side of the top row)
  let leftCharacterOfBottomRow = bottomRow[0];
  //put the left bottom character on top right column
  grid[rowIndex-1][WIDTH-1] = leftCharacterOfBottomRow


  drawGrid(HEIGHT, WIDTH)



  // Remove the leftmost character from the bottom row
  const [removedBottomLeftChar, bottomRowWithoutLeftCharacter ] = this.splitAtIndex(bottomRow, 1);
  
  

  //remove the right most character
  const [topRowWithoutRightCharacter, removedTopRightChar] = this.splitAtIndex(topRow, topRow.length - 1);

  // Add the removed leftmost character from the bottom row to the end of the top row
  let newTopRow = [...topRowWithoutRightCharacter, ...leftCharacterOfBottomRow];
  
  // Update the grid with the new top row 
  grid[rowIndex - 1] = newTopRow;
  //this will be the next toprow
  grid[rowIndex] =  bottomRowWithoutLeftCharacter;

  

drawGrid(HEIGHT, WIDTH)
  
// Recursively call the function to handle the next row
  this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1, columnIndex, grid);

  return grid;
}







  displayGridAndCursor() {
      drawGrid(HEIGHT, WIDTH)
      drawCursor(
        horizontalCursorPosition + HOFFSET,
        verticalCursorPosition + VOFFSET
      );
    }
    
    //replaces character with another, doesn't move other characters, right on top
    placeCharacterWithoutInsertDoThisFirst(rowIndex, colIndex, grid, character) {
      grid[rowIndex][colIndex] = character;
      return grid;
    }

    initialInsertDoThisFirst(rowIndex, colIndex, grid, leftOverChar, fromIndex) {
      
    
      if (rowIndex > HEIGHT - 1) {
        // Base case: Stop recursion when exceeding grid height
        return grid; 
      }
    
      // Edge Case: Create a new row if bottom-right character is not a dash
      // (text is pushed)
      if (grid[HEIGHT - 1][WIDTH - 1] !== "-") {
        this.createRow(grid, rowIndex);
        
        drawGrid(HEIGHT, WIDTH);
      }
    
      let topRow = grid[rowIndex];
      // Set lowerRow to the next row, or null if it doesn't exist
      let lowerRow = grid[rowIndex + 1] ?? [];
      let [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      let combinedRow = [];
    
      //this is the first call, recursivly
      if (fromIndex) {
        // On the initial non-recursive call, the remainder is inserted between two sections.
        // For subsequent calls, the pushed remainder causes it to be placed at the start of each row.
        CursorMovements.cursorRightOneSpace();
        //on first call, insert the first character and there will be one character extra
        combinedRow = [...leftTopRow, ...leftOverChar, ...rightTopRow];
       
      } else {

        //because left over character is next (above) put in front which will also have extra character
        combinedRow = [...leftOverChar, ...leftTopRow, ...rightTopRow];
        console.log("combinedrow: ", combinedRow)
        
      }
    
      let [finishedRow, remainder] = this.splitAtIndex(combinedRow, WIDTH);
    
      // Update grid with the finished row
      grid[rowIndex] = finishedRow;
    
      // Recursive Call to Next Row with Remainder because of addition to row with an extra character causes a remainder
      
        this.initialInsertDoThisFirst(rowIndex + 1, 0, grid, remainder, false);
        return grid
     
    
    }
  }
  