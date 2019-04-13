// 定义Promise的三种状态常量
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const isFunction = variable => Object.prototype.toString.call(variable) === "[object Function]";

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    // 添加状态
    this._status = PENDING
    // 异步回调得结果
    this._value = undefined
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    // 执行handle
    try {
      // 给我们自己写入的 resolve 和 reject 传入内部对应的函数
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  // 添加resovle时执行的函数, 这里传入的值可能是Promise
  _resolve (val) {
    // 为了支持 同步的Promise（就是传入同步函数得时候， 保证这一步再then执行之后在执行），这里采用异步调用
    setTimeout(() => {
      // 这里为什么会 !== PENDING ? 放外面（setTimeout）还是里面？
      if (this._status !== PENDING) return;

      this._status = FULFILLED; // 草l

      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }

      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }

      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态 */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value;
          runFulfilled(value);
        }, error => {
          this._value = error;
          runRejected(error);
        })
        /*.catch(error => {
          this._value = error;
          runRejected(error);
        })*/
      } else { // 传入_resolve中的不是 MyPromise 的实例
        this._value = val;
        runFulfilled(val);
      }
    } , 0)
  }

  // 添加reject时执行的函数, 这里传入的值可能是Promise
  _reject (err) {
    // 状态改变之后 的 错误不能被catch捕获
    if (this._status !== PENDING) return;

    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(() => {
      // 这里为什么会 !== PENDING ? 放外面（setTimeout）还是里面？
      // 如果出现 先状态改变再抛出错误  就抛出无效
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }, 0)
  }

  then (onFulfilled, onRejected) {
    const { _value, _status } = this;
    // 返回一个新的Promise对象
    return new MyPromise((resolveNext, rejectNext) => {

      // 封装一个当前异步函数成功时执行的函数
      let fulfilled = value => {
        try {
          // 传入then 中的不是一个 函数（在下一个then中得到值）
          if (!isFunction(onFulfilled)) {
            resolveNext(value)
          } else { // 传入then 中的是一个函数

            // 执行回调函数，并得到在then中的函数的返回值
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              // res.then(value => {
              //   resolveNext(value);
              // })
              // resolveNext 获取到的值 会返回给当前Promise的then
              res.then(resolveNext, rejectNext)
            } else {
              // //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              resolveNext(res)
            }
          }
        } catch (err) {
          rejectNext(err);
        }
      }

      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          // 传入then 中的不是一个 函数
          if (!isFunction(onRejected)) {
            rejectNext(error)
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(resolveNext, rejectNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              resolveNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          rejectNext(err)
        }
      }

      // 通过判断状态， 选择then回调函数的执行方式
      // 当进行回调函数时，已经执行了_resolve/_reject 状态改变，调用上面的函数，根据传入then中的内容（或传入then内容的返回值）进行处理
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待_status改变的时候执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break

        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }

  catch (onRejected) {
    return this.then(undefined, onRejected);
  }

  resolve (value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    // 没有实现 thenable
    /*let thenable = {
      then: function(resolve, reject) {
        resolve(42);
      }
    };*/
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value))
  }

  reject (value) {
    return new MyPromise((resolve ,reject) => reject(value))
  }

  // 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
  all (list) {
    return new MyPromise((resolve, reject) => {
      // 返回值的集合
      let values = [];
      // 记录当前已经有多少个异步完成
      let count = [];

      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res;
          count ++;
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values);
        }).catch(error => { // 如果 list 中 Promise已经有catch 这里就不能捕捉了
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(error)
        })
      }
    })
  }

  race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  /* finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。 */
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  };
}

let p = new MyPromise((resolve, reject) => {
  let last = +new Date();
  setTimeout(() => {
    console.log("异步完成");
    resolve(new MyPromise((resolve1, reject1) => {
      console.log("dsfsd")
      resolve1((+new Date() - last) / 1000 + "s");
    }));
  }, 1230)
})

// then中正常
p.then((time) => {
  console.log("一共花费" + time + "s");
})
console.log("1")
