import { Toast } from 'vant';

/**
 * @author Nzq
 * @date 2019/2/25
 * @Description: 提示函数
 * @Param: msg 信息
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 3000,
    forbidClick: true
  });
};

export default tip;
