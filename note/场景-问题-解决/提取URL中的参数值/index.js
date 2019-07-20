/**
 * @Author nzq
 * @Date 2019/4/1
 * @Description: 采用正则表达式获取地址栏参数
 * @Param:
 * @Return:
   */
  function getUrlParam(name) {
    let urlStr = window.location.search
      ,search = ""
      ,matcher = "";
    try{
      search = decodeURIComponent(decodeURIComponent(urlStr));
    } catch {
      try {
        search = decodeURIComponent(urlStr);
      } catch {
        search = urlStr;
      }
    }
    let pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
    matcher = pattern.exec(search);
    return matcher ? matcher[1] : '';
  }

  /**
   * @Author nzq
   * @Date 2019/4/1
   * @Description: split拆分法
   * @Param:
   * @Return:
   */
  function getUrlParamObj(name) {
    let urlStr = window.location.search
      ,search = ""
      ,strs = ""
      ,theRequest = {};

    try{
      search = decodeURIComponent(decodeURIComponent(urlStr));
    } catch {
      try {
        search = decodeURIComponent(urlStr);
      } catch {
        search = urlStr;
      }
    }

    if (search.indexOf("?") !== -1) {
      let str = url.substr(1);
      strs = str.split("&");
      for(let i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  
 // 思路三： 转化为 object  
function parseQueryString(url) {
    if (url === void 0) { url = window.location.href; }
    if (url.includes('?')) {
        if (url.includes('#')) {
            url = url.slice(0, url.lastIndexOf('#'));
        }
        var search = url.slice(url.lastIndexOf('?') + 1);
        return JSON.parse("{\"" + decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') + "\"}");
    }
    else {
        return {};
    }
}
