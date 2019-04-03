[TOC]
## iframe
document.getElementsByTagName("iframe")[1].contentWindow.document.body.classList.add("content-scroll-beautify")



## HTML元素的显示优先级
https://blog.csdn.net/basycia/article/details/50482977
    有窗口的元素总是显示在无窗口元素的前面，z-index属性值只有在同一类元素之间才起决定作用。形象地说，有窗口元素和无窗口元素就像画在同一浏览器窗口的两块不同画布上，两类元素分别自成体系，它们的z-index属性也只相对于同一画布上的其他元素起作用。
    帧元素>HTML元素优先，表单元素总>非表单元素优先
    有窗口的元素包括：SELECT元素，OBJECT元素，插件，IE5.01以主更早版本中的IFRAME元素。无窗口的元素包括：大多数的普通HTML元素，如链接和TABLE标记，除了SELECT元素之外的大多数表单元素。
    表单元素包括：文本区域（TEXTAREA），列表框(SELECT),文本输入框，密码输入框，单选输入框，复选输入框等等。常见的非表单元素包括：链接标记（A），DIV标记，SPAN标记，TABLE标记等等。



## 基于以下 HTML 结构，判断浏览器会发送多少个图片请求？
	\				不产生请求										    产生请求
img标签				把图片地址设置为不存在的属性，如data-src="..."	   设置了src属性（无论display:none;还是visibility:hidden;）
图片背景			display:none;或visibility:hidden					可见
js的new Image()
																		var el = document.createElement('div');
													el.innerHTML = '<img src="http://www.maxmeng.top/images/avatar.jpg" />'; // 产生请求
												new Image().src = 'http://www.maxmeng.top/images/avatar.jpg'; // 也产生请求


## textarea
    text
