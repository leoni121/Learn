/*
* 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。

请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。

你可以假设 nums1 和 nums2 不同时为空。

示例 1:

nums1 = [1, 3]
nums2 = [2]

中位数是 2.0
示例 2:

nums1 = [1, 2]
nums2 = [3, 4]

中位数是 (2 + 3)/2 = 2.5
* */

// 归并 O(m * n)
let findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length || nums2.length) {
        let newArr = nums1.concat(nums2).sort(function (pre, cur) {
            return pre - cur
        });
        let length = newArr.length;
        if (length % 2 === 0) {
            return ((newArr[length/2-1] + newArr[length/2])/2).toFixed(1)
        } else {
            return newArr[(length - 1)/ 2]
        }
    }
};

// 二分查找 O(log(m + n))
function findMedianSortedArrays1(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    if (m > n) { // to ensure m<=n
        let temp = nums1; nums1 = nums2; nums2 = temp;
        let tmp = m; m = n; n = tmp;
    }
    let iMin = 0, iMax = m, halfLen = Math.floor((m + n + 1) / 2);
    while (iMin <= iMax) {
        let i = Math.floor((iMin + iMax) / 2);
        let j = halfLen - i;
        if (i < iMax && nums2[j-1] > nums1[i]){
            iMin = i + 1; // i is too small
        }
        else if (i > iMin && nums1[i-1] > nums2[j]) {
            iMax = i - 1; // i is too big
        }
        else { // i is perfect
            let maxLeft = 0;
            if (i === 0) { maxLeft = nums2[j-1]; }
            else if (j === 0) { maxLeft = nums1[i-1]; }
            else { maxLeft = Math.max(nums1[i-1], nums2[j-1]); }
            if ( (m + n) % 2 === 1 ) { return maxLeft; }

            let minRight = 0;
            if (i === m) { minRight = nums2[j]; }
            else if (j === n) { minRight = nums1[i]; }
            else { minRight = Math.min(nums2[j], nums1[i]); }

            return (maxLeft + minRight) / 2.0;
        }
    }
    return 0.0;
}

// O(m + n)
function findMedianSortedArrays2(arr1, arr2) {
    let j = arr1.length
        ,k = arr2.length
        ,total = k + j;

    let m = 0, n = 0,arr=[];
    for (let i = 0; i < total; i ++) {

        if (n < k && m < j) {
            if (arr1[m] > arr2[n]) {
                arr[i] = arr2[n];
                n++;
            } else if (arr1[m] < arr2[n]) {
                arr[i] = arr1[m];
                m++;
            } else {
                arr[i] = arr1[m];
                m++;
            }
        }else if (n >= k) {
            arr[i] = arr1[m];
            m++;
        }else {
            arr[i] = arr2[n];
            n++;
        }
        console.log(arr)
    }
    let len = arr.length;
    return len%2===0 && (arr[len/2] + arr[len/2 -1])/2 || arr[len/2 - 1]
}


console.log(findMedianSortedArrays1([3, 4], [1, 2]))