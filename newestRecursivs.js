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
  // this could be moved to next row if it is empty
  const [leftSide, rightSide] = this.splitAtIndex(topRow, maxIndex + 1);

  return { leftSide, rightSide };
}

pushWordsDoThisSecond(grid, newRemainder, rowIndex, fromIndex) {
 
  // Base case to stop recursion
  if (rowIndex >= HEIGHT) return grid; 

  //rowindex starts at 1from index.html, so 1 - 1 means row is on first row (index 0)
  let topRow = grid[rowIndex - 1] || [];
  
  
  let bottomRow = []
  
 
  
  bottomRow = grid[rowIndex]

  //if no space or null, right side (wordatendofrowone) will be entire row.
  let { rightSide: wordAtEndOfRowOne } = this.getLastSpaceOrDash(grid, topRow);
  let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;

  //last index of first word used on bottom
  let lastIndexOfFirstWord = this.findLeftmostSpaceOrDash(bottomRow);
  // Safety fallback

  //no space or dash
  if (lastIndexOfFirstWord === -1) lastIndexOfFirstWord = WIDTH; 
  let [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
  let lengthOfFirstWordBottomRow = firstWordBottomRow.length;

  //count nulls after lengthoffirsteordbottomrow 
  let remainingNullSpaces = this.countRemainingNullsAndSpaces(grid, rowIndex, lengthOfFirstWordBottomRow);

  
  //if the first column space is a dash than there is no character to cause overlap, so just get next row
  //is ready to be checked for overlap again
  //handels no length too.
  if (remainingNullSpaces === 0 || grid[rowIndex][0] === "-") {
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
    //overrights old word, when word is drawn to next row
    this.replaceTopRowOnlyWithDashes(grid, rowIndex, lengthOfRightWordAtRowOne);
    drawGrid(HEIGHT, WIDTH);
    
    

    return this.pushWordsDoThisSecond(grid, [""], rowIndex+1, false);
  }

  




  return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
}


findLeftmostSpaceOrDash(row) {
  return [row.indexOf(" "), row.indexOf("-")]
    .map(index => index === -1 ? WIDTH : index)
    .reduce((min, curr) => Math.min(min, curr));
}

//of the row
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
    
    // Helper function to get the current and next row
    getRowsToSplit(grid, rowIndex) {
      const bottomRow = grid[rowIndex];
      const topRow = grid[rowIndex + 1];
      return { bottomRow, topRow };
    }
    
    
    



    ///////////////////START HERE///////////////
    


    // Helper function to combine rows with the remainder
    combineRowsWithRemainder(topRightRow, bottomRow, remainder) {
      if (remainder.length > 0 && remainder[0] !== "") {
        
       //Left overop 
        return [...remainder, ...bottomRow];
      } else {
        //top rigth with bottom
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
      //drawGrid(HEIGHT, WIDTH);
    }
    
    // Helper function to reposition the cursor
    repositionCursor(rowIndex, oneRowsWorth) {
      
      //if (rowIndex === Math.floor(verticalCursorPosition / 10)) {
        horizontalCursorPosition = oneRowsWorth.length * 5 + 5;
      //}
    }
    
     replaceDashesWithOldWord(grid, rowIndex, colIndex) {

      
      if ((verticalCursorPosition / 10) < HEIGHT) {
        for (let i = colIndex; i < WIDTH; i++) {
          grid[(verticalCursorPosition / 10)][i] = "-";
        }
      }
    }
    

    
    pressedEnter(grid, rowIndex, colIndex, remainder, IsFirstTime, counter) {

      let IsConnectedFlag = true;
      // Base case: Prevent overflow if the cursor moves beyond grid height
      if (rowIndex >  HEIGHT - 1) return grid;
    
      // Create a new row at the specified row index
      this.createRow(grid, rowIndex);
    
      // Reset horizontal cursor position - adjust cursor
      horizontalCursorPosition = 0;

      //if is, set flag to put cursor on second column
      IsConnectedFlag = this.checkIfInWordAgainstRightSide(colIndex, grid, rowIndex, IsConnectedFlag);

      // Only call divideNextRowsAsNeeded if there is a valid remainder or if it's the first-time press
      if (remainder.length > 0 || IsFirstTime) {
        // Merges rows into new entries whenever the Enter key is pressed
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder.length > 0 ? remainder : [""]);
      }
    
        
       
      // if(IsConnectedFlag && grid[rowIndex][0] != "-"){
      //   //horizontalCursorPosition = 5;
      // }
      
      
         horizontalCursorPosition = 0;
        verticalCursorPosition += 10;
     
    
      // Ensure cursor stays within grid boundaries
      //!
      verticalCursorPosition = Math.min(verticalCursorPosition, (HEIGHT - 1) * 10);
    
      // Draw the cursor at the new position
      drawCursor(horizontalCursorPosition + HOFFSET, verticalCursorPosition + VOFFSET);
    
      // Stop recursion if no remainder is left (after devidenextrowsasneeded recursion)
      //!
      if (remainder.length === 0) {
        return grid;
      }
    
      // Recursive call if content still remains
      return this.pressedEnter(grid, rowIndex + 1, colIndex, remainder, false, counter + 1);
    }

    //checks to see if in a word against right hand margin
    checkIfInWordAgainstRightSide(colIndex, grid, rowIndex, IsConnectedFlag){
      
      for(let i = colIndex; i < WIDTH-1 ; i++){
        if (grid[rowIndex][i] === "-"){
          IsConnectedFlag = false;
          break;

        }
        
      }

      return IsConnectedFlag
    }

    
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
    
      // Get the rows to split
      //const { bottomRow, topRow } = this.getRowsToSplit(grid, rowIndex);
    
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
    
      // Reposition the cursor if needed
      //this.repositionCursor(rowIndex, oneRowsWorth);
      
    
      // Recursive call if there is still a remainder
      if (newRemainder.length > 0) {
      this.replaceDashesWithOldWord(grid, rowIndex, colIndex);
        return this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
      }
    
      
    
      return grid;
    }
    

    deleteAndPullCharacters(rowIndex, columnIndex, grid) {
      // Apply special handling if this is the last row based on its height
      if (rowIndex > HEIGHT - 2) {
        grid = this.handleLastRow(rowIndex, columnIndex, grid);
      } else {
        grid = this.handleOtherRows(rowIndex, columnIndex, grid);
      }
    
      return grid;
    }
    
    //for deleting and than pull
    handleLastRow(rowIndex, columnIndex, grid) {
      let topRow = grid[rowIndex];
      let combine = [];
      //is the column index not on the first character
      if (columnIndex !== 0) {
        
        let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex - 1);
        let [leftCharacterRightRow, topRowRightWithoutFirstCharacter] = this.splitAtIndex(topRowRight, 1);
        
        //missing first character in top row is combine - deleted character
        combine = [...topRowLeft, ...topRowRightWithoutFirstCharacter];
      } else {
        //  uptocharacter 
        let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex);
        let [leftChrRemoved, rightAfterFirst] = this.splitAtIndex(topRowRight, 1);
        combine = [...rightAfterFirst];
        //delete on lower left , deletes upper right hand side character
        grid[HEIGHT - 2][WIDTH - 1] = grid[HEIGHT - 1][0];
      }
    
      CursorMovements.cursorLeft();
      grid[rowIndex] = combine;
      //final character was deleted so add dash
      grid[HEIGHT - 1][WIDTH - 1] = "-";
      
      return grid;
    }


    /////////////LEFT OFF HERE
    

    //called by deleteandpull, setup before putting pullig up character
    handleOtherRows(rowIndex, columnIndex, grid) {
      let topRow = grid[rowIndex];
      let bottomRow = grid[rowIndex + 1];
      let topLeftRow, topRightRow;
      // deletes the character on the top right, so this will be handled below
      if (columnIndex === 0) {
        //!

        [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex);
      } else {
        //slice
        //top row is length : columindex - 1
        //bottom row length is : row - (columnindex - 1)
        [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex - 1);
      }
    
      let [leftCharacterTopRowDiscarded, topRightWithoutFirstCharacter] = this.splitAtIndex(topRightRow, 1);
      let combinedRow = [...topLeftRow, ...topRightWithoutFirstCharacter];
    
      //combined row combines allcharacters, but last  one
      //replace character on far right, with left most lower chracter
      

      if (rowIndex !== 0 && rowIndex === verticalCursorPosition / 10) {
        grid[rowIndex - 1][WIDTH - 1] = grid[rowIndex][0];
      }
    
      //the current row is created without the last character 
      grid[rowIndex] = combinedRow;
      CursorMovements.cursorLeft();
      
      this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1, columnIndex, grid);
    
      return grid;
    }

  
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
//!
removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex, columnIndex, grid) {
  
  let bottomRow = []
  
  
  // If this is the last row (based on total height), apply special handling
  if (rowIndex > HEIGHT - 1) {

    
    
    
    /////////////////
    let topRow = grid[rowIndex - 1];

    //top row
    let [topRowLeftCharacter, topRowWithoutLeftChar] = this.splitAtIndex(topRow,1);
   
    //bottom
    grid[rowIndex] = [...topRowWithoutLeftChar];



    
    // Mark the new rightmost character in the bottom row as a placeholder dash
    grid[HEIGHT-1][WIDTH-1] = "-";
    drawGrid(HEIGHT, WIDTH)
    
    return grid;
  }

 

  let topRow = grid[rowIndex - 1];
  bottomRow = grid[rowIndex];

  
  // Get the leftmost character from the bottom row (this will be added to the rightmost side of the top row)
  let leftCharacterOfBottomRow = bottomRow[0];
  grid[rowIndex-1][WIDTH-1] = leftCharacterOfBottomRow


  drawGrid(HEIGHT, WIDTH)



  // Remove the leftmost character from the bottom row
  const [removedBottomLeftChar, bottomRowWithoutLeftCharacter ] = this.splitAtIndex(bottomRow, 1);
  
  

  
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
    
    //replaces character with another, doesn't move other characters
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
      if (grid[HEIGHT - 1][WIDTH - 1] !== "-") {
        this.createRow(grid, rowIndex);
        
        drawGrid(HEIGHT, WIDTH);
      }
    
      let topRow = grid[rowIndex];
      // Set lowerRow to the next row, or null if it doesn't exist
      let lowerRow = grid[rowIndex + 1] ?? [];
      let [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);
    
      let combinedRow = [];
    
      if (fromIndex) {
        // On the initial non-recursive call, the remainder is inserted between two sections.
        // For subsequent calls, the pushed remainder causes it to be placed at the start of each row.
        CursorMovements.cursorRightOneSpace();
        combinedRow = [...leftTopRow, ...leftOverChar, ...rightTopRow];
       
      } else {
        combinedRow = [...leftOverChar, ...leftTopRow, ...rightTopRow];
        console.log("combinedrow: ", combinedRow)
        
      }
    
      let [finishedRow, remainder] = this.splitAtIndex(combinedRow, WIDTH);
    
      // Update grid with the finished row
      grid[rowIndex] = finishedRow;
    
      // Recursive Call to Next Row with Remainder
      
        this.initialInsertDoThisFirst(rowIndex + 1, 0, grid, remainder, false);
        return grid
     
    
    }
  }
  