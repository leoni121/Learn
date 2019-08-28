/**
 * @Author nzq
 * @Date 2019-07-13
 * @Description: 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数即 999。
 * @Param:
 * @Return:
 */

/**
 * [输出1到最大n位数之间的所有数](https://www.cnblogs.com/kaituorensheng/p/3604195.html)
 */

// 模拟现实 逢9进1
let end_index = 0;

function prletNum(size) {
  if(size < 0)
    return false;
  let a = new Array(size).fill('9');
  while(1)
  {
    if(end_index === size - 1 && a[size - 1] === '0') { // 当前为0
      break;
    }

    for(let i = 0; i < size; ++i)
    {
      if(end_index > i && a[i] === '0') {
        continue;
      }
      console.log(a[i]);
    }

    if(!minuxOne(a, end_index, size)) {
      break;
    }
  }
  return true;
}

function minuxOne(a, end_index, size) {
  if((end_index === size - 1 && a[size - 1] === '0') || end_index < 0 || end_index >= size)
    return false;
  let tmp = size - 2;
  if(a[size - 1] !== '0')
    --a[size -1];
  else
  {
    a[size - 1] = '9';
    while(1)
    {
      if(a[tmp] === '0')
      {
        a[tmp] = '9';
        --tmp;
      }
      else
      {
        --a[tmp];
        break;
      }
    }
    if(a[end_index] === '0')
      ++end_index;
  }
  return true;
}

let size = 5;
prletNum(1);
