/**
 * @Author nzq
 * @Date 2019/4/15
 * @Description: 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * @Param:
 * @Return:
 */

/*
*  while (line = readline()) {
    var lines = line.replace(',', ' ').split(' ');
    var a = lines[0];
    var b = lines[1].replace(/\[\[|\]\]/g, '').replace(/\]\,\[/g, ',').split(',');
    function Find(target, array) {
        return array.indexOf(target) > -1 ? true : false
    }
    print(Find(a, b));
}
* */
function Find(target, array) {
  let temArr;
  let aLen = array && array[0] && array[0].length;
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i][0] <= target && target <= array[i][aLen-1]) {
      temArr = array[i];
      break;
    }
  }
  return temArr.indexOf(target) > -1
}

// [
//     [1,2,3,4,5],
//     [6,7,8,9,10],
//  ]
// a.toString() "1,2,3,4,5,6,7,8,9,10"
// a.toString().indexOf(7) > -1
