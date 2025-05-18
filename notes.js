enforceGridConsistency(grid) {
    for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
      // Ensure the row exists
      if (!grid[rowIndex]) {
        grid[rowIndex] = new Array(WIDTH).fill(null);
      }
  
      // Ensure the row has exactly WIDTH elements
      while (grid[rowIndex].length < WIDTH) {
        grid[rowIndex].push("-");
      }
  
      if (grid[rowIndex].length > WIDTH) {
        grid[rowIndex] = grid[rowIndex].slice(0, WIDTH);
      }
    }
    return grid;
  }


  if (Recursive && typeof Recursive.cursorRight === 'function') {
    Recursive.cursorRight();
}


let bottomRow = newRemainder[0] !== "" ? [...newRemainder, ...grid[rowIndex]] : grid[rowIndex];


const insertButton = document.getElementById("insert");

insertButton.innerHTML = insertOn ? "Insert" : "On Top";


// Save a deep copy of the current grid state (with dashes) for future restoration
        copy2DimArray = gridArray.map(arr => [...arr]);

        let bottomRow = newRemainder[0] !== "" ? [...newRemainder, ...grid[rowIndex]] : grid[rowIndex];

        

////to understand ///////////

//check all conditions with entire row and one less than entire row
//push, with no dashes or spaces, check for dashes when move word down
//check move word down that dashes always worke


//replaceWithDashesOnTopRight  =  replaceDashesWithOldWord

//replaceWithDashesInTopRow  = replaceTopRowOnlyWithDashes