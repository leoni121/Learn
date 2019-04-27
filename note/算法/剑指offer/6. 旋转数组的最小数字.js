/**
 * @Author nzq
 * @Date 2019/4/27
 * @Description: 运行时间：142ms；占用内存：10232k
 * @Param:
 * @Return:
 */
function minNumberInRotateArray(rotateArray)
{
  // write code here
  let len = rotateArray.length;
  if (len === 0) {
    return 0;
  } else {
    for (let i = 0; i < len - 1; i++) {
      if (rotateArray[i] > rotateArray[i + 1]) {
        return rotateArray[i+1]
      }
    }
    return rotateArray[0];
  }
}

console.log(minNumberInRotateArray([3,3,3]));
