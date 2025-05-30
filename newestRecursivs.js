//
//@@ - recently changed code section
//& - needs improvement or cleanup

class RecursiveClass {
    constructor() {
        this.lastRowIndexToPushOn = -1;
        this.bottomRow = -1;
        this.bottomRowFromLastRound = [];
        this.hasBeenInZeroHorizPosition = false;
    }

    // Deletes a row from the array if the index is valid
    deleteRow(arr, rowNumber) {
        if (rowNumber >= 0 && rowNumber < arr.length) {
            arr.splice(rowNumber, 1);
        } else {
            console.error("Invalid row number: out of bounds");
        }
        return arr;
    }

    // Appends a new row filled with placeholders to the grid
    createRow(grid) {
        const newRow = Array(WIDTH).fill("-");
        grid.push(newRow);
        HEIGHT++;
         makeCanvas(HEIGHT*10 + CANVASHEIGHTOFFSET, WIDTH*5 + CANVASWIDTHOFFSET)
        return grid;
    }

    // Splits the row at the last space or dash, preferring the rightmost one
    getLastSpaceOrDash(grid, topRow) {
        const lastIndexOfDash = topRow.lastIndexOf("-");
        const lastIndexOfSpace = topRow.lastIndexOf(" ");
        const maxIndex = Math.max(lastIndexOfDash, lastIndexOfSpace, -1) === -1 ? topRow.length : Math.max(lastIndexOfDash, lastIndexOfSpace);
        const [leftSide, rightSide] = this.splitAtIndex(topRow, maxIndex + 1);
        return { leftSide, rightSide };
    }

    // Moves overflowed word from top row to bottom row if space allows
    pushWordsDoThisSecond(grid, newRemainder, rowIndex, fromIndex) {
        if (rowIndex >= HEIGHT) return grid;

        let topRow = grid[rowIndex - 1] || [];
        let bottomRow = grid[rowIndex];

        let { rightSide: wordAtEndOfRowOne } = this.getLastSpaceOrDash(grid, topRow);
        let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;

        let lastIndexOfFirstWord = this.findLeftmostSpaceOrDash(bottomRow);
        if (lastIndexOfFirstWord === -1) lastIndexOfFirstWord = WIDTH;

        let [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
        let lengthOfFirstWordBottomRow = firstWordBottomRow.length;

        let remainingNullSpaces = this.countRemainingNullsAndSpaces(grid, rowIndex, lengthOfFirstWordBottomRow);

        // If bottom left is empty or there's enough space to wrap word, move it
        if (remainingNullSpaces === 0 || grid[rowIndex][0] === "-") {
            return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
        }

        if (lengthOfRightWordAtRowOne <= remainingNullSpaces && lengthOfRightWordAtRowOne !== 0) {
            let totalLeftSidePhraseLength = lengthOfRightWordAtRowOne + lengthOfFirstWordBottomRow;
            let [leftmostTotalWordThatIsRemoved, restOfBottomRowWithoutLeftWord] = this.splitAtIndex(bottomRow, totalLeftSidePhraseLength);
            let combinedLowerRow = [...wordAtEndOfRowOne, ...firstWordBottomRow, ...restOfBottomRowWithoutLeftWord];

            if (verticalCursorPosition / 10 === rowIndex) {
                horizontalCursorPosition = totalLeftSidePhraseLength * 5;
            }

            grid[rowIndex] = combinedLowerRow;
            this.replaceTopRowOnlyWithDashes(grid, rowIndex, lengthOfRightWordAtRowOne);
            drawGrid(HEIGHT, WIDTH);

            return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
        } else {
            return this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
        }
    }

    // Finds the earliest space or dash in a row
    findLeftmostSpaceOrDash(row) {
        return [row.indexOf(" "), row.indexOf("-")]
            .map(index => index === -1 ? WIDTH : index)
            .reduce((min, curr) => Math.min(min, curr));
    }

    //@@ Count available space in a row from a given index
    countRemainingNullsAndSpaces(grid, rowIndex, startIdx) {
        if (rowIndex >= HEIGHT || !grid[rowIndex]) return 0;
        let remaining = 0;
        for (let i = startIdx; i < WIDTH; i++) {
            if (grid[rowIndex][i] !== "-" && grid[rowIndex][i] !== null) break;
            remaining++;
        }
        return remaining;
    }

    // Replaces the last part of the row above with dashes
    replaceTopRowOnlyWithDashes(grid, rowIndex, length) {
        grid[rowIndex - 1].fill("-", WIDTH - length - 1, WIDTH);
    }

    // Splits an array at a given index
    splitAtIndex(arr, index) {
        return [arr.slice(0, index), arr.slice(index)];
    }

    // Helpers for row logic during Enter key press
    handleBaseCase(rowIndex) {
        return rowIndex >= HEIGHT - 1;
    }

    getRowsToSplit(grid, rowIndex) {
        return {
            bottomRow: grid[rowIndex],
            topRow: grid[rowIndex + 1]
        };
    }

    // Combines remaining string with the next row
    combineRowsWithRemainder(topRightRow, bottomRow, remainder) {
        return remainder.length > 0 && remainder[0] !== ""
            ? [...remainder, ...bottomRow]
            : [...topRightRow, ...bottomRow];
    }

    // Cuts a string to fit the row, returns remainder
    adjustRowForWidth(buildNextRow) {
        return this.splitAtIndex(buildNextRow, WIDTH);
    }

    // Assigns a row to a grid index
    updateGridRow(grid, rowIndex, oneRowsWorth) {
        grid[rowIndex + 1] = oneRowsWorth;
    }

    repositionCursor(rowIndex, oneRowsWorth) {
        horizontalCursorPosition = oneRowsWorth.length * 5 + 5;
    }

    // Erases a segment of the row and adds dashes
    replaceDashesWithOldWord(grid, rowIndex, colIndex) {
        if ((verticalCursorPosition / 10) < HEIGHT) {
            for (let i = colIndex; i < WIDTH; i++) {
                grid[verticalCursorPosition / 10][i] = "-";
            }
        }
    }

    // Handles Enter key logic to push text down to a new row
    pressedEnter(grid, rowIndex, colIndex, remainder, IsFirstTime, counter) {
        if (rowIndex > HEIGHT - 1) return grid;
        this.createRow(grid, rowIndex);
        horizontalCursorPosition = 0;
        this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder.length > 0 ? remainder : [""]);
        horizontalCursorPosition = 0;
        verticalCursorPosition += 10;
        drawCursor(horizontalCursorPosition + HOFFSET, verticalCursorPosition + VOFFSET);
        return grid;
    }

    // Recursive logic for dividing and continuing to wrap remainder
    divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder = []) {
        if (this.handleBaseCase(rowIndex)) {
            drawGrid(HEIGHT, WIDTH);
            return grid;
        }

        let topRow = grid[rowIndex];
        let bottomRow = grid[rowIndex + 1];
        const [bottomLeftRow, bottomRightRow] = this.splitAtIndex(bottomRow, colIndex);
        const [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);

        const buildNextRow = this.combineRowsWithRemainder(rightTopRow, bottomRow, remainder);
        const [oneRowsWorth, newRemainder] = this.adjustRowForWidth(buildNextRow);

        this.updateGridRow(grid, rowIndex, oneRowsWorth);

        if (newRemainder.length > 0) {
            this.replaceDashesWithOldWord(grid, rowIndex, colIndex);
            return this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
        }

        return grid;
    }

    // Handles deletion and pulling characters left
    deleteAndPullCharacters(rowIndex, columnIndex, grid) {
        return rowIndex > HEIGHT - 2
            ? this.handleLastRow(rowIndex, columnIndex, grid)
            : this.handleOtherRows(rowIndex, columnIndex, grid);
    }

    // Handles deletion in the last row
    handleLastRow(rowIndex, columnIndex, grid) {
        let topRow = grid[rowIndex];
        let combine = [];
        if (columnIndex !== 0) {
            let [topRowLeft, topRowRight] = this.splitAtIndex(topRow, columnIndex - 1);
            let [, topRowRightWithoutFirstCharacter] = this.splitAtIndex(topRowRight, 1);
            combine = [...topRowLeft, ...topRowRightWithoutFirstCharacter];
        } else {
            let [, topRowRightWithLeftCharacterRemoved] = this.splitAtIndex(topRow, 1);
            combine = [...topRowRightWithLeftCharacterRemoved];
            grid[HEIGHT - 2][WIDTH - 1] = grid[HEIGHT - 1][0];
        }
        CursorMovements.cursorLeft();
        grid[rowIndex] = combine;
        grid[HEIGHT - 1][WIDTH - 1] = "-";
        return grid;
    }

    // Handles deletion across multiple rows
    handleOtherRows(rowIndex, columnIndex, grid) {
        let topRow = grid[rowIndex];
        let bottomRow = grid[rowIndex + 1];
        let [topLeftRow, topRightRow] = columnIndex === 0
            ? this.splitAtIndex(topRow, columnIndex)
            : this.splitAtIndex(topRow, columnIndex - 1);

        let [, topRightWithoutFirstCharacter] = this.splitAtIndex(topRightRow, 1);
        let combinedRow = [...topLeftRow, ...topRightWithoutFirstCharacter];
        grid[rowIndex] = combinedRow;
        CursorMovements.cursorLeft();
        this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1, columnIndex, grid);
        return grid;
    }

    // Removes first character from a row
    removeLeftmostCharacter(row) {
        return this.splitAtIndex(row, 1);
    }


    ///////////////////////////////////

   // Moves character up and updates rows during deletion
    removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex, columnIndex, grid) {
        // Base case: if we've gone beyond the last row, adjust the previous row and end recursion
        if (rowIndex > HEIGHT - 1) {
            let topRow = grid[rowIndex - 1];
            let [, topRowWithoutLeftChar] = this.splitAtIndex(topRow, 1); // Remove first character from previous row
            grid[rowIndex] = [...topRowWithoutLeftChar]; // Update current row with remainder
            grid[HEIGHT - 1][WIDTH - 1] = "-"; // Place dash at bottom right
            drawGrid(HEIGHT, WIDTH);
            return grid;
        }

        let bottomRow = grid[rowIndex];
        let topRow = grid[rowIndex - 1];

        // Get the leftmost character from the current (bottom) row
        let leftCharacterOfBottomRow = bottomRow[0];

        // Place the leftmost character of the bottom row onto the rightmost position of the top row
        grid[rowIndex - 1][WIDTH - 1] = leftCharacterOfBottomRow;

        drawGrid(HEIGHT, WIDTH);

        // Remove the leftmost character from the bottom row
        let [, bottomRowWithoutLeftCharacter] = this.splitAtIndex(bottomRow, 1);

        // Remove the rightmost character from the top row
        let [topRowWithoutRightCharacter] = this.splitAtIndex(topRow, topRow.length - 1);

        // Build new top row by appending the leftmost character of the bottom row
        let newTopRow = [...topRowWithoutRightCharacter, ...leftCharacterOfBottomRow];

        // Update grid rows
        grid[rowIndex - 1] = newTopRow;
        grid[rowIndex] = bottomRowWithoutLeftCharacter;

        drawGrid(HEIGHT, WIDTH);

        // Recursively handle the next row
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
  