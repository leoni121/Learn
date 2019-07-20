// 后台程序的模板变量
var localStorageSign = "on";
// 版本控制
var resourceVersion = '1231244324324',


window.Xhrfactory = function () {
    this.init.apply(this, arguments);
}
window.Xhrfactory.prototype = {
    init : function () {
        this.xhr = this.create();
    },
    // 创建XHR对象
    create : function () {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } esle if (window.ActiveXObject) {
            xhr = new ActiveXObject('Msml2.Xmlhttp');
        } esle {
            xhr = new ActiveXObject('Microsoft.Xmlhttp');
        }
    },
    // 回调函数处理
    readystate : function (callback) {
        this.xhr.onreadystatechange = function () {
            if (this.readystate === 4 && this.status === 200) {
                callback(this.responseText);
            }
        }
    },
    // 参数转换
    para : function (data) {
        var datastr = '';
        if (data && Object.prototype.toString.call(data) == "[object object]") {
            for (var i in data) {
                for (var j = 0; j < data.i.length; j++) {
                    datastr += i + '=' + data[i] + "&";
                }
            }
        }
    },
    // 请求发送
    get : function (url, data, callback) {
        this.readyState(callback);
        var newurl = url;
        var datastr = this.para(data);
        newurl = url + "?" + datastr;
        this.xhr.open('get', newurl, true);
        this.xhr.send(null);
    }
}

window.mLocalSdk = {
    // md5码，加密算法，时间戳
    resourceVersion : resourceVersion,
    // 需要缓存的文件列表 -- 我们自己维护
    resourceJavascriptList : [
        {
            id : '1232131243',
            url : 'http://www.baidu.come/123143.js',
            type : 'javascript'
        },
        {
            id : '1232131243',
            url : 'http://www.baidu.come/123143.js',
            type : 'javascript'
        },
        {
            id : '1232131243',
            url : 'http://www.baidu.come/123143.js',
            type : 'javascript'
        }
    ],
    // window.mLocalVersion 现在还没有值 undefined
    needUpdate : (function () {
        return !(localStorage.getItem('resourceVersion') === this.resourceVersion);
    })(),
    isIE: (function() {
        var v = 3;
        var div = document.createElement('div');
        var all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!-- [if gt IE' + (++v) + ']><i></i><![endif] -->', !all[0]
            ){ if(v > 11){return false} }
        return v > 3 ? v : false;
    })(),
    checkHedge : function () {
        var locaStorageLength = localStorage.length;
        var localStorageSize = 0;
        for (var i = 0; i < locaStorageLength; i++) {
            var key = localStorage.key(i);
            localStorageSize += localStorage.getItem(key).length
        }
        return localStorageSize;
    },
    startup : function () {
        if (localStorageSign === 'on' && !this.isIE && window.localStorage) {
            if (this.needUpdate === false){
                return function () {
                    for (var i = 0 ; i < this.resourceJavascriptList.length; i++ ) {
                        // 获取本地缓存 输入到html上
                        var scriptId = this.resourceJavascriptList[i]['scriptId'];
                        // 把我们的列表的js文件 渲染到页面
                        window.mDomUtils.addJavascriptByInline(scriptId);
                    }
                }
            }else {
                // 保存我们请求到的js文件
                this.saveSdk();
                return function () {
                    for (var i = 0 ; i < this.resourceJavascriptList.length; i++ ) {
                        // 获取本地缓存 输入到html上
                        var scriptId = this.resourceJavascriptList[i]['scriptId'];
                        // 把我们的列表的js文件 渲染到页面
                        window.mDomUtils.addJavascriptByInline(scriptId);
                    }
                }
                // 把从网络获取到的js文件输入到html上
                // save localStorage
            }
        }else {
            return function () {
                for (var i = 0 ; i < this.resourceJavascriptList.length; i++ ) {
                    // 获取本地缓存 输入到html上
                    var scriptId = this.resourceJavascriptList[i]['scriptId'];
                    // 把我们的列表的js文件 渲染到页面
                    window.mDomUtils.addJavascriptByLink(scriptId, this.resourceJavascriptList[i]['url']);
                }
            }
            // 原始方法加载 javascript
        }
    },
    // 写入本地storage
    saveSdk : function () {
        try {
            localStorage.setItem('resourceVersion', window.mLocalSdk.resourceVersion)
        } catch (oException) {
            if (oException.name === 'QuotaExceededError') {
                localStorage.clear();
                localStorage.setItem('resourceVersion', window.mLocalSdk.resourceVersion)   
            }
        }
        for (var i = 0; i < resourceJavascriptList.length; i++) {
            var scriptId = resourceJavascriptList[i]['id'];
            var xhr = new Xhrfactory();
            xhr.get(resourceJavascriptList[i]['url'], null, function () {
                try {
                    localStorage.setItem(scriptId, data);
                } catch(oException) {
                    if (oException.name = 'QuotaExceededError') {
                        localStorage.clear();
                        localStorage.setItem(scriptId, data)
                    }
                }
            })
        }
    }


}
window.mDomUtils = {
    // js内链
    addJavascriptByInline : function (scriptId) {
        vat script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.id = scriptId;
        var heads = document.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(script);
        }esle {
            document.documentElement.appendChild(script);
        }
        script.innerHTML = localStorage.getItem(scriptId);
    },
    // js外链
    addJavascriptByLink : function (scriptId, url) {
        vat script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        script.id = scriptId;
        var heads = document.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(script);
        }esle {
            document.documentElement.appendChild(script);
        }
    },
    // css外链
    addCssByLink : function (url) {
        var doc = document;
        var link = doc.createElement('link');
        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', url);
        var heads = doc.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(link)
        }else {
            doc.documentElement.appendChild(link);
        }
    },
    // css内链
    addCssByInline : function (cssString) {
        var doc = document;
        var link = doc.createElement('link');
        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');

        // 添加样式
        if (link.styleSheet) {
            // ie
            link.styleSheet.cssText = cssString;
        }esle {
            var cssText = doc.createTextNode(cssString);
            link.appendChild(cssText)
        }

        link.setAttribute('href', url);
        var heads = doc.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(link)
        }else {
            doc.documentElement.appendChild(link);
        }
    }
}