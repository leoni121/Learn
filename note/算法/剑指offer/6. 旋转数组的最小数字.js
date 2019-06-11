/**
 * @Author nzq
 * @Date 2019/4/27
 * @Description: 运行时间：142ms；占用内存：10232k
 *  把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
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
