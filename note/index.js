function NumberOf1(n)
{
  // write code here
  let count = 0
    ,flag = 1;
  // 循环32 次
  while(flag) {
    if (n&flag) count++;
    flag = flag<<1;
  }
  return count;
}


/*function _NumberOf1(n)
{
  // write code here
  let count = 0;
  // 循环32 次
  while(n) {
    if (n&1) count++;
    n = n>>1;
  }
  return count;
}*/
console.log(NumberOf1(-3))
