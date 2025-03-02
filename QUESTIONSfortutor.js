5/14/24 - FOR 

<script>

    

      /////EXPLAIN THIS, PLEASE
      window.addEventListener('keydown', function (e) {
        if (
          ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
            e.code
          ) > -1
        ) {
          e.preventDefault()
        }
      })
      
     



// what is the: index + 1, here? Are we filling the array?

const arr2 = Array.from({ length: 10000 }, (_, index) => index + 1)     





function findpower(base, exponent){
if (exponent === 0){
return 1
}
if (exponent % 2 === 0){
const halfpower = findpower(base, exponent / 2)
return halfpower * halfpower
}else{
const halfpower = findpower(base, (exponent-1) / 2)
return base * halfpower * halfpower		//WHAT IS BASE HERE FOR?
}
}



/////////////////

function wordFrequencyCounter(str) {
  // Convert the string to lowercase and split it into an array of words
  const words = str.toLowerCase().split(/\W+/);

  // Create an empty map to store word frequencies
  const wordFrequency = new Map();

  // Loop through each word in the array
  for (const word of words) {
    // Ignore empty strings (caused by multiple spaces or punctuation marks)    //??????????????????????????
    if (word === '') continue;

    // If the word is already in the map, increment its frequency
    if (wordFrequency.has(word)) {
      wordFrequency.set(word, wordFrequency.get(word) + 1);
    } else {
      // If the word is not in the map, add it with a frequency of 1
      wordFrequency.set(word, 1);
    }
  }}


//////////////////

function analyzeCarMileage(cars) {
  const totalMileage = cars.reduce((sum, car) => sum + car.mileage, 0);
  const averageMileage = totalMileage / cars.length;
  const highestMileageCar = cars.reduce(
    (highest, car) => (car.mileage > highest.mileage ? car : highest),
    cars[0]
  );
  const lowestMileageCar = cars.reduce(
    (lowest, car) => (car.mileage < lowest.mileage ? car : lowest),
    cars[0]   //?????????????????????????????
  );

  return {
    averageMileage: parseFloat(averageMileage.toFixed(2)),
    highestMileageCar,
    lowestMileageCar,
    totalMileage,
  };
}

///////////////////


function findMissingLetter(arr) {
  const missingCharCode = arr.filter((char, index) => {
    if (index === 0) return false;
    const prevCharCode = arr[index - 1].charCodeAt(0);
    const currentCharCode = char.charCodeAt(0);
    return currentCharCode - prevCharCode > 1;
  })[0];  //???????????????????????????

  return missingCharCode
    ? String.fromCharCode(missingCharCode.charCodeAt(0) - 1)
    : '';
}



///////////////////////////

function findMiddle(list) {
  // Both fast and slow start at the head
  let slow = list.head;
  let fast = list.head;
  // prev starts at null
  let prev = null;

  // Loop through the list
  while (fast !== null && fast.next !== null) {   ///////////////////////////////////SECOND CONDITION?
    // Move fast forward by 2 nodes
    fast = fast.next.next;
    // Move slow forward by 1 node
    prev = slow;
    slow = slow.next;
  }

  if (fast === null) {
    // Even number of nodes
    return prev.next;
  } else {
    // Odd number of nodes
    return slow;
  }
}


////////////////////////////////////////// FUNCTION IN A FUCNTION?


// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function recDepthFirstTraversal(root) {
  // If the root is null, return an empty array.
  const result = [];

  // Create a recursive helper function.
  function traverse(node) {
    // If the node is not null:
    if (node !== null) {
      // Add the node's data to the result.
      result.push(node.data);
      // Traverse the left subtree.
      traverse(node.left);
      // Traverse the right subtree.
      traverse(node.right);
    }
  }

  // Invoke the recursive helper function on the root.
  traverse(root);
  // Return the result.
  return result;
}

module.exports = {
  Node,
  recDepthFirstTraversal,
};


////////////////////////////////////////


module.exports = {     /////WHEN AND WHERE IS THIS USED?

maxDepth,
NOde,

};



//////////////////////////////


class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}







//HOW DOES THIS WORK
function isValidBST(root) {
  // Helper function to check if all values in a subtree are within the specified range
  function isValidSubtree(node, min, max) {
    if (!node) {
      return true;
    }

    if (
      (min !== null && node.value <= min) ||
      (max !== null && node.value >= max)
    ) {
      return false;
    }

    // For the left subtree, values must be less than the current node's value (max = node.value)
    // For the right subtree, values must be greater than the current node's value (min = node.value)
    return (
      isValidSubtree(node.left, min, node.value) &&
      isValidSubtree(node.right, node.value, max)
    );
  }

  // Call the helper function on the root with initial range of null
  return isValidSubtree(root, null, null);
}

module.exports = { Node, isValidBST };








//////////////////////////////WHAT IS THIS?



[arr[i], arr[minindex]] = [arr[minindex], arr[i]]  ////????



/////////////////////////////NOT UNDERSTANDING MERGE

function mergeSort(arr) {
  // If the array has 1 or 0 elements, then it is already sorted.
  if (arr.length <= 1) {
    return arr;
  }

  // Otherwise, divide the array into two halves and sort each half.
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // From 0 to mid, not including mid.
  const right = mergeSort(arr.slice(mid)); // From mid to the end.

  // Merge the sorted halves.
  return merge(left, right);
}

function merge(left, right) {
  // Initialize an empty array to store the merged array.
  const merged = [];
  // Initialize two pointers to keep track of the current index of each half.
  let leftIndex = 0;
  let rightIndex = 0;

  // While both pointers are still within their respective halves, compare the elements at 
  // the current indices and push the smaller one to the merged array.
  while (leftIndex < left.length && rightIndex < right.length) {
    // If the element in the left half is smaller, push it to the merged array and increment the left pointer.
    if (left[leftIndex] < right[rightIndex]) {
      merged.push(left[leftIndex]);
      leftIndex++;
    } else {
      // Otherwise, push the element in the right half to the merged array and increment the right pointer.
      merged.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // If there are any remaining elements in the left half, push them to the merged array.
  return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/////////////////////////////////
