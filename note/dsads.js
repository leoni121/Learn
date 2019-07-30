function bitAdd(m, n){
  while(m){
    [m, n] = [ << 1, m ^ n];
  }
  return n;
}

console.log(bitAdd(9,3));
