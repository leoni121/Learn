function addFloat(float1, float2) {
  let floatLen1 = float1.toString().lastIndexOf('.')
,floatLen2 = float2.toString().lastIndexOf('.');
  let maxNum = Math.max(floatLen1, floatLen2);
  let tempNum = float1 * maxNum + float2 * maxNum;
  tempNum.toString().replace(new RegExp('\d{" +  maxNum + "}$'), (ma) => {
    return '.' + ma;
  })
}
