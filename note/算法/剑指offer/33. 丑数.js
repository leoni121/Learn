/**
 * @Author nzq
 * @Date 2019/5/27
 * [丑数](https://www.nowcoder.com/practice/6aa9e04fc3794f68acf8778237ba065b?tpId=13&tqId=11186&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含质因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。
 * @Param:
 * @Return:
 */

// 思路一：暴力
/*
如果p是丑数，那么p=2^x * 3^y * 5^z
那么只要赋予x,y,z不同的值就能得到不同的丑数。
如果要顺序找出丑数，要知道下面几个特（fei）点（hua）。
对于任何丑数p：
（一）那么2*p,3*p,5*p都是丑数，并且2*p<3*p<5*p
（二）如果p<q, 那么2*p<2*q,3*p<3*q,5*p<5*q
现在说说算法思想：
    由于1是最小的丑数，那么从1开始，把2*1，3*1，5*1，进行比较，得出最小的就是1
的下一个丑数，也就是2*1，
    这个时候，多了一个丑数‘2’，也就又多了3个可以比较的丑数，2*2，3*2，5*2，
这个时候就把之前‘1’生成的丑数和‘2’生成的丑数加进来也就是
(3*1,5*1,2*2，3*2，5*2)进行比较，找出最小的。。。。如此循环下去就会发现，
每次选进来一个丑数，该丑数又会生成3个新的丑数进行比较。
* */

// 思路二
/*
 在上面的特（fei）点（hua）中，既然有p<q, 那么2*p<2*q，那么
“我”在前面比你小的数都没被选上，你后面生成新的丑数一定比“我”大吧，那么你乘2
生成的丑数一定比我乘2的大吧，那么在我选上之后你才有机会选上。
其实每次我们只用比较3个数：用于乘2的最小的数、用于乘3的最小的数，用于乘5的最小的
数。也就是比较(2*x , 3*y, 5*z) ，x>=y>=z的，
重点说说下面代码中p的作用：int p[] = new int[] { 0, 0, 0 }; p[0]表示最小用于
乘2比较数在数组a中的【位置】。
*/

// p=2^x * 3^y * 5^z
function GetUglyNumber_Solution(index)
{
  // write code here
  // 0-6的丑数分别为0-6
  if (index < 7) {
    return index;
  }

  //p2，p3，p5分别为arr中的三个指针，newNum为从队列头选出来的最小数
  let p2 = 0,
    p3 = 0,
    p5 = 0,
    newNum = 1,
    arr = [1];

  while(--index) { // 数组中默认有个 [1]
    //选出三个队列头最小的数
    newNum = Math.min(arr[p2] * 2, Math.min(arr[p3] * 3, arr[p5] * 5));
    //这三个if有可能进入一个或者多个，进入多个是三个队列头最小的数有多个的情况
    if(arr[p2] * 2 === newNum) p2++;
    if(arr[p3] * 3 === newNum) p3++;
    if(arr[p5] * 5 === newNum) p5++;
    arr.push(newNum);
  }
  return newNum;
}

GetUglyNumber_Solution(10);
