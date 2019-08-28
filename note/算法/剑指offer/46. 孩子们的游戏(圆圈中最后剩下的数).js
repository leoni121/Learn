/**
 * @Author nzq
 * @Date 2019/6/4
 * [孩子们的游戏(圆圈中最后剩下的数)](https://www.nowcoder.com/practice/f78a359491e64a50bce2d89cff857eb6?tpId=13&tqId=11199&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 每年六一儿童节,牛客都会准备一些小礼物去看望孤儿院的小朋友,
 * 今年亦是如此。HF作为牛客的资深元老,自然也准备了一些小游戏。其中,有个游戏是这样的:
 * 首先,让小朋友们围成一个大圈。然后,他随机指定一个数m,让编号为0的小朋友开始报数。
 * 每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,
 * 从他的下一个小朋友开始,继续0...m-1报数....这样下去....直到剩下最后一个小朋友,
 * 可以不用表演,并且拿到牛客名贵的“名侦探柯南”典藏版(名额有限哦!!^_^)。
 * 请你试着想下,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)
 * @Param:
 * @Return:
 */

function _LastRemaining_Solution(n, m) {
    // write code here
    if (m === 0 || n === 0) {
        return -1;
    }
    let idx = 0,
        arr = [];

    // n 个小孩子,用数组表示
    for (let i = 0; i < n; i++) {
        arr[i] = i;
    }

    while (arr.length > 1) {
        // 当前位置开始的第 m 个孩纸
        idx = (idx + m - 1) % arr.length;
        // 孩子出列
        arr.splice(idx, 1);
    }
    return arr[0];
}

// 思路二：递归
/** [参考](https://www.nowcoder.com/questionTerminal/f78a359491e64a50bce2d89cff857eb6)*/
// 约瑟夫环，圆圈长度为 n 的解可以看成长度为 n-1
// 的解再加上报数的长度 m。因为是圆圈
// ，所以最后需要对 n 取余。
// f[1]=0;
// f[i]=(f[i-1]+m)%i;  (i>1)
//
//  0  1
//  3  2
function LastRemaining_Solution(n, m) {
    // write code here
    if (n === 0) {
        return -1;
    } else if (n === 1) { //　一个小朋友
        return 0;
    } else {
        // 编号m - m =  编号 0
        return (LastRemaining_Solution(n - 1, m) + m) % n;
    }

}
