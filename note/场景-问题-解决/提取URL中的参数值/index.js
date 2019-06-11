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
