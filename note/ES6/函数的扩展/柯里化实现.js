const curry1 = function(fn, context, ...arg1) {
  let args = arg1;
  return function(...arg2) {
    args.push(...arg2);
    fn.apply(context, args);
  }
}


// arg 会更新为 _args;
const curry2 = (fn, ...arg) => {
  let all = arg || [],
    length = fn.length;
  return (...rest) => {
    let _args = all.slice(0); //拷贝新的all，避免改动公有的all属性，导致多次调用_args.length出错
    _args.push(...rest);
    if (_args.length < length) {
      return curry.call(this, fn, ..._args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

// 同上面  all 也会不断被_args 代替
const curry3 = (fn, ...arg) => {
  let all = arg || [];
  return (...rest) => {
    let _args = all;
    _args.push(...rest);
    if (rest.length === 0) {
      // 防止 连续两个 "无参调用"因为缓存出现一样的结果
      all=[];
      return fn.apply(this, _args);
    } else {
      return curry.call(this, fn, ..._args);
    }
  }
}

let test = curry3(function(...rest) {
  console.log(rest)
})



// ** 函数
function part(fn, ...arg) {
  let all = arg || [];
  return (...rest) => {
    let args = all.slice(0);
    args.push(...rest);
    return fn.apply(this, args)
  }
}
function add(...rest) {
  return rest.reduce(function (count, val, idx, arr) {
    return count + val;
  })
}
