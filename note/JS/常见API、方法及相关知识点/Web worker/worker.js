/**
 * @Author nzq
 * @Date 2019/4/2
 * @Description:
 * @Param:
 * @Return:
 */
/*
var i = 0;
onmessage = function(event) {

}
setInterval(function () {
  postMessage(i++);
}, 1000);
*/

self.addEventListener('message', (message) => {
  console.log(message);
  postMessage("接收成功");
})
