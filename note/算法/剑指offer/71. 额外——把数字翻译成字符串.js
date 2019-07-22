/**
 * @Author nzq
 * @Date 2019-07-22
 * @Description: ## 题目描述
 给定一个数字，按照如下规则翻译成字符串：0翻译成“a”，1翻译成“b”…25翻译成“z”。一个数字有多种翻译可能，例如12258一共有5种，分别是bccfi，bwfi，bczi，mcfi，mzi。实现一个函数，用来计算一个数字有多少种不同的翻译方法。

 [剑指offer第二版-46.把数字翻译成字符串(递归，动态规划)](https://www.jianshu.com/p/80e1841909b7)
 * @Param:
 * @Return:
 */

// 思路一：动态规划
/*
* f(r)表示以r为开始（r最小取0）到最右端所组成的数字能够翻译成字符串的种数。
* 对于长度为n的数字，f(n)=0,f(n-1)=1,求f(0)。
  递推公式为 f(r-2) = f(r-1)+g(r-2,r-1)*f(r)；
  g(i,i+1)表示第r-1位和r-2位拼起来的数字在10~25范围内，值为1，否则为0
  其中，如果r-2，r-1能够翻译成字符，则g(r-2,r-1)=1，否则为0。
  因此，对于12258：
  f(5) = 0
  f(4) = 1
  f(3) = f(4)+0 = 1
  f(2) = f(3)+f(4) = 2
  f(1) = f(2)+f(3) = 3
  f(0) = f(1)+f(2) = 5
* */

function TranslateNumbersToStrings(number) {
  let str = String(number);
  if (number<0) return 0;
  if (number < 10) return 1;
  return getTranslationCount(str);
}

function getTranslationCount(str) {
  let f1 = 1, //  str[len] 到之后的种数
    f2 = 0, // str[len-1] 到之后的种数
    temp = 0,
    mark = 0;

  // f1=>str[i+1], f2=>str[i+2]
  for (let i = str.length - 2; i >= 0; i--) {
    if (str[i] + str[i + 1] > 25) {
      mark = 0;
    } else {
      mark = 1;
    }
    [f1, f2] = [f1 + f2*mark, f1];
  }
  return f1;
}


// 思路二：递归
function _TranslateNumbersToStrings(number) {
  if (number < 0) {
    return 0;
  }
  if (number < 10) {
    return 1;
  }
  let str = String(number),
    mark = 0;
  if (str[0] + str[1] > 25) {
    mark = 0;
  } else {
    mark = 1;
  }
  return _TranslateNumbersToStrings(str.slice(1)) + _TranslateNumbersToStrings(str.slice(2)) * mark;
}
console.log(_TranslateNumbersToStrings(26));
