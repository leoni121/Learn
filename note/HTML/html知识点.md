[TOC]
## 1. iframe
document.getElementsByTagName("iframe")[1].contentWindow.document.body.classList.add("content-scroll-beautify")



## 2. HTML元素的显示优先级
https://blog.csdn.net/basycia/article/details/50482977
    有窗口的元素总是显示在无窗口元素的前面，z-index属性值只有在同一类元素之间才起决定作用。形象地说，有窗口元素和无窗口元素就像画在同一浏览器窗口的两块不同画布上，两类元素分别自成体系，它们的z-index属性也只相对于同一画布上的其他元素起作用。
    帧元素>HTML元素优先，表单元素总>非表单元素优先
    有窗口的元素包括：SELECT元素，OBJECT元素，插件，IE5.01以主更早版本中的IFRAME元素。无窗口的元素包括：大多数的普通HTML元素，如链接和TABLE标记，除了SELECT元素之外的大多数表单元素。
    表单元素包括：文本区域（TEXTAREA），列表框(SELECT),文本输入框，密码输入框，单选输入框，复选输入框等等。常见的非表单元素包括：链接标记（A），DIV标记，SPAN标记，TABLE标记等等。



## 3. 基于以下 HTML 结构，判断浏览器会发送多少个图片请求？
	\				不产生请求										    产生请求
img标签				把图片地址设置为不存在的属性，如data-src="..."	   设置了src属性（无论display:none;还是visibility:hidden;）
图片背景			display:none;或visibility:hidden					可见
js的new Image()
																		var el = document.createElement('div');
													el.innerHTML = '<img src="http://www.maxmeng.top/images/avatar.jpg" />'; // 产生请求
												new Image().src = 'http://www.maxmeng.top/images/avatar.jpg'; // 也产生请求

## 4. Viewport ##

> [移动前端开发之viewport的深入理解](https://www.cnblogs.com/2050/p/3877280.html)

viewport 是**用户网页的可视区域**，**手机浏览器是把页面放在一个虚拟的"窗口"（viewport）中，通常这个虚拟的"窗口"（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。**
 **一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下:**

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

1. width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
2. height：和 width 相对应，指定高度。
3. initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
4. maximum-scale：允许用户缩放到的最大比例。
5. minimum-scale：允许用户缩放到的最小比例。
6. user-scalable：用户是否可以手动缩放。

## 5. HTML 语法标签，块级和行级的区别是什么？ ##

1. width; height

2. 布局

3. padding/margin

   > padding: 100px ; === padding: 0 100px 100px;
   >
   > margin: 100px; === margin: 0 100px;