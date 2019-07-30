/**
 * @Author nzq
 * @Date 2019-07-24
 * @Description: 题目描述
 在一个数组中除一个数字只出现一次之外，其他数字都出现了三次
 请找出那个只出现一次的数字
 * @Param:
 * @Return:
 */


// 思路： 如果一个数字出现三次，那么它的二进制表示的每一位（ 0 或者 1 ）也出现三次。如果把所有出现三次的数字的二进制表示的每一位都分别加起来，那么每一位的和都能被 3 整除
// 我们把数组中所有数字的二进制表示的每一位都加起来。如果某一位的和能被 3 整除，那么那个只出现一次的数字二进制表示中对应的那一位是 0 ；否则就是 1

function FindNumsAppearOnce(data){
  let length = data.length;
  let bitSum = [];

  for(let i=0; i < 32; i++){
    bitSum[i] = 0;
  }

  for(let i=0; i < length; i++){
    let result = 1;
    for(let j=31; j >=0; j--){
      let bit = data[i] & result;
      if(bit !== 0){
        bitSum[j] += 1;
      }
      result = result << 1;
    }
  }

  console.log(bitSum)

  let result = 0;
  for(let i=0; i < 32; i++){
    console.log(bitSum[i]%3)
    result = result << 1;
    result = result + bitSum[i]%3;
  }
  return result;
}

