/**
*这些是Redux保留的私有操作类型。
*对于任何未知操作，必须返回当前状态。
*如果当前状态未定义，则必须返回初始状态。
*不要在代码中直接引用这些操作类型。
 */

const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.')
    
const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
}

export default ActionTypes
