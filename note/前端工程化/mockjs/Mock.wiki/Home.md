欢迎来到 Mock.js 1.0 Wiki!

> [Mock.js 0.1 文档](http://mockjs.com/0.1/)

* **[开始 & 安装](/nuysoft/Mock/wiki/Getting-Started)**
* **[语法规范](/nuysoft/Mock/wiki/Syntax-Specification)**
    * [数据模板定义规范](/nuysoft/Mock/wiki/Syntax-Specification#数据模板定义规范-dtd)
        <br>
        [String](/nuysoft/Mock/wiki/Syntax-Specification#1-属性值是字符串-string),
        [Number](/nuysoft/Mock/wiki/Syntax-Specification#2-属性值是数字-number),
        [Boolean](/nuysoft/Mock/wiki/Syntax-Specification#3-属性值是布尔型-boolean),
        [Object](/nuysoft/Mock/wiki/Syntax-Specification#4-属性值是对象-object),
        [Array](/nuysoft/Mock/wiki/Syntax-Specification#5-属性值是数组-array),
        [Function](/nuysoft/Mock/wiki/Syntax-Specification#6-属性值是函数-function),
        [RegExp](/nuysoft/Mock/wiki/Syntax-Specification#7-属性值是正则表达式-regexp)
    * [数据占位符定义规范](/nuysoft/Mock/wiki/Syntax-Specification#数据占位符定义规范-dtd)
* **[Mock.mock()](/nuysoft/Mock/wiki/Mock.mock())**
* **[Mock.setup()](/nuysoft/Mock/wiki/Mock.setup())**
* **[Mock.Random](/nuysoft/Mock/wiki/Mock.Random)**
    * [Basic](/nuysoft/Mock/wiki/Basic)
        <br>
        [boolean](/nuysoft/Mock/wiki/Basic#randomboolean-min-max-current-),
        [natural](/nuysoft/Mock/wiki/Basic#randomnatural-min-max-),
        [integer](/nuysoft/Mock/wiki/Basic#randominteger-min-max-),
        [float](/nuysoft/Mock/wiki/Basic#randomfloat-min-max-dmin-dmax-),
        [character](/nuysoft/Mock/wiki/Basic#randomcharacter-pool-),
        [string](/nuysoft/Mock/wiki/Basic#randomstring-pool-min-max-),
        [range](/nuysoft/Mock/wiki/Basic#randomrange-start-stop-step-)
    * [Date](/nuysoft/Mock/wiki/Date)
        <br>
        [date](/nuysoft/Mock/wiki/Date#randomdate-format-),
        [time](/nuysoft/Mock/wiki/Date#randomtime-format-),
        [datetime](/nuysoft/Mock/wiki/Date#randomdatetime-format-),
        [now](/nuysoft/Mock/wiki/Date#randomnow-unit-format-)
    * [Image](/nuysoft/Mock/wiki/Image)
        <br>
        [img](/nuysoft/Mock/wiki/Image#randomimage-size-background-foreground-format-text-),
        [dataImage](/nuysoft/Mock/wiki/Image#randomdataimage-size-text-)
    * [Color](/nuysoft/Mock/wiki/Color)
        <br>
        [color](/nuysoft/Mock/wiki/Color#randomcolor),
        [hex](/nuysoft/Mock/wiki/Color#randomhex),
        [rgb](/nuysoft/Mock/wiki/Color#randomrgb),
        [rgba](/nuysoft/Mock/wiki/Color#randomrgba),
        [hsl](/nuysoft/Mock/wiki/Color#randomhsl)
    * [Text](/nuysoft/Mock/wiki/Text)
        <br>
        [paragraph](/nuysoft/Mock/wiki/Text#randomparagraph-min-max-),
        [sentence](/nuysoft/Mock/wiki/Text#randomsentence-min-max-),
        [word](/nuysoft/Mock/wiki/Text#randomword-min-max-),
        [title](/nuysoft/Mock/wiki/Text#randomtitle-min-max-),
        [cparagraph](/nuysoft/Mock/wiki/Text#randomcparagraph-min-max-),
        [csentence](/nuysoft/Mock/wiki/Text#randomcsentence-min-max-),
        [cword](/nuysoft/Mock/wiki/Text#randomcword-pool-min-max-),
        [ctitle](/nuysoft/Mock/wiki/Text#randomctitle-min-max-)
    * [Name](/nuysoft/Mock/wiki/Name)
        <br>
        [first](/nuysoft/Mock/wiki/Name#randomfirst),
        [last](/nuysoft/Mock/wiki/Name#randomlast),
        [name](/nuysoft/Mock/wiki/Name#randomname-middle-),
        [cfirst](/nuysoft/Mock/wiki/Name#randomcfirst),
        [clast](/nuysoft/Mock/wiki/Name#randomclast),
        [cname](/nuysoft/Mock/wiki/Name#randomcname)
    * [Web](/nuysoft/Mock/wiki/Web)
        <br>
        [url](/nuysoft/Mock/wiki/Web#randomurl-protocol-host-),
        [domain](/nuysoft/Mock/wiki/Web#randomdomain),
        [protocol](/nuysoft/Mock/wiki/Web#randomprotocol),
        [tld](/nuysoft/Mock/wiki/Web#randomtld),
        [email](/nuysoft/Mock/wiki/Web#randomemail-domain-),
        [ip](/nuysoft/Mock/wiki/Web#randomip)
    * [Address](/nuysoft/Mock/wiki/Address)
        <br>
        [region](/nuysoft/Mock/wiki/Address#randomregion),
        [province](/nuysoft/Mock/wiki/Address#randomprovince),
        [city](/nuysoft/Mock/wiki/Address#randomcity-prefix-),
        [county](/nuysoft/Mock/wiki/Address#randomcounty-prefix-),
        [zip](/nuysoft/Mock/wiki/Address#randomzip)
    * [Helper](/nuysoft/Mock/wiki/Helper)
        <br>
        [capitalize](/nuysoft/Mock/wiki/Helper#randomcapitalize-word-),
        [upper](/nuysoft/Mock/wiki/Helper#randomupper-str-),
        [lower](/nuysoft/Mock/wiki/Helper#randomlower-str-),
        [pick](/nuysoft/Mock/wiki/Helper#randompick-arr-),
        [shuffle](/nuysoft/Mock/wiki/Helper#randomshuffle-arr-)
    * [Miscellaneous](/nuysoft/Mock/wiki/Miscellaneous)
        <br>
        [guid](/nuysoft/Mock/wiki/Miscellaneous#randomguid),
        [id](/nuysoft/Mock/wiki/Miscellaneous#randomid),
        [increment](/nuysoft/Mock/wiki/Miscellaneous#randomincrement-step-)
* **[Mock.valid()](/nuysoft/Mock/wiki/Mock.valid())**
* **[Mock.toJSONSchema()](/nuysoft/Mock/wiki/Mock.toJSONSchema())**
* **[感谢 & 贡献者](/nuysoft/Mock/wiki/Thanks-&-Contributors)**