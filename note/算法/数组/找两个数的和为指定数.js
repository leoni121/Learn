/**
 * @Author nzq
 * @Date 2019/3/21
 * @Description:
 * @Param:
 * @Return:
 */

function GetNumbersWithSumInArray (arr, count) {
  if (!arr.length) {
    return false;
  }

  let len = arr.length
    ,minIdx = 0
    ,maxIdx = len - 1
    ,sum = 0
    ,result = [];

  while (minIdx < maxIdx) {
    sum = arr[minIdx] + arr[maxIdx];
    if (sum < count) {
      minIdx++;
    } else if(sum > count) {
      maxIdx--;
    } else {
      result.push({
        [minIdx]: arr[minIdx],
        [maxIdx]: arr[maxIdx],
      });

      if (arr[minIdx] === arr[minIdx + 1]) {
        minIdx++;
        result.push({
          [minIdx]: arr[minIdx],
          [maxIdx]: arr[maxIdx],
        });
        minIdx++;
      } else if (arr[maxIdx] === arr[maxIdx + 1]) {
        maxIdx--;
        result.push({
          [minIdx]: arr[minIdx],
          [maxIdx]: arr[maxIdx],
        });
        maxIdx--;
      } else {
        minIdx++;
        maxIdx--;
      }

    }
  }
  return result
}

console.log(GetNumbersWithSumInArray([1, 2, 2, 7, 10, 11], 12))
