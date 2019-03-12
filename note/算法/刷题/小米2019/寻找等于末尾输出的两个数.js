function getMark(...args) {
  let mark = args.pop();
  let len = args.length;
  let count = 0;

  for (let i = 0; i < len-1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (args[i] + args[j] === mark) {
        console.log(i, j);
        count+= (i + j);
      }
    }
  }

  console.log(count);
  return count;
}

console.log(getMark(0,1,5,11,17,16,2,5,10,30,12));
