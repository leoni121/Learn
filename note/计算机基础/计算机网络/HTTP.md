[TOC]

## 1 http 具体过程 ##

![http过程](../img/http%E8%BF%87%E7%A8%8B.jpg)

## 2 request 和 response 报文 ##

***Request***

![../img/httprequest.png](../img/httprequest.png)

***Response***

![httpresponse](../img/httpresponse.png)

### 3.3 HTTP 状态码 ###

[参考-博客](https://www.cnblogs.com/jly144000/archive/2017/12/07/7998615.html)

> 1xx 表示**通知信息**的，如请求收到了或正在进行处理，需要请求者继续执行操作。
>
> 2xx 表示**成功**，如接受或知道了。
>
> 3xx 表示**重定向**，表示要完成请求还必须采取进一步的行动。
>
> 4xx 表示**客户的差错**，如请求中有错误的语法或不能完成。
>
> 5xx 表示**服务器的差错**，如服务器失效无法完成请求。

***常见***

* 200 OK 服务器成功处理了请求
* 204 请求被受理但没有资源可以返回

* 301 永久性重定向，请求的URL已移走
* 302 临时重定向，维护
* 304 表示未修改，客户的缓存资源是最新的，要客户端使用缓存
* 307(临时重定向)服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来响应以后的请求。此代码与响应 GET 和 HEAD 请求的301 代码类似，会自动将请求者转到不同的位置，但您不应使用此代码来告诉 Googlebot 某个页面或网站已经移动，因为 Googlebot 会继续抓取原有位置并编制索引。

400 请求报文语法有误，服务器无法识别
401(未授权)请求要求身份验证。对于登录后请求的网页，服务器可能返回此响应，身份过期
403 禁止，请求被服务器拒绝了
404 未找到资源
405 客户端请求中的方法被禁止

500 内部服务器错误，服务器遇到一个错误，使其无法为请求提供服务
503 服务器正忙，服务器超时

### 3.4 HTTP长连接（HTTP persistent connection ） ###

[参考-博客](https://www.cnblogs.com/cswuyg/p/3653263.html)

使用HTTP 流水线技术（HTTP pipelining，也有翻译为管道化连接），它是指，在一个TCP连接内，多个HTTP请求可以并行，下一个HTTP请求在上一个HTTP请求的应答完成之前就发起。



### 3.5 HTTP Keep-Alive模式 ###

 [参考-博客](http://www.cnblogs.com/skynet/archive/2010/12/11/1903347.html>)

> http 1.0中默认是关闭的，需要在http头加入"Connection: Keep-Alive"，才能启用Keep-Alive。
>
> http 1.1中默认启用Keep-Alive，如果加入"Connection: close "，才关闭。
>
> 是否能完成一个完整的Keep-Alive连接就看服务器设置情况。

**优点**

> 可以报告错误而不必关闭TCP连接
>
> errors can be reported without the penalty of closing the TCP connection

1. HTTP请求和响应可以通过管道连接。流水线允许客户机在不等待每个响应的情况下发出多个请求，从而使单个TCP连接的使用效率更高，运行时间更低。
2. 通过减少TCP打开造成的数据包数量，并允许TCP有足够的时间来确定网络的拥塞状态，可以减少网络拥塞。
3. 由于TCP的连接打开握手没有花费时间，因此后续请求的延迟会减少。

### 3.6 keepalive模式，客户端如何判断服务器的数据已经发生完成（如何判断http消息的大小、消息的数量）？ ###

***Conent-Length***

> 静态页面或图片等！

Conent-Length表示实体内容长度，客户端（服务器）可以根据这个值来判断数据是否接收完成。

***Transfer-Encoding***

> 动态页面等！
>
> 即如果要一边产生数据，一边发给客户端，服务器就需要使用"Transfer-Encoding: chunked"这样的方式来代替Content-Length。

服务器是不可能预先知道内容大小，可以使用Transfer-Encoding：chunk模式来传输数据了。chunk编码将数据分成一块一块的发生。Chunked编码将使用若干个Chunk串连而成，由一个标明**长度为0**的chunk标示结束。

### 3.7 request 和 response 报文头 ###

**request 头**

![requestHeader](C:/Users/nzq/Desktop/Learn/note/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/img/requestHeader.png)

**response 头**

![responseHeader](C:/Users/nzq/Desktop/Learn/note/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/img/responseHeader.png)

1. referer 当前页面 对html的请求来自上一个页面的 url, ajax请求是当前的url
2. HTTP 请求消息头部实例： 
   Host：rss.sina.com.cn 
   User-Agent：Mozilla/5、0 (Windows; U; Windows NT 5、1; zh-CN; rv:1、8、1、14) Gecko/20080404 Firefox/2、0、0、14 
   Accept：text/xml,application/xml,application/xhtml+xml,text/html;q=0、9,text/plain;q=0、8,image/png,*/*;q=0、5 
   Accept-Language：zh-cn,zh;q=0、5 
   Accept-Encoding：gzip,deflate 
   Accept-Charset：gb2312,utf-8;q=0、7,*;q=0、7 
   Keep-Alive：300 
   Connection：keep-alive 
   Cookie：userId=C5bYpXrimdmsiQmsBPnE1Vn8ZQmdWSm3WRlEB3vRwTnRtW &lt;-- Cookie 
   If-Modified-Since：Sun, 01 Jun 2008 12:05:30 GMT 
   Cache-Control：max-age=0 
3. HTTP 响应消息头部实例： 
   Status：OK - 200 &lt;-- 响应状态码，表示 web 服务器处理的结果。 
   Date：Sun, 01 Jun 2008 12:35:47 GMT 
   Server：Apache/2、0、61 (Unix) 
   Last-Modified：Sun, 01 Jun 2008 12:35:30 GMT 
   Accept-Ranges：bytes 
   Content-Length：18616 
   Cache-Control：max-age=120 
   Expires：Sun, 01 Jun 2008 12:37:47 GMT 
   Content-Type：application/xml 
   Age：2 
   X-Cache：HIT from 236-41、D07071951、sina、com、cn &lt;-- 反向代理服务器使用的 HTTP 头部 
   Via：1.0 236-41.D07071951.sina.com.cn:80 (squid/2.6.STABLE13) 
   Connection：close

## 4. HTTP方法的安全性和幂等性 ##

***安全性***，仅指该方法的***多次调用不会产生副作用***，不涉及传统意义上的“安全”，这里的***副作用是指资源状态***。即，安全的方法不会修改资源状态，尽管多次调用的返回值可能不一样(被其他非安全方法修改过)。	

***幂等性***，是指该方法***多次调用返回的效果(形式)一致***，客户端可以重复调用并且期望同样的结果。幂等的含义类似于编程语言中的setter方法[1]，一次调用和多次调用产生的效果是一致的，都是对一个变量进行赋值。安全性和幂等性含义有些接近，容易搞混。

***HTTP方法的安全性和幂等性见下表 :***

| 方法名  | 安全性 | 幂等性 |
| :-----: | :----: | :----: |
|   GET   |   是   |   是   |
|  HEAD   |   是   |   是   |
| OPTIONS |   是   |   是   |
| DELETE  |   否   |   是   |
|   PUT   |   否   |   是   |
|  POST   |   否   |   否   |

（1）可以认为安全的方法都是只读的方法(GET, HEAD, OPTIONS)

（2）DELETE方法的语义表示删除服务器上的一个资源，第一次删除成功后该资源就不存在了，资源状态改变了，所以DELETE方法不具备安全特性。然而***HTTP协议规定DELETE方法是幂等的***，每次删除该资源都要返回状态码200 OK，服务器端要实现幂等的DELETE方法，必须记录所有已删除资源的元数据(Metadata),否则，第二次删除后返回的响应码就会类似404 Not Found了。

（3）PUT和POST方法语义中都有修改资源状态的意思，因此都不是安全的。但是PUT方法是幂等的，POST方法不是幂等的，这么设计的理由是：

HTTP协议规定，POST方法修改资源状态时，URL指示的是该资源的父级资源，待***修改资源的ID信息在请求体中携带***。而PUT方法修改资源状态时，***URL直接指示待修改资源***。因此，***同样是创建资源，重复提交POST请求可能产生两个不同的资源，而重复提交PUT请求只会对其URL中指定的资源起作用，也就是只会创建一个资源。***