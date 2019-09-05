function add(num1, num2) {
  if(num1 === 0) return num2;
  if(num2 === 0) return num1;

  while(num1) {
    // a ^ b 表示没有考虑进位的情况下两数的和，(a & b) << 1 就是进位 * 2
    // 一个数 & ， 越小。
    [num1, num2] = [(num1 & num2)<<1, num1^num2]
  }

  return num2;
}

console.log(add(10, 11201));
