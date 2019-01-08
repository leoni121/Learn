/**
 * @author NZQ
 * @data 2018/10/10
 * @Description : 本地通用缓存
 */

window.localSdk =  function (resourceVersion, localStorageSign, resourceList) {
    // XHR
    function Xhrfactory () {
        this.init.apply(this, arguments);
    }
    Xhrfactory.prototype = {
        // 初始化
        init : function () {
            this.xhr = this.create();
        },
        // 创建xhr
        create : function () {
            let xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            return xhr;
        },
        // 回调函数
        readyState : function (callback) {
            this.xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    callback(this.responseText);
                }
            }
        },
        // 参数装换
        para : function (data) {
            let datastr = '';
            if (data && Object.prototype.toString.call(data) === "[object Object]") {
                for (let key in data) {
                    datastr += key + "=" + data.key;
                }
            }
            return datastr;
        },
        // 请求发送
        get : function (url, data, callback) {
            // 这里先写这个函数的原因是 将xhr状态改变是的回调函数提前， 防止请求完成、状态改变，但是没有为相应的事件赋上处理函数
            this.readyState(callback);
            let newurl = url + "?" + this.para(data);
            this.xhr.open('get', newurl, true);
            this.xhr.send(null);
        }
    }

    // SDK
    let mLocalSdk = {
        // 判断是否需要更新缓存
        needUpdate : (function () {
            // 与本地缓存的一致 就 不需要缓存
            return !(localStorage.resourceVersion === resourceVersion);
        })(),
        // 判断是否是IE浏览器
        isIE : (function () {
            // ie的最低版本 4
            let v = 3;
            let div = document.createElement('div');
            let all = div.getElementsByTagName('i');
            while(
                // !all[0] 没有加进去 为 正确
                div.innerHTML = '<!-- [if gt IE' + (++v) + ']><i></i><![endif] -->', !all[0]
                ){ if (v > 11) { return false }  }
            return v > 3 ? v : false;
        })(),
        // 判断当前状态下是否 localStorage 溢出
        checkHedge : function () {
            let localStorageLength = localStorage.length;
            let localStorageSize = 0;
            for (let i = 0; i < localStorageLength; i++) {
                let key = localStorage.key(i);
                localStorageSize += localStorage.getItem(key).length
            }

            return localStorageSize;
        },
        // 启动方法， 读取本地的缓存
        startUp : function () {
            // 能使用本地缓存
            if (localStorageSign === 'on' && !this.isIE && window.localStorage) {
                // 不需要更新
                if (!this.needUpdate) {
                    console.log('可缓存，且不需要更新');
                    for (let i = 0,length = resourceList.length; i < length ; i++ ) {
                        let id = resourceList[i].id;
                        let type = resourceList[i].type
                        // 相应的插入操作
                        if (type === 'js') {
                            mDomUtils.addJsByLocalStorage(id);
                        } else if (type === 'css') {
                            mDomUtils.addCssByLocalStorage(id)
                        }
                    }
                }
                // 需要更新
                else{
                    console.log('可缓存，且需要更新');
                    this.saveSdk();
                    for (let i = 0,length = resourceList.length; i > length ; i++ ) {
                        let id = resourceList[i].id;
                        let type = resourceList[i].type

                        // 相应的插入操作
                        if (type === 'js') {
                            mDomUtils.addJsByLocalStorage(id);
                        } else if (type === 'css') {
                            mDomUtils.addCssByLocalStorage(id)
                        }
                    }
                }
            }
            // 不能使用本地缓存
            else {
                console.log('不可缓存，link方法');
                // 不能使用本地缓存时
                for (let i = 0, lngth = resourceList.length; i < length; i++) {
                    let url = resourceList[i].url;
                    let type = resourceList[i].type
                    // 相应的插入操作
                    if (type === 'js') {
                        mDomUtils.addJsByLink(url);
                    } else if (type === 'css') {
                        mDomUtils.addCssByLink(url)
                    }
                }
            }
        },
        // 版本 和 请求到的资源 保存到本地缓存
        saveSdk : function () {
            // 版本相关
            try {
                localStorage.setItem('resourceVersion', resourceVersion);
            } catch (oException) {
                // 此时localStorage 已满
                if (oException === 'QuotaExceededError') {
                    localStorage.clear();
                    localStorage.setItem('resourceVersion', resourceVersion);
                }
            }

            // 资源 相关
            for (let i = 0, length = resourceList.length; i < length; i++) {
                let id = resourceList[i].id;
                let xhr = new Xhrfactory();
                xhr.get(resourceList[i].url, null, function (data) {
                    try {
                        localStorage.setItem(id, data);
                    } catch (oException) {
                        if (oException === 'QuotaExceededError') {
                            localStorage.clear();
                            localStorage.setItem(id, data)
                        }
                    }
                })
            }
        }
    }

    // DOM 操作相关
    let mDomUtils = {
        // 通过本地储存添加js
        addJsByLocalStorage : function (scriptId) {
            let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            let heads = document.getElementsByTagName('head');
            if (heads.length) {
                heads[0].appendChild(script);
            } else {
                document.documentElement.appendChild(script);
            }
            script.innerHTML = localStorage.getItem(scriptId);
        },
        // 通过链接 添加js
        addJsByLink : function (jsUrl) {
            let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', jsUrl);
            let heads = document.getElementsByTagName('head');
            if (heads.length) {
                heads[0].appendChild(script);
            } else {
                document.documentElement.appendChild(script);
            }
        },
        // 通过本地储存添加css
        addCssByLocalStorage : function (cssId) {
            let doc = document;
            let cssString = localStorage.getItem(cssId);
            let style = doc.createElement('style');
            style.setAttribute('type', 'text/css');
            if (style.stylesheet) {
                // IE支持
                style.stylesheet.cssText = cssString;
            } else {
                // w3c
                let cssText = doc.createTextNode(cssString);
                style.appendChild(cssText);
            }

            let heads = doc.getElementsByTagName('head');
            if (heads.length) {
                heads[0].appendChild(style);
            } else {
                doc.documentElement.appendChild(style);
            }
        },
        // 通过链接 添加css
        addCssByLink : function (cssUrl) {
            let doc = document;
            let link = doc.createElement('link');
            link.setAttribute('type', 'text/css');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', cssUrl);
            let heads = doc.getElementsByTagName('head');
            if (heads.length) {
                heads[0].appendChild(link);
            } else {
                doc.documentElement.appendChild(link);
            }
        }
    }

    mLocalSdk.startUp();
}