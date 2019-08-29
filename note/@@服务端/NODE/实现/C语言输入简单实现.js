/**
 * @Author nzq
 * @Date 2019/3/23
 * @Description:
 * @Param:
 * @Return:
 */

let state = 0;
let m = 0;
let obj = {
  count: 0,
  arr:[],
}

let stdinHandle = input => {
  switch (state)
  {
    case 0:
      obj.count = parseInt(input.toString().trim(), 10);
      state++;
      break;

    default:
      // we're reading 'm'
      m = parseInt(input.toString().trim(), 10)
      obj.arr.push(m);

      if (state++ === obj.count)
      {
        // we've read every 'm'
        // process.exit();

        process.stdin.removeListener('data', stdinHandle)
      }
      break;
  }
  console.log(obj);
}

process.stdin.on('data', stdinHandle);
