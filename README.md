前端国际化具体实现方案如下：

1.html部分

目前html中统计结果有6种类型: html, text, title, alt, placeholder, value, 以及这6种的组合，详情请查看附件i18n-demo，请按照以下格式对标签进行修改:

```javascript

<!--html-->
<div class="i18n" data-properties="htmlmsg" data-ptype="html"></div>

<!--text-->
<div class="i18n" data-properties="hellomsg1" data-ptype="text"></div>

<!--title-->
<div class="i18n" title="" data-properties="commonmsg1" data-ptype="title">请用鼠标划过我看title效果</div>

<!--alt-->
<div> <img class="i18n" src="images/alt1.png" alt="" data-properties="img" data-ptype="alt"> </div>

<!--placeholder-->
<div> <input class="i18n" type="text" placeholder="" data-properties="searchPlaceholder" data-ptype="placeholder"> </div>

<!--value-->
<div> <input class="i18n" type="button" value="" data-properties="btn" data-ptype="value"> </div>

<!--text+title-->
<div class="i18n" title="" data-properties="hellomsg2/hellomsg2" data-ptype="text/title"></div>

<!--value+title-->
<div> <input class="i18n" type="button" value="" data-properties="btn/btntip" data-ptype="value/title"> </div>

<!--其他组合情况同理-->

```

注意：html和text的区别主要在于：如果中文中间含有换行 空格 大于符号 小于符号等，需要将"data-ptype"设置为"html"，其他纯文本情况均设置为"text"。

"data-properties"里的值需要取properties文件中的key值，多个值用"/"隔开，"data-ptype"里的值是为了区分类型，多个值用"/"隔开，

并且需要保证"data-properties"和"data-ptype"用"/"隔开的顺序相同，即一一对应。

所有需要做多语言处理的标签都需要加上class="i18n"。

上述用法如果无法满足个别特殊情况，可以针对特殊情况单独处理。



html页面中需要引入如下js，位置放在jquery.min.js之后，其他js之前即可。

```javascript
<script src="js/jquery.i18n.properties.js"></script>
<script src="js/language.js"></script>
```

2.js部分

js部分直接用$.i18n.prop方法取properties文件中的key值即可，如下所示：

```javascript
//js里中文处理
alert($.i18n.prop('welcome'));
```