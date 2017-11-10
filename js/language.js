/**
 * cookie操作
 */
var getCookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function(){
    if(navigator.appName == "Netscape"){
        var navLanguage = navigator.language;
        return navLanguage;
    }
    return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    /*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };

    if (getCookie("userLanguage")) {
        i18nLanguage = getCookie("userLanguage");
    } else {
        // 获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                getCookie("userLanguage",navLanguage);
            };
        } else{
            console.log("not navigator");
            return false;
        }
    }
    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件")
        return false;
    };

    /*
    这里需要进行i18n的翻译
     */
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
        
}

/*页面执行加载执行*/
$(function(){

    /*执行I18n翻译*/
    execI18n();

    /*将语言选择默认选中缓存中的值*/
    $("#language option[value="+i18nLanguage+"]").attr("selected",true);

    /* 选择语言 */
    $("#language").bind('change', function() {
        var language = $(this).children('option:selected').val();
        getCookie("userLanguage",language,{
            expires: 30,
            path:''
        });
        location.reload();
    });

});
