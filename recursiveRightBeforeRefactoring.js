class RecursiveClass {
  constructor() {
    this.lastRowIndexToPushOn = -1;
    this.bottomRow = -1;
    this.bottomRowFromLastRound = [];
    this.tracksRow = 0;
    this.hasBeenInZeroHorizPosition = false;
  }

  deleteRow(arr, rowNumber) {
    arr.splice(rowNumber, 1);
    return arr;
  }

  createRow(grid, rowIndex) {
    grid.push(["-", "-", "-", "-", "-", "-" , "-", "-", "-", "-", "-", "-", "-" , "-", "-", "-", "-", "-", "-", "-" , "-","-", "-", "-", "-", "-", "-","-" ])
    //important, allows new line to display in the drawgrid
    HEIGHT++;
    //drawGrid(HEIGHT, WIDTH)
    return grid;
  }

  getLastSpaceOrNull(grid, topRow) {  
    //get left phrase before last dash
    //checks for either space or dash, whichever is less characters
    let lastIndexOfNullOnTopRow = topRow.lastIndexOf("-");
    let lastIndexOfSpaceOnTopRow = topRow.lastIndexOf(" ");
    let maxIndexOfNullOrString = -1;
    //row has dash or space on last character
    if (lastIndexOfSpaceOnTopRow >= lastIndexOfNullOnTopRow) {
      maxIndexOfNullOrString = lastIndexOfSpaceOnTopRow;
    }
  
    else
    {
      //choose space or null character that is farthest right on row
      maxIndexOfNullOrString = lastIndexOfNullOnTopRow;
    }
    //row does not have a space or dash
  //   if (maxIndexOfNullOrString === -1) {
  //     const left = ""
  //     const rightWordAtEndOfRowOne = ""
  //     for(let i = 0; i < WIDTH-1; i++ )
  //     rightWordAtEndOfRowOne[i] = "-"
  //   }
  //   return { leftSide: left, rightSide: rightWordAtEndOfRowOne };


    //gets the word after dash or space
    const [left, rightWordAtEndOfRowOne] = this.splitAtIndex(
      topRow,
      maxIndexOfNullOrString + 1
    );
    //@@
    //check this: right word can be empty string, dash or space on last space?
    return { leftSide: left, rightSide: rightWordAtEndOfRowOne };
  }
  //2/7/25
  lastLineWorkings(grid, rowIndex) {
    if (rowIndex <= 0 || rowIndex >= grid.length) return grid;
    // 3/1/25 - reverted with meld///////
    let topRow = grid[rowIndex - 1];
    let bottomRow = grid[rowIndex];
    //find the index of rightmost dash (start of right word, from next statements +1)
    let lastIndexOfNullOnTopRow = topRow.lastIndexOf("-");
    //get top right word
    const [leftOfWordTopRow, rightWordTopRow] = this.splitAtIndex(
      topRow,
      lastIndexOfNullOnTopRow + 1
    );
    //to here///////////////////////////
    
    //get left word for bottom
    const firstIndexOfNullOnBottomRow = bottomRow.indexOf("-");
    const [leftWordBottomRow, rightSide] = this.splitAtIndex(
      bottomRow,
      firstIndexOfNullOnBottomRow
    );
    //cobine the two words
    const combine = [...rightWordTopRow, ...leftWordBottomRow];
    grid[rowIndex] = combine;
    
    //set cursor
    horizontalCursorPosition = combine.length * 5;
    //cover rest of bottom row with dashes (after word from top)
    for (let i = combine.length; i < WIDTH; i++) {
      grid[rowIndex][i] = "-";
    }
    //cover top row where word was, with dashes
    for (let i = WIDTH - rightWordTopRow.length; i < WIDTH; i++) {
      grid[rowIndex - 1][i] = "-";
    }

    return grid;
  }

  //12/22/24
  pushWordsDoThisSecond(grid, newRemainder, rowIndex, fromIndex) {
    
    if (rowIndex > HEIGHT - 1) {
      return grid;
    }

    // on last row and last column and space does not have a dash
    if (rowIndex === HEIGHT - 1 && grid[HEIGHT - 1][WIDTH - 1] != "-") {
      this.createRow(grid, rowIndex);
      //posiiton cursor on next row, first character
      horizontalCursorPosition = horizontalCursorPosition + 5;
    }
    
    let wordAtEndOfRowOne = [];
    let topRow = grid[rowIndex - 1];
    let bottomRow = grid[rowIndex];

    
    //has no row above it
    if (rowIndex == 0) {
     this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
     return grid;
    }

    //right and left set, of top row - seperated by last soace or null
    let holder = this.getLastSpaceOrNull(grid, topRow);
    wordAtEndOfRowOne = holder.rightSide;
    let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length;
    
    //On last line, has no dashes on rightmost upper and leftmost bottom and on bottom row
    //first variable is short circuit
    if (
      rowIndex != 0 &&
      grid[rowIndex][0] != "-" &&
      grid[rowIndex - 1][WIDTH - 1] != "-" &&
      rowIndex === HEIGHT - 1
    ) {
      //this.lastLineWorkings(grid, rowIndex);
      console.log("here");
      //this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
      //return grid
    }
    //code available before 2/6/25

    //looking at index of both last space and last null
    let firstIndexOfNullOnBottomRow = bottomRow.indexOf("-");
    let firstIndexOfSpaceOnBottomRow = bottomRow.indexOf(" ");

    //first index is set to last character of row
    if (firstIndexOfNullOnBottomRow === -1) {
      firstIndexOfNullOnBottomRow = 27;
    }
    //first index is set to last character of row
    if (firstIndexOfSpaceOnBottomRow === -1) {
      firstIndexOfSpaceOnBottomRow = 27;
    }
    let lastIndexOfFirstWord = 0;
    //choose whether space or null character that is farthest right on row
    if (firstIndexOfSpaceOnBottomRow < firstIndexOfNullOnBottomRow) {
      lastIndexOfFirstWord = firstIndexOfSpaceOnBottomRow;
    } else {
      lastIndexOfFirstWord = firstIndexOfNullOnBottomRow;
    }
    //Divide with farthest word on bottom row.
    //!!
    const [firstWordBottomRow, phraseAfterLeftWordBottomRow] = this.splitAtIndex(
      bottomRow,
      lastIndexOfFirstWord
    );
    //length of left word
    let lengthOfFirstWordBottomRow = firstWordBottomRow.length;
    //to check left hand word, before a null or space
    let LengthOfNullsAndSpacesAfterFirstLeftMostCharacter = 0;
    //because this code does not have a row below it, it is bottom row
    //for loop to find the correct index
    if (rowIndex != HEIGHT - 1)  {
      for (let i = lengthOfFirstWordBottomRow; i < WIDTH - 1; i++) {
        if (rowIndex < HEIGHT-1 && grid[rowIndex+1][i] != "-") {
          break;
        }
        LengthOfNullsAndSpacesAfterFirstLeftMostCharacter++;
      }
    }
    //no room for push, continue with next recursion - no remainder?!
    if (LengthOfNullsAndSpacesAfterFirstLeftMostCharacter === 0) {
      this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
      return grid;
    }

    //will word fit below in the spaces and nulls that are available after first characters
    if (lengthOfRightWordAtRowOne < LengthOfNullsAndSpacesAfterFirstLeftMostCharacter  ) {
      let combined = [];

      //code available before 2/6/25 - lengthOfRightWordAtRowOne
      //put row together
      combined = [
        ...wordAtEndOfRowOne,
        ...firstWordBottomRow,
        ...phraseAfterLeftWordBottomRow,
      ];
      //length of bottom row word on left
      let lengthOfFirstWordBottomRow = firstWordBottomRow.length;
      //get one rows worth - and remainder to pass into recursion
      const [newBottomRow, newRemainder] = this.splitAtIndex(combined, WIDTH);

      if (
        //code available before 2/6/25 - verticalcurs...
        //no word passing across borders with shortcircuit
        rowIndex != 0 &&
        grid[rowIndex - 1][WIDTH - 1] === "-" ||
        grid[rowIndex][0] === "-"
      ) 
      { 
        
        this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
        return grid;
      }


      /////

      let flagContainedInBorderCrossing = false;
      //this is for upper row where both upper and lower rows are moveable (upper condition) 
      for(let i = WIDTH - lengthOfRightWordAtRowOne ;i < WIDTH; i++){
        //if on the current row and horizontal position is in top rightmost range
        if(grid[rowIndex][0] != "-" && verticalCursorPosition/10 === rowIndex-1  && horizontalCursorPosition/5 === i + 1){
        //for cursor...goes on next row!
        verticalCursorPosition = rowIndex * 10;
        //horizontal positionis after the new total lower row of moved characters
        horizontalCursorPosition = 0;
        horizontalCursorPosition = ((lengthOfRightWordAtRowOne* 5) + (lengthOfFirstWordBottomRow*5));
        //leave loop, cursor has been positioned
        flagContainedInBorderCrossing = true
        break
      }
          
        }
      //cursor wasn't repositioned yet. 
      if (flagContainedInBorderCrossing === false){

        for(let i = 0; i< lengthOfFirstWordBottomRow; i++){
          if(grid[rowIndex-1][WIDTH-1] != "-" && verticalCursorPosition/10 === rowIndex && horizontalCursorPosition/5 === i+1){
            //no verticalcursorposition change, because the row index is already on bottom row
            //set cursor after moved characters now on bottom
            horizontalCursorPosition = ((lengthOfRightWordAtRowOne* 5) + (lengthOfFirstWordBottomRow*5));
            //cursor moved, break out!
            break
          }
        }
      }

      /////
      //Finally, set the row.
      grid[rowIndex] = newBottomRow;
      //fill in moved text space with dashes on top row
      for (let i = WIDTH - lengthOfRightWordAtRowOne; i < WIDTH; i++) {
        grid[rowIndex - 1][i] = "-";
      }
      
      
      console.log("2")
      ///alert("2")
      this.pushWordsDoThisSecond(grid, newRemainder, rowIndex + 1, false);
      return grid;
      } //ends fits in left hand slot

   
    
    //if here, word doesn't fit
    this.pushWordsDoThisSecond(grid, [""], rowIndex + 1, false);
    return grid;
  }
  splitAtIndex(arr, index) {
    //cuts array at index
    const front = arr.slice(0, index);
    const back = arr.slice(index);
    return [front, back];
  }

  //1/22/25- Looks good.
  divideNextRowsAsNeeded(grid, colIndex, rowIndex, remainder) {
    this.tracksRow++;
    let bottomRow = grid[rowIndex];
    let topRow = grid[rowIndex + 1];

    //taking the rigth top row and adhering it in front of next bottom row, pushes row right
    //loop
    //remove right end and adhere again
    let [bottomLeftRow, BottomRightRow] = this.splitAtIndex(
      bottomRow,
      colIndex
    );
    if (rowIndex > HEIGHT - 2) {
      drawGrid(HEIGHT, WIDTH);
      return grid;
    } else {
      //splits top in to at cursor
      let [leftTopRow, rightTopRow] = this.splitAtIndex(topRow, colIndex);

      let buildNextRow = "";
      //happens on first loop
      if (remainder == "") {
        //sets this to upper-lines right side and the entire lower
        buildNextRow = [...BottomRightRow, ...topRow];
      } else {
        //add extra characters than repeat: put on and take off a row  - LIFO.  "last in first out"
        buildNextRow = [...remainder, ...topRow];
      }

      const [oneRowsWorth, newRemainder] = this.splitAtIndex(
        buildNextRow,
        WIDTH
      );
      grid[rowIndex + 1] = oneRowsWorth;
      drawGrid(HEIGHT, WIDTH);
      //puts extra in remainder - starts at loop 1
      this.divideNextRowsAsNeeded(grid, colIndex, rowIndex + 1, newRemainder);
    }

    for (let i = colIndex; i < WIDTH; i++) {
      grid[verticalCursorPosition / 10][i] = "-";
    }
    return grid;
  }

  //1/22/25: looks okay
  pressedEnter(grid, rowIndex, colIndex, remainder, IsFirstTime, counter) {
    this.createRow(grid, rowIndex);
    this.divideNextRowsAsNeeded(grid, colIndex, rowIndex, [""]);
    horizontalCursorPosition = 0;
    verticalCursorPosition = verticalCursorPosition + 10;
    drawCursor(
      horizontalCursorPosition + HOFFSET,
      verticalCursorPosition + VOFFSET
    );
    return grid;
  }

  //2/7/25
  deleteAndPullCharacters(rowIndex, columnIndex, grid) {
    
    //On last row
    if (rowIndex > HEIGHT - 2) {
      
      let topRow = grid[rowIndex];
      let combine = [];
      if(columnIndex != 0){
        let [topRowLeftOfColumn, topRowRightOfColumn] = this.splitAtIndex(
          topRow,
          columnIndex - 1
        );
        let [leftCharacterRightRow, topRowRightOfColumnWithoutFirstCharacter] =
          this.splitAtIndex(topRowRightOfColumn, 1);
          //is same, except character is removed from display 
          combine = [
          ...topRowLeftOfColumn,
          ...topRowRightOfColumnWithoutFirstCharacter,
        ];

      }
      //column index is on most left space - on top line
      else {
        //breaks row into to phrases
        let [topRowLeftOfColumn, topRowRightOfColumn] = this.splitAtIndex(
          topRow,
          columnIndex
        );
        //removes first character
        let [lastRowLeftChracterRemoved, lastRowRightSideAfterFirstColumn] =
          this.splitAtIndex(topRowRightOfColumn, 1);
        
        


          //row is without first character
        combine = [...lastRowRightSideAfterFirstColumn];
        //2nd to last rows right character is lastrows first character
        grid[HEIGHT - 2][WIDTH - 1] = grid[HEIGHT - 1][0];
      }
      CursorMovements.cursorLeft()
      grid[rowIndex] = combine;
      //last character pulls a dash from end because there is a delete on this row 
      grid[HEIGHT - 1][WIDTH - 1] = "-";
      return grid;
    }

    //the following row code is anything except last row
    let topRow = grid[rowIndex];
    let bottomRow = grid[rowIndex + 1];
    let bottomRowLeftmostCharacter = bottomRow[0];
    
    let topLeftRow = [];
    let topRightRow = [];
    //cursor is on first column
    if (horizontalCursorPosition === 0) {
      //split at cursor 
      [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex);
    } else {
      //somethi8ng to do with not being on first row
      [topLeftRow, topRightRow] = this.splitAtIndex(topRow, columnIndex - 1);
      
    }
    //remove front character from right hand side, this is the character being deleted
    let [leftOnecharacterDiscarded, topRightRowNoFirstCharacter] = this.splitAtIndex(topRightRow, 1);
    let combinedRow = [...topLeftRow, ...topRightRowNoFirstCharacter];
    
    
    //if on current row, first colum
    if(rowIndex != 0 && columnIndex === 0 && rowIndex == verticalCursorPosition/10)
    {
      //line above current TOP row takes value from left hand side of TOP
      let character = grid[rowIndex][0];
      grid[rowIndex - 1][WIDTH - 1] = character;
    }
    //rightmost character is added on bext recursive call
    grid[rowIndex] = combinedRow;
    CursorMovements.cursorLeft()
    this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(
      //onto next row, the next top row is the row just after rowindex - 1 (see above) 
      rowIndex + 1,
      columnIndex,
      grid
    );
    return grid;
    // }
  }

  //12/27/25: looks okay
  removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex,columnIndex,grid) {
    // bail, out
    if (rowIndex > HEIGHT - 1) {
      return grid;
    }
    //on second to last row - doesn't pull on line below the bottom row
    if (rowIndex > HEIGHT - 2) {
      let currentRow = grid[rowIndex - 1];
      let nextRow = grid[rowIndex];
      //remove first letters from both rows
      let [currentRowLeftCharacter, currentRowRightSideWithoutLeftChar] =
        this.splitAtIndex(currentRow, 1);
      let [nextRowLeftCharacter, nextRowRightSideWithoutLeftChar] = this.splitAtIndex(nextRow, 1);
      //put a charcter from next row, at end of this current row
      //row one above last row
      let combineForCurrentRow = [...currentRow,...nextRowLeftCharacter];
      //same as currentrow
      grid[rowIndex - 1] = combineForCurrentRow;
      //pulls bottom rows left character into most right top row
      grid[rowIndex - 1][WIDTH - 1] = nextRowLeftCharacter;
      //build bottom row
      grid[rowIndex] = [...nextRowRightSideWithoutLeftChar];
      //cover with a dash character, because row is one elemnt less now
      grid[rowIndex][WIDTH - 1] = "-";
      return grid;
    }
     //Not on last row...(all this!)
     //top row is without left most character, from deleteandpull...
    let topRow = grid[rowIndex - 1];
    //row after top row
    let bottomRow = grid[rowIndex];
    //get left most characeter, on bottomrow. Is put on most right side of row above it, top row.
    let leftCharacterofBottomRow =  bottomRow[0];
    //on bottommost and rightmost, so put a dash into variable
    if (rowIndex == HEIGHT - 1) {
      leftCharacterofBottomRow = "-";
    }
    //2/7/25 - deleted code here
    //remove the leftmost character on bottom row
    const [BottomRowLeftCharacter, BottomRowWithoutLeftCharacter] =
    this.splitAtIndex(bottomRow, 1);
    //remove rightmost character of top row
    let [topRowWithoutFinalCharacter, topRightCharacterRemoved] =
    this.splitAtIndex(topRow, topRow.length - 1);
    let newTopRow = [...topRow, ...leftCharacterofBottomRow];
    grid[rowIndex - 1] = newTopRow;
    //final character filled in, in next call
    grid[rowIndex] = [...BottomRowWithoutLeftCharacter];
    //recursion
    this.removeLeftCharacterFrom2ndRowAndReplaceAboveOnMostRightSide(rowIndex + 1,columnIndex,grid);
    return grid;
  }

  displayGridAndCursor() {
    drawGrid(HEIGHT, WIDTH)
    drawCursor(
      horizontalCursorPosition + HOFFSET,
      verticalCursorPosition + VOFFSET
    );
  }
 
  //much better version available, using ChatGPT

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
      //is.createRow(grid, leftOverChar, rowIndex, colIndex);
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
    combineTopRow = [...leftTopRow, ...leftOverChar,  ...rightTopRow];
    if(verticalCursorPosition/10 == rowIndex){
      if(horizontalCursorPosition/5 === WIDTH-1){
        this.createRow(grid, leftOverChar, rowIndex, colIndex);
      }
      CursorMovements.cursorRightOneSpace();
      console.log("1")
    }
    }else{
      //leftoverchar is now remiander, so it is added to the fromt
    combineTopRow = [...leftOverChar, ...leftTopRow,  ...rightTopRow];
    if(verticalCursorPosition/10 == rowIndex){
      //CursorMovements.cursorRightOneSpace();
      console.log("2")
    }
   
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
