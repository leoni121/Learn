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

[说说行内元素和块级元素](<https://www.jianshu.com/p/d69878549d92>)

1. width; height

2. 布局

3. padding/margin

   > padding: 100px ; === padding: 0 100px 100px;
   >
   > margin: 100px; === margin: 0 100px;

4. 块级可以容纳行级

5. 块级宽度默认是 100%， 行级默认是内容宽度

**常见的块元素**

```
address - 地址
 blockquote - 块引用
 center - 举中对齐块
 dir - 目录列表
 div - 常用块级容易，也是css layout的主要标签
 dl - 定义列表
 fieldset - form控制组
 form - 交互表单
 h1 - 大标题
 h2 - 副标题
 h3 - 3级标题
 h4 - 4级标题
 h5 - 5级标题
 h6 - 6级标题
 hr - 水平分隔线
 isindex - input prompt
 menu - 菜单列表
 noframes - frames可选内容（对于不支持frame的浏览器显示此区块内容）
 noscript - 可选脚本内容（对于不支持script的浏览器显示此内容）
 ol - 排序列表
 p - 段落
 pre - 格式化文本
 table - 表格
 ul - 非排序列表
```

**常见的内联元素**

```
a - 锚点
abbr - 缩写
acronym - 首字
b - 粗体（不推荐）
bdo - bidi override
big - 大字体
br - 换行
cite - 引用
code - 计算机代码（在引用源码的时候需要）
dfn - 定义字段
em - 强调
font - 字体设定（不推荐）
i - 斜体
img - 图片
input - 输入框
kbd - 定义键盘文本
label - 表格标签
q - 短引用
s - 中划线（不推荐）
samp - 定义范例计算机代码
select - 项目选择
small - 小字体文本
span - 常用内联容器，定义文本内区块
strike - 中划线
strong - 粗体强调
sub - 下标
sup - 上标
textarea - 多行文本输入框
tt - 电传文本
u - 下划线
var - 定义变量
```

**块级元素和内联元素之间的转换**

1. display
   块元素默认display:block;**行内非替换元素(a,span)**默认为display：inline;**行内替换元素(input)**默认为display:inline-block;
   - display:none;不显示该元素，也不会保留该元素原先占有的文档流位置。
   - display:block;转换为块级元素。
   - display:inline;转换为行内元素。
   - display:inline-block;转换为行内块级元素。
2. float
   当把行内元素设置完float:left/right后，该行内元素的display属性会被赋予block值，且拥有浮动特性。行内元素去除了之间的莫名空白。
3. position
   当为行内元素进行定位时，position:absolute与position:fixed.都会使得原先的行内元素变为块级元素

## 6. style标签可以写在body里面吗 ##

可以的，但是[CSS](https://www.baidu.com/s?wd=CSS&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)又会重新渲染了一次页面，占用一定的时间，如果网页篇幅少的话感觉不出来，如果篇幅多（包含有大量[HTML](https://www.baidu.com/s?wd=HTML&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)）会有一定的影响，所以大页面中不建议将style写进body里。