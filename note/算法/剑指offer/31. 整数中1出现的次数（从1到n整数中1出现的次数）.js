/**
 * @Author nzq
 * @Date 2019/5/24
 * @Description: 求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。
 * @Param:
 * @Return:
 */

// 思路一：常规
function _NumberOf1Between1AndN_Solution(n)
{
  // write code here
  let count = 0,
    str = '';
  while(n) {
    str = String(n);
    for (let i = 0, len = str.length; i < len; i++) {
      if (str[i] === '1') {
        count ++;
      }
    }
    n--;
  }
  return count;
}

// 思路二
/*
设N = abcde ,其中abcde分别为十进制中各位上的数字。
如果要计算百位上1出现的次数，它要受到3方面的影响：百位上的数字，百位以下（低位）的数字，百位以上（高位）的数字。
① 如果百位上数字为0，百位上可能出现1的次数由更高位决定。比如：12013，则可以知道百位出现1的情况可能是：100~199，1100~1199,2100~2199，，...，11100~11199，一共1200个。可以看出是由更高位数字（12）决定，并且等于更高位数字（12）乘以 当前位数（100）。
② 如果百位上数字为1，百位上可能出现1的次数不仅受更高位影响还受低位影响。比如：12113，则可以知道百位受高位影响出现的情况是：100~199，1100~1199,2100~2199，，....，11100~11199，一共1200个。和上面情况一样，并且等于更高位数字（12）乘以 当前位数（100）。但同时它还受低位影响，百位出现1的情况是：12100~12113,一共114个，等于低位数字（113）+1。
③ 如果百位上数字大于1（2~9），则百位上出现1的情况仅由更高位决定，比如12213，则百位出现1的情况是：100~199,1100~1199，2100~2199，...，11100~11199,12100~12199,一共有1300个，并且等于更高位数字+1（12+1）乘以当前位数（100）。
*/
function __NumberOf1Between1AndN_Solution(n)
{
  // write code here
  let count = 0,
    i = 1,
    current = 0,
    after = 0,
    before = 0;

  while( i<= n) {
    current = Math.floor(n/i) % 10; // 当前位数字
    before = Math.floor(n/(i*10)); // 高位数字
    after = n - Math.floor(n/i)*i; // 底位数字
    //如果为0,出现1的次数由高位决定,等于高位数字 * 当前位数
    if (current === 0)
      count += before*i;
    //如果为1,出现1的次数由高位和低位决定,高位*当前位+低位+1
    else if(current === 1)
      count += before * i + after + 1;
    //如果大于1,出现1的次数由高位决定,//（高位数字+1）* 当前位数
    else{
      count += (before + 1) * i;
    }
    //前移一位
    i = i*10;
  }
  return count;
}

// 思路三
//主要思路：设定整数点（如1、10、100等等）作为位置点i（对应n的各位、十位、百位等等），分别对每个数位上有多少包含1的点进行分析
//根据设定的整数位置，对n进行分割，分为两部分，高位n/i，低位n%i
//    (1)当i表示百位，且百位对应的数>=2,如n=31456,i=100，则a=314,b=56，此时百位为1的次数有a/10+1=32（最高两位0~31），每一次都包含100个连续的点，即共有(a%10+1)*100个点的百位为1
//    (2)当i表示百位，且百位对应的数为1，如n=31156,i=100，则a=311,b=56，此时百位对应的就是1，则共有a%10(最高两位0-30)次是包含100个连续点，当最高两位为31（即a=311），本次只对应局部点00~56，共b+1次，所有点加起来共有（a%10*100）+(b+1)，这些点百位对应为1
//    (3)当i表示百位，且百位对应的数为0,如n=31056,i=100，则a=310,b=56，此时百位为1的次数有a/10=31（最高两位0~30）
//综合以上三种情况，当百位对应0或>=2时，有(a+8)/10次包含所有100个点，还有当百位为1(a%10==1)，需要增加局部点b+1
//之所以补8，是因为当百位为0，则a/10==(a+8)/10，当百位>=2，补8会产生进位位，效果等同于(a/10+1)
function NumberOf1Between1AndN_Solution(n)
{
  // write code here
  let count = 0,
    i = 1,
    high = 0,
    low = 0;
  while(i <= n) {
    high = Math.floor(n / i);
    low = Math.floor(n % i);
    count += Math.floor((high+8)/10) * i + (high%10===1)*(low+1);
    i *= 10;
  }
  return count;
}
console.log(NumberOf1Between1AndN_Solution(13))
