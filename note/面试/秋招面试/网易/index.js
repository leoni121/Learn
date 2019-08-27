/**
 * @Author nzq
 * @Date 2019-08-03
 * @Description:
 let line = readline().split(' ');
 N = parseInt(line[0]);
 M = parseInt(line[1]);
* @Param:
 * @Return:
 */

function get(a, b) {
/*  let a, b, line;

  line = readline().split(' ');
  a = parseInt(line[0]);

  line = readline().split(' ');
  b = parseInt(line[0];*/

  if(a > b) {  [a, b] = [b, a] };

  console.log(a, b)
  if(b % a === 0) {
    console.log(a);
    // print(a)
  };

  let i;
  for(i =  Math.floor(a/2); i>=1; i--) {
    if(b % i === 0 && a % i === 0) break;
  }

  // print(i)
  console.log(i);
}


get(7951346523609888,6998915114363550);
get(6, 4);

console.log(Math.sqrt(1000))
