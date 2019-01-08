/**
 * @author NZQ
 * @data 2018/11/19
 * @Description :
 */

// 暴力 O(n*(n/2)*(n/2)) ^= O(n*n*n)
let longestPalindrome1 = function(s) {
    let len = s.length
        ,subStr = ""
        ,longestStr = "";
    for (let i = 0; i < len; i++) {
        for (let j = len; j >= 1; j--) {
            subStr = s.substr(i, j - i);
            if (checkPalindrome(s.substr(i, j - i)) && longestStr.length < j - i) {
                longestStr = subStr;
                break;
            }
        }
    }

    return longestStr;

    function checkPalindrome (s) {
        let len = s.length
            ,halfLen =  len%2===0 ? len/2 - 1 : (len - 1)/2;
        for (let i = 0; i <= halfLen; i++) {
            if (s[i] !== s[len-1 - i]) {
                return false
            }
        }
        return true;
    }
};

// 遍历一次 以每个当前的做中心  O(*) < O(n*(n/2))
let longestPalindrome2 = function(s) {
    let len = s.length
        ,subStr = "";
    for (let i = 0; i < len; i++) {
        // flag 用来标识 是否出现两边和中间一样的情况
        let j = i, k = i,isEqual=true;
        while(j>=0 && k<len) {
            // 左右相等， 且为同一字符时，不溢出
            if (s[j-1] === s[k+1] && j-1>=0) {
                j--;k++;
                if (s[j] !== s[i]) {
                    isEqual = false
                }
            }
            // 与左边或右边相等时
            else if (s[j - 1] === s[j] && isEqual) {
                j--;
            } else if (s[k + 1] === s[k] && isEqual) {
                k++;
            }
            // 都不是  结束当前while
            else {
                break;
            }
        }
        if (subStr.length < k - j + 1) {
            // 这里截取的时候始终超出范围
            subStr = s.substring(j,k+1)
            if (subStr.length === len) {
                return subStr;
            }
        }
    }
    return subStr;
};

let longestPalindrome = function (s) {
    let mx = 0 //mx记在i之前的回文串中，延伸至最右端的位置。（不属于回文串）
        ,po = 0 //同时用po这个变量记下取得这个最优mx时的回文中点位置
        ,lenA = [1] // 用来记录每个 str 字符对应的（字符串长度+1）/ 2
        ,str = "" // 加入字符后的字符串, 长度是原来的 2倍加1
        ,len = 0
        ,subStrIdx=1; // 记录最长的回文串的中点在 str 中的位置

    str = "$#" + s.split("").join("#") + "#";
    len = str.length;

    for (let i = 1; i < len; i++) {
        if (i < mx) {
            lenA[i] = Math.min(lenA[2*po-i], mx-i);
        } else {
            lenA[i] = 1;
        }
        // *
        while(str[lenA[i]+i] === str[i-lenA[i]]){
            lenA[i]++;
        }
        if (lenA[i] + i > mx) {
            // *
            mx = lenA[i] + i;
            po = i;
        }
        if (lenA[i] > lenA[subStrIdx]) {
            subStrIdx = i;
        }
    }
    console.log(subStrIdx, lenA)
    console.log(str);
    // *
     return str.substring(subStrIdx - lenA[subStrIdx] + 1, subStrIdx + lenA[subStrIdx]).split("#").join("");
}

console.log(longestPalindrome("aaab"))