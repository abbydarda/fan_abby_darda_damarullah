const count = (data) => {
 const numCount = {};
 let pairs = 0;

 for (const item of data) {
  numCount[item] = (numCount[item] || 0) + 1;
 }
 for (const num in numCount) {
  pairs += Math.floor(numCount[num] / 2);
 }

 return pairs;
};

console.log(count([5, 7, 7, 9, 10, 4, 5, 10, 6, 5]), 3);
console.log(count([10, 20, 20, 10, 10, 30, 50, 10, 20]), 3);
console.log(count([6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]), 6);
console.log(count([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]), 4);
