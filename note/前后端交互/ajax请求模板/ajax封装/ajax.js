/**
 * @author NZQ
 * @data 2018/8/24
 * @Description : ajax 封装
 * type              请求的方式  默认为get
 * url               发送请求的地址
 * param             发送请求的参数
 * isShowLoader      是否显示loader动画  默认为false
 * dataType          返回JSON数据  默认为JSON格式数据
 * callBack          请求的回调函数
 * timeout           超时时长,默认5秒
 * https://www.cnblogs.com/tnnyang/p/5742199.html (thanks)
 */

(function () {
    function AjaxRequest (opts) {
        this.type = opts.type;
        this.url = opts.url;
        this.param = opts.param || {};
        this.isShowLoader = opts.isShowLoader || false;
        this.dataType = opts.dataType || "json";
        this.callBack = opts.callBack;
        this.timeout = opts.timeout || 5000;
        this.sendRequest();
    }

    AjaxRequest.prototype = {
        // 渲染loader
        showLoader : function () {

        },
        hideLoader : function () {

        },
        sendRequest : function () {
            let self = this ;
            $.ajax({
                type : this.type,
                url : this.url,
                data : this.param,
                dataType : this.dataType,
                beforeSend : this.showLoader(),
                success : function (res) {
                    if (res !== null && res !== "") {
                        if (self.callBack) {
                            //Object.prototype.toString.call方法--精确判断对象的类型
                            if (Object.prototype.toString.call(self.callBack) === "[object Function]") {
                                self.callBack(res);
                            }else {
                                console.log("callBack is not a function");
                            }
                        }
                    }
                },
                error : function () {

                },
                complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                    if(status === 'timeout'){//超时,status还有success,error等值的情况
                        alert("超时");
                    }
                }
            })
        }
    }

    window.AjaxRequest = AjaxRequest;
})()