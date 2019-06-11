/**
 * @Author nzq
 * @Date 2019/4/9
 * @Description:
 * @Param:
 * @Return:
 */

function title2 () {

  let count = 0
    ,numStr = '';

  function getCount(num) {
    // count = +(num.toString().replace(/\n/g, ''));
    count = +num;
    process.stdin.removeListener('data', getCount);
    process.stdin.on('data', getNumArr);
  }

  function getNumArr(s) {
    let str = s.toString()
    numStr = str.split(" ").join('');
    numStr = numStr.replace(/\n/g, '');
    process.stdin.removeListener('data', getNumArr);
    handleStdin();
  }

  function handleStdin () {
    if (numStr.length !== count) {
      console.log('输入有误！')
      return;
    }
    let begin = 1
      , end = 1
      ,hava = false
      , temArr = '';

    for (let i = 1; i <= count; i++) {
      if (numStr[i - 1] == i) {
        if (!hava) {
          end++;
          temArr += numStr[i - 1];
          if (end - begin>=3) {
            hava = true;
            let arr = [];
            arr[0] = temArr[0];
            arr[1] = '-';
            arr[2] = temArr[temArr.length - 1];
            temArr = arr;
          }
        } else {
          temArr[temArr.length - 1] = numStr[i-1];
        }
      }else {
        temArr.push(numStr[i - 1])
      }
    }
    // 输出
    console.log(temArr.join(' ').replace(/\s-\s/, '-'));
  }

  function func () {
    process.stdin.on('data', getCount);
  }

  func();
}

function title3 () {
  let numStrArr = []
    ,count = 0;

  function getCharNum(char) {
    return char.charCodeAt() - 97;
  }

  function getNumChar(num) {
    return String.fromCharCode(num+97)
  }

  function getStr(str) {
    numStrArr.push(str.toString().replace(/\n/g,''));
    count++;
    if (count >= 2) {
      process.stdin.removeListener('data', getStr);
      addStr();
    }
  }

  function addStr () {
    let count = 0
      ,countStr = '';
    for (let i = 0; i < 2; i++) {
      let temArr = numStrArr[i]
      for (let j = 0, len = temArr.length; j < len; j++) {
        count += (getCharNum(temArr[j])* Math.pow(26, (len - j - 1)));
      }
    }
    while (count >= 26) {
      let temNum = count%26;
      count = Math.floor(count/26);
      countStr+=getNumChar(temNum);
    }
    countStr+= getNumChar(count);
    countStr = countStr.split('').reverse().join('');
    // 输出
    console.log(countStr);
  }

  function mian () {
    process.stdin.on('data', getStr);
  }

  mian();
}

title2();
