


const [removeThis, charactersAfterLeftWordOnBottomRow] = this.splitAtIndex(indexAfterLeftWordBottomRow, lengthOfRightWordAtRowOne );
//put row together
combined = [...wordAtEndOfRowOne, ...firstWordBottomRow, ...charactersAfterLeftWordOnBottomRow]
let lengthOfFirstWordBottomRow = firstWordBottomRow.length
//get remainder for next recursive call - this is one rows worth
const [newBottomRow, newRemainder] = this.splitAtIndex(combined, WIDTH);







pushWordsDoThisSecond(grid, remainder, rowIndex, fromIndex)
  {

    //let newRemainder = []
    //let newBottomRow = []
    
    
      
    //for putting cursor on row 2 for lefthand words greater than 2
    let TwoOrMoreCharactersAtRightWordAtRowOne = false
    
    //HEIGHT - 2:  just makes new row from isert
    if(rowIndex > HEIGHT - 1){
      return grid
    }

    if(rowIndex === HEIGHT){
      //looking if there is a character of bottom row, if so create a row and continue with push
      if(grid[HEIGHT-1][WIDTH-1] != DASH ){
      this.createRow(grid, rowIndex)
      //grid[rowIndex+1][0] = "A"
      drawGrid(HEIGHT, WIDTH)
      }
     }

     

    let vertPos = verticalCursorPosition/10
     //to prevent an error when index + 1 is non existant, on last line
    if(vertPos === HEIGHT-1 && rowIndex === HEIGHT - 1  &&  (grid[HEIGHT-1][0] !== "-" && grid[HEIGHT-2][WIDTH-1] !== "-" )){
      //return grid
    }
    if ((rowIndex == 0 && grid[rowIndex][WIDTH-1] != "-") && (grid[rowIndex+1][0] != "-") || 
    (rowIndex != 0  && rowIndex < HEIGHT-1 && (grid[rowIndex][WIDTH-1] != "-") && (grid[rowIndex+1][0] != "-") ||
     (rowIndex != 0 && (grid[rowIndex-1][WIDTH-1] != "-") && (grid[rowIndex][0] != "-"))  )){

      //This is for if left hand top word is only one character, all the way to right (pressed twice)
      //(rowIndex != 0 && fromIndex && (grid[rowIndex][WIDTH-1] != "-") && (grid[rowIndex+1][0] != "-") )
      //if(rowIndex != 0 && fromIndex && (grid[rowIndex][WIDTH-1] != "-") && (grid[rowIndex+1][0] != "-")  ||
       if(rowIndex != 0 && fromIndex && (grid[rowIndex-1][WIDTH-1] != "-") && (grid[rowIndex][0] != "-")){
        //rowIndex = rowIndex - 1;
      }
      //rowIndex = rowIndex + 1
    let holdthis = rowIndex+1
    //end base case
    let wasVariablegridCheck = []
    let wordAtEndOfRowOne = []
    let topRow = grid[rowIndex];
    ///let bottomRow =grid[rowIndex+1];// grid[verticalCursorPosition/10 + 1];
    let characterCounter = 0
    let holder = this.getLastSpaceOrNull(grid,topRow)
    wasVariablegridCheck = holder.leftSide
    wordAtEndOfRowOne = holder.rightSide
    let lengthOfRightWordAtRowOne = wordAtEndOfRowOne.length
    if(lengthOfRightWordAtRowOne >= 2){
      TwoOrMoreCharactersAtRightWordAtRowOne = true
    }
    //before first space or null, whichever is first  
    let firstIndexOfNullOnBottomRow = bottomRow.indexOf("-");
    let firstIndexOfSpaceOnBottomRow = bottomRow.indexOf(" ");
    
    //first index is set to last character of row
    if(firstIndexOfNullOnBottomRow === -1){
      firstIndexOfNullOnBottomRow = 27
    }
    if(firstIndexOfSpaceOnBottomRow === -1){
      firstIndexOfSpaceOnBottomRow = 27
    }
    let lastIndexOfFirstWord = 0
    //choose space or null character that is farthest right on row
    if(firstIndexOfSpaceOnBottomRow < firstIndexOfNullOnBottomRow){
    lastIndexOfFirstWord = firstIndexOfSpaceOnBottomRow 
    }else{
    lastIndexOfFirstWord = firstIndexOfNullOnBottomRow 
    }//word id onm left
    
    //const [firstWordBottomRow, indexAfterLeftWordBottomRow] = this.splitAtIndex(bottomRow, lastIndexOfFirstWord);
    
    let lastIndexOffirstWordBottomRow = firstWordBottomRow.length
    let LengthOfNullsAndSpacesAfterFirstLeftMostCharacter = 0
    
    //Top row is last row
    
    ////!!!!!!!!!!!!!!!!!!!!!!!!!!
    ////get next dash or space after word on left - bottom row
    //for(let i = lastIndexOfFirstWord ; i < WIDTH; i++){
    // if (grid[rowIndex+2][i] != "-" &&  grid[rowIndex+2][i] != " "){
    //       break
    // }
    // LengthOfNullsAndSpacesBeforeLeftMostCharacter++
    //}


    //!!!!CHECK THESE VALUES : A
    for(let i = 1 ; i <WIDTH ; i++){
      //if (grid[rowIndex+2][i] != "-" &&  grid[rowIndex+2][i] != " ")
      if (grid[rowIndex+1][i] != "-" )
      {
            break
      }
      LengthOfNullsAndSpacesAfterFirstLeftMostCharacter++
     }
     //drawGrid(HEIGHT, WIDTH)
     
    
     
     //LengthOfNullsAndSpacesBeforeLeftMostCharacter = 9
    //will word fit below in the spaces and nulls that are before the next real character
    if(lengthOfRightWordAtRowOne < LengthOfNullsAndSpacesAfterFirstLeftMostCharacter && 
      //!!!!!!
      lengthOfRightWordAtRowOne > 0){
     
      // ten added to verticalcursorposition at pushrowright
      //if(rowIndex === (verticalCursorPosition/10 - 1)){
      // 
      //  verticalCursorPosition = verticalCursorPosition - 10
      //  
      //}
      
     
     

      //CHECK SITUATION IN PUSHROWRIGHT - DON'T PUSH

      let combined = []

      //add extra character from insert
      for(let i = 1; i<lengthOfRightWordAtRowOne+1 ; i++ ){
        grid[rowIndex+1][i] = topRow[WIDTH-i]
      }
      

      drawGrid(HEIGHT, WIDTH)

      //return grid

    ///////////////////////////////////////////P
    ///////////////////////////////////////////

    //characters will be moved from top to bottom, the final right side has empty
    //elements that are not assigned yer
    
    //!!!!!NO LEFT CHARACTERS AFTER LEFT WORD
    
    
    //const [removeThis, charactersAfterLeftWordOnBottomRow] = this.splitAtIndex(indexAfterLeftWordBottomRow, lengthOfRightWordAtRowOne );
    
    
    // //put row together
    // combined = [...wordAtEndOfRowOne, ...firstWordBottomRow, ...charactersAfterLeftWordOnBottomRow]
    // let lengthOfFirstWordBottomRow = firstWordBottomRow.length
    // //get remainder for next recursive call - this is one rows worth
    // const [newBottomRow, newRemainder] = this.splitAtIndex(combined, WIDTH);
    // ////drawGrid(HEIGHT, WIDTH)
    // //assign row
    // grid[rowIndex+1] = newBottomRow



    //check length of word, move cursor (one two character presses), check left problems
  
  
  
    if( TwoOrMoreCharactersAtRightWordAtRowOne ){
    horizontalCursorPosition = 0
    horizontalCursorPosition = horizontalCursorPosition = ((lengthOfRightWordAtRowOne + 1) * 5)
    verticalCursorPosition = verticalCursorPosition + 10
  }else{
    horizontalCursorPosition = horizontalCursorPosition + 10
  }
  TwoOrMoreCharactersAtRightWordAtRowOne = false;
  

  
  //////////////////////////
// //checking bottom row, left word, for cursor on or to next character (blank)
// let CursorIsInLeftWordOfBottom = false

// if(rowIndex+1 === verticalCursorPosition/10){
// for(let i =   0 ; i <  firstWordBottomRow.length + 1 ;  i++){
//   if (i === horizontalCursorPosition/5){
//     CursorIsInLeftWordOfBottom = true
//      break
//   }
// }
// }
// if(CursorIsInLeftWordOfBottom ){
//   //horizontalCursorPosition = horizontalCursorPosition + 15
// }

// CursorIsInLeftWordOfBottom = false

this.pushWordsDoThisSecond(grid, newRemainder, rowIndex+1, false)


return grid  

}
    


}else{
  
  
  //advances to next row if grid not set up for this word push
  this.pushWordsDoThisSecond(grid, [""], rowIndex+1, false)
 
  return grid
}

//!!!!!!!
return grid

}

////////////////////////////
////////////////////////////

