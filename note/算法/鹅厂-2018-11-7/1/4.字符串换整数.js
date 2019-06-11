/**
 * @author NZQ
 * @data 2018/11/22
 * @Description : 自己写的
 */

let myAtoi = function(str) {
    let len
        ,isNegative  = false// 是否为负数
        ,start = -1
        ,end
        ,num;
    str = str.trim();
    len = str.length;
    for (let i = 0; i < len; i++) {
        if (start===-1) {
            if (str[i] === '-' && i+1 < len && str[i+1].match(/\d/)) {
                isNegative = true;
                start = i + 1;
            }else if (str[i] === "+" && i+1<len && str[i+1].match(/\d/)) {
                start = i + 1;
            }else if (str[i].match(/\d/)) {
                start = i;
            }else {
                return 0;
            }
        }else {
            if (!str[i].match(/\d/)) {
                end = i;
                break;
            }
        }
    }
    if (end) {
        num =isNegative ? -Number(str.substring(start, end)) : Number(str.substring(start, end));
    }else {
        num =isNegative ? -Number(str.substring(start)) : Number(str.substring(start));
    }
    console.log(num);
    if (num > Math.pow(2, 31)-1) {
        return  Math.pow(2, 31) -1
    }  else if(num < -Math.pow(2, 31)){
        return -Math.pow(2, 31);
    }else {
        return num;
    }
};

console.log(myAtoi("42"));