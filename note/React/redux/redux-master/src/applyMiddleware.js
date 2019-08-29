import compose from './compose'

/*
enhancer接收一个creatStore，会在内部创建一个store，然后对该store进行增强，
增强的部位在于dispatch。增强的具体方式是通过compose来构造一个dispatch链，
链的具体形式就是**[中间件1，中间件2, ......, 中间件N, store.dispatch]** ，
然后将增强的dispatch作为store新的dispatch暴露给用户。
 */
export default function applyMiddleware(...middlewares) {
  // enchaner
  return createStore => (...args) => {
    const store = createStore(...args)
    
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    
    
    // 中间件里面可以调用的API
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
