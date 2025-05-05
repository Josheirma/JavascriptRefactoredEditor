

findLeftmostSpaceOrDash(row) {
    return [row.indexOf(" "), row.indexOf("-")]
      .map(index => index === -1 ? WIDTH : index)
      .reduce((min, curr) => Math.min(min, curr));
  }

  fillDashesInTopRow(grid, rowIndex, length) {
    grid[rowIndex - 1].fill("-", WIDTH - length, WIDTH);
  }
  
  splitAtIndex(arr, index) {
    return [arr.slice(0, index), arr.slice(index)];
  }