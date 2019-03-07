const curry1 = function(fn, context, ...arg1) {
  let args = arg1;
  return function(...arg2) {
    args.push(...arg2);
    fn.apply(context, args);
  }
}


// arg 会更新为 _args;从开始add执行一次。当参数的数量足够了的时候进行加法,
const curry2 = (fn, ...arg) => {
  let all = arg || [],
    length = fn.length;
  console.log(length, all)
  return (...rest) => {
    let _args = [...all]; //拷贝新的all，避免改动公有的all属性，导致多次调用_args.length出错 （最外层的all 一直为空, 直接等于的话最外层的all一直在改变）
    _args.push(...rest); // 上一步 主要是防止这一步改变 all 导致可以这样调用 a(1) a(2) a(3) 和 a(1)(2)(3), 结束完之后all不为空调用a() 可以得到结果
                          // 但是实际只能a(1)(2)(3) 结束完之后all不为空调用a() 可以得到结果
    if (_args.length < length) {
      return curry2.call(this, fn, ..._args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

// 同上面  all 也会不断被_args 代替，
/*const curry3 = (fn, ...arg) => {
  let all = arg || [];
  return (...rest) => {
    let _args = all;
    _args.push(...rest);
    if (rest.length === 0) {
      all=[]; // 防止 连续两个 "无参调用"因为缓存出现一样的结果
      return fn.apply(this, _args);
    } else {
      return curry3.call(this, fn, ..._args);
    }
  }
}*/
//  test(2)(2)(2)(3)(4)(5)(6)();
// test() 出错 =》 [2]
// test(2, 3, 4, 5, 6, 7)();


// test(2)(2)(2)(3)(4)(5)(6)();
// test(2, 3, 4, 5, 6, 7)(); => [2,2,3,4,5,6,7] 没有清楚上一步的缓存
// 链式调用， 没有公用一个all
const curry3 = (fn, ...arg) => {
  let all = arg || [];
  return (...rest) => {
    let _args = [...all];
    _args.push(...rest);
    if (rest.length === 0) {
      return fn.apply(this, _args);
    } else {
      return curry3.call(this, fn, ..._args);
    }
  }
}

// test(1) test(2) test(3) test() 这种形式调用(公用一个空间，能all = [] 清楚)
const curry4 = (fn, ...arg) => {
  let all = arg || [];
  return (...rest) => {
    let _args = [...all];
    _args.push(...rest);
    if (rest.length === 0) {
      all=[];
      return fn.apply(this, _args);
    } else {
      return curry3.call(this, fn, ..._args);
    }
  }
}

// 偏函数，反柯里化
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

var test = curry3(function(...rest){
  console.log(rest);
})
