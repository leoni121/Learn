//　4.作者：xiuya19
// 链接：https://www.nowcoder.com/discuss/241641?type=post&order=time&pos=&page=1
// 来源：牛客网
//
// 假设客户最后的权重为c，则a(j-1)+b(n-j)=c
// 可以推出(a-b)j+(-a+bn)=c
// 其中(-a+bn)为定值，因此只要使(a-b)j越小，c就越小
// 由于j为下标，显然只要对数组的(a-b)结果降序就是所得序列，然后跑流程就行了
let n1, line1, people=[]; // [a, b];
while((n1=readInt())!==null){
  let idx = 0;
  while(line1=readline()) {
    people.push({x: line1.split(" ")[0], y: line1.split(" ")[1]});
  }
  people.sort(([_a1, _b1, _idx1], [_a2, _b2, _idx2]) => {

  })
}

//　5.
let time, arr = [], line2, q, delAllarr = [], delArr = [], delNum = 0, tempArr, res;
time = readInt();
while ((line2 = readline())) {
  arr.push(line2.split(" ")) // [公司, 价格];
  if (!--time) break;
}
q = readInt();
while ((line2 = readLine())) {
  delAllarr.push(line2.split(" "));
}

for (let k = 0; k < delAllarr.length; k++) {
  delArr = delAllarr[k].slice(0);
  delNum = delArr.shift();
  tempArr = arr.slice(0);

  for (let i = 0; i < tempArr.length; i++) { //　遍历删除公司
    for (let j = 0; j < delArr.length; j++) {
      if (tempArr[i][0] === delArr[j]) { //　匹配公司编号
        tempArr.splice(i, 1); //　删除
        delArr.splice(j, 1); //　去除编号
        i--;
        break;
      }
    }
  }

  for (let i = 0; i < tempArr.length - 1; i++) { //　相邻的删除
    if (tempArr[i][0] === tempArr[i + 1][0]) {
      tempArr.splice(i + 1, 1);
      i--;
    }
  }
  res = tempArr.length > 0 ? tempArr[tempArr.length - 1] : [0, 0];
  print(...res);
}
