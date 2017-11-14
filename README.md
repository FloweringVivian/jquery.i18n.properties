# 基于jQuery.i18n.properties 实现前端页面的资源国际化

### 1.html部分

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

language.js中针对6种类型及其组合情况进行了处理，如下：

```javascript
jQuery.i18n.properties({
    name : 'message', //资源文件名称
    path : 'i18n/', //资源文件路径
    mode : 'map', //用Map的方式使用资源文件中的值 'both'
    language : i18nLanguage,
    callback : function() {//加载成功后设置显示内容

        var insertEle = $(".i18n");
        insertEle.each(function() {
            var properties = $.trim($(this).attr('data-properties'));
            if(properties){
                var pType = $(this).attr('data-ptype');
                var pTypeArr = pType.split('/');
                var propertiesArr = properties.split('/');
            
                for(var i=0;i<pTypeArr.length;i++){

                    if($.trim(pTypeArr[i]) == 'html'){

                        $(this).html($.i18n.prop($.trim(propertiesArr[i])));

                    }else if($.trim(pTypeArr[i]) == 'text'){

                        $(this).text($.i18n.prop($.trim(propertiesArr[i])));

                    }else if($.trim(pTypeArr[i]) == 'title'){

                        $(this).attr('title', $.i18n.prop($.trim(propertiesArr[i])));

                    }else if($.trim(pTypeArr[i]) == 'alt'){

                        $(this).attr('alt', $.i18n.prop($.trim(propertiesArr[i])));

                    }else if($.trim(pTypeArr[i]) == 'placeholder'){

                        $(this).attr('placeholder', $.i18n.prop($.trim(propertiesArr[i])));

                    }else if($.trim(pTypeArr[i]) == 'value'){

                        $(this).val($.i18n.prop($.trim(propertiesArr[i])));

                    };

                };
            };
        });
    }
});
```

html页面中需要引入如下js，位置放在jquery.min.js之后，其他js之前即可。

```javascript
<script src="js/jquery.i18n.properties.js"></script>
<script src="js/language.js"></script>
```

### 2.js部分

js部分直接用$.i18n.prop方法取properties文件中的key值即可，如下所示：

```javascript
//js里中文处理
alert($.i18n.prop('welcome'));
```




