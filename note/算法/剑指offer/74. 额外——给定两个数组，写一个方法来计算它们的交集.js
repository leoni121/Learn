/**
 * @Author nzq
 * @Date 2019-07-22
 * @Description: 给定两个数组，写一个方法来计算它们的交集
 * 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
 * [第 59 题：给定两个数组，写一个方法来计算它们的交集。 #102](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/102)
 * @Param:
 * @Return:
 */

// 思路一：空间换时间，利用 hash表
 let intersect = (nums1, nums2) => {
   let map = {}
   let res = []
   for (let n of nums1) {
     if (map[n]) {
       map[n]++
     } else {
       map[n] = 1
     }
   }
   for (let n of nums2) {
     if (map[n] > 0) {
       res.push(n)
       map[n]--
     }
   }
   return res
 }
 
 // 思路二： 空间换时间
 