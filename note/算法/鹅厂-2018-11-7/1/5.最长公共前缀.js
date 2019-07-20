/**
 * @author NZQ
 * @data 2018/11/24
 * @Description :
 */

let longestCommonPrefix = function(strs) {
    let firstStr = strs[0]
        ,secondStr = strs[1]
        ,prefixLen = 0 // 记录最长前缀的长度
        ,prefixStr = ""
        ,length = strs.length; // strs的长度

    if (length === 0) {
        return "";
    }
    else if (length===1) {
        return strs[0]
    }
    else if (length >= 2) {
        // 得出前两个的公共前缀
        for (let i = 0, len = (firstStr.length >= secondStr.length ? secondStr.length : firstStr.length); i < len; i++){
            if (firstStr[i] !== secondStr[i]) {
                if (i > 0) {
                    prefixLen = i;
                    break;
                } else {
                    return ""
                }
            }
            prefixLen = i + 1;
        }

        if (prefixLen === 0) {
            return ""
        } else {
            prefixStr = strs[0].substr(0, prefixLen);

            for (let i = 2; i < length; i++) {
                while(strs[i][prefixLen-1] !== prefixStr[prefixLen-1]) {
                    prefixLen--;
                    if (prefixLen === 0) {
                        return ""
                    }
                }
            }
        }
    }

    return strs[0].substr(0, prefixLen);
};

console.log(longestCommonPrefix([]))