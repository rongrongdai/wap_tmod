/*! layer mobile-v1.6 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function(a){"use strict";var b="";b=b?b:document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];var c=document,d="querySelectorAll",e="getElementsByClassName",f=function(a){return c[d](a)};var g={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0};a.ready={extend:function(a){var b=JSON.parse(JSON.stringify(g));for(var c in a)b[c]=a[c];return b},timer:{},end:{}},ready.touch=function(a,b){var c;a.addEventListener("touchmove",function(){c=!0},!1),a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=ready.extend(a),b.view()};j.prototype.view=function(){var a=this,b=a.config,d=c.createElement("div");a.id=d.id=i[0]+h,d.setAttribute("class",i[0]+" "+i[0]+(b.type||0)),d.setAttribute("index",h);var g=function(){var a="object"==typeof b.title;return b.title?'<h3 style="'+(a?b.title[1]:"")+'">'+(a?b.title[0]:b.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,c=(b.btn||[]).length;return 0!==c&&b.btn?(a='<span type="1">'+b.btn[0]+"</span>",2===c&&(a='<span type="0">'+b.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(b.fixed||(b.top=b.hasOwnProperty("top")?b.top:100,b.style=b.style||"",b.style+=" top:"+(c.body.scrollTop+b.top)+"px"),2===b.type&&(b.content='<i></i><i class="laymloadtwo"></i><i></i><div>'+(b.content||"")+"</div>"),d.innerHTML=(b.shade?"<div "+("string"==typeof b.shade?'style="'+b.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(b.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(b.className?b.className:"")+" "+(b.type||b.shade?"":"layermborder ")+(b.anim?"layermanim":"")+'" '+(b.style?'style="'+b.style+'"':"")+">"+g+'<div class="layermcont">'+b.content+"</div>"+j+"</div></div></div>",!b.type||2===b.type){var l=c[e](i[0]+b.type),m=l.length;m>=1&&k.close(l[0].getAttribute("index"))}document.body.appendChild(d);var n=a.elem=f("#"+a.id)[0];b.success&&b.success(n),a.index=h++,a.action(b,n)},j.prototype.action=function(a,b){var c=this;if(a.time&&(ready.timer[c.index]=setTimeout(function(){k.close(c.index)},1e3*a.time)),a.title){var d=b[e]("layermend")[0],f=function(){a.cancel&&a.cancel(),k.close(c.index)};ready.touch(d,f),d.onclick=f}var g=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),k.close(c.index)):a.yes?a.yes(c.index):k.close(c.index)};if(a.btn)for(var h=b[e]("layermbtn")[0].children,i=h.length,j=0;i>j;j++)ready.touch(h[j],g),h[j].onclick=g;if(a.shade&&a.shadeClose){var l=b[e]("laymshade")[0];ready.touch(l,function(){k.close(c.index,a.end)}),l.onclick=function(){k.close(c.index,a.end)}}a.end&&(ready.end[c.index]=a.end)};var k={v:"1.6",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var b=f("#"+i[0]+a)[0];b&&(b.innerHTML="",c.body.removeChild(b),clearTimeout(ready.timer[a]),delete ready.timer[a],"function"==typeof ready.end[a]&&ready.end[a](),delete ready.end[a])},closeAll:function(){for(var a=c[e](i[0]),b=0,d=a.length;d>b;b++)k.close(0|a[0].getAttribute("index"))}};"function"==typeof define?define(function(){return k}):a.layer=k}(window);

window.requestAnimFrame = (function(){
  return window.requestAnimFrame ||
         window.webkitRequestAnimFrame ||
         window.mozRequestAnimFrame ||
         window.oRequestAnimFrame ||
         window.msRequestAnimFrame ||
         function(callback) {
          window.setTimeout(callback, 1000/60);
        }
})();

/**
 * 记录滚动页面或调整窗口大小回调处理器； 
 * 解决可能直接使用scroll或resize事件处理回调时出现的浏览器卡顿感或假死现象，提升性能
 * 相关：http://www.infoq.com/cn/articles/javascript-high-performance-animation-and-page-rendering
 * @author: fengri
 * @create: 2015年10月13日18:09:23
 * @return {Object} scrollTick  提供二个方法，1、add；2、remove
 * 关于方法：
 * @add param {function}      fn    向处理器队列添加fn
 * @remove param {function}   fn    从处理器中删除fn
 */
;(function(){
  var isScroll = 0;
  var fns = [];
  
  $(window).on('scroll resize', function(){
    requestTick();
  });
  
  function requestTick(){
    if(!isScroll) {      
      requestAnimFrame(scroll);
    }
    
    isScroll = 1;
  }
  
  function scroll(){
    if(isScroll){
      for(var k = 0, len = fns.length; k < len; k++) {
        fns[k].call(window);
      }
      isScroll = 0;
    }

  }
  window.scrollTick = {
    add: function(fn){
      fns.push(fn);
    },
    remove: function(fn){
      var i = $.inArray(fn, fns);
      
      if(i != -1) {
        fns.splice(i);
      }
    }
  }
})();


/**
 * 全局通用方法； 
 * @author: 
 * @create: 2015年9月14日17:29:25
 */
var G = {};
G.api = "http://m.test.quanqiuwa.com";
/** 
 * 开卖提醒；
 * @param: {String}   el    提醒按钮父元素，主要需要使用它来进行按钮状态切换
 *         {String}   id    商品ID
 *         {String}   state    商品原状态
 */
G.remind = function(el, id, state){
  var el = $(el);
    
  ajaxData('get', "/api-special/remind?client=web", {id: id, state: state}, function(){
    el.css('display', 'none');
    el.siblings().css('display', 'block');
  });
}

/**
 * 获取URL参数；
 * @param: {String}   name    参数名称
 */
G.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return false;
}

// 返回上一步
G.gotoBack = function() {
  var url = location.href;
  
  if(/#top/.test(url)) {
    history.go(-2);
  }else{
    history.back();
  }
}

G.isWeixin = function(){
  var ua = navigator.userAgent.toLowerCase();
  if((/MicroMessenger/i).test(ua)) {
      return true;
  } else {
      return false;
  }
}

/**
 * 锚点定位；
 * 解决因页面的fixed定位情况下，浏览器默认锚点被fixed挡住的问题
 * 注：不能既用了浏览器锚点，又用了此功能，否则会导致此功能无法使用，或者页面出现二次闪动
 * 所有参数都只能是ID
 * @param: {String}         id        用于定位页面元素位置， 
 *         {String|Array}   except    需要排除的元素，排除元素主要是获取其高度
 */ 
G.anchor = function(id, except){
  var diff = 0;
  var elTop;
  
  if(id == undefined) {
    return;
  }
  
  if(!$('#' + id).size()) {
    return;
  }
  
  elTop = $('#' + id).offset().top;
  
  if(except) {
    if($.isArray(except)) {
      for(var i = 0, len = except.length; i < len; i++){
        diff += (typeof (except[i] - 0 ) == 'number' ? except[i] - 0 : ($('#' + except[i]).height() || 0));
      }
    }else{
      diff += (typeof (except - 0 ) == 'number' ? except - 0 : ($('#' + except).height() || 0));
    }
  }
  
  $(window).scrollTop(elTop - diff);  
}

/**COOKIE操作*/
G.cookie = {
    set : function(name,value,time) {
        var exp = new Date();
        exp.setTime(exp.getTime() + time * 60);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    get : function(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if (arr=document.cookie.match(reg))
        {
            return unescape(arr[2]);
        }        
        else
        {
            return null;
        }
        
    }
}

/**
 * 固定Loading效果，简版；
 * 只支持固定loading效果，效果通过通过CSS控制
 * HTML结构：
 * <div class="u-loading-fixed">
    <div class="u-loading-mask"></div>
    <div class="u-loading-icon"></div>
   </div>
 */ 
G.loading = (function(){
  
  var Loading = function(){
    this.el = null;

    return this.init();
  }

  Loading.prototype = { 
    // 生成id key
    guid: function () {
        return Math.floor(Math.random() * 1000);
    },
    init: function(){
      var self = this;

      self.el = $('<div>', {
          'id': 'ui-loading' + self.guid(),
          'class': 'u-loading-fixed'
      });
      
      self.hide();

      self.render();
    },
    render: function () {
      var self = this;
      var html = '<div class="u-loading-mask"></div>' +
                  '<div class="u-loading-icon"></div>';

      self.el.html(html);

      $('body').append(self.el);

      return self;
    },
    show: function () {
        this.el.show();

        return this;
    },
    hide: function () {
      this.el.hide();

      return this;
    },
    close: function () {
      this.el.remove();
      Loadding = null;
    }
  } 

  return Loading;
})();

/**
 * 基于layer插件的弹出层之消息提醒方法，3秒后自动消失；
 * layer http://layer.layui.com/mobile/
 * param{String}    content   提醒的文本内容
 */
G.msg = function(content, t) {
    if(!content) return;
    t = arguments[1] ? arguments[1] : 3;
    layer.open({
        shade: false,
        //className: 'popHintBox',
        style: 'background-color:black; color:#fff; border:none;',
        content: content,
        time: t
    })
}


/**
 * 对于7.28积分活动添加功能基于layer插件的弹出层之消息提醒方法，3秒后自动消失；
 * layer http://layer.layui.com/mobile/
 * param{String}    content   提醒的文本内容
 */
G.Imsg = function(content, t) {
    if(!content) return;
    t = arguments[1] ? arguments[1] : 3;
    layer.open({
        shade: false,
        //className: 'popHintBox',
        style: 'background-color:black; color:#fff; border:none; position: fixed; top:4.5rem;  width: 70%; left:0.8rem; text-align: center; ' +
        'border-radius: 8px; text-align: center; line-height: 1.5; padding:0.2rem; font-size: 0.32rem; z-index:2010',
        content: content,
        time: t
    })
}

/**
 * 对于奥运会活动添加功能基于layer插件的弹出层之消息提醒方法，3秒后自动消失；
 * layer http://layer.layui.com/mobile/
 * param{String}    content   提醒的文本内容
 */
G.aoImg = function(content, t) {
    if(!content) return;
    t = arguments[1] ? arguments[1] : 3;
    layer.open({
        shade: false,
        //className: 'popHintBox',
        style: 'background-color:black; color:#fff; border:none; position: fixed; top:40%;  width: 70%; left:10%; text-align: center; ' +
        'border-radius: 8px; text-align: center; line-height: 1.5; padding:0.4rem; font-size: 0.64rem;',
        content: content,
        time: t
    })
}


//遮罩层
G.pop = function(content, isClose) {
	  if(!content) return;
	  layer.open({
		  content: content, 
		  style: 'background-color:black; color:#fff; border:none;',
		  //time: 2
		  shade: true,
		  shadeClose:isClose,
	  })
	}
/**
 * 基于layer插件的弹出层之询问框，
 * layer http://layer.layui.com/mobile/
 * param{String}    content   提醒的文本内容  
 */ 
G.confirm = function(content, yesfn, nofn){
	if(!content) return false;
	layer.open({
	    content: content,
	    btn: ['确认', '取消'],
	    shadeClose: false,
	    yes: function(){
	    	yesfn();
	    }, no: function(){
	    	nofn();
	    }
	});
}

G.getForm = function(name) {
    var elements = document.getElementById(name).elements;
    if (!elements) {
        return false;
    }

    var data = {};
    for ( var i = 0; i < elements.length; i++) {
        var formType = elements[i].nodeName;
        var value = elements[i].value;
        var formName = elements[i].name;

        switch (formType) {
        case "INPUT":
            switch (elements[i].type.toLowerCase()) {
            case "text":
            case "password":
            case "submit":
            case "button":
            case "reset":
            case "hidden":
                if (data[formName] && value != "") {
                    data[formName] += "," + value;
                } else {
                    data[formName] = value;
                }
                break;
            case "radio":
            case "checkbox":
                if (elements[i].checked) {
                    if (data[formName] && value != "") {
                        data[formName] += "," + value;
                    } else {
                        data[formName] = value;
                    }
                }
                break;
            default:
                break;
            }
            break;

        case "SELECT":
        case "TEXTAREA":
            data[formName] = data[formName] ? data[formName] + "," + value
                    : value;
            break;
        case "BUTTON":
        case "submit":
        case "button":
        case "reset":
            data[formName] = value;
            break;
        break;
    default:
        break;
    }
}

return data;  
}

/**
 * 本地缓存管理；
 * 当localStorage可用时，使用localStorage，否则使用cookies
 */ 
G.storage = (function(){
  var storage = {};
  
  storage.version = '1.0.0'; // set version

  storage.isSupportLocal = !!window.localStorage;

  storage.localStorage = window.localStorage; // set localStorage

  /**
   * @description set key of val storage at localStorage
   * if browser support `window.localStorage`
   * @param {String} key The storage key
   * @param {String or Object} val the storage val is string or object
   * @return {Bool}
   */
  storage.set = function set(key, val) {
    try {
      if (storage.isObject(val)) {
        val = JSON.stringify(val)
      }

      if (storage.isSupportLocal) {
        storage.localStorage.setItem(key, val);
      } else {
        storage.setCookie({
          name: key,
          value: val,
          expiresHours: 24 * 30,
          path: '/',
        });
      }
      return true;
    } catch (e) {
      console.log('storage key ' + key + ' is failed');
      return false;
    }
  };

  /**
   * @description get localStorage val by key
   * @param {String} key the key of localstorage
   * @return {String} return value of key
   */
  storage.get = function get(key) {
    var val;
    try {
      val = storage.isSupportLocal ? storage.localStorage.getItem(key) : storage._getCookie(key);
      if (val) {
        return JSON.parse(val);
      }
    } catch (e) {
      return val;
    }
  };

  /**
   * @description remove localstorage key
   * @param {String} key The key of storage
   * @return {NULL}
   */
  storage.remove = function remove(key) {
    if (storage.isSupportLocal) {
      storage.localStorage.removeItem(key);
    } else {
      storage._deleCookie(key, {
        path: '/'
      });
    }
  };

  /**
   * @description is object method
   * @param {Object} obj The judge param
   * @return {Boolean}
   */
  storage.isObject = function(obj) {
    return '[object Object]' === obj.toString();
  };

  /**
   * @description is Array
   * @param {Object | Array | String} val The judge param
   * @return {Boolean}
   */
  storage.isArray = Array.isArray;

  /**
   * 设置cookie
   * option[name] cookie名，必选
   * option.value: cookie值，必选
   * option.expiresHours: 过期时间，可选，默认为浏览器关闭即消失
   * option.path: cookie存放路径，可选。例如"/"、"/shop"。
   * 默认情况下,如果在某个页面创建了一个cookie,那么该页面所在目录中的其他页面也可以访问该cookie
   * 如果这个目录下还有子目录，则在子目录中也可以访问。
   * 例如在www.xxxx.com/html/a.html中所创建的cookie，
   * 可以被www.xxxx.com/html/b.html或www.xxx.com/html/some/c.html所访问，但不能被www.xxxx.com/d.html访问。
   * option.domain: 可访问该cookie的域名，可选。
   */
  storage._setCookie = function(option) {
    var cookieStr = option.name + "=" + option.value;
    if (option.expiresHours) {
      var date = new Date();
      date.setTime(date.getTime() + option.expiresHours * 3600 * 1000);
      cookieStr = cookieStr + "; expires=" + date.toUTCString();
    }
    if (option.path) {
      cookieStr = cookieStr + "; path=" + option.path;
    }
    if (option.domain) {
      cookieStr = cookieStr + "; domain=" + option.domain;
    }
    document.cookie = cookieStr;
  };

  /**
   * 删除cookie
   * name: cookie名，必选
   * option.path: cookie存放路径，可选
   * option.domain: 可访问该cookie的域名，可选
   * 需要注意的是，设置cookie时，如果setCookie传了path、domain，删除时也必选传入这两个参数
   * 否则无法删除cookie
   * 另外，经测试，如设置了path、domain，删除时需在设置cookie的同一域下删除
   */
  storage._deleteCookie = function(name, option) {
    var date = new Date();
    date.setTime(date.getTime() - 1000);
    document.cookie = name +
      "=88; expires=" +
      date.toUTCString() +
      (option.path ? ("; path=" + option.path) : "") +
      (option.domain ? ("; domain=" + option.domain) : "");
  };

  /**
   * @description 获取cookie中name对应的值
   */
  storage._getCookie = function(name) {
    var cookies = document.cookie.split("; "),
      arr;
    for (var i = 0, len = cookies.length; i < len; i++) {
      arr = cookies[i].split("=");
      if (arr[0] == name) {
        return decodeURI(arr[1]);
      }
    }
    return "";
  };

  return storage;
})();

G.share = function(id, title){
  var str = '<ul class="u-share-list">';
  
  str += '<li><div><img src="http://m.lamall.com/static/img/share_xinlang.png" onclick="G.doShare(\'sina\', \'' + title + '\', \'' + id + '\')" /></div><p>新浪微博</p></li>';
  str += '<li><div><img src="http://m.lamall.com/static/img/share_tx_weibo.png" onclick="G.doShare(\'qqweibo\', \'' + title + '\', \'' + id + '\')" /></div><p>腾讯微博</p></li>';
  //str += '<li><div><img src="/static/img/share_weixin.png" /></div><p>微信好友</p></li>';
  //str += '<li><div><img src="/static/img/share_circle_friends.png" /></div><p>微信朋友圈</p></li>';
  str += '<li><div><img src="http://m.lamall.com/static/img/share_qq_friends.png" onclick="G.doShare(\'qq\', \'' + title + '\', \'' + id + '\')"  /></div><p>QQ好友</p></li>';
  str += '</ul>';
  
  layer.open({
      title: '分享到',
      className: 'u-share',
      content: str,
      btn: ['取消'],
      shadeClose: false,
      no: function(){
          layer.closeAll();
      }
  });
};

G.doShare = function(type, title, id) {
  var title = title || '';
  var content = '我在辣妈帮发现了一个不错的商品：' + title +'，点击查看：http://m.lamall.com/goods/detail?id=' + id + ' ,想找更多进口母婴商品，请下载辣妈帮http://product.lmbang.com/';
  G.pageShare(type, content, '/goods/detail?id=' + id);
}  


G.pageShare = function(webSite, title, url) {
	
    var shareUrl = "";
    var d = document; 
    var u = url;
    var des = d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');
    var esTitle = escape(title);
    var esHref  = escape(u);
    var esDes   = escape(des);
    var ecTitle = encodeURIComponent(title);
    var ecHref  = encodeURIComponent(u);
    var ecDes   = encodeURIComponent(des);

    switch(webSite){
        case 'qq':
            //shareUrl="http://shuqian.qq.com/post?from=3&title="+ecTitle+"&uri="+ecHref+"&jumpback=2&noui=1";
            shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?title='+ecTitle+'&url='+ecHref+'&pics=&site=辣妈帮官方商城';
            break;
        case 'baidu':
        	shareUrl="http://cang.baidu.com/do/add?it="+ecTitle+"&iu="+ecHref+"&dc="+ecDes+"&fr=ien#nw=1";
        	break;
        case 'sina':
        	shareUrl="http://v.t.sina.com.cn/share/share.php?title="+ecTitle+"&url="+ecHref+"&rcontent="+ecDes;
        	break;
        case "kaixin" :
        	shareUrl="http://www.kaixin001.com/~repaste/repaste.php?&rurl="+esHref+"&rtitle="+esTitle+'&rcontent='+esTitle;
        	break;
        case "sohu" :
        	shareUrl="http://bai.sohu.com/share/blank/add.do?link="+esHref;
        	break;
        case "douban" :
        	shareUrl="http://www.douban.com/recommend/?url="+ecHref+"&title="+ecTitle+"&comment="+ecDes;
        	break;
        case 'renren':
        	shareUrl = 'http://share.renren.com/share/buttonshare.do?link='+ecHref+'&title='+ecTitle;
        	break;
        case 'qqweibo':
            shareUrl = 'http://v.t.qq.com/share/share.php?url='+ecHref+'&title=' + ecTitle;
            break;
    }
    
    //location.href = shareUrl;
    window.open(shareUrl,'favit','');
}


/**
 * 通用表单验证方法集；
 * @author: fengri
 * @create: 2015年10月15日12:02:09
 */
var valiatorReg = {
  // 空
  isEmpty: function(str) {
      return new RegExp("^[\\s+]*$").test(str);
  },
  
  // 数字
  isNum: function(str) {
      return new RegExp("^([+-]?)\\d*\\.?\\d+$").test(str);
  },
  
  // 中文
  isChinese: function(str) {
      return new RegExp("^[\\u4e00-\\u9fa5]+$").test(str);
  },
  
  // 是否为日期
  isDate: function(str) {
      return new RegExp("^\\d{4}(\\-|\\/|.)\\d{1,2}\\1\\d{1,2}$").test(str);
  },
  
  // Email
  isEmail: function(str) {
      return new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$").test(str);
  },
  
  // 字母
  isLetter: function(str) {
      return new RegExp("^[A-Za-z]+$").test(str);
  },
  
  // 手机号
  isPhone: function(str) {
      return new RegExp("^0?(13|15|18|14|17|19)[0-9]{9}$").test(str);
  },
  
  // URL
  isUrl: function(str) {
      return new RegExp("^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$").test(str);
  },
  
  // 用户名（数字+中文+字母组合）
  isUserName: function(str) {
      return new RegExp("^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$").test(str);
  },  
  
  // 身份证，参考：http://www.cnblogs.com/lzrabbit/archive/2011/10/23/2221643.html
  isIDCard: function(str){  
      return new RegExp("^\\d{6}(18|19|20)?\\d{2}(0[1-9]|1[12])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|X)$", "i").test(str);  
  }  
}

/**
 * template模板渲染，基于artTemplate，依赖jquery或zepto；
 * 移动端zepto.touch.template.min.js已经集成，减少HTTP请求；
 * 使用的是原生语法，具体使用方法：https://github.com/aui/artTemplate
 * @param: {String} el      模板父元素名称
 *         {String} tempEl  模板本身名称
 *         {Object} data    数据
 * @author: fengri
 * @create: 2015年9月8日17:46:19
 */
var renderTemplate = {
    // 验证参数
    parmCheck: function (el, tempEl, data) {
        if (!el || !tempEl || !data) {
            return false;  
        } else {
            return true;
        }
    },

    // 追加
    append: function (el, tempEl, data) { 
        if (this.parmCheck(el, tempEl, data)) {
            $('#' + el).append(template(tempEl, data));
        }
    },  //插入前面
    before : function(el, tempEl, data) {
        if (this.parmCheck(el, tempEl, data)) {
            el.before(template(tempEl, data));
        }  
    },
    // 替换
    html: function (el, tempEl, data) {
    	if (el == 'J-category'){
    		console.log(tempEl);
    	}
        if (this.parmCheck(el, tempEl, data)) {
            $('#' + el).html(template(tempEl, data));
        }
    }
}
  
/**
 * ajax get方法二次封装，方便作统一异常处理；
 * @param: {String}   type      请求类型,get/post
 *         {String}   url     请求URL
 *         {Object}   data     发送数据
 *         {function} callback 回调函数
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function ajaxData(type, url, data, callback) { 
  if(!type || !url || !callback) return;

  if(typeof callback != 'function') return;

  $.ajax({
    type: type,
    url: url,
    data: data,
    dataType: 'json',
    success: function(json){
      if (!json){
        return false;
      }
      if (json.ret != 0){ 
        if(json.ret == 100001) {
          location.href = (location.protocol + '//' + location.hostname + '/mobile-user-main/login?return_uri=' + location.href);
        }else{
          G.msg(json.msg);
        }
         
        return false;
      }

      callback(json.data);
    },
    error: function(){
      G.msg('数据获取失败，请刷新页面重试!');
    }
  });
}


/**
 * 内容滚动加载；
 * @param: {function} callback    回调函数
 *         {Number}   offset      滚动偏移量，取舍大概5以下，默认为0.2
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function contentLazyLoad(callback, context, offset){
  var offset = offset || 0.2;
  var context = context || window;
  var winHeight = $(window).height();  
  var scrollHandler= function () {
    var pageH = $('body').height();
    var scrollTop = $(window).scrollTop(); //滚动条top   
    
    var deviant = (pageH - winHeight - scrollTop) / winHeight;
    
    if(deviant < offset) {
      // 回调时多传一个参数true，用来说明内容是通过懒加载而来
      callback.call(context, true);
    }
  };

  scrollTick.add(scrollHandler);
} 

/**
 * 内容向上滚动加载；
 * @param: {function} callback    回调函数
 *         {Number}   offset      滚动偏移量，取舍大概5以下，默认为0.2
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function contentPrevLoad(callback, context, offset){
  var offset = offset || 0.2;
  var context = context || window;
  var winHeight = $(window).height();  
  var scrollHandler= function () {
    var pageH = $('body').height();
    var scrollTop = $(window).scrollTop(); //滚动条top   
    if (scrollTop < 10 + offset)
    {
        callback.call(context, true);
    }
  };

  scrollTick.add(scrollHandler);
} 

/**
 * 滚动标题固定；
 * @param: {String}   fixedClasName    fixed样式名称
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
$.fn.scrollTitleFixed = function(fixedClasName){
  var self = this;
  var elOffsetTop = self.offset().top;
  var isFixed = false;
  var fixedClasName = fixedClasName || 'nav-top-fixed';
  var scrollHandler = function(){
    var scrollTop = $(this).scrollTop();

    if(elOffsetTop <= scrollTop) {
       if(!isFixed){
         self.addClass(fixedClasName);
         isFixed = true;
       }
    } else { 
      if(isFixed){
        isFixed = false;
        self.removeClass(fixedClasName);
      }
    }
  };
  
  scrollTick.add(scrollHandler);
}

/**
 * 倒计时；
 * @param: {String}   el    元素字符串，基于JS库选择器，如ID，'#test'等
 *         {Object}  options  配置参数
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function CountDown(el, options){  
  if(!el) return;
  
  this.element = $(el);
  this.timerId = null;
  this.options = {
    startTime: +new Date(),               // 开始时间
    endTime: +new Date(),                 // 结束时间
    varRegular: /\{(\w)\}/g,            // 模板正则，用于模板字符替换
    tpl: '${d}天${h}时${m}分${s}秒',  // 模板，其中d,h,m,s为关键字，不能重命名
    endFn: null,                          // 计时结回调
    isFormatDate: true,                   // 是否格式化时间，即都以二位显示即01天02小时01分01秒，默认为true
    isServerTime: true                    // 是否为服务器时间，因为服务器时间戳与JS时间戳位数不一致，需要进行修正
  }
  
  return this.init(options);
}

CountDown.prototype = {
  constructor: CountDown,
  
  init: function(options){
    var options = options || {};
    var self = this;

    for(var key in options) {
      self.options[key] = options[key];
    }

    if(self.options.isServerTime){
      self.options.startTime *= 1000;
      self.options.endTime *= 1000;
    }

    self.timerId = setInterval(function(){    
      self.rendUI();
    }, 100);
  },
  
  format: function(n){

    return ('' + n).replace(/^(\d)$/, '0$1');
  },
  
  countDown: function(){
    var date = {};
    var self = this;

    self.currentTime = +new Date();

    var leftTime = self.currentTime < self.options.startTime ?
                    (self.options.startTime - self.currentTime) / 1000 :
                    (self.options.endTime - self.currentTime) / 1000;

    if (leftTime > 0) {
      // get left days
      date.d = parseInt(leftTime / (24 * 3600));
      leftTime = leftTime % (24 * 3600);

      // get curr hours
      date.h = parseInt(leftTime / 3600);
      leftTime = leftTime % 3600;

      // get curr minutes
      date.m = parseInt(leftTime / 60);
      leftTime = leftTime % 60;

      date.s = parseInt(leftTime);

      return date;
    } else {
      return null;
    }
  },
  
  htmlTemplate: function(data){
    var self = this;
    var options = self.options;
 
    return options.tpl.replace(options.varRegular, function(str, value){
            return self._html(options.isFormatDate ? self.format(data[value]) : data[value], value);
          });
  },
  
  _html: function(content, type){
    return '<em class="u-time u-time-' + type + '">' + content + '</em>';
  },  
  
  rendUI: function(){
    var self = this;
    var currDate = self.countDown();

    if (self.startTime < self.beginTime) {
      self.element.html(self.htmlTemplate(currDate));
    } else {
      if (currDate) {      
        self.element.html(self.htmlTemplate(currDate));
      } else {
        self.element.html('已结束');
        typeof self.options.endFn === 'function' && endFn.call(this);
        self.destroy();
      }
    }
  },
  
  destroy: function(){
    clearInterval(this.timerId);
    this.element = null;  
  }
  
}

var backTop = function(){
  var el = $('#J-backTop');
  var winHeight = $(window).height();
  var isShow = false;
  var scrollHandler = function(){
    if($(this).scrollTop() > winHeight) {
      if(!isShow) {
        isShow = true;
        el.show();
      }
    }else{
      if(isShow){
        isShow = false;
        el.hide();
      }
    }
  };
  
  scrollTick.add(scrollHandler);
}

/**
 * 图片延迟加载；
 * 参考jquery.lazyload.js
 * @param: {String}   el    容器名称，如$(body)
 *         {Object}  options  配置参数
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function Lazyload(el, options){
  this.el = el;
  this.lazyImg = [];
  this.options = {
    threshold       : 0,            // 偏移量
    effect          : "show",       // 替换时过渡效果
    container       : window,       // scroll 绑定容器
    data_attribute  : "original",   // 图片延迟属性
    appear          : null,         // 图片替换之前回调
    load            : null,         // 图片替换之后回调
    loadAll         : null,         // 所有图片替换完成后，回调
    placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"        // 默认图片
  }
  
  return this.init(options);
}

Lazyload.prototype = {
  constructor: Lazyload,
  
  // 初始化
  init: function(options){
    var self = this;
    var options = options || {};
    
    for(key in options) {
      self.options[key] = options[key];
    }
    
    self.imgFilterLazy();
    
    self.bindScroll = function(){
      self.lazyload();
    };
    
    $(self.options.container).bind('scroll', self.bindScroll)
    
  },

  
  // 过滤图片中没有延迟属性的图片
  imgFilterLazy: function(){
    var self = this;
    var options = this.options;
    var imgElement = this.el.find('img');
    
    imgElement.each(function(){
      var $_this = $(this);
      
      if($_this.attr('data-' + options.data_attribute)) {
        self.lazyImg.push(this);
      }
    });
      
    if(self.lazyImg.length){
      
      $(self.lazyImg).each(function(){ 
        var _this = this;
        var $_this = $(_this);

        _this.loaded = false;

        /* If no src attribute given use data:uri. */
        if ($_this.attr("src") === undefined || $_this.attr("src") === '' || $_this.attr("src") === false) {
          $_this.attr("src", options.placeholder);
        }

        // 给每个图片绑定一个一次自定义事件
        $_this.one("appear", function() {
          if (!this.loaded) {

            if (options.appear) {
                var elements_left = self.lazyImg.length;
                options.appear.call(_this, elements_left, options);
            }

            var original = $_this.attr("data-" + options.data_attribute);

            $_this.hide();

            $_this.attr("src", original).removeAttr("data-" + options.data_attribute);

            $_this[options.effect](options.effect_speed);

            _this.loaded = true;

            var temp = $.grep(self.lazyImg, function(element) {
                return !element.loaded;
            });

            self.lazyImg = temp;

            if (options.load) {
                var elements_left = self.lazyImg.length;
                options.load.call(_this, elements_left, options);
            }
          }
        });
      });
      
      setTimeout(function(){
        self.lazyload();
      }, 20);
    }
  },
  
  // 延迟加载
  lazyload: function(){
    var self = this;
    
    if(self.lazyImg.length){
      
      $(self.lazyImg).each(function(){
        if(self.inViewPort(this)){
          $(this).trigger('appear');
        };
      });
      
    }else{      
      if(self.options.loadAll) {
        self.options.loadAll.call(self);
      }      
    }
  },
  
  // 判断elem是否在可视区域内
  inViewPort: function(elem){
    var self = this;
    
    return  !self.belowthefold(elem) && !self.abovethetop(elem); 
  },
  
  
  // 判断element是否在可视区域最下边
  belowthefold: function(element){
    var fold;

    if (this.options.container === undefined || this.options.container === window) {
        fold = (window.innerHeight ? window.innerHeight : $(window).height()) + $(window).scrollTop();
    } else {
        fold = $(this.options.container).offset().top + $(this.options.container).height();
    }

    return fold <= $(element).offset().top - this.options.threshold;
  },
  
  // 判断element是否在可视区域最上边
  abovethetop: function(element) {
    var fold;

    if (this.options.container === undefined || this.options.container === window) {
        fold = $(window).scrollTop();
    } else {
        fold = $(this.options.container).offset().top;
    }

    return fold >= $(element).offset().top + this.options.threshold  + $(element).height();
  },
    
  // 刷新，重新查找页面中img，主要用于动态添加图片
  fresh: function(){
    this.imgFilterLazy();
  },
  
  // 销毁
  destroy: function(){
    $(this.options.container).unbind('scroll', this.bindScroll);
    this.el = null;
    this.lazyImg = null;
    this.options = null;
  }
}

/**
 * TAB切换；
 * @param: {Object}  options  配置参数
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function Tab(options){
  this.options = {
    tabBtn: null,
    tabCont: null,
    btnClass: 'on',
    contClass: 'active',
    callback: null
  }
  
  return this.init(options);
}
  
Tab.prototype = {
  constructor: Tab,
  oldIndex: 0,
  init: function(options){
    var self = this;
    
    for(var key in options){
      self.options[key] = options[key];
    }    
    
    self.btn = $("#" + self.options.tabBtn);
    self.cont = $("#" + self.options.tabCont);
    
    self.bind();
  },
  bind: function(){
    var self = this;
    
    self.btn.on('tap', function(){
      var _this = $(this);
      var parent = _this.parent();
      var index = parent.index();
      
      self.index(index);
    });
    
  },
  index: function(index){
    var self = this;
    var parent = self.btn.parent().parent().children();
    var contParent = self.cont.parent().children();
    
    if(index != self.oldIndex){
      parent.eq(index).addClass(self.options.btnClass);
      contParent.eq(index).addClass(self.options.contClass);
      parent.eq(self.oldIndex).removeClass(self.options.btnClass);
      contParent.eq(self.oldIndex).removeClass(self.options.contClass);
      
      if(typeof self.options.callback == 'function') {
        self.options.callback.call(parent.eq(index), index, self.oldIndex);
      }
      
      self.oldIndex = index;
    }
  },
  destory: function(){
    var self = this;
    
    self.btn.unbind('tap');
    self.btn = null;
    self.cont = null;
  }  
}

$.fn.flashMsg = function(num, classname){
  var s = num || 3;
  var timer = 0;
  var self = $(this);
  
  if(!classname) return;
  
  timer = setInterval(function(){
    
    if(s == 0) {
      clearInterval(timer);
    }
    
    if(self.is('.' + classname)){ 
      s--;
      self.removeClass(classname);
    }else{      
      self.addClass(classname);
    }
  }, 200);  
}

/**
 * 图片全屏可滑动；基于touchSlider插件
 * @param: {Object}  options  配置参数
 * @author: fengri
 * @create: 2015年9月8日18:05:29
 */
function sliderBigImg(el){
  this.el = $('#' + el);
  
  return this.init(el);
}
sliderBigImg.prototype = {
  isRender: false,
  init: function(el){
    var self = this;
    
    if(!self.el.size()) return;
    
    self.box = $('<div>', {
      id: el + '-big',
      class: 'u-slider'
    });
    self.box.hide();
    self.imgList = self.el.find('img');
    
    self.bind();
  },
  bind: function(){
    var self = this;
    
    self.imgList.on('tap', function(){
      if(!self.isRender){
        self.isRender = true;
        self.box.show();
        self.createCont();
      }else{
        self.box.show();
      }
    });
  },
  createCont: function(){
    var self = this;
    var template = '';
    var imgList = self.imgList;
    
    template = '<div class="u-slider-img h5_banner">' + 
                  '<div class="bd">' +
                      '<ul>';
                    for(var i = 0; i < imgList.length; i++) {
                        template += '<li><img src="' + $(imgList[i]).data('big') + '" width="100%"></li>'
                    }
        template +=  '</div>' +
                  '<div class="hd">' +
                    '<ul>';    
                    for(var i = 0; i < imgList.length; i++) {
                       template += '<li class="">' + i + '</li>';
                    }
        template +=  '</ul>' +
                  '</div>' +
                '</div>';
    
    self.box.append(template);
    self.renderUI();    
  },
  renderUI: function(){
    var self = this;
    
    $('body').append(self.box);
    
    self.bindUI();
    self.touchSlider();
  },
  bindUI: function(){
    var self = this;
    
    self.box.on('tap', function(){
      self.box.hide();
    });
  },
  
  touchSlider: function(){
    var self = this;
    var id = '#' + self.box.attr('id');
    
    TouchSlide({ 
        slideCell: id,
        titCell: ".hd ul",
        mainCell: ".bd ul", 
        effect: "leftLoop", 
        autoPage: true, 
        autoPlay: false, 
        interTime: 6000
    });
  }
  
}


$.fn.goodsTool = function(callback){
  var self = $(this);

  self.find('li > a').on('tap', function(){
    var _this = $(this);
    var index = _this.index();
    var parent = _this.parent();
    var len = parent.children().size();
    var parentIndex = parent.index();
    var selectEl;

    if(parentIndex != 3){
      if(index != len - 1){
        _this.hide();
        (selectEl = _this.next()).css('display', 'block');
      }else{
        _this.hide();
        (selectEl = parent.children().eq(0)).css('display', 'block');
      }
    }else{
      selectEl = _this;
    }

    if(parentIndex == 1) {
      parent.next().children().hide();
      parent.next().children().eq(0).css('display', 'block');
    }

    if(parentIndex == 2) {
      parent.prev().children().hide();
      parent.prev().children().eq(0).css('display', 'block');
    }

    if(typeof callback == 'function'){
      callback.call(selectEl[0], parentIndex, parent);  
    }
  })

};

var search = {
  init: function(){
    var self = this;

    self.searchHistory = G.storage.get('searchhistory') || [];
    self.keyWordEl = $("#J-topKeyword");
    self.btnSearchCancel = $("#J-btnSearchCancel");
    self.btnSearchClear = self.keyWordEl.parent().find('label');
    self.bind();
  },
  bind: function(){
    var self = this;

    self.keyWordEl.on('input.keyword', function(){
      var parent = $(this).parent();
      var val = $.trim(this.value);

      if(val) {
        if(parent.is('.show-b-clear')) return;
        parent.addClass('show-b-clear');
      }else{    
        if(!parent.is('.show-b-clear')) return;
        parent.removeClass('show-b-clear');
      }
    }).on('focus.keyword', function(){
      var val = $.trim(this.value);
      var parent = $(this).parent();
      
      if(val) {     
        if(parent.is('.show-b-clear')) return;   
        parent.addClass('show-b-clear');
      }
      
      if($('body').is('.open-search')) return;
            
      self.rendHistory();
      $('body').addClass('open-search');
    }).on('keyup', function(e){
      var code = e.keyCode;
      var val = $.trim(this.value);

      if(code == 13) {

        $(self.searchHistory).each(function(n, el){
          if(el.value == val) self.searchHistory.splice(n, 1);
        });

        self.searchHistory.unshift({
          'value': val
        });

        G.storage.set('searchhistory', JSON.stringify(self.searchHistory));

        $("#searchForm").submit();
      }
    });

    self.btnSearchClear.on('tap.clear', function(){
      $(this).parent().removeClass('show-b-clear');
      $(this).siblings('input').val('');
    })

    self.btnSearchCancel.on('tap.cancel', function(){  
      $('body').removeClass('open-search');
      //self.keyWordEl.val('');
      self.keyWordEl.parent().removeClass('show-b-clear');
    });

    $("#J-btnSearchHistoryClear").on('tap.clearHistory', function(){
      self.clearHistory();
    });
  },

  // 渲染历史记录
  rendHistory: function(){
    var self = this;
    var html = '';
    var searchHistory = G.storage.get('searchhistory');
    if(searchHistory && searchHistory.length){
      for(var i = 0, len = searchHistory.length; i < len; i++){
        html += '<a href="/goods/search?keyword=' + searchHistory[i].value + '" class="result-item">' + searchHistory[i].value + '</a>';
      }

      $("#J-searchHistory").html(html).parent().show();
    }
  },

  // 清除历史记录
  clearHistory: function(){
    var self = this;

    self.searchHistory = [];
    G.storage.remove('searchhistory');
    $("#J-searchHistory").html('').parent().hide();    
  }
};

$.fn.editContent = function(options){
  var me = $(this),
      setting = {
        targetElement: '',
        className: 'edit',
        btnDel: 'a.j-del',
        delCallback: null
      },
      targetElement = null;
  
  $.extend(setting, options);
  
  targetElement = $(setting.targetElement);
  if(!targetElement.size()) return;
  
  me.on('tap', function(){
    var self = $(this);
        
    if(targetElement.is('.' + setting.className)){
      self.text('编辑');
      targetElement.removeClass(setting.className);
    }else{
      self.text('完成');
      targetElement.addClass(setting.className);
    }    
  }); 
  
  if(typeof setting.delCallback == 'function') {
    targetElement.delegate(setting.btnDel, 'tap', setting.delCallback);
  }
}


function UpImage(el, options){
  this.setting = {
    isAutoUp: false,
    server: '',
    uploadSuccess: null,
    uploadComplete: null,
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,png',
      mimeTypes: 'image/*'
    },
    thumb: {
      width: 110,
      height: 110
    }
  }
  this.pick = el;
  this.uploader = null;
  this.init(options);
}
  
UpImage.prototype = {
  isHaveImg: false,
  init: function(options){
    var me = this;
    
    $.extend(me.setting, options);
    
    if(!me.setting.server) return;

    me.uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: me.setting.isAutoUp,

        // 文件接收服务端。
        server: me.setting.server,
        
        // 
        pick: '#' + me.pick,
      
        // 只允许选择图片文件。
        accept: me.setting.accept,
        thumb:{
            width: me.setting.thumb.width,
            height: me.setting.thumb.height,

            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,

            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: true,

            // 是否允许裁剪。
            crop: true,

            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        }
    });
    
    me.fileQueued();
    me.uploadError();
    me.error();
    
    if($.isFunction(me.setting.uploadComplete)) {
      me.uploadComplete();
    }
    if($.isFunction(me.setting.uploadSuccess)) {
      me.uploadSuccess();
    }
  },
  
  // 当有文件添加进来的时候
  fileQueued: function(){
    var me = this;
    var thumb = me.setting.thumb;
    
    me.uploader.on('fileQueued', function(file){
      var $pack = $('#' + me.pick),
          $img = $pack.find('img');
  
      if(!$pack.is('.webuploader-thumb')) {
        me.isHaveImg = true;
        $pack.addClass('webuploader-thumb');
      }
  
      me.uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
      }, thumb.width, thumb.height);
    });
  },
  uploadSuccess: function(){
    var me = this;
    
    me.uploader.on('uploadSuccess', function(file, response){
      me.setting.uploadSuccess.call(this, file, response);
    });
  },
  uploadComplete: function(){
    var me = this;
    
    me.uploader.on('uploadComplete', function(file){
      me.setting.uploadComplete.call(this, file);
    });
  },
  
  // 上传时出错
  uploadError: function(){
    var me = this;
    
    me.uploader.on('uploadError', function(file, reason ){
      G.msg('文件上传失败，请重新上传！');
    });
  },
  
  
  
  // 文件初始上传时出错
  error: function(){
    var me = this;
    
    me.uploader.on('error', function(type){
      switch(type) {
        case 'Q_EXCEED_NUM_LIMIT':
        case 'Q_EXCEED_SIZE_LIMIT':
          G.msg('文件过大，请重新选择！');
          break;
        case 'Q_TYPE_DENIED':
          G.msg('文件格式错误，只能上传：' + me.setting.accept.extensions);
          break;
      }
    });
  }
}

;(function(window){
var loading = new G.loading(); 
  
function orderHandleTool(status, sn){
  
  switch(status){
    // 去付款
    case '100':
      if(G.isWeixin()){  
        setTimeout(function(){ 
          window.location.href = '/weixin-sign/wxpay?payment_type=wxjsapi_sdk&client=lamall&order_sn=' + sn;
        }, 0);
      }else{        
        setTimeout(function(){
          window.location.href = '/user-order/pay?payment_type=alipay_wap&os=web&clent=wap&order_sn=' + sn;
        }, 0);
      }
      break;

    // 去评价
    case '200':
      setTimeout(function(){
        window.location.href = '/comment/add?order_sn=' + sn;
      }, 0);
      break;

    // 查看评论
    case '300':
      setTimeout(function(){
      window.location.href = '/comment/orderComment?order_sn=' + sn;
      }, 0);
      break;

    // 上传身份证
    case '400':
      setTimeout(function(){
        window.location.href = '/user-address/idcard?order_sn=' + sn;
      }, 0);
      break;

    // 申请退款
    case '500':
      setTimeout(function(){
        window.location.href = '/user-order/refund?client=wap&order_sn=' + sn;
      }, 0);
      break;

//        // 查看退款
//        case '600':
//          url = '';
//          break;
//          
//        // 退回商品
//        case '700':
//          url = '';
//          break;

    // 取消订单
    case '800':          
      layer.open({
        content: '确定取消订单？',
        btn: ['确定', '取消'],
        shadeClose: false,
        yes: function(){                
          loading.show();      
          ajaxData('post', '/api-user-order/cancel?client=web', 
                {order_sn: sn}, 
                function(data){              
                  loading.hide();
                  location.reload();
                });
        },
        no: function(){
          layer.closeAll();
        }
      });
      break;

    // 隐藏订单
    case '900':        
      layer.open({
        content: '确定删除订单？',
        btn: ['确定', '取消'],
        shadeClose: false,
        yes: function(){                
          loading.show();      
          ajaxData('post', '/api-user-order/delOrder?client=web', 
                {order_sn: sn}, 
                function(data){              
                  loading.hide();
                  location.href = '/user-order/list';
                });
        },
        no: function(){
          layer.closeAll();
        }
      });
      break;

      // 再次购买
      case '1000':               
          loading.show();        
          ajaxData('get', '/api-User-Cart/buyAgain?v=1&client=web', 
                    {order_sn: sn}, 
                    function(data){              
                      loading.hide();
                      location.href = '/user-cart/list';
                    });
        break;
//          
//        // 物流查询
//        case '1100':
//          url = '';
//          break;
  }
}
  
window.orderHandleTool = orderHandleTool;
})(window)

;(function(){
  var Effect = {
  // 普通的数字效果
  normal: {
      paint: function () {
          var me = this,
              content;
          // 找到值发生改变的hand
          $.each(me.hands, function (index, hand) {
              if (hand.lastValue !== hand.value) {
                  // 生成新的markup
                  content = '';

                  $.each(me._toDigitals(hand.value, hand.bits), function (index, digital) {
                      content += me._html(digital, '', 'digital');
                  });
                
                  // 并更新
                  hand.node.html(content);
              }
          });
      }
  }
};

var Timer = (function(){
  var commands = [],
    fns = [];

  function timer(){
    while (commands.length) {
        commands.shift()();
    }
    var diff = +new Date() - timer.nextTime,
        // 因为Timer它的功能在关键时候会丢帧保时，而丢失帧数则量count变量做统计
        count = 1 + Math.floor(diff / 100);

    diff = 100 - diff % 100;
    timer.nextTime += 100 * count;

   // 循环处理fns二元组
    var frequency, step,
        i, len;
    for (i = 0, len = fns.length; i < len; i += 2) {
        // 拿帧值，0或1
        frequency = fns[i + 1];

        // 100次/s的
        if (0 === frequency) {
            fns[i](count);
        // 1000次/s的
        } else {
            // 先把末位至0，再每次加2
            frequency += 2 * count - 1;

            step = Math.floor(frequency / 20);
            if (step > 0) { fns[i](step);}

            // 把末位还原成1
            fns[i + 1] = frequency % 20 + 1;
        }
    }

    setTimeout(timer, diff);
  }
  // 首次调用
  timer.nextTime = +new Date();
  timer();
  
  return {
      add: function (fn, frequency) {
          commands.push(function () {
              fns.push(fn);
              fns.push(frequency === 1000 ? 1 : 0);
          });
      },
      remove: function (fn) {
        commands.push(function () {
          var i = $.inArray(fn, fns);
          if (i !== -1) {
              fns.splice($.inArray(fn, fns), 2);
          }
        });
      }
  };
  
})();
  
/**
 * 倒计时插件，淘宝kissy countDown jquery版
 * 具体使用方法与kissy无异，具体http://kissygalleryteam.github.io/countdown/doc/guide/index.html
 *
 */
function CountDown(options){
  this.attrs = {
    el: {
    },
    // unix时间戳，单位应该是毫秒！
    stopPoint: {
    },
    leftTime: {
      value: 0
    },
    template: {
      value: '${h}时${m}分${s-ext}秒'
    },
    varRegular: {
      value: /\$\{([\-\w]+)\}/g
    },
    clock: {
      value: ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
    },
    effect: {
      value: 'normal'
    }
  };
  
  this.init.call(this, options);
}
  
CountDown.prototype = {
  init: function(options){
    var me = this;
    
    $.extend(me.attrs, options);
    
    var el = $(me.attrs.el);
    
     // 初始化时钟.
    var hands = [];
    /**
     * 指针结构
     * hand: {
     *   type: string,
     *   value: number,
     *   lastValue: number,
     *   base: number,
     *   radix: number,
     *   bits: number,
     *   node: S.Node
     * }
     */
    me.hands = hands;
    me.frequency = 1000;
    me._notify = [];

    // 分析markup
    var tmpl = me.attrs.template.value;
    var varRE = me.attrs.varRegular.value;
    
    
    varRE.lastIndex = 0;
    
    el.html(tmpl.replace(varRE, function (str, type) {
        
        // 时钟频率校正.
        if (type === 'u' || type === 's-ext') {
            me.frequency = 100;
        }

        // 生成hand的markup
        var content = '';
        if (type === 's-ext') {
            hands.push({type: 's'});
            hands.push({type: 'u'});
            content = me._html('', 's', 'handlet') +
                me._html('.', '', 'digital') +
                me._html('', 'u', 'handlet');
        } else {
            hands.push({type: type});
        }

        return me._html(content, type, 'hand');
    }));

    // 指针type以外属性(node, radix, etc.)的初始化.
    var clock = me.attrs.clock.value;

    $.each(hands, function (index, hand) {
        var type = hand.type,
            base = 100, i;

        hand.node = el.find('.hand-' + type);      

        // radix, bits 初始化.
        for (i = clock.length - 3; i > -1; i -= 3) {
            if (type === clock[i]) {
                break;
            }

            base *= clock[i + 1];
        }
        hand.base = base;
        hand.radix = clock[i + 1];
        hand.bits = clock[i + 2];
    });

    me._getLeft();
    me._reflow();

    // bind reflow to me.
    var _reflow = me._reflow;
    
    me._reflow = function () {
        return _reflow.apply(me, arguments);
    };
    
    Timer.add(me._reflow, me.frequency);

    // 显示时钟.
    el.show();
  },
  
  /**
   * 获取倒计时剩余帧数
   */
  _getLeft: function () {//{{{
      var left = this.attrs.leftTime.value * 1000;
      var end = this.attrs.stopPoint.value;        // 这个是UNIX时间戳，毫秒级
      if (!left && end) {
          left = end - Date.now();
      }

      this.left = left - left % this.frequency;
  },//}}}
  /**
   * 更新时钟
   */
  _reflow: function (count) {//{{{
      count = count || 0;

      var me = this;
      me.left = me.left - me.frequency * count;

      // 更新hands
      $.each(me.hands, function (index, hand) {
          hand.lastValue = hand.value;
          hand.value = Math.floor(me.left / hand.base) % hand.radix;
       // console.log(me.left + '/' + hand.base + '%' + hand.radix + '=' + hand.value)
      });

      // 更新时钟.
      me._repaint();

      // notify
      if (me._notify[me.left]) {
          $.each(me._notify[me.left], function (index, callback) {
              callback.call(me);
          });
      }

      // notify 可能更新me.left
      if (me.left < 1) {
          Timer.remove(me._reflow);
      }

      return me;
  },//}}}
  /**
   * 重绘时钟
   * @private
   */
  _repaint: function () {//{{{
      Effect[this.attrs.effect.value].paint.apply(this);

  },//}}}
  /**
   * 把值转换为独立的数字形式
   * @private
   * @param {number} value
   * @param {number} bits
   */
  _toDigitals: function (value, bits) {//{{{
      value = value < 0 ? 0 : value;

      var digitals = [];

      // 把时、分、秒等换算成数字.
      while (bits--) {
          digitals[bits] = value % 10;

          value = Math.floor(value / 10);
      }
    

      return digitals;
  },//}}}
  /**
   * 生成需要的html代码，辅助工具
   * @private
   * @param {string|Array.<string>} content
   * @param {string} className
   * @param {string} type
   */
  _html: function (content, className, type) {//{{{
      if ($.isArray(content)) {
          content = content.join('');
      }

      switch (type) {
          case 'hand':
              className = type + ' hand-' + className;
              break;
          case 'handlet':
              className = type + ' hand-' + className;
              break;
          case 'digital':
              if (content === '.') {
                  className = type + ' ' + type + '-point ' + className;
              } else {
                  className = type + ' ' + type + '-' + content + ' ' + className;
              }
              break;
      }

      return '<span class="' + className + '">' + content + '</span>';
  },//}}}
  /**
   * 倒计时事件
   * @param {number} time unit: second
   * @param {Function} callback
   */
  notify: function (time, callback) {//{{{
      time = time * 1000;
      time = time - time % this.frequency;

      var notifies = this._notify[time] || [];
      notifies.push(callback);
      this._notify[time] = notifies;

      return this;
  }//}}}
}

window.CountDown2 = CountDown;
}()); 

/**
 * 输入框工具，提交输入清除和密码框明文显示 
 */
$.fn.inputTool = function(){
  var me = $(this),
      parent = me.parent();
  
  function inputHandle(){    
    var self = $(this),
        v = $.trim(this.value),
        btnClear = self.siblings('label.ipt-clear');
    
    if(v != '') {
      if(!btnClear.is(':hidden')) return;
      btnClear.show();
    }else{
      if(btnClear.is(':hidden')) return;
      btnClear.hide();
    }    
  }
    
  me.on('input', function(){
    inputHandle.call(this);    
  }).on('focus', function(){
    inputHandle.call(this);   
  }).on('keyup', function(){
    inputHandle.call(this);       
  });
  
  parent.delegate('label', 'tap', function(){
    var self = $(this),
        type = self.data('type'),
        ipt = self.siblings('input');
    
    switch(type) {
      case 'clear':
        if(self.is(':hidden')){
          self.show();
        }else{
          self.hide();
          ipt.val('').focus();
        }    
        break;
      case 'eye':
        if(self.is('.show-eye')) {
          self.removeClass('show-eye');
          ipt.attr('type', 'password');
        }else{          
          self.addClass('show-eye');
          ipt.attr('type', 'text');
        }
        break;
    }
  })
}
var footerMenu = {
		init:function(t){
			 var i = this;
			 i.currtype = t;
			 i.bind();
			 
		},
		bind:function(){
			var o = this;
			var menuBtnEl = $(".footer-menu-btn");
			for(var i = 0; i < menuBtnEl.length; i++){
				if ($(menuBtnEl[i]).attr('data-type') == o.currtype){
					$(menuBtnEl[i]).addClass('curr');
				}else{
					$(menuBtnEl[i]).removeClass('curr');
				}
				$(menuBtnEl[i]).click(function(){
					o.menuHandleTool(this);
				});
			}
		},
		menuHandleTool:function(el){
			var i = this;
			var type = $(el).attr('data-type');
			switch (type) {
	          case 'home':
	        	  window.location.href = '/mobile-main';
	              break;
	          case 'cate':
	        	  window.location.href = '/mobile-category';
	              break;
	          case 'praise':
	        	  window.location.href = '/mobile-goods/praise';
	              break;
	          case 'cart':
	        	  window.location.href = '/mobile-user-cart/list';
	              break;
	          case 'my':
	        	  window.location.href = '/mobile-user-main';
	              break;
	      }
		}
}
var butlerFooter = {
		init:function(t){
			 var i = this;
			 i.currtype = t;
			 i.bind();
			 
		},
		bind:function(){
			var o = this;
			var menuBtnEl = $(".bulter-menu-btn");
			for(var i = 0; i < menuBtnEl.length; i++){
				if ($(menuBtnEl[i]).attr('data-type') == o.currtype){
					$(menuBtnEl[i]).addClass('on');
					$(menuBtnEl[i]).addClass('curr');
				}else{
					$(menuBtnEl[i]).removeClass('on');
					$(menuBtnEl[i]).removeClass('curr');
				}
				$(menuBtnEl[i]).click(function(){
					o.menuHandleTool(this);
				});
			}
		},
		menuHandleTool:function(el){
			var i = this;
			var type = $(el).attr('data-type'); 
			switch (type) {
	          case 'index':
	        	  window.location.href = '/mobile-butler-main/product';
	              break;
	          case 'order':
	        	  window.location.href = '/mobile-butler-order/list';
	              break;
	          case 'qrcode':
	        	  var invite_id = $(el).attr('invite_id'); 
	        	  window.location.href = '/mobile-butler-invite/qrcodeJump?invite_id='+invite_id;
	              break;
	          case 'aide':
	        	  window.location.href = '/mobile-butler-main/aide';
	              break;
	      }
		}
}

